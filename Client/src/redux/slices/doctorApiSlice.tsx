
import { apiSlice } from "./apiSlice";

const DOCTORS_URL = "/api/doctor/doctors";

export interface Doctor {
    id: string;
    owner_user_id: string;
    name: string;
    email: string;
    phone: string;
    specialization: string;
    qualification: string;
    experience: number;
    consultation_fee: number;
    is_active: boolean;
    created_at?: string;
    updated_at?: string;
}

interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data: T;
}

export interface CreateDoctorRequest {
    name: string;
    email: string;
    phone: string;
    specialization: string;
    qualification: string;
    experience: number;
    consultation_fee: number;
}

export interface UpdateDoctorRequest {
    id: string;
    owner_user_id?: string;
    name?: string;
    phone?: string;
    specialization?: string;
    qualification?: string;
    experience?: number;
    consultation_fee?: number;
    is_active?: boolean;
}

export const doctorApi = apiSlice
    .enhanceEndpoints({
        addTagTypes: ["Doctor"],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            createDoctor: builder.mutation<Doctor, CreateDoctorRequest>({
                query: (data) => ({
                    url: `${DOCTORS_URL}/createdoctor`,
                    method: "POST",
                    body: data,
                }),
                transformResponse: (response: ApiResponse<Doctor>) =>
                    response.data,
                invalidatesTags: ["Doctor"],
            }),

            getAllDoctors: builder.query<Doctor[], void>({
                query: () => ({
                    url: `${DOCTORS_URL}/listdoctors`,
                    method: "GET",
                }),
                transformResponse: (response: ApiResponse<Doctor[]>) =>
                    response.data,
                providesTags: ["Doctor"],
            }),

            getDoctorById: builder.query<Doctor, string>({
                query: (id) => ({
                    url: `${DOCTORS_URL}/viewdoctor/${id}`,
                    method: "GET",
                }),
                transformResponse: (response: ApiResponse<Doctor>) =>
                    response.data,
                providesTags: ["Doctor"],
            }),

            updateDoctor: builder.mutation<Doctor, UpdateDoctorRequest>({
                query: ({ id, ...data }) => ({
                    url: `${DOCTORS_URL}/updatedoctor/${id}`,
                    method: "PUT",
                    body: data,
                }),
                transformResponse: (response: ApiResponse<Doctor>) =>
                    response.data,
                invalidatesTags: ["Doctor"],
            }),

            deleteDoctor: builder.mutation<{ message: string }, string>({
                query: (id) => ({
                    url: `${DOCTORS_URL}/deletedoctor/${id}`,
                    method: "DELETE",
                }),
                transformResponse: (
                    response: ApiResponse<unknown>
                ) => ({
                    message: response.message || "Doctor deleted successfully",
                }),
                invalidatesTags: ["Doctor"],
            }),
        }),
    });

export const {
    useCreateDoctorMutation,
    useGetAllDoctorsQuery,
    useGetDoctorByIdQuery,
    useUpdateDoctorMutation,
    useDeleteDoctorMutation,
} = doctorApi;
