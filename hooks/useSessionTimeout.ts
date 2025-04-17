import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

// Set timeout to 1 minute (60000 ms) for testing
const INACTIVITY_TIMEOUT = 60000;

export const useSessionTimeout = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { signOut, session } = useAuth();
  const router = useRouter();
  const [lastActivity, setLastActivity] = useState<Date>(new Date());

  // Function to reset the timeout
  const resetTimeout = () => {
    // Update last activity time
    setLastActivity(new Date());
    
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Set new timeout
    timeoutRef.current = setTimeout(async () => {
      console.log('Session timeout: User inactive for 1 minute');
      toast.warning("You're being logged out due to inactivity", {
        description: "Your session has expired due to inactivity."
      });
      
      // Logout user
      await signOut();
      
      // Navigate to login page
      router.push('/login');
    }, INACTIVITY_TIMEOUT);
  };

  // Initialize timeout on mount and when session changes
  useEffect(() => {
    // Only set timeout if user is logged in
    if (session) {
      resetTimeout();
      
      // Set up event listeners for user activity
      const activityEvents = [
        'mousedown',
        'keydown',
        'scroll',
        'mousemove',
        'click',
        'touchstart'
      ];
      
      // Handler for user activity
      const handleUserActivity = () => {
        resetTimeout();
      };
      
      // Add event listeners
      activityEvents.forEach(event => {
        window.addEventListener(event, handleUserActivity);
      });
      
      // Clean up on unmount
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        
        activityEvents.forEach(event => {
          window.removeEventListener(event, handleUserActivity);
        });
      };
    }
  }, [session, signOut, router]);

  return {
    lastActivity,
    resetTimeout
  };
}; 