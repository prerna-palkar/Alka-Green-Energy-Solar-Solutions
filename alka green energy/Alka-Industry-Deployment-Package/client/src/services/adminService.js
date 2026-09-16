import apiClient from './api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('alka_solar_token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const getAdminStats = async () => {
  const response = await apiClient.get('/admin/stats', getAuthHeaders());
  return response.data;
};

export const getAdminCustomers = async (page = 1, limit = 10, search = '', customerType = '') => {
  const response = await apiClient.get(`/admin/customers?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}&customer_type=${customerType}`, getAuthHeaders());
  return response.data;
};

export const getAdminCustomerDetail = async (customerId) => {
  const response = await apiClient.get(`/admin/customers/${customerId}`, getAuthHeaders());
  return response.data;
};

export const createAdminCustomer = async (data) => {
  const response = await apiClient.post('/admin/customers', data, getAuthHeaders());
  return response.data;
};

export const updateAdminCustomer = async (customerId, data) => {
  const response = await apiClient.put(`/admin/customers/${customerId}`, data, getAuthHeaders());
  return response.data;
};

export const deleteAdminCustomer = async (customerId) => {
  const response = await apiClient.delete(`/admin/customers/${customerId}`, getAuthHeaders());
  return response.data;
};

export const getAdminProjects = async (page = 1, limit = 10, search = '', type = '', status = '', paymentStatus = '') => {
  const response = await apiClient.get(`/admin/projects?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}&project_type=${type}&status=${status}&payment_status=${paymentStatus}`, getAuthHeaders());
  return response.data;
};

export const getAdminProjectDetail = async (projectId) => {
  const response = await apiClient.get(`/projects/${projectId}`, getAuthHeaders());
  return response.data;
};

export const createAdminProject = async (data) => {
  const response = await apiClient.post('/admin/projects', data, getAuthHeaders());
  return response.data;
};

export const updateAdminProject = async (projectId, data) => {
  const response = await apiClient.put(`/admin/projects/${projectId}`, data, getAuthHeaders());
  return response.data;
};

export const getAdminPayments = async () => {
  const response = await apiClient.get('/admin/payments', getAuthHeaders());
  return response.data;
};

export const recordAdminPayment = async (data) => {
  const response = await apiClient.post('/admin/payments', data, getAuthHeaders());
  return response.data;
};

export const getAdminEnquiries = async (status = '') => {
  const response = await apiClient.get(`/admin/enquiries?status=${status}`, getAuthHeaders());
  return response.data;
};

export const updateAdminEnquiryStatus = async (enquiryId, status) => {
  const response = await apiClient.put(`/admin/enquiries/${enquiryId}`, { status }, getAuthHeaders());
  return response.data;
};

export const getAdminGallery = async () => {
  const response = await apiClient.get('/admin/gallery', getAuthHeaders());
  return response.data;
};

export const createAdminGalleryItem = async (data) => {
  const response = await apiClient.post('/admin/gallery', data, getAuthHeaders());
  return response.data;
};

export const deleteAdminGalleryItem = async (id) => {
  const response = await apiClient.delete(`/admin/gallery/${id}`, getAuthHeaders());
  return response.data;
};
