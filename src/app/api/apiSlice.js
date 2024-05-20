import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "https://apartment-market-api.onrender.com",
    }),
    tagTypes: ["Apartment"],
    endpoints: (builder) => ({}),
});
