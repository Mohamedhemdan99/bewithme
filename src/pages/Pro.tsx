
// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../hooks/useAuth';
// import { EditableUserProfile } from '../services/profileService';
// import { profileService, ProfileData } from '../services/profileService';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Eye, EyeOff, Edit, User } from 'lucide-react';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { toast } from 'sonner';
// import { format } from 'date-fns';

// const Profile = () => {
//   const { user, logout } = useAuth();
//   const [isEditing, setIsEditing] = useState(false);
//   const [editableUser, setEditableUser] = useState<EditableUserProfile>(user || {});
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [imagePreview, setImagePreview] = useState<string | null>(user?.picture || null);
//   const [profileData, setProfileData] = useState<ProfileData | null>(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         setLoading(true);
//         const data = await profileService.getProfileData();
//         setProfileData(data);
//       } catch (error) {
//         console.error('Error fetching profile data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfileData();
//   }, []);

//   if (!user) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p>Please log in to view your profile.</p>
//       </div>
//     );
//   }

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setEditableUser(prev => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setEditableUser(prev => ({ ...prev, picture: file }));
      
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSave = async () => {
//     if (newPassword && newPassword !== confirmPassword) {
//       toast.error('Passwords do not match');
//       return;
//     }

//     try {
//       const dataToUpdate: EditableUserProfile = {
//         ...editableUser,
//         password: newPassword || undefined,
//       };
      
//       await updateProfile(dataToUpdate);
//       setIsEditing(false);
//       setNewPassword('');
//       setConfirmPassword('');
//       toast.success('Profile updated successfully');
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       toast.error('Failed to update profile');
//     }
//   };

//   // Display the fetched profile data or fall back to user data
//   const displayName = profileData ? profileData.fullName : `${user.firstName} ${user.lastName}`;
//   const displayEmail = profileData ? profileData.email : user.email;
//   const displayGender = profileData ? profileData.gender : user.gender;
//   const displayDateOfBirth = profileData ? profileData.dateOfBirth : user.dateOfBirth;
//   const displayRating = profileData ? profileData.rate : 0;
//   const displayPicture = profileData && profileData.profileImageUrl ? 
//     profileData.profileImageUrl : (user.picture || null);

//   return (
//     <div className="app-container min-h-screen bg-gray-50">
//       <div className="container mx-auto max-w-3xl px-4 py-10">
//         <Card className="shadow-lg">
//           <CardHeader className="pb-4">
//             <div className="flex justify-between items-start">
//               <CardTitle className="text-2xl font-bold">Profile Information</CardTitle>
//               {!isEditing ? (
//                 <Button
//                   onClick={() => setIsEditing(true)}
//                   variant="outline"
//                   className="flex items-center gap-2 text-blue-600 border-blue-600 hover:bg-blue-50"
//                 >
//                   <Edit className="h-4 w-4" />
//                   Edit Profile
//                 </Button>
//               ) : (
//                 <div className="flex gap-2">
//                   <Button
//                     variant="outline"
//                     onClick={() => {
//                       setIsEditing(false);
//                       setEditableUser(user);
//                       setImagePreview(user.picture || null);
//                       setNewPassword('');
//                       setConfirmPassword('');
//                     }}
//                     className="text-gray-600"
//                   >
//                     Cancel
//                   </Button>
//                   <Button
//                     onClick={handleSave}
//                     className="bg-blue-600 hover:bg-blue-700 text-white"
//                   >
//                     Save Changes
//                   </Button>
//                 </div>
//               )}
//             </div>
//           </CardHeader>

//           <CardContent className="space-y-6">
//             {/* Profile Picture */}
//             <div className="flex justify-center">
//               <div className="relative">
//                 <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
//                   <AvatarImage src={imagePreview || displayPicture || undefined} alt={displayName} />
//                   <AvatarFallback>
//                     <User className="h-16 w-16" />
//                   </AvatarFallback>
//                 </Avatar>
//                 {isEditing && (
//                   <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
//                     <Edit className="h-4 w-4" />
//                     <input
//                       type="file"
//                       accept="image/*"
//                       className="hidden"
//                       onChange={handleImageChange}
//                     />
//                   </label>
//                 )}
//               </div>
//             </div>

//             {/* Profile Fields */}
//             <div className="grid gap-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label className="text-gray-700">Full Name</Label>
//                   {isEditing ? (
//                     <Input
//                       name="fullName"
//                       value={editableUser.fullName || ''}
//                       onChange={handleInputChange}
//                       className="border-gray-300 text-gray-900 focus:ring-blue-500"
//                     />
//                   ) : (
//                     <p className="text-gray-900 font-medium">{displayName}</p>
//                   )}
//                 </div>

//                 <div className="space-y-2">
//                   <Label className="text-gray-700">Email</Label>
//                   <p className="text-gray-900 font-medium">{displayEmail}</p>
//                 </div>

//                 <div className="space-y-2">
//                   <Label className="text-gray-700">Username</Label>
//                   <p className="text-gray-900 font-medium">@{user.username}</p>
//                 </div>

//                 <div className="space-y-2">
//                   <Label className="text-gray-700">Rating</Label>
//                   <div className="flex items-center">
//                     <div className="flex">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <svg
//                           key={star}
//                           className={`w-5 h-5 ${star <= displayRating ? 'text-yellow-400' : 'text-gray-300'}`}
//                           fill="currentColor"
//                           viewBox="0 0 20 20"
//                         >
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                         </svg>
//                       ))}
//                     </div>
//                     <span className="ml-2 font-semibold">{displayRating}/5</span>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label className="text-gray-700">Gender</Label>
//                   {isEditing ? (
//                     <Select
//                       value={editableUser.gender}
//                       onValueChange={(value) => setEditableUser(prev => ({ ...prev, gender: value }))}
//                     >
//                       <SelectTrigger className="border-gray-300 text-gray-900">
//                         <SelectValue placeholder="Select gender" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="male">Male</SelectItem>
//                         <SelectItem value="female">Female</SelectItem>
//                         <SelectItem value="other">Other</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   ) : (
//                     <p className="text-gray-900 font-medium capitalize">{displayGender}</p>
//                   )}
//                 </div>

//                 <div className="space-y-2">
//                   <Label className="text-gray-700">Date of Birth</Label>
//                   {isEditing ? (
//                     <Input
//                       type="date"
//                       name="dateOfBirth"
//                       value={editableUser.dateOfBirth || ''}
//                       onChange={handleInputChange}
//                       className="border-gray-300 text-gray-900 focus:ring-blue-500"
//                     />
//                   ) : (
//                     <p className="text-gray-900 font-medium">
//                       {displayDateOfBirth ? format(new Date(displayDateOfBirth), 'PPP') : 'Not provided'}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* Password Update Section */}
//               {isEditing && (
//                 <div className="border-t pt-6 mt-6">
//                   <h3 className="text-lg font-semibold mb-4">Update Password</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div className="relative space-y-2">
//                       <Label htmlFor="newPassword" className="text-gray-700">New Password</Label>
//                       <div className="relative">
//                         <Input
//                           id="newPassword"
//                           type={showPassword ? "text" : "password"}
//                           value={newPassword}
//                           onChange={(e) => setNewPassword(e.target.value)}
//                           className="border-gray-300 text-gray-900 pr-10"
//                         />
//                         <button
//                           type="button"
//                           className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//                           onClick={() => setShowPassword(!showPassword)}
//                         >
//                           {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                         </button>
//                       </div>
//                     </div>

//                     <div className="relative space-y-2">
//                       <Label htmlFor="confirmPassword" className="text-gray-700">Confirm Password</Label>
//                       <div className="relative">
//                         <Input
//                           id="confirmPassword"
//                           type={showConfirmPassword ? "text" : "password"}
//                           value={confirmPassword}
//                           onChange={(e) => setConfirmPassword(e.target.value)}
//                           className="border-gray-300 text-gray-900 pr-10"
//                         />
//                         <button
//                           type="button"
//                           className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//                           onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                         >
//                           {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Profile;
// In your service file (e.g., profileService.ts)
interface ProfileUpdateData {
    fullName?: string;
    gender?: string;
    dateOfBirth?: string | Date;
    languagePreference?: string;
    profileImage?: File | null;
  }
/**
 * Updates user profile with the provided data, including optional profile image
 * @param profileData - The profile data to update
 * @returns The updated profile data from the server
 */
