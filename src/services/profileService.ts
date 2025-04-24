
import axios from 'axios';
import { toast } from "sonner";

const API_URL = "https://bewtihme-001-site1.jtempurl.com/api/profile";

export interface ProfileData {
  fullName: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  languagePreference: string;
  rate: number;
  profileImageUrl: string;
}

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add authorization header for authenticated requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const profileService = {
  // Get profile data
  async getProfileData(): Promise<ProfileData> {
    try {
      const response = await api.get('');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || 'Failed to fetch profile data';
        toast.error(message);
      }
      throw error;
    }
  },
};
