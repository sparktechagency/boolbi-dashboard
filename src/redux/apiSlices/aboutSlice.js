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
      query: ({ page, limit, status }) => {
        return {
          url: `/admin/support?page=${page}&limit=${limit}&status=${status}`,
          method: "GET",
        };
      },
      providesTags: ["Support"],
    }),

    giveSupportReply: builder.mutation({
      query: (data) => {
        return {
          url: `/admin/support`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Support"],
    }),
  }),
});

export const {
  useUpdateAboutUsMutation,
  useGetSupportRequestsQuery,
  useGiveSupportReplyMutation,
} = aboutUsSlice;
