import { apiSlice } from "./apiSlice";

const DOCTORS_URL = "/api/doctor";



export interface Doctor {
    _id?: string;
    id?: string;

    FirstName?: string;
    LastName?: string;
    Email?: string;
    Phone?: string;
    Gender?: string;
    DateOfBirth?: string;
    Specialization?: string;
    Qualification?: string;
    Experience?: number;
    LicenseNumber?: string;
    Address?: string;
    IsActive?: boolean;
    CreatedAt?: string;
    UpdatedAt?: string;

    [key: string]: any;
}

export interface CreateDoctorRequest {
    FirstName: string;
    LastName: string;
    Email: string;
    Phone: string;
    Gender: string;
    DateOfBirth: string;
    Specialization: string;
    Qualification: string;
    Experience: number;
    LicenseNumber: string;
    Address: string;
    IsActive?: boolean;
}

export interface UpdateDoctorRequest {
    id: string;

    FirstName?: string;
    LastName?: string;
    Email?: string;
    Phone?: string;
    Gender?: string;
    DateOfBirth?: string;
    Specialization?: string;
    Qualification?: string;
    Experience?: number;
    LicenseNumber?: string;
    Address?: string;
    IsActive?: boolean;
}


export const doctorApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // Create doctor
        createDoctor: builder.mutation<
            Doctor,
            CreateDoctorRequest
        >({
            query: (data) => ({
                url: `${DOCTORS_URL}/createdoctor`,
                method: "POST",
                body: data,
            }),
        }),

        // Get all doctors
        getAllDoctors: builder.query<Doctor[], void>({
            query: () => ({
                url: `${DOCTORS_URL}/listdoctors`,
                method: "GET",
            }),
        }),

        // Get doctor by ID
        getDoctorById: builder.query<Doctor, string>({
            query: (id) => ({
                url: `${DOCTORS_URL}/viewdoctor/${id}`,
                method: "GET",
            }),
        }),

        // Update doctor
        updateDoctor: builder.mutation<
            Doctor,
            UpdateDoctorRequest
        >({
            query: ({ id, ...data }) => ({
                url: `${DOCTORS_URL}/updatedoctor/${id}`,
                method: "PUT",
                body: data,
            }),
        }),

        // Delete doctor
        deleteDoctor: builder.mutation<
            any,
            string
        >({
            query: (id) => ({
                url: `${DOCTORS_URL}/deletedoctor/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});



const {
    useCreateDoctorMutation,
    useGetAllDoctorsQuery,
    useGetDoctorByIdQuery,
    useUpdateDoctorMutation,
    useDeleteDoctorMutation,
} = doctorApi;

export {
    useCreateDoctorMutation,
    useGetAllDoctorsQuery,
    useGetDoctorByIdQuery,
    useUpdateDoctorMutation,
    useDeleteDoctorMutation,
};