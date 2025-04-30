// src/contexts/AuthContext.ts
import { createContext } from 'react';
import {  LoginFormData, SignUpFormData} from '../services/authService';
import { ProfileData } from '../services/profileService';

interface AuthContextType {
  user: ProfileData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginFormData) => Promise<void>;
  register: (data: SignUpFormData) => Promise<void>;
  logout: () => void;
  // updateProfile: (data: EditableUserProfile) => Promise<void>;
}
// KA'NY BA2OL ya authcontext enta el-waseet we authcotextTYPE   hia el7agat elly htowzaha
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

