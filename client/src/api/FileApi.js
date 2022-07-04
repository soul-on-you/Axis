// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { login, logout } from "../store/slices/AuthSlice";

// const baseQuery = fetchBaseQuery({
//   baseUrl: "http://localhost:5000/api/auth",
//   credentials: "include",
//   prepareHeaders: (headers, { getState }) => {
//     const token = getState().auth.accessToken;

//     if (token) {
//       headers.set("Authorization", `Bearer ${token}`);
//     }

//     return headers;
//   },
// });

// const baseQuery = fetchBaseQuery({
//       baseUrl: "http://localhost:5000/api/details",
//       credentials: "include",
//       prepareHeaders: (headers, { getState }) => {
//         const token = getState().auth.accessToken;

//         if (token) {
//           headers.set("Authorization", `Bearer ${token}`);
//         }

//         return headers;
//       },
//     });

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//   let resultQuery = await baseQuery(args, api, extraOptions);

//   if (resultQuery?.error?.originalStatus === 403) {
//     const refreshResult = await baseQuery("/refresh", api, extraOptions);
//     if (refreshResult?.data) {
//       const user = api.getState().auth.user;
//       api.dispatch(login({ ...refreshResult, user }));
//       resultQuery = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(logout());
//     }
//   }

//   return resultQuery;
// };

// export const authAPI = createApi({
//   reducerPath: "auth_api",
//   baseQuery: baseQueryWithReauth,
//   endpoints: (builder) => ({
//     login: builder.mutation({
//       query: (credentials) => ({
//         url: "/login",
//         method: "POST",
//         body: { ...credentials },
//       }),
//     }),
//   }),
// });

// export const { useLoginMutation } = authAPI;

///////////////////////////////////////////////

import { apiMiddleware } from "./ApiMiddleware";

export const fileAPI = apiMiddleware.injectEndpoints({
  endpoints: (builder) => ({
    fetchDetail: builder.query({
      query: (detailID) => ({
        url: "/detail",
        method: "GET",
        body: { ...detailID },
      }),
    }),
    uploadDetail: builder.mutation({
      query: ({ studentId, groupId, file }) => ({
        url: "/detail",
        method: "POST",
        body: { studentId, groupId, file },
      }),
    }),
  }),
});

export const { useFetchDetailQuery, useUploadDetailMutation } = fileAPI;
