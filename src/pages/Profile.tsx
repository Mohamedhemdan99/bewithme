
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserProfile } from '../services/authService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Eye, EyeOff, Edit, User, Calendar, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface EditableUserProfile extends Partial<UserProfile> {
  picture?: File | string | null;
  password?: string;
}

const Profile = () => {
  const { user, logout, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editableUser, setEditableUser] = useState<EditableUserProfile>(user || {});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(user?.picture || null);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableUser(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEditableUser(prev => ({ ...prev, picture: file }));
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (newPassword && newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const dataToUpdate: EditableUserProfile = { ...editableUser };
      
      // Only include password if it's been changed
      if (newPassword) {
        dataToUpdate.password = newPassword;
      }
      
      await updateProfile(dataToUpdate);
      setIsEditing(false);
      setNewPassword('');
      setConfirmPassword('');
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="app-container min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-4xl px-4 py-10">
        <Card className="overflow-hidden">
          {/* Profile Header/Cover */}
          <div className="bg-gradient-to-r from-brand-blue to-brand-blue-dark h-40 w-full relative"></div>
          
          <div className="px-6 sm:px-8 relative">
            {/* Profile Picture */}
            <div className="relative -mt-16 mb-4">
              <div className={`h-32 w-32 rounded-full border-4 border-white bg-white ${isEditing ? 'cursor-pointer' : ''}`}>
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="h-full w-full object-cover rounded-full"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-gray-100 rounded-full">
                    <User className="h-16 w-16 text-gray-400" />
                  </div>
                )}
                
                {isEditing && (
                  <label className="absolute inset-0 rounded-full cursor-pointer bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                    <Edit className="h-8 w-8 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-2/3">
                {/* Profile Info */}
                <CardHeader className="px-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">
                        {user.firstName} {user.lastName}
                      </CardTitle>
                      <CardDescription className="text-gray-500">
                        @{user.username}
                      </CardDescription>
                    </div>
                    {!isEditing ? (
                      <Button
                        onClick={() => setIsEditing(true)}
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Edit className="h-4 w-4" />
                        Edit Profile
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsEditing(false);
                            setEditableUser(user);
                            setImagePreview(user.picture || null);
                            setNewPassword('');
                            setConfirmPassword('');
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="btn-primary"
                          onClick={handleSave}
                        >
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="px-0 py-6">
                  <div className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          {isEditing ? (
                            <Input
                              id="firstName"
                              name="firstName"
                              value={editableUser.firstName || ''}
                              onChange={handleInputChange}
                            />
                          ) : (
                            <p className="mt-1 font-medium">{user.firstName}</p>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          {isEditing ? (
                            <Input
                              id="lastName"
                              name="lastName"
                              value={editableUser.lastName || ''}
                              onChange={handleInputChange}
                            />
                          ) : (
                            <p className="mt-1 font-medium">{user.lastName}</p>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <p className="mt-1 font-medium">{user.email}</p>
                        </div>
                        
                        <div>
                          <Label htmlFor="username">Username</Label>
                          <p className="mt-1 font-medium">@{user.username}</p>
                        </div>
                        
                        <div>
                          <Label htmlFor="gender">Gender</Label>
                          <p className="mt-1 font-medium">{user.gender}</p>
                        </div>
                        
                        <div>
                          <Label htmlFor="dateOfBirth" className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            Date of Birth
                          </Label>
                          <p className="mt-1 font-medium">
                            {user.dateOfBirth ? format(new Date(user.dateOfBirth), 'PPP') : 'Not provided'}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Password Section (only in edit mode) */}
                    {isEditing && (
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Update Password</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="relative">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input
                              id="newPassword"
                              type={showPassword ? "text" : "password"}
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              placeholder="Enter new password"
                            />
                            <button
                              type="button"
                              className="absolute right-3 bottom-3 text-gray-500"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                          
                          <div className="relative">
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input
                              id="confirmPassword"
                              type={showConfirmPassword ? "text" : "password"}
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              placeholder="Confirm new password"
                            />
                            <button
                              type="button"
                              className="absolute right-3 bottom-3 text-gray-500"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </div>
              
              <div className="lg:w-1/3 lg:pl-8 lg:border-l border-gray-200">
                {/* Stats & Rating */}
                <CardHeader className="px-0">
                  <CardTitle className="text-lg">Account Stats</CardTitle>
                </CardHeader>
                
                <CardContent className="px-0 py-4">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">User Rating</p>
                      <div className="flex items-center mt-1">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`w-5 h-5 ${star <= 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-2 font-semibold">4.0/5</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Posts</p>
                        <p className="text-xl font-semibold">12</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Connections</p>
                        <p className="text-xl font-semibold">48</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Helped</p>
                        <p className="text-xl font-semibold">23</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Account Age</p>
                        <p className="text-xl font-semibold">2 months</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Role</p>
                      <p className="text-base font-semibold capitalize">{user.role}</p>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="px-0 pt-4 flex flex-col items-start">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 text-red-500 hover:text-red-700 hover:bg-red-50 w-full justify-center"
                    onClick={logout}
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </CardFooter>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
