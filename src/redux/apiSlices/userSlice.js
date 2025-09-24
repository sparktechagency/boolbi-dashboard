import { api } from "../api/baseApi";

const userSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    admin: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/user?role=ADMIN",
        };
      },
    }),
    customers: builder.query({
      query: ({ page, limit }) => {
        return {
          method: "GET",
          url: `/admin/customer?page=${page}&limit=${limit}`,
        };
      },
      providesTags: ["customers"],
    }),

    getCustomerById: builder.query({
      query: (id) => {
        return {
          method: "GET",
          url: `/admin/customer?id=${id}`,
        };
      },
      providesTags: ["customers"],
    }),

    getAllProviders: builder.query({
      query: ({ page, limit }) => {
        return {
          method: "GET",
          url: `/admin/provider?page=${page}&limit=${limit}`,
        };
      },
      providesTags: ["providers"],
    }),

    getProviderById: builder.query({
      query: (id) => {
        return {
          method: "GET",
          url: `/admin/provider?id=${id}`,
        };
      },
      providesTags: ["providers"],
    }),

    userById: builder.query({
      query: (id) => {
        return {
          method: "GET",
          url: `/user/profile/${id}`,
        };
      },
      providesTags: ["providers"],
    }),

    changeUserStatus: builder.mutation({
      query: ({ id, action }) => {
        return {
          method: "PATCH",
          url: `/admin/customer?acction=${action}&user=${id}`,
        };
      },
      invalidatesTags: ["customers"],
    }),

    changeProviderStatus: builder.mutation({
      query: ({ id, action }) => {
        return {
          method: "PATCH",
          url: `/admin/provider?acction=${action}&user=${id}`,
        };
      },
      invalidatesTags: ["providers"],
    }),
  }),
});

export const {
  useAdminQuery,
  useCustomersQuery,
  useGetCustomerByIdQuery,
  useGetAllProvidersQuery,
  useGetProviderByIdQuery,
  useUserByIdQuery,
  useChangeUserStatusMutation,
  useChangeProviderStatusMutation,
} = userSlice;
