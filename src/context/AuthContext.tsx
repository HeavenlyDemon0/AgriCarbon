import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userName: string;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('agri_token'));
  const [userName] = useState('Raju');

  const login = useCallback(async (_email: string, _password: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 800));
    const token = 'mock_token_' + Date.now();
    localStorage.setItem('agri_token', token);
    setIsAuthenticated(true);
    return true;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('agri_token');
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
