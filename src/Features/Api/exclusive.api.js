// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const exclusiveApi = createApi({
    reducerPath: "exclusiveApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_DOMAIN_NAME }),
    tagTypes: ["banner", "category"],
    endpoints: (builder) => ({
        getPokemonByName: builder.query({
            query: (name) => `pokemon/${name}`,
        }),
        UploadBanner: builder.mutation({
            query: (data) => ({
                url: `banner`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["banner"],
        }),
        GetBanner: builder.query({
            query: () => "banner",
            providesTags: ["banner"],
        }),
        UpdateBanner: builder.mutation({
            query: ({ data, id }) => ({
                url: `banner/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["banner"],
        }),
        UploadCategory: builder.mutation({
            query: (data) => ({
                url: `category`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["category"],
        }),
        GetCategory: builder.query({
            query: () => "category",
            providesTags: ["category"],
        }),
        UpdateCategory: builder.mutation({
            query: (data) => ({
                url: `category/${data.id}`,
                method: "put",
                body: {
                    name: data.name,
                    description: data.description,
                },
            }),
            invalidatesTags: ["category"],
        }),
    }),
});

//===== Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useUploadBannerMutation,
    useGetBannerQuery,
    useUpdateBannerMutation,
    useUploadCategoryMutation,
    useGetCategoryQuery,
    useUpdateCategoryMutation,
} = exclusiveApi;
