import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

// -------------------- Schedule Management --------------------
export const createScheduleAPI = (dto) => axiosInstance.post('/api/transportation/create-schedule', dto);
export const getSchedulesAPI = (requestId) => axiosInstance.get(`/api/transportation/schedules/${requestId}`);
export const updateScheduleAPI = (dto) => axiosInstance.put('/api/transportation/update-schedule', dto);

// -------------------- Pickup Management --------------------
export const createPickupAPI = (dto) => axiosInstance.post('/api/transportation/create-pickup', dto);
export const getPickupsAPI = (scheduleId) => axiosInstance.get(`/api/transportation/pickups/${scheduleId}`);

// -------------------- Pickup Items Management --------------------
export const createPickupItemAPI = (dto) => axiosInstance.post('/api/transportation/pickup-items', dto);
export const getPickupItemsAPI = (pickupId) => axiosInstance.get(`/api/transportation/pickup-items/${pickupId}`);
export const updatePickupStatusAPI = (dto) => axiosInstance.put('/api/transportation/update-pickup-status', dto);
