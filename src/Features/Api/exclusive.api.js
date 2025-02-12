// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const exclusiveApi = createApi({
    reducerPath: "exclusiveApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_DOMAIN_NAME }),
    tagTypes: ["banner"],
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
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useUploadBannerMutation, useGetBannerQuery } = exclusiveApi;
