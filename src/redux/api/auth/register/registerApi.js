import {baseApi} from "../../baseApi";

export const registerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation({
      query: (authData) => ({
        url: "/auth/register",
        method: "POST",
        data: authData,
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {useRegisterMutation} = registerApi;
