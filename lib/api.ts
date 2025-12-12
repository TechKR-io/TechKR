import axios from "axios";
import { Search } from "lucide-react";
import { register } from "module";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Auth API
export const authApi = {
  registerTalent: (data: any) => api.post("/auth/register/talent", data),
  registerClient: (data: any) => api.post("auth/register/client", data),
  login: (data: any) => api.post("/auth/login", data),
};

// Talent API
export const talentApi = {
  getProfile: (id: string) => api.get(`/talents/${id}`),
  updateProfile: (id: string, data: any) => api.put(`/talents/${id}`, data),
  getDashboard: (id: string) => api.get(`/talents/${id}/dashboard`),
  Search: (params: any) => api.get("/talents", { params }),
};

// Client API
export const clientApi = {
  getProfile: (id: string) => api.get(`/clients/${id}`),
  getDashboard: (id: string) => api.get(`/clients/${id}/dashboard`),
};

// Jobs API
export const jobsApi = {
  getAll: (params?: any) => api.get("/jobs", { params }),
  getById: (id: string) => api.get(`/jobs/${id}`),
  create: (data: any) => api.post("/jobs", data),
  apply: (jobId: string, data: any) => api.post(`/jobs/${jobId}/apply`, data),
  update: (id: string, data: any) => api.put(`/jobs/${id}`, data),
  delete: (id: string) => api.delete(`/jobs/${id}`),
};

// Contract API
export const contractApi = {
  create: (data: any) => api.post("/contracts", data),
};

export const paymentApi = {
  process: (data: any) => api.post("/payments", data),
  addTip: (data: any) => api.post("/payments/tip", data),
};

export default api;
