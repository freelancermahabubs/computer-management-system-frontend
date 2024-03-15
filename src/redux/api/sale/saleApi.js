/* eslint-disable no-sequences */
import {baseApi} from "../baseApi";

export const saleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    saleCreate: build.mutation({
      query: (saleData) => ({
        url: "/sales",
        method: "POST",
        data: saleData,
      }),
      invalidatesTags: ["sales"],
    }),

    salesHistory: build.query({
      query: (params) => ({
        url: `/sales/${params}`,
        method: "GET",
      }),
      providesTags: ["sales"],
    }),

  }),
});

export const {
  useSaleCreateMutation,
  useSalesHistoryQuery,
 

} = saleApi;
