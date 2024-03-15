/* eslint-disable no-sequences */
import { baseApi } from "../baseApi";

export const reportsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    allProfitlossGet: build.query({
      query: (params) => ({
        url: "/report/profit-loss/",
        method: "GET",
        params,
      }),
      providesTags: ["report"],
    }),

    allTodayReportGet: build.query({
      query: (params) => ({
        url: "/report/today/",
        method: "GET",
        params,
      }),
      providesTags: ["report"],
    }),
    todayExpenseReportGet: build.query({
      query: (params) => ({
        url: "/report/today/expense",
        method: "GET",
        params,
      }),
      providesTags: ["report", "expense"],
    }),
    todayPayToSupplierReportGet: build.query({
      query: (params) => ({
        url: "/report/today/pay",
        method: "GET",
        params,
      }),
      providesTags: ["payments", "expense"],
    }),
    todayReceiveFromCustomerReportGet: build.query({
      query: (params) => ({
        url: "/report/today/receive",
        method: "GET",
        params,
      }),
      providesTags: ["payments", "expense"],
    }),
    allMonthlyReportGet: build.query({
      query: (params) => ({
        url: "/report/month/",
        method: "GET",
        params,
      }),
      providesTags: ["report"],
    }),
    currentMonthExpenseReportGet: build.query({
      query: (params) => ({
        url: "/report/month/expense",
        method: "GET",
        params,
      }),
      providesTags: ["report", "expense"],
    }),
    currentMonthPayToSupplierReportGet: build.query({
      query: (params) => ({
        url: "/report/month/pay",
        method: "GET",
        params,
      }),
      providesTags: ["report", "expense"],
    }),
    currentMonthReceiveFromCustomerReportGet: build.query({
      query: (params) => ({
        url: "/report/month/receive",
        method: "GET",
        params,
      }),
      providesTags: ["report", "expense"],
    }),
    summaryReport: build.query({
      query: (params) => ({
        url: "/report/lifetime",
        method: "GET",
        params,
      }),
      providesTags: ["report", "expense"],
    }),
    summaryExpenseReport: build.query({
      query: (params) => ({
        url: "/report/lifetime/expense",
        method: "GET",
        params,
      }),
      providesTags: ["report", "expense"],
    }),
    summaryReceiveReport: build.query({
      query: (params) => ({
        url: "/report/lifetime/receive",
        method: "GET",
        params,
      }),
      providesTags: ["report", "expense"],
    }),
    summaryPayReport: build.query({
      query: (params) => ({
        url: "/report/lifetime/pay",
        method: "GET",
        params,
      }),
      providesTags: ["report", "expense"],
    }),
    lowStockReport: build.query({
      query: (params) => ({
        url: "/report/low-stock-products",
        method: "GET",
        params,
      }),
      providesTags: ["report"],
    }),
    topCustomerReport: build.query({
      query: (params) => ({
        url: "/report/top-customers",
        method: "GET",
        params,
      }),
      providesTags: ["report"],
    }),
    topProductsReport: build.query({
      query: (params) => ({
        url: "/report/top-products",
        method: "GET",
        params,
      }),
      providesTags: ["report"],
    }),
    topSoldProductsAllTimeReport: build.query({
      query: (params) => ({
        url: "/report/top-product-alltime",
        method: "GET",
        params,
      }),
      providesTags: ["report"],
    }),
    dailyReport: build.query({
      query: (params) => ({
        url: "/report/daily",
        method: "GET",
        params,
      }),
      providesTags: ["report"],
    }),
    customerLedger: build.query({
      query: (params) => ({
        url: "/report/customer/ledger",
        method: "GET",
        params,
      }),
      providesTags: ["report"],
    }),
  }),
});

export const {
  useAllProfitlossGetQuery,
  useAllTodayReportGetQuery,
  useAllMonthlyReportGetQuery,
  useTodayExpenseReportGetQuery,
  useTodayPayToSupplierReportGetQuery,
  useTodayReceiveFromCustomerReportGetQuery,
  useCurrentMonthExpenseReportGetQuery,
  useCurrentMonthPayToSupplierReportGetQuery,
  useCurrentMonthReceiveFromCustomerReportGetQuery,
  useSummaryReportQuery,
  useSummaryExpenseReportQuery,
  useSummaryReceiveReportQuery,
  useSummaryPayReportQuery,
  useLowStockReportQuery,
  useTopCustomerReportQuery,
  useTopProductsReportQuery,
  useTopSoldProductsAllTimeReportQuery,
  useCustomerLedgerQuery,
  useDailyReportQuery
} = reportsApi;
