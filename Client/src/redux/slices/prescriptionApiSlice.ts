import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Prescription {
    _id?: string;
    id?: string;

    [key: string]: any;
}

export interface PrescriptionRequest {
    [key: string]: any;
}

export interface UpdatePrescriptionRequest {
    id: string;

    [key: string]: any;
}

export const prescriptionApiSlice = createApi({
    reducerPath: "prescriptionApi",

    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api",

        prepareHeaders: (headers, { getState }) => {
            const state = getState() as any;

            const token =
                state?.auth?.token ||
                state?.auth?.accessToken;

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            headers.set("Content-Type", "application/json");

            return headers;
        },
    }),

    tagTypes: ["Prescription"],

    endpoints: (builder) => ({
        // CREATE PRESCRIPTION
        createPrescription: builder.mutation<
            Prescription,
            PrescriptionRequest
        >({
            query: (prescription) => ({
                url: "/prescriptions/createprescriptions",
                method: "POST",
                body: prescription,
            }),

            invalidatesTags: ["Prescription"],
        }),

        // GET ALL PRESCRIPTIONS
        getAllPrescriptions: builder.query<
            Prescription[],
            void
        >({
            query: () => ({
                url: "/prescriptions/listprescriptions",
                method: "GET",
            }),

            providesTags: ["Prescription"],
        }),

        // GET PRESCRIPTION BY ID
        getPrescriptionById: builder.query<
            Prescription,
            string
        >({
            query: (id) => ({
                url: `/prescriptions/viewprescriptions/${id}`,
                method: "GET",
            }),

            providesTags: (_result, _error, id) => [
                {
                    type: "Prescription",
                    id,
                },
            ],
        }),

        // GET PRESCRIPTIONS BY CONSULTATION
        getPrescriptionsByConsultation: builder.query<
            Prescription[],
            string
        >({
            query: (consultationId) => ({
                url: `/prescriptions/consultationprescriptions/${consultationId}`,
                method: "GET",
            }),

            providesTags: ["Prescription"],
        }),

        // GET PRESCRIPTIONS BY PATIENT
        getPrescriptionsByPatient: builder.query<
            Prescription[],
            string
        >({
            query: (patientId) => ({
                url: `/prescriptions/patientprescriptions/${patientId}`,
                method: "GET",
            }),

            providesTags: ["Prescription"],
        }),

        // GET PRESCRIPTIONS BY DOCTOR
        getPrescriptionsByDoctor: builder.query<
            Prescription[],
            string
        >({
            query: (doctorId) => ({
                url: `/prescriptions/doctorprescriptions/${doctorId}`,
                method: "GET",
            }),

            providesTags: ["Prescription"],
        }),

        // GET PRESCRIPTIONS BY CLINIC
        getPrescriptionsByClinic: builder.query<
            Prescription[],
            string
        >({
            query: (clinicId) => ({
                url: `/prescriptions/clinicprescriptions/${clinicId}`,
                method: "GET",
            }),

            providesTags: ["Prescription"],
        }),

        // UPDATE PRESCRIPTION
        updatePrescription: builder.mutation<
            Prescription,
            UpdatePrescriptionRequest
        >({
            query: ({ id, ...prescription }) => ({
                url: `/prescriptions/updateprescriptions/${id}`,
                method: "PUT",
                body: prescription,
            }),

            invalidatesTags: (_result, _error, { id }) => [
                "Prescription",
                {
                    type: "Prescription",
                    id,
                },
            ],
        }),

        // DELETE PRESCRIPTION
        deletePrescription: builder.mutation<
            any,
            string
        >({
            query: (id) => ({
                url: `/prescriptions/deleteprescriptions/${id}`,
                method: "DELETE",
            }),

            invalidatesTags: ["Prescription"],
        }),
    }),
});

export const {
    useCreatePrescriptionMutation,
    useGetAllPrescriptionsQuery,
    useGetPrescriptionByIdQuery,
    useGetPrescriptionsByConsultationQuery,
    useGetPrescriptionsByPatientQuery,
    useGetPrescriptionsByDoctorQuery,
    useGetPrescriptionsByClinicQuery,
    useUpdatePrescriptionMutation,
    useDeletePrescriptionMutation,
} = prescriptionApiSlice;
