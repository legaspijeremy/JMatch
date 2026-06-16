import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000'; // FastAPI URL

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jmatch_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 — redirect to login if token is expired
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('jmatch_token');
      localStorage.removeItem('jmatch_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  me: () => api.get('/auth/me'),
};

// Resume endpoints (ready for when backend is built)
export const resumeAPI = {
  upload: (formData) =>
    api.post('/resume/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  getAnalysis: (id) => api.get(`/resume/${id}/analysis`),
  getLatest: () => api.get('/resume/latest'),
};

// Job match endpoints
export const jobAPI = {
  match: (data) => api.post('/jobs/match', data),
  getSaved: () => api.get('/jobs/saved'),
};

// Application tracker endpoints
export const applicationAPI = {
  getAll: () => api.get('/applications'),
  create: (data) => api.post('/applications', data),
  update: (id, data) => api.put(`/applications/${id}`, data),
  delete: (id) => api.delete(`/applications/${id}`),
};

export default api;