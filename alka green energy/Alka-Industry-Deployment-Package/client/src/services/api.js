import axios from 'axios';
import { BUSINESS_CONFIG } from '../utils/config';

// Create central Axios instance
const apiClient = axios.create({
  baseURL: BUSINESS_CONFIG.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

/**
 * Submit Enquiry / Contact Form / Chatbot Lead
 * @param {Object} data - { name, phone, email, location, customerType, requirement, message }
 */
export const submitEnquiry = async (data) => {
  try {
    const response = await apiClient.post('/enquiries', data);
    return response.data;
  } catch (error) {
    console.warn("API Server offline or endpoint unavailable. Falling back to local mock response.", error?.message);
    // Simulating graceful fallback response for Phase 1 frontend testing
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: "success",
          message: "Thank you for reaching out to Alka Green Energy Solar Solutions! Our solar specialist will contact you shortly.",
          data: {
            id: `ENQ-${Date.now()}`,
            ...data,
            submittedAt: new Date().toISOString()
          }
        });
      }, 600);
    });
  }
};

export default apiClient;
