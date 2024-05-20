import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

import { apiSlice } from "../../app/api/apiSlice";

const apartmentsAdapter = createEntityAdapter({});

const initialState = apartmentsAdapter.getInitialState();

export const apartmentsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllApartments: builder.query({
            query: (url = "") => ({
                url: `/apartments?${url}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                },
            }),
            transformResponse: (responseData) => {
                const loadedApartments = responseData.map((apartment) => {
                    apartment.id = apartment._id;
                    return apartment;
                });
                return apartmentsAdapter.setAll(initialState, loadedApartments);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "Apartment", id: "LIST" },
                        ...result.ids.map((id) => ({ type: "Apartment", id })),
                    ];
                } else return [{ type: "Apartment", id: "LIST" }];
            },
        }),
        addNewApartment: builder.mutation({
            query: (initialApartmentData) => ({
                url: "/apartments",
                method: "POST",
                body: {
                    ...initialApartmentData,
                },
            }),
            invalidatesTags: [{ type: "Apartment", id: "LIST" }],
        }),
        updateApartment: builder.mutation({
            query: ({ id, ...initialApartmentData }) => ({
                url: `/apartments/${id}`,
                method: "PUT",
                body: {
                    ...initialApartmentData,
                },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Apartment", id: arg.id },
            ],
        }),
        deleteApartment: builder.mutation({
            query: ({ id }) => ({
                url: `/apartments/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Apartment", id: arg.id },
            ],
        }),
    }),
});

export const {
    useGetAllApartmentsQuery,
    useAddNewApartmentMutation,
    useUpdateApartmentMutation,
    useDeleteApartmentMutation,
    useGetApartmentByIdQuery,
} = apartmentsApiSlice;

export const selectApartmentsResult =
    apartmentsApiSlice.endpoints.getAllApartments.select();

const selectApartmentsData = createSelector(
    selectApartmentsResult,
    (apartmentsResult) => apartmentsResult.data
);

export const {
    selectAll: selectAllApartments,
    selectById: selectApartmentById,
    selectIds: selectApartmentIds,
} = apartmentsAdapter.getSelectors(
    (state) => selectApartmentsData(state) ?? initialState
);
