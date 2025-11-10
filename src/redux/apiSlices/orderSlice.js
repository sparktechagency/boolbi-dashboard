import { api } from "../api/baseApi";

const orderSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    orders: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/dashboard/orders",
        };
      },
    }),
    orderProgress: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/dashboard/order-progress",
        };
      },
    }),

    getAdminCommission: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/admin/admin-commission",
        };
      },
      providesTags: ["AdminCommission"],
    }),

    updateAdminCommission: builder.mutation({
      query: (data) => {
        return {
          method: "PATCH",
          url: "/admin/admin-commission",
          body: data,
        };
      },
      invalidatesTags: ["AdminCommission"],
    }),
  }),
});

export const {
  useOrdersQuery,
  useOrderProgressQuery,

  // Admin Commission
  useGetAdminCommissionQuery,
  useUpdateAdminCommissionMutation,
} = orderSlice;
