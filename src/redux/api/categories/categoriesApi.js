/* eslint-disable no-sequences */
import {baseApi} from "../baseApi";

export const categoriesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    categoryCreate: build.mutation({
      query: (categoriesData) => ({
        url: "/categories",
        method: "POST",
        data: categoriesData,
      }),
      invalidatesTags: ["categories"],
    }),

    allCategoryGet: build.query({
      query: (params) => ({
        url: "/categories",
        method: "GET",
        params,
      }),
      providesTags: ["categories"],
    }),

  }),
});

export const {
  useCategoryCreateMutation,
  useAllCategoryGetQuery,

} = categoriesApi;
