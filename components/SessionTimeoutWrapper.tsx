"use client";

import { useSessionTimeout } from "@/hooks/useSessionTimeout";
import { useAuth } from "@/context/auth-context";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

interface SessionTimeoutWrapperProps {
  children: ReactNode;
}

export function SessionTimeoutWrapper({ children }: SessionTimeoutWrapperProps) {
  const { session, isLoading } = useAuth();
  const router = useRouter();
  
  // Initialize session timeout
  useSessionTimeout();
  
  // Redirect to login if no session
  useEffect(() => {
    if (!isLoading && !session) {
      router.push('/login');
    }
  }, [session, isLoading, router]);

  // Return children only if authenticated
  return session ? <>{children}</> : null;
} 