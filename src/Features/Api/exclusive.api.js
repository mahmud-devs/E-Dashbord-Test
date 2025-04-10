// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const exclusiveApi = createApi({
    reducerPath: "exclusiveApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_DOMAIN_NAME }),
    tagTypes: [
        "banner",
        "category",
        "subcategory",
        "product",
        "bestSelling",
        "order",
    ],
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
        DeleteBanner: builder.mutation({
            query: (id) => ({
                url: `banner/${id}`,
                method: "DELETE",
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
        GetSingleCategory: builder.query({
            query: (id) => `category/${id}`,
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
        DeleteCategory: builder.mutation({
            query: (id) => ({
                url: `category/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["category"],
        }),
        UploadSubcatgory: builder.mutation({
            query: (data) => ({
                url: `subcategory`,
                method: "post",
                body: data,
            }),
            invalidatesTags: ["subcategory"],
        }),
        GetallSubCategory: builder.query({
            query: () => `subcategory`,
            providesTags: ["subcategory"],
        }),
        UpdateSubCategory: builder.mutation({
            query: ({ data, id }) => ({
                url: `subcategory/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["subcategory"],
        }),
        GetAllProduct: builder.query({
            query: () => `product`,
            providesTags: ["product"],
        }),
        GetBestSelling: builder.query({
            query: () => `bestSelling`,
            providesTags: ["bestSelling"],
        }),
        DeleteBestSelling: builder.mutation({
            query: (id) => ({
                url: `bestSelling/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["bestSelling"],
        }),
        GetAllOrder: builder.query({
            query: () => `allOrder`,
            providesTags: ["order"],
        }),
        DeleteOrder: builder.mutation({
            query: (id) => ({
                url: `order/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["order"],
        }),
        GetSingleOrder: builder.query({
            query: (id) => `order/${id}`,
            providesTags: ["order"],
        }),
        UpdateOrderStatus: builder.mutation({
            query: ({ data, id }) => ({
                url: `order/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["order"],
        }),
    }),
});

//======== Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useUploadBannerMutation,
    useGetBannerQuery,
    useUpdateBannerMutation,
    useUploadCategoryMutation,
    useGetCategoryQuery,
    useUpdateCategoryMutation,
    useDeleteBannerMutation,
    useDeleteCategoryMutation,
    useUploadSubcatgoryMutation,
    useGetallSubCategoryQuery,
    useUpdateSubCategoryMutation,
    useGetSingleCategoryQuery,
    useGetAllProductQuery,
    useGetBestSellingQuery,
    useDeleteBestSellingMutation,
    useGetAllOrderQuery,
    useDeleteOrderMutation,
    useGetSingleOrderQuery,
    useUpdateOrderStatusMutation,
} = exclusiveApi;
