import { api } from "../api/baseApi";

const categorySlice = api.injectEndpoints({
  endpoints: (builder) => ({
    categories: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/admin/category",
        };
      },
    }),
    addCategory: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/admin/category",
          body: data,
        };
      },
    }),
  }),
});

export const { useCategoriesQuery, useAddCategoryMutation } = categorySlice;
