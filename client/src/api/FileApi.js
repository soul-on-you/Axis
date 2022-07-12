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
      query: (body) => ({
        url: "/detail/upload",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useFetchDetailQuery, useUploadDetailMutation } = fileAPI;
