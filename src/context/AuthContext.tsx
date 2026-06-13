import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { apiFetch } from '../api/client';

type UserProfile = {
  id: string;
  name: string;
  email: string;
};

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

type AuthResponse = {
  token: string;
  user: UserProfile;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('agri_user');
    return saved ? JSON.parse(saved) : null;
  });

  const isAuthenticated = !!user;

  const persistSession = useCallback((token: string, profile: UserProfile) => {
    localStorage.setItem('agri_token', token);
    localStorage.setItem('agri_user', JSON.stringify(profile));
    setUser(profile);
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    if (!email) return false;

    try {
      const data = await apiFetch<AuthResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      persistSession(data.token, data.user);
      return true;
    } catch {
      return false;
    }
  }, [persistSession]);

  const signup = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
    if (!email || !name) return false;

    try {
      const data = await apiFetch<AuthResponse>('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      });
      persistSession(data.token, data.user);
      return true;
    } catch {
      return false;
    }
  }, [persistSession]);

  const logout = useCallback(() => {
    localStorage.removeItem('agri_token');
    localStorage.removeItem('agri_user');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
