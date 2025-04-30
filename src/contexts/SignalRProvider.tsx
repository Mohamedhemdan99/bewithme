import React, { createContext, useContext, useEffect, useState } from 'react';
import { signalRService } from '../services/signalRService.ts';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { SignalRContext } from './SiganlRContext.ts';
import { useAuth } from '@/hooks/useAuth.ts';


export function SignalRProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  const navigate = useNavigate();
  const {isAuthenticated}= useAuth();


  useEffect(() => {
    let mounted = true;

    const initializeSignalR = async () => {
      if (!isAuthenticated) {
        console.log("SignalRProvider: Not authenticated, skipping initialization");
        return;
      }

      try {
        console.log("SignalRProvider: Starting SignalR initialization");
        await signalRService.startConnection();
        
        if (!mounted) return;
        setIsConnected(true);
        
        await signalRService.joinOnlineHelpersGroup();

        if (!mounted) return;
        // Subscribe to new post notifications
        await signalRService.subscribeToNewPostCreated((data) => {
          if (!mounted) return;
          console.log('SignalRProvider: New post notification received:', data);
          setHasUnreadNotifications(true);

          // Show toast notification
          toast.info('New post available!', {
            position: 'top-center',
            style: { top: '20px', left: '50%', transform: 'translateX(-50%)' },
            icon: '📢',
            duration: 5000,
            className: 'custom-toast',
            description: data?.content || 'Click to view new posts',
            action: {
              label: 'View Notifications',
              onClick: () => {
                navigate('/notifications');
              }
            }
          });
        });

        console.log("SignalRProvider: SignalR initialization complete");
      } catch (error) {
        console.error('SignalR Provider: SignalR connection error:', error);
        if (!mounted) return;
        setIsConnected(false);
      }
    };

    // Initialize SignalR when authenticated
    initializeSignalR();

    // Cleanup function
    return () => {
      mounted = false;
      console.log("SignalR Provider: Cleaning up connection");
      
      if (signalRService.getConnection()?.connectionId) {
        signalRService.unsubscribeFromNewPostCreated(() => {
          console.log('SignalR Provider: Unsubscribed from notifications');
        });
        signalRService.stopConnection();
        setIsConnected(false);
      }
    };
  }, [isAuthenticated, navigate]);

  return (
    <SignalRContext.Provider value={{ isConnected, hasUnreadNotifications, setHasUnreadNotifications }}>
      {children}
    </SignalRContext.Provider>
  );
};
