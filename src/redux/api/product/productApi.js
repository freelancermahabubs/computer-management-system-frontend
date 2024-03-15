/* eslint-disable no-sequences */
import {baseApi} from "../baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    productCreate: build.mutation({
      query: (productData) => ({
        url: "/items",
        method: "POST",
        data: productData,
      }),
      invalidatesTags: ["items"],
    }),

    allProductGet: build.query({
      query: (params) => ({
        url: "/items",
        method: "GET",
        params,
      }),
      providesTags: ["items"],
    }),
    singleProductGet: build.query({
      query: (id) => ({
        url: `/items/${id}`,
        method: "GET",
      }),
      providesTags: ["items"],
    }),

    updateProduct: build.mutation({
      query: ({id, values}) => ({
        url: `/products/${id}`,
        method: "PATCH",
        data: values,
      }),
      invalidatesTags: ["products"],
    }),
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `/items/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["items"],
    }),
  }),
});

export const {
  useProductCreateMutation,
  useAllProductGetQuery,
  useSingleProductGetQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
