import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { login, logout } from "../store/slices/AuthSlice";
import jwt_decode from "jwt-decode";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let resultQuery = await baseQuery(args, api, extraOptions);

  if (resultQuery?.error?.status === 403) {
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      const { accessToken } = refreshResult.data;

      api.dispatch(login({ accessToken, ...jwt_decode(accessToken) }));
      resultQuery = await baseQuery(args, api, extraOptions);
    } else {
      console.log("logout");
      api.dispatch(logout());
    }
  }

  return resultQuery;
};

export const apiMiddleware = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
