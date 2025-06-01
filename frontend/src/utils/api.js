import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Auth API
export const loginAdmin = async (email, password) => {
    return axios.post(`${API_URL}/admin/login`, { email, password });
};

export const updatePassword = async (newPassword) => {
    return axios.put(`${API_URL}/admin/password`, { newPassword });
};

// Projects API
export const getProjects = async () => {
    return axios.get(`${API_URL}/projects`);
};

export const getProjectById = async (id) => {
    return axios.get(`${API_URL}/projects/${id}`);
};

export const addProject = async (data) => {
    return axios.post(`${API_URL}/projects`, data);
};

export const updateProject = async (id, data) => {
    return axios.put(`${API_URL}/projects/${id}`, data);
};

export const deleteProject = async (id) => {
    return axios.delete(`${API_URL}/projects/${id}`);
};

// Blogs API
export const getBlogs = async () => {
    return axios.get(`${API_URL}/blogs`);
};

export const getBlogById = async (id) => {
    return axios.get(`${API_URL}/blogs/${id}`);
};

export const addBlog = async (data) => {
    return axios.post(`${API_URL}/blogs`, data);
};

export const updateBlog = async (id, data) => {
    return axios.put(`${API_URL}/blogs/${id}`, data);
};

export const deleteBlog = async (id) => {
    return axios.delete(`${API_URL}/blogs/${id}`);
};

// Services API
export const getServices = async () => {
    return axios.get(`${API_URL}/services`);
};

export const getServiceById = async (id) => {
    return axios.get(`${API_URL}/services/${id}`);
};

export const addService = async (data) => {
    return axios.post(`${API_URL}/services`, data);
};

export const updateService = async (id, data) => {
    return axios.put(`${API_URL}/services/${id}`, data);
};

export const deleteService = async (id) => {
    return axios.delete(`${API_URL}/services/${id}`);
};

// Testimonials API
export const getTestimonials = async () => {
    return axios.get(`${API_URL}/testimonials`);
};

export const getTestimonialById = async (id) => {
    return axios.get(`${API_URL}/testimonials/${id}`);
};

export const addTestimonial = async (data) => {
    return axios.post(`${API_URL}/testimonials`, data);
};

export const updateTestimonial = async (id, data) => {
    return axios.put(`${API_URL}/testimonials/${id}`, data);
};

export const deleteTestimonial = async (id) => {
    return axios.delete(`${API_URL}/testimonials/${id}`);
};

// Contacts API
export const submitContact = async (data) => {
    return axios.post(`${API_URL}/contacts`, data);
};

export const getContacts = async () => {
    return axios.get(`${API_URL}/contacts`);
};

// Image Upload API
export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return axios.post(`${API_URL}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};