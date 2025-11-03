import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_ADMIN_API_BASE,
  timeout: 20000
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('ADMIN_TOKEN');
  if (token) config.headers['Admin-Token'] = token;
  return config;
});

http.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem('ADMIN_TOKEN');
      if (location.pathname !== '/login') location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default http;
