import { apiSlice } from "./apiSlice";



const PATIENTS_URL = "/api/patients";


export interface Patient {
    _id?: string;
    id?: string;

    FirstName?: string;
    LastName?: string;
    Email?: string;
    Phone?: string;
    Gender?: string;
    DateOfBirth?: string;
    BloodGroup?: string;
    Address?: string;
    EmergencyContact?: string;
    IsActive?: boolean;
    CreatedAt?: string;
    UpdatedAt?: string;

    [key: string]: any;
}

export interface CreatePatientRequest {
    FirstName: string;
    LastName: string;
    Email: string;
    Phone: string;
    Gender: string;
    DateOfBirth: string;
    BloodGroup: string;
    Address: string;
    EmergencyContact: string;
    IsActive?: boolean;
}

export interface UpdatePatientRequest {
    id: string;

    FirstName?: string;
    LastName?: string;
    Email?: string;
    Phone?: string;
    Gender?: string;
    DateOfBirth?: string;
    BloodGroup?: string;
    Address?: string;
    EmergencyContact?: string;
    IsActive?: boolean;
}



export const patientApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // Create patient
        createPatient: builder.mutation<
            Patient,
            CreatePatientRequest
        >({
            query: (data) => ({
                url: `${PATIENTS_URL}/createpatient`,
                method: "POST",
                body: data,
            }),
        }),

        // Get all patients
        getAllPatients: builder.query<Patient[], void>({
            query: () => ({
                url: `${PATIENTS_URL}/listpatients`,
                method: "GET",
            }),
        }),

        // Get patient by ID
        getPatientById: builder.query<Patient, string>({
            query: (id) => ({
                url: `${PATIENTS_URL}/viewpatient/${id}`,
                method: "GET",
            }),
        }),

        // Update patient
        updatePatient: builder.mutation<
            Patient,
            UpdatePatientRequest
        >({
            query: ({ id, ...data }) => ({
                url: `${PATIENTS_URL}/updatepatient/${id}`,
                method: "PUT",
                body: data,
            }),
        }),

        // Delete patient
        deletePatient: builder.mutation<
            any,
            string
        >({
            query: (id) => ({
                url: `${PATIENTS_URL}/deletepatient/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});



const {
    useCreatePatientMutation,
    useGetAllPatientsQuery,
    useGetPatientByIdQuery,
    useUpdatePatientMutation,
    useDeletePatientMutation,
} = patientApi;

export {
    useCreatePatientMutation,
    useGetAllPatientsQuery,
    useGetPatientByIdQuery,
    useUpdatePatientMutation,
    useDeletePatientMutation,
};