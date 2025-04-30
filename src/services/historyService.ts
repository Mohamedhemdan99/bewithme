import { useEffect } from "react";
import api from "./axiosService";
import axios from "axios";
import { toast } from "sonner";

// generate interfacd for this {"id":10,"postId":4,"roomName":"room-4-waiting","caller":{"id":"79c157f7-db23-418d-9dc5-d2d18ae73d1a","fullName":"Khalid Abdullah","pictureUrl":"uploads/imgs/default.jpg","status":true},"callee":{"id":"0c9c7a30-f339-48a3-879d-88bc23452e5d","fullName":"Dr. Mohamed Hemdan","pictureUrl":"uploads/imgs/0c9c7a30-f339-48a3-879d-88bc23452e5d731b3f68-94d4-4315-a059-b58c4d73e1de.jpg","status":true},"startTime":"2025-04-27T15:08:47.8556965","endTime":null,"status":"Initiated","duration":null}
export interface CallHistory {
  id: number;
  postId: number;
  roomName: string;
  caller: {
    id: string;
    fullName: string;
    username: string;
    pictureUrl: string;
    status: boolean;
  };
  callee: {
    id: string;
    fullName: string;
    username: string;
    pictureUrl: string;
    status: boolean;
  };
  startTime: string;
  endTime: string | null;
  status: string;
  duration: number | null;
}

const historyService = {
    getHistory: async () => {
      try {
        const response = await api.get(`/api/calls/${localStorage.getItem('userId')}/call-history`);
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message || 'Failed to fetch call history';
          toast.error(message, { icon: "❌" });
        }
      }
    }
};

export default historyService;