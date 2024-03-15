/* eslint-disable no-sequences */
import {baseApi} from "../baseApi";

export const loginApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (authData) => ({
        url: "/auth/login",
        method: "POST",
        data: authData,
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {useLoginMutation} = loginApi;
