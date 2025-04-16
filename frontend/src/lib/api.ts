'use client';

import axios from 'axios';

// Update this URL to match your backend API URL
const API_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the JWT token in requests
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      console.log('Raw API response from login:', response);

      // Check if the response is HTML instead of JSON
      if (typeof response.data === 'string' && response.data.includes('<!DOCTYPE html>')) {
        console.error('Received HTML instead of JSON. API endpoint might not exist or is not configured correctly.');
        throw new Error('API endpoint not available');
      }

      return response.data;
    } catch (error) {
      console.error('Error in login:', error);
      throw error;
    }
  },
  register: async (name: string, email: string, password: string) => {
    try {
      const response = await api.post('/auth/register', { name, email, password });
      console.log('Raw API response from register:', response);

      // Check if the response is HTML instead of JSON
      if (typeof response.data === 'string' && response.data.includes('<!DOCTYPE html>')) {
        console.error('Received HTML instead of JSON. API endpoint might not exist or is not configured correctly.');
        throw new Error('API endpoint not available');
      }

      return response.data;
    } catch (error) {
      console.error('Error in register:', error);
      throw error;
    }
  },
  getProfile: async () => {
    try {
      const response = await api.get('/users/profile');
      console.log('Raw API response from getProfile:', response);

      // Check if the response is HTML instead of JSON
      if (typeof response.data === 'string' && response.data.includes('<!DOCTYPE html>')) {
        console.error('Received HTML instead of JSON. API endpoint might not exist or is not configured correctly.');
        throw new Error('API endpoint not available');
      }

      return response.data;
    } catch (error) {
      console.error('Error in getProfile:', error);
      throw error;
    }
  },
};

// Books API
export const booksApi = {
  getAll: async () => {
    try {
      const response = await api.get('/books');
      console.log('Raw API response from getAll:', response);

      // Check if the response is HTML instead of JSON
      if (typeof response.data === 'string' && response.data.includes('<!DOCTYPE html>')) {
        console.error('Received HTML instead of JSON. API endpoint might not exist or is not configured correctly.');
        return [];
      }

      return response.data;
    } catch (error) {
      console.error('Error in getAll:', error);
      return [];
    }
  },
  getAllWithRatings: async () => {
    try {
      const response = await api.get('/books/with-ratings');
      console.log('Raw API response from getAllWithRatings:', response);

      // Check if the response is HTML instead of JSON
      if (typeof response.data === 'string' && response.data.includes('<!DOCTYPE html>')) {
        console.error('Received HTML instead of JSON. API endpoint might not exist or is not configured correctly.');
        return [];
      }

      return response.data;
    } catch (error) {
      console.error('Error in getAllWithRatings:', error);
      return [];
    }
  },
  getById: async (id: string) => {
    try {
      const response = await api.get(`/books/${id}`);
      console.log('Raw API response from getById:', response);

      // Check if the response is HTML instead of JSON
      if (typeof response.data === 'string' && response.data.includes('<!DOCTYPE html>')) {
        console.error('Received HTML instead of JSON. API endpoint might not exist or is not configured correctly.');
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error in getById(${id}):`, error);
      return null;
    }
  },
  create: async (bookData: { title: string; author: string; cover: string; genre: string }) => {
    try {
      const response = await api.post('/books', bookData);
      console.log('Raw API response from create:', response);
      return response.data;
    } catch (error) {
      console.error('Error in create:', error);
      throw error;
    }
  },
  update: async (id: string, bookData: Partial<{ title: string; author: string; cover: string; genre: string }>) => {
    try {
      const response = await api.patch(`/books/${id}`, bookData);
      console.log('Raw API response from update:', response);
      return response.data;
    } catch (error) {
      console.error(`Error in update(${id}):`, error);
      throw error;
    }
  },
  delete: async (id: string) => {
    try {
      const response = await api.delete(`/books/${id}`);
      console.log('Raw API response from delete:', response);
      return response.data;
    } catch (error) {
      console.error(`Error in delete(${id}):`, error);
      throw error;
    }
  },
};

// Reviews API
export const reviewsApi = {
  getAll: async () => {
    try {
      const response = await api.get('/reviews');
      console.log('Raw API response from reviews getAll:', response);

      // Check if the response is HTML instead of JSON
      if (typeof response.data === 'string' && response.data.includes('<!DOCTYPE html>')) {
        console.error('Received HTML instead of JSON. API endpoint might not exist or is not configured correctly.');
        return [];
      }

      return response.data;
    } catch (error) {
      console.error('Error in reviews getAll:', error);
      return [];
    }
  },
  getMyReviews: async () => {
    try {
      const response = await api.get('/reviews/my-reviews');
      console.log('Raw API response from getMyReviews:', response);

      // Check if the response is HTML instead of JSON
      if (typeof response.data === 'string' && response.data.includes('<!DOCTYPE html>')) {
        console.error('Received HTML instead of JSON. API endpoint might not exist or is not configured correctly.');
        return [];
      }

      return response.data;
    } catch (error) {
      console.error('Error in getMyReviews:', error);
      return [];
    }
  },
  getById: async (id: string) => {
    try {
      const response = await api.get(`/reviews/${id}`);
      console.log('Raw API response from reviews getById:', response);
      return response.data;
    } catch (error) {
      console.error(`Error in reviews getById(${id}):`, error);
      throw error;
    }
  },
  create: async (reviewData: { bookId: string; rating: number; content: string }) => {
    try {
      const response = await api.post('/reviews', reviewData);
      console.log('Raw API response from reviews create:', response);
      return response.data;
    } catch (error) {
      console.error('Error in reviews create:', error);
      throw error;
    }
  },
  update: async (id: string, reviewData: Partial<{ rating: number; content: string }>) => {
    try {
      const response = await api.patch(`/reviews/${id}`, reviewData);
      console.log('Raw API response from reviews update:', response);
      return response.data;
    } catch (error) {
      console.error(`Error in reviews update(${id}):`, error);
      throw error;
    }
  },
  delete: async (id: string) => {
    try {
      const response = await api.delete(`/reviews/${id}`);
      console.log('Raw API response from reviews delete:', response);
      return response.data;
    } catch (error) {
      console.error(`Error in reviews delete(${id}):`, error);
      throw error;
    }
  },
};

export default api;
