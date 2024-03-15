/* eslint-disable no-sequences */
import {baseApi} from "../baseApi";

export const brandsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    brandCreate: build.mutation({
      query: (brandData) => ({
        url: "/brands",
        method: "POST",
        data: brandData,
      }),
      invalidatesTags: ["brands"],
    }),

    allBrandGet: build.query({
      query: (params) => ({
        url: "/brands",
        method: "GET",
        params,
      }),
      providesTags: ["brands"],
    }),
  
  }),
});

export const {
  useBrandCreateMutation,
  useAllBrandGetQuery,
  useSingleBrandGetQuery,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandsApi;
