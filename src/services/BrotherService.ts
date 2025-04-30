//create interface like this json schema [{"id":6,"postId":0,"caller":{"id":"63d50afb-ca33-45a0-b05a-1fca9bdc136b","fullName":"Ahmed Mohammed","pictureUrl":"uploads/imgs/default.jpg","status":true},"callee":{"id":"49361bd2-b66b-4c5f-8da7-2d25044eb01e","fullName":"Dr. Mohamed Hemdan","pictureUrl":"uploads/imgs/default.jpg","status":true},"startTime":"0001-01-01T00:00:00","endTime":null,"duration":15}]
import { toast } from "sonner";
import api  from "./axiosService";
import axios from "axios";
export interface CallHistoryDto {
  id: number;
  postId: number;
  caller: {
    id: string;
    fullName: string;
    pictureUrl: string;
    status: boolean;
  };
  callee: {
    id: string;
    fullName: string;
    pictureUrl: string;
    status: boolean;
  };
  startTime: string;
  endTime: string | null;
  duration: number;
}

export const brotherService = {
  async getCallHistory() {
    try {
        // the url is : /api/calls/{userid}/call-history
        const response = await api.get(`/api/calls/${localStorage.getItem('userId')}/call-history`);
        if(response.data != undefined || response.data != null){
            return response.data;
        }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || 'Failed to fetch call history';
        toast.error(message,{icon: "❌"});
      }
    }
  }
  
}
      