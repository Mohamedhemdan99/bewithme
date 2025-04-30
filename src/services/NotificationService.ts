
import { error } from "console";
import api from "./axiosService"
import axios from "axios"
import { toast } from "sonner";
import { promises } from "dns";


export interface NotificationData
{
        id:number;
        content: string;
        isRead: boolean;
        createdAt: Date;
        type: string; // "general" or "new_post"
        profileImageUrl: string;
        patientName:string;
}


export const NotificationService =
{
   
    async getNotificaitons():Promise<NotificationData[]>{
        try {
            const response =await api.get('/api/notification');

            console.log(response.data)
            return response.data;
        }
        catch(error){
console.log("Catch")
            if(axios.isAxiosError(error)){
                const message = error.response?.data?.message || "Failed to fetch notification data"
                toast.error(message,{icon:'❌',position:'bottom-center'})
            }
            throw error;
        }
    },

    // impelementation for marking a notification as read
    async markNotificationAsRead(notificationId:number):Promise<void>{
        try {
            await api.put(`/api/notification/${notificationId}/mark-as-read`);
        }
        catch(error){
            if(axios.isAxiosError(error)){
                const message = error.response?.data?.message || "Failed to mark notification as read"
                toast.error(message,{icon:'❌',position:'bottom-center'})
            }
        }
    },

    
    // implementation for marking all notifications as read
    async markAllNotificationsAsRead():Promise<void>{
        try {
          const response=  await api.put(`/api/notification/mark-all-as-read`,);
          console.log(response.data)
        }
        catch(error){
            if(axios.isAxiosError(error)){
                const message = error.response?.data?.message || "Failed to mark all notifications as read"
                toast.error(message,{icon:'❌',position:'bottom-center'})
            }
        }
    },

    
    // implementation for deleting a notification
    async deleteNotification(notificationId:number):Promise<void>{
        try {
            await api.delete(`/api/notification/${notificationId}`);
        }
        catch(error){
            if(axios.isAxiosError(error)){
                const message = error.response?.data?.message || "Failed to delete notification"
                toast.error(message,{icon:'❌',position:'bottom-center'})
            }
        }
    },

    // implementation for deleting all notifications
    async deleteAllNotifications():Promise<void>{
        try {
            await api.delete(`/api/notification/delete-all`);
        }
        catch(error){
            if(axios.isAxiosError(error)){
                const message = error.response?.data?.message || "Failed to delete all notifications"
                toast.error(message,{icon:'❌',position:'bottom-center'})
            }
        }
    }


    
};

