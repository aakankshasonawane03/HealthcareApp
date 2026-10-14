import { apiSlice } from "./apiSlice";


const MEDICAL_RECORDS_URL = "/api/medicalrecords";


export interface MedicalRecord {
    _id?: string;
    id?: string;

    [key: string]: any;
}

export interface CreateMedicalRecordRequest {
    [key: string]: any;
}

export interface UpdateMedicalRecordRequest {
    id: string;

    [key: string]: any;
}



export const medicalRecordApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // Create medical record
        createMedicalRecord: builder.mutation<
            MedicalRecord,
            CreateMedicalRecordRequest
        >({
            query: (data) => ({
                url: `${MEDICAL_RECORDS_URL}/createschedule`,
                method: "POST",
                body: data,
            }),
        }),

        // Get all medical records
        getAllMedicalRecords: builder.query<MedicalRecord[], void>({
            query: () => ({
                url: `${MEDICAL_RECORDS_URL}/listschedule`,
                method: "GET",
            }),
        }),

        // Get medical record by ID
        getMedicalRecordById: builder.query<MedicalRecord, string>({
            query: (id) => ({
                url: `${MEDICAL_RECORDS_URL}/view/${id}`,
                method: "GET",
            }),
        }),

        // Get medical records by patient ID
        getMedicalRecordsByPatientId: builder.query<MedicalRecord[], string>({
            query: (patientId) => ({
                url: `${MEDICAL_RECORDS_URL}/patient/${patientId}`,
                method: "GET",
            }),
        }),

        // Get medical records by doctor ID
        getMedicalRecordsByDoctorId: builder.query<MedicalRecord[], string>({
            query: (doctorId) => ({
                url: `${MEDICAL_RECORDS_URL}/doctor/${doctorId}`,
                method: "GET",
            }),
        }),

        // Get medical records by consultation ID
        getMedicalRecordsByConsultationId: builder.query<MedicalRecord[], string>({
            query: (consultationId) => ({
                url: `${MEDICAL_RECORDS_URL}/consultation/${consultationId}`,
                method: "GET",
            }),
        }),

        // Update medical record
        updateMedicalRecord: builder.mutation<
            MedicalRecord,
            UpdateMedicalRecordRequest
        >({
            query: ({ id, ...data }) => ({
                url: `${MEDICAL_RECORDS_URL}/update/${id}`,
                method: "PUT",
                body: data,
            }),
        }),

        // Delete medical record
        deleteMedicalRecord: builder.mutation<
            any,
            string
        >({
            query: (id) => ({
                url: `${MEDICAL_RECORDS_URL}/delete/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});


const {
    useCreateMedicalRecordMutation,
    useGetAllMedicalRecordsQuery,
    useGetMedicalRecordByIdQuery,
    useGetMedicalRecordsByPatientIdQuery,
    useGetMedicalRecordsByDoctorIdQuery,
    useGetMedicalRecordsByConsultationIdQuery,
    useUpdateMedicalRecordMutation,
    useDeleteMedicalRecordMutation,
} = medicalRecordApi;

export {
    useCreateMedicalRecordMutation,
    useGetAllMedicalRecordsQuery,
    useGetMedicalRecordByIdQuery,
    useGetMedicalRecordsByPatientIdQuery,
    useGetMedicalRecordsByDoctorIdQuery,
    // useGetMedicalRecordsByConsultationIdQuery,
    // useGetMedicalRecordByDoctorIdQuery,
    // useGetMedicalRecordsByConsultationIdQuery,
    useUpdateMedicalRecordMutation,
    useDeleteMedicalRecordMutation,
};