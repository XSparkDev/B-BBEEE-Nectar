'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signUp: (email: string, password: string, userData?: any) => Promise<{
    success: boolean;
    error: any;
  }>;
  signIn: (email: string, password: string) => Promise<{
    success: boolean;
    error: any;
  }>;
  signInWithGoogle: () => Promise<{
    success: boolean;
    error: any;
  }>;
  signInWithMicrosoft: () => Promise<{
    success: boolean;
    error: any;
  }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{
    success: boolean;
    error: any;
  }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (!error) {
        setSession(data.session);
        setUser(data.session?.user || null);
      }
      
      setIsLoading(false);
    };

    getInitialSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user || null);
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, userData?: any) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });

      return {
        success: !error && !!data,
        error,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      return {
        success: !error && !!data,
        error,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      return {
        success: !error && !!data,
        error,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  };

  const signInWithMicrosoft = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'azure',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
          scopes: 'email profile openid offline_access user.read',
          queryParams: {
            prompt: 'consent',
            access_type: 'offline'
          }
        }
      });

      return {
        success: !error && !!data,
        error,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      return {
        success: !error,
        error,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  };

  const value = {
    session,
    user,
    isLoading,
    signUp,
    signIn,
    signInWithGoogle,
    signInWithMicrosoft,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}
