
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LoginFormData } from '../services/authService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

const initialFormData: LoginFormData = {
  usernameOrEmail: '',
  password: '',
  rememberMe: false,
};

const Login = () => {
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState<LoginFormData>(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, rememberMe: checked }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.usernameOrEmail || !formData.password) {
      toast.error('Please enter both username/email and password');
      return;
    }

    try {
      await login(formData);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="app-container">
      <section className="hero-section min-h-screen flex items-center justify-center">
        <div className="container mx-auto py-8">
          <div className="auth-card animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
              <p className="text-gray-600 mt-2">Log in to your account</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="usernameOrEmail">Email or Username</Label>
                <Input
                  id="usernameOrEmail"
                  name="usernameOrEmail"
                  value={formData.usernameOrEmail}
                  onChange={handleInputChange}
                  placeholder="Enter your email or username"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm font-medium text-brand-blue hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onCheckedChange={handleCheckboxChange}
                />
                <Label htmlFor="rememberMe" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Remember me
                </Label>
              </div>

              <Button 
                type="submit"
                className="w-full btn-primary py-6 text-lg"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Log In'}
              </Button>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-gray-300 flex-grow"></div>
                <span className="mx-4 text-gray-500 text-sm">or continue with</span>
                <div className="border-t border-gray-300 flex-grow"></div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Button type="button" variant="outline" className="flex items-center justify-center space-x-2 border hover:bg-gray-50">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12.956 16.26c-1.553 0-2.884-.926-3.55-2.237l-2.919 1.208c1.268 2.693 3.964 4.548 6.469 4.548 1.743 0 3.397-.561 4.80-1.619l-2.532-1.963c-.874.58-1.879.896-2.893.896"
                      fill="#34A853"
                    />
                    <path
                      d="M15.95 5.102l-3.191 2.73c.971 1.022 1.516 2.383 1.516 3.818 0 1.118-.341 2.158-.932 3.033l2.566 1.982c1.288-1.443 2.074-3.34 2.074-5.421 0-.302-.022-.6-.065-.896z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M5.192 13.025l2.897-1.205c-.471-1.396-1.76-2.394-3.233-2.394-1.862 0-3.483 1.278-4.004 3.053-.136.466-.214.957-.214 1.47 0 .511.078.999.213 1.464.52 1.775 2.142 3.054 4.005 3.054 1.093 0 2.027-.406 2.73-1.096z"
                      fill="#EA4335"
                    />
                  </svg>
                </Button>
                <Button type="button" variant="outline" className="flex items-center justify-center space-x-2 border hover:bg-gray-50">
                  <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M9.045 23.0327H13.4951V12.9658H16.9636L17.334 8.93986H13.4951V6.49372C13.4951 5.35278 13.7879 4.6904 15.3522 4.6904H17.4233V1.08551C17.0826 1.0404 15.8179 0.941895 14.2949 0.941895C11.1134 0.941895 8.94462 2.89243 8.94462 6.16186V8.93986H5.57666V12.9658H8.94462V23.0327H9.045Z"
                    ></path>
                  </svg>
                </Button>
                <Button type="button" variant="outline" className="flex items-center justify-center space-x-2 border hover:bg-gray-50">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M17.5557 12.4556C17.5557 10.5673 16.348 8.86355 14.4645 8.12054C14.7737 7.27872 15.6193 6.69323 16.5976 6.69323C18.0057 6.69323 19.1508 7.83833 19.1508 9.24647C19.1508 10.4342 18.3052 11.4449 17.2227 11.7197C17.4693 11.9519 17.5557 12.2267 17.5557 12.4556ZM12.9713 6.18042C12.9713 4.29207 11.4152 2.73596 9.52679 2.73596C7.63843 2.73596 6.08232 4.29207 6.08232 6.18042C6.08232 7.68108 7.03691 8.94311 8.36226 9.41233V6.80949C8.36226 6.2664 8.79789 5.83077 9.34098 5.83077C9.88407 5.83077 10.3197 6.2664 10.3197 6.80949V9.41233C11.645 8.94311 12.9713 7.68108 12.9713 6.18042ZM21.1078 16.7124V13.5102C21.1078 12.9671 20.6722 12.5315 20.129 12.5315H19.7145C19.5305 11.213 18.3854 10.2584 17.0392 10.2584C15.1508 10.2584 13.6163 11.7929 13.6163 13.6813C13.6163 15.5697 15.1508 17.1042 17.0392 17.1042C17.9962 17.1042 18.8418 16.6994 19.4273 16.0514H20.129C20.6722 16.0514 21.1078 15.6158 21.1078 15.0727V15.0456C21.1078 14.5296 21.1078 14.5296 21.1078 14.5025C21.1078 14.4755 21.1078 14.4755 21.1078 14.4484V16.7124H21.2642C21.8073 16.7124 22.2429 17.148 22.2429 17.6911C22.2429 18.2342 21.8073 18.6698 21.2642 18.6698H13.3415C13.136 18.6698 12.9497 18.6698 12.7635 18.6698H9.34098H5.91846H2.49593C1.95285 18.6698 1.51722 18.2342 1.51722 17.6911C1.51722 17.148 1.95285 16.7124 2.49593 16.7124H2.65234V11.2391H2.49593C1.95285 11.2391 1.51722 10.8035 1.51722 10.2604C1.51722 9.71733 1.95285 9.2817 2.49593 9.2817H9.34098C9.88407 9.2817 10.3197 9.71733 10.3197 10.2604C10.3197 10.8035 9.88407 11.2391 9.34098 11.2391H9.18457V16.7124H12.9713V14.1079C12.9713 13.0972 12.1257 12.2516 11.115 12.2516H11.0671C10.524 12.2516 10.0883 11.816 10.0883 11.2729C10.0883 10.7298 10.524 10.2942 11.0671 10.2942H11.115C13.2269 10.2942 14.9306 11.998 14.9306 14.1079V16.7124H16.0757V14.977C16.0757 14.4339 16.5114 13.9983 17.0545 13.9983C17.5976 13.9983 18.0332 14.4339 18.0332 14.977V16.7124H21.1078ZM6.6254 11.2391H6.46899V16.7124H6.6254C7.1685 16.7124 7.60412 17.148 7.60412 17.6911C7.60412 18.2342 7.1685 18.6698 6.6254 18.6698C6.08232 18.6698 5.64669 18.2342 5.64669 17.6911V16.7124H4.81411V17.6911C4.81411 18.2342 4.37848 18.6698 3.83539 18.6698C3.29231 18.6698 2.85668 18.2342 2.85668 17.6911C2.85668 17.148 3.29231 16.7124 3.83539 16.7124H3.99181V11.2391H3.83539C3.29231 11.2391 2.85668 10.8035 2.85668 10.2604C2.85668 9.71733 3.29231 9.2817 3.83539 9.2817H6.6254C7.1685 9.2817 7.60412 9.71733 7.60412 10.2604C7.60412 10.8035 7.1685 11.2391 6.6254 11.2391Z"
                      fill="black"
                    ></path>
                  </svg>
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="text-brand-blue hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
