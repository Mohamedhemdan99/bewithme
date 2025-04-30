
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {  SignUpFormData } from '../services/authService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff, User, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { request } from 'http';
 
const initialFormData: SignUpFormData = {
  ProfileImage: null,
  fullName:'',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  gender: '',
  dateOfBirth: '',
  role: 'helper',
};
const SignUp = () => {
  const { register, isLoading } = useAuth();
  const [formData, setFormData] = useState<SignUpFormData>(initialFormData);
  const [firstname,setFirstName] = useState<string>('');
  const [lastname,setLastName] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  // Date of birth fields
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({...prev, [name]: ''}));
    }
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user makes a selection
    if (errors[name]) {
      setErrors(prev => ({...prev, [name]: ''}));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev,ProfileImage: file }));
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!firstname) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!lastname) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.username) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }
    
    if (!day || !month || !year) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const yearValue = parseInt(year);
      if (yearValue < 1900 || yearValue > new Date().getFullYear()) {
        newErrors.dateOfBirth = 'Please enter a valid year between 1900 and ' + new Date().getFullYear();
      }
      const monthValue = parseInt(month);
      if (monthValue < 1 || monthValue > 12) {
        newErrors.dateOfBirth = 'Please enter a valid month (1-12)';
      }
      const dayValue = parseInt(day);
      if (dayValue < 1 || dayValue > 31) {
        newErrors.dateOfBirth = 'Please enter a valid day (1-31)';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      // Create the request data
      const requestData: SignUpFormData = {
        ...formData,
        fullName: `${firstname} ${lastname}`,
        dateOfBirth: `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`,
      };

      await register(requestData);
      // toast.success('Sign up successful', { icon: '🎉' });
      // Redirect to login page
      // navigate('/login');
    } catch (error) {
      console.error('Sign up error:', error);
      toast.error('Failed to sign up',{icon: '⚠️'});
    }
  };

  return (
    <div className="app-container">
      <section className="hero-section min-h-screen flex items-center justify-center">
        <div className="container mx-auto py-8">
          <div className="auth-card max-w-xl animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Join BeWithMe</h1>
              <p className="text-gray-600 mt-2">Create your account and start connecting</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center mb-6">
                <div className="relative w-32 h-32 rounded-full bg-gray-100 overflow-hidden border-2 border-blue-500">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full">
                      <User className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                  <label htmlFor="picture" className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 cursor-pointer transition">
                    <span className="text-white font-medium">Upload</span>
                    <input
                      id="picture"
                      type="file"
                      name="picture"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className='text-black block mb-1' htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className={"border-red-500"}
                    style={{borderColor: errors.firstName? "red" : "gray"}}
                  />
                  {errors.firstName && (
                    <p className="input-error">{errors.firstName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className='text-black block mb-1'>Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className={errors.lastName ? "border-red-500" : ""}
                  />
                  {errors.lastName && (
                    <p className="input-error">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Username"
                  className={errors.username ? "border-red-500" : ""}
                />
                {errors.username && (
                  <p className="input-error">{errors.username}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="input-error">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a secure password"
                    className={errors.password ? "border-red-500" : ""}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="input-error">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    className={errors.confirmPassword ? "border-red-500" : ""}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="input-error">{errors.confirmPassword}</p>
                )}
              </div>

              <div className="grid grid-cols-1 text-black md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    name="gender"
                    onValueChange={(value) => handleSelectChange('gender', value)}
                  >
                    <SelectTrigger className={errors.gender ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && (
                    <p className="input-error">{errors.gender}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Date of Birth
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="day"
                      placeholder="DD"
                      maxLength={2}
                      value={day}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        if (value === '' || (parseInt(value) > 0 && parseInt(value) <= 31)) {
                          setDay(value);
                          if (errors.dateOfBirth) {
                            setErrors(prev => ({...prev, dateOfBirth: ''}));
                          }
                        }
                      }}
                      className={errors.dateOfBirth ? "border-red-500" : ""}
                    />
                    <Input
                      id="month"
                      placeholder="MM"
                      maxLength={2}
                      value={month}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        if (value === '' || (parseInt(value) > 0 && parseInt(value) <= 12)) {
                          setMonth(value);
                          if (errors.dateOfBirth) {
                            setErrors(prev => ({...prev, dateOfBirth: ''}));
                          }
                        }
                      }}
                      className={errors.dateOfBirth ? "border-red-500" : ""}
                    />
                    <Input
                      id="year"
                      placeholder="YYYY"
                      maxLength={4}
                      value={year}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setYear(value);
                        if (errors.dateOfBirth) {
                          setErrors(prev => ({...prev, dateOfBirth: ''}));
                        }
                      }}
                      className={errors.dateOfBirth ? "border-red-500" : ""}
                    />
                  </div>
                  {errors.dateOfBirth && (
                    <p className="input-error">{errors.dateOfBirth}</p>
                  )}
                </div>
              </div>

              <input
                type="hidden"
                name="role"
                value={formData.role}
              />

              <Button 
                type="submit"
                className="w-full btn-primary py-6 text-lg"
                disabled={isLoading}
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-500 hover:underline font-medium">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
