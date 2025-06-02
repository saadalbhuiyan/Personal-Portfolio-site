import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Admin Auth
export const loginAdmin = (email, password) => {
    return axios.post(`${API_URL}/admin/login`, { email, password });
};

export const updatePassword = (newPassword) => {
    return axios.put(
        `${API_URL}/admin/password`,
        { password: newPassword },
        { headers: getAuthHeaders() }
    );
};

// Projects APIs
export const getProjects = () => axios.get(`${API_URL}/projects`);

export const getProjectById = (id) => axios.get(`${API_URL}/projects/${id}`);

export const addProject = (formData) =>
    axios.post(`${API_URL}/projects`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            ...getAuthHeaders(),
        },
    });

export const updateProject = (id, formData) =>
    axios.put(`${API_URL}/projects/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            ...getAuthHeaders(),
        },
    });

export const deleteProject = (id) =>
    axios.delete(`${API_URL}/projects/${id}`, {
        headers: getAuthHeaders(),
    });

// Blogs APIs
export const getBlogs = () => axios.get(`${API_URL}/blogs`);

export const getBlogById = (id) => axios.get(`${API_URL}/blogs/${id}`);

export const addBlog = (formData) =>
    axios.post(`${API_URL}/blogs`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            ...getAuthHeaders(),
        },
    });

export const updateBlog = (id, formData) =>
    axios.put(`${API_URL}/blogs/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            ...getAuthHeaders(),
        },
    });

export const deleteBlog = (id) =>
    axios.delete(`${API_URL}/blogs/${id}`, {
        headers: getAuthHeaders(),
    });

// Services APIs
export const getServices = () => axios.get(`${API_URL}/services`);

export const getServiceById = (id) => axios.get(`${API_URL}/services/${id}`);

export const addService = (formData) =>
    axios.post(`${API_URL}/services`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            ...getAuthHeaders(),
        },
    });

export const updateService = (id, formData) =>
    axios.put(`${API_URL}/services/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            ...getAuthHeaders(),
        },
    });

export const deleteService = (id) =>
    axios.delete(`${API_URL}/services/${id}`, {
        headers: getAuthHeaders(),
    });

// Testimonials APIs
export const getTestimonials = () => axios.get(`${API_URL}/testimonials`);

export const getTestimonialById = (id) =>
    axios.get(`${API_URL}/testimonials/${id}`);

export const addTestimonial = (formData) =>
    axios.post(`${API_URL}/testimonials`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            ...getAuthHeaders(),
        },
    });

export const updateTestimonial = (id, formData) =>
    axios.put(`${API_URL}/testimonials/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            ...getAuthHeaders(),
        },
    });

export const deleteTestimonial = (id) =>
    axios.delete(`${API_URL}/testimonials/${id}`, {
        headers: getAuthHeaders(),
    });

// Contacts APIs
export const submitContact = (data) => axios.post(`${API_URL}/contacts`, data);

export const getContacts = () =>
    axios.get(`${API_URL}/contacts`, {
        headers: getAuthHeaders(),
    });

export const deleteContact = (id) =>
    axios.delete(`${API_URL}/contacts/${id}`, {
        headers: getAuthHeaders(),
    });
