
import axios from 'axios';
import { toast } from "sonner";

const API_BASE_URL = "https://bewtihme-001-site1.jtempurl.com/api/Account";

// Types
export interface SignUpFormData {
  picture: File | null;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  dateOfBirth: string;
  role: string;
}

export interface LoginFormData {
  usernameOrEmail: string;
  password: string;
  rememberMe: boolean;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  picture: string;
  gender: string;
  dateOfBirth: string;
  role: string;
  rating: number;
}

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add authorization header for authenticated requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  // Register new user
  async register(formData: SignUpFormData) {
    try {
      // Create FormData object
      const data = new FormData();
      if (formData.picture) {
        data.append('picture', formData.picture);
      }
      data.append('firstName', formData.firstName);
      data.append('lastName', formData.lastName);
      data.append('username', formData.username);
      data.append('email', formData.email);
      data.append('password', formData.password);
      data.append('confirmPassword', formData.confirmPassword);
      data.append('gender', formData.gender);
      data.append('dateOfBirth', formData.dateOfBirth);
      data.append('role', formData.role);

      const response = await api.post('/Register', data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || 'Registration failed';
        toast.error(message);
      }
      throw error;
    }
  },

  // Login user
  async login(loginData: LoginFormData) {
    try {
      const response = await api.post('/Login', loginData);
      
      // Save token and user data in localStorage
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || 'Login failed';
        toast.error(message);
      }
      throw error;
    }
  },

  // Logout user
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  // Get current user data
  getCurrentUser(): UserProfile | null {
    const userDataString = localStorage.getItem('user');
    if (!userDataString) return null;
    
    try {
      return JSON.parse(userDataString);
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      return null;
    }
  },

  // Update user profile
  async updateProfile(userData: Partial<UserProfile>) {
    try {
      const data = new FormData();
      
      // Append all user data that's being updated
      Object.entries(userData).forEach(([key, value]) => {
        if (key === 'picture' && value instanceof File) {
          data.append(key, value);
        } else if (value !== null && value !== undefined) {
          data.append(key, String(value));
        }
      });

      const response = await api.put('/UpdateProfile', data);
      
      // Update local storage with new user data
      const currentUser = this.getCurrentUser();
      if (currentUser) {
        const updatedUser = { ...currentUser, ...response.data };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || 'Profile update failed';
        toast.error(message);
      }
      throw error;
    }
  },
};
