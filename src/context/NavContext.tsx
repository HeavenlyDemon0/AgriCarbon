import { createContext, useContext, useState, type ReactNode } from 'react';

interface NavContextType {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const NavContext = createContext<NavContextType | null>(null);

export function NavProvider({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(prev => !prev);

  return (
    <NavContext.Provider value={{ isCollapsed, toggleSidebar }}>
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error('useNav must be inside NavProvider');
  return ctx;
}
