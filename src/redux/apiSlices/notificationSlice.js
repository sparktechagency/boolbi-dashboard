import { api } from "../api/baseApi";

const notificationSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    notification: builder.query({
      query: () => {
        return {
          url: `/user/notificaitons`,
          method: "GET",
        };
      },
    }),
    readNotifications: builder.mutation({
      query: (data) => {
        return {
          url: `/user/notificaitons`,
          method: "PATCH",
          body: data,
        };
      },
    }),
  }),
});

export const { useNotificationQuery, useReadNotificationsMutation } =
  notificationSlice;
