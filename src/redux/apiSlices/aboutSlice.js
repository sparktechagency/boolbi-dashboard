import { api } from "../api/baseApi";

const aboutUsSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    updateAboutUs: builder.mutation({
      query: ({ id, description }) => {
        return {
          url: `/about/update-about/${id}`,
          method: "PATCH",
          body: { description },
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        };
      },
    }),
    getSupportRequests: builder.query({
      query: ({ page, limit }) => {
        return {
          url: `/admin/support?page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useUpdateAboutUsMutation, useGetSupportRequestsQuery } =
  aboutUsSlice;
