"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { api } from '@/lib/api';

interface User {
  id: string;
  email: string;
  name?: string;
  image?: string | null;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setIsLoading(false);
        if (pathname.startsWith('/dashboard')) {
             router.push('/sign-in');
        }
        return;
      }

      try {
        const response = await api.get('/users/me');
        setUser(response.data);
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem('token');
        setUser(null);
        if (pathname.startsWith('/dashboard')) {
            router.push('/sign-in');
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  const login = () => {
    router.push('/sign-in');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/sign-in');
  };

  return (
    <AuthContext.Provider value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
