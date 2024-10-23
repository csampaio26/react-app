/**
 * axios setup
 */

import axios from 'axios';

const axiosServices = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REACT_APP_API,
  responseType: 'json'
});

// interceptor for http
axiosServices.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    if (error.response.status === 401) {
      window.location.href = '/login' ?? '';
    }
    Promise.reject((error.response && error.response.data) || 'Wrong Services');
  }
);

export default axiosServices;
