import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to attach the token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Products API
export const getProducts = async (category = '') => {
    try {
        const url = category ? `/api/products?category=${category}` : `/api/products`;
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return { success: false, data: [] };
    }
};

export const getProductById = async (id) => {
    try {
        const response = await api.get(`/api/products/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product:', error);
        return { success: false };
    }
};

// R&D API
export const submitInquiry = async (inquiryData) => {
    try {
        const response = await api.post(`/api/rnd/inquiry`, inquiryData);
        return response.data;
    } catch (error) {
        console.error('Error submitting inquiry:', error);
        return { success: false, error: error.message };
    }
};

// Bookings API
export const createBooking = async (bookingData) => {
    try {
        const response = await api.post(`/api/bookings`, bookingData);
        return response.data;
    } catch (error) {
        console.error('Error creating booking:', error);
        return { success: false, error: error.message };
    }
};

// Courses API
export const getCourses = async () => {
    try {
        const response = await api.get(`/api/courses`);
        return response.data;
    } catch (error) {
        console.error('Error fetching courses:', error);
        return { success: false, data: [] };
    }
};

export const enrollCourse = async (courseId) => {
    try {
        const response = await api.post(`/api/courses/${courseId}/enroll`);
        return response.data;
    } catch (error) {
        console.error('Error enrolling in course:', error);
        return { success: false, error: error.message };
    }
};

export default api;
