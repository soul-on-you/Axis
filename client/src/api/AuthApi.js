import { apiMiddleware } from "./ApiMiddleware";

export const authAPI = apiMiddleware.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/registration",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    auth: builder.query({
      query: () => ({
        url: "/auth/auth",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useAuthQuery } = authAPI;
