import {createApi} from "@reduxjs/toolkit/query/react";
import {axiosBaseQuery} from "../../helpers/axios/axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({baseUrl: process.env.REACT_APP_BASE_URL}),
  endpoints: () => ({}),
  tagTypes: ["user", "categories", "brands", "items", "sales", "purchase"],
});
