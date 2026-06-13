import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type UserProfile = {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('agri_user');
    return saved ? JSON.parse(saved) : null;
  });

  const isAuthenticated = !!user;

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    // Simulate backend call
    await new Promise(r => setTimeout(r, 600));
    
    // In a real app we'd verify user. For now, mock success if not empty.
    if (!email) return false;
    
    const token = 'mock_token_' + Date.now();
    localStorage.setItem('agri_token', token);
    
    // Check if they previously signed up in this local storage mock
    const existingStr = localStorage.getItem(`profile_${email}`);
    let profile: UserProfile;

    if (existingStr) {
      profile = JSON.parse(existingStr);
    } else {
      profile = { id: `u_${Date.now()}`, name: email.split('@')[0], email };
    }

    localStorage.setItem('agri_user', JSON.stringify(profile));
    setUser(profile);
    return true;
  }, []);

  const signup = useCallback(async (name: string, email: string, _password: string): Promise<boolean> => {
    // Simulate backend call
    await new Promise(r => setTimeout(r, 600));
    
    if (!email || !name) return false;

    const token = 'mock_token_' + Date.now();
    localStorage.setItem('agri_token', token);

    const profile: UserProfile = { id: `u_${Date.now()}`, name, email };
    localStorage.setItem('agri_user', JSON.stringify(profile));
    localStorage.setItem(`profile_${email}`, JSON.stringify(profile)); // save for fake DB

    setUser(profile);
    return true;
  }, []);

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
