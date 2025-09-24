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
      providesTags: ["Category"],
    }),

    addCategory: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/admin/category",
          body: data,
        };
      },
      invalidatesTags: ["Category"],
    }),

    updateCategory: builder.mutation({
      query: (data) => {
        return {
          method: "PATCH",
          url: "/admin/category",
          body: data,
        };
      },
      invalidatesTags: ["Category"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/admin/category?id=${id}`,
        };
      },
      invalidatesTags: ["Category"],
    }),

    //sub category
    subCategories: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/admin/sub_category",
        };
      },
      providesTags: ["SubCategory"],
    }),

    addSubCategory: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/admin/sub_category",
          body: data,
        };
      },
      invalidatesTags: ["SubCategory"],
    }),

    updateSubCategory: builder.mutation({
      query: (data) => {
        return {
          method: "PATCH",
          url: "/admin/sub_category",
          body: data,
        };
      },
      invalidatesTags: ["SubCategory"],
    }),

    deleteSubCategory: builder.mutation({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/admin/sub_category?id=${id}`,
        };
      },
      invalidatesTags: ["SubCategory"],
    }),
  }),
});

export const {
  useCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,

  useSubCategoriesQuery,
  useAddSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useUpdateSubCategoryMutation,
} = categorySlice;
