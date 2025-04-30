import { createContext } from "react";

interface SignalRContextType {
  isConnected: boolean;
  hasUnreadNotifications: boolean;
  setHasUnreadNotifications: (value: boolean) => void;
}

export const SignalRContext = createContext<SignalRContextType | undefined>(undefined);

