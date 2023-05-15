import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApiSlice = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_API_URL,
    mode: "cors",
    headers: {
      // "Content-Type": "application/json",
    },
  }),
  tagTypes: ["post"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "user/login",
        method: "POST",
        body: { email, password },
      }),
      transformResponse: (response, meta) => {
        const token = meta.response.headers.get("authorization");
        return { ...response, token };
      },
    }),
    registration: builder.mutation({
      query: ({ name, email, password }) => ({
        url: "user/register",
        method: "POST",
        body: { name, email, password },
      }),
      transformResponse: (response, meta) => {
        const token = meta.response.headers.get("authorization");
        return { ...response, token };
      },
    }),
    getPosts: builder.query({
      query: ({ limit = 20, page = 1 }) => ({
        url: "post",
        params: { limit, page },
      }),
      providesTags: ["post"],
    }),
    addPost: builder.mutation({
      query(body) {
        return {
          url: `/post/create`,
          method: "POST",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            // "content-type": "multipar/form-data",
          },
          body,
          formData: true,
        };
      },
      invalidatesTags: ["post"],
    }),
    editPost: builder.mutation({
      query({ title, content, postId }) {
        return {
          url: `/post/edit/${postId}`,
          method: "PUT",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: { title, content },
        };
      },
      invalidatesTags: ["post"],
    }),
    deletePost: builder.mutation({
      query({ authorId, postId }) {
        return {
          url: `/post/delete/${postId}`,
          method: "DELETE",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: { authorId },
        };
      },
      invalidatesTags: ["post"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegistrationMutation,
  useGetPostsQuery,
  useAddPostMutation,
  useEditPostMutation,
  useDeletePostMutation,
} = authApiSlice;
