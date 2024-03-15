/* eslint-disable no-sequences */
import {baseApi} from "../baseApi";

export const purchaseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    purchaseCreate: build.mutation({
      query: (purchaseData) => ({
        url: "/purchase",
        method: "POST",
        data: purchaseData,
      }),
      invalidatesTags: ["purchase"],
    }),

    purchasesHistory: build.query({
      query: (params) => ({
        url: `/purchase/${params}`,
        method: "GET",
      }),
      providesTags: ["purchase"],
    }),
  }),
});

export const {usePurchaseCreateMutation, usePurchasesHistoryQuery} = purchaseApi;
