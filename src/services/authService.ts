
import { toast } from "sonner";
import axios from "axios";
import api  from "./axiosService";



export interface SignUpFormData {
  ProfileImage?: File | null;
  fullName?: string;
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


export const authService = {
  // Register new user
  async register(formData: SignUpFormData) {
    try {
      // Create FormData object
      const data = new FormData();
      
      // Append profile image if exists
      if (formData.ProfileImage) {
        data.append('ProfileImage', formData.ProfileImage);
      }

      // Append other form fields
      if (formData.fullName) {
        data.append('fullName', formData.fullName);
      }
      data.append('username', formData.username);
      data.append('email', formData.email);
      data.append('Password', formData.password);
      data.append('confirmPassword', formData.confirmPassword);
      data.append('gender', formData.gender);
      data.append('dateOfBirth', formData.dateOfBirth);
      data.append('role', formData.role);

      const response = await api.post('/api/Account/Register', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || 'Registration failed';
        toast.error(message);
      }
      throw error;
    }
  },

  //Login user  Done✔ and store the token and userId
  async login(loginData: LoginFormData) {
    try {
      const response = await api.post('/api/Account/Login', loginData);
      
      // console.log(response.data);
      
      // Save token and user data in localStorage
      if (response.data?.token && response.data.userId !== null ) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);
  
          toast.success('Logged in successfully',{icon: "✅"});
          // Start SignalR connection
          // await signalRService.startConnection();
          // // Start SignalR connection
          // await   signalRService.joinOnlineHelpersGroup();
          // console.log("Joined OnlineHelpersGroup");

        } else {
          console.error('Invalid user data structure:', response.data.user);
          toast.error('Received invalid user data from server');
        
      }
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || 'Login failed';
        toast.error(message,{icon: "❌"});
      }
      throw error;
    }
  },

  // Logout user
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  },

  // Check if user is authenticated
  isAuthenticated() {
    // check it token in the cookeis 
    if (document.cookie.includes('token=')) {
      return true;
    }
    return !!localStorage.getItem('token');
  },

async sendCode(email: string){
  try {
    const response = await api.post('/api/Account/SendCode', { email });
    if(response.status === 200){
      console.log("Code sent successfully")
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || 'Failed to send verification code';
      toast.error(message);
    }
    throw error;
  }
},

  // Verify reset code
  async verifyResetCode(email: string, code: string) {
    try {
      const response =await api.post('/api/Account/VerifyCode', { email, code });
if(response.status === 200){
  console.log("Code verified successfully",response.data.resetToken);
  return response.data.resetToken;

}
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || 'Invalid verification code';
        toast.error(message);
      }
      throw error;
    }
  },

  // Reset password
  async resetPassword(email: string, resetToken: string, newPassword: string, confirmPassword: string) {
    try {
     const response = await api.post('/api/Account/ResetPassword', { 
        email, 
        Token:resetToken,
        Password: newPassword, 
        ConfirmPassword: confirmPassword 
      });
      if(response.status === 200){
        console.log("Password reset successfully",response.data);
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || 'Password reset failed';
        toast.error(message);
      }
      throw error;
    }
  }
};
