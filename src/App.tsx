import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { NavProvider, useNav } from './context/NavContext';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';

// Pages
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import TodayPlanPage from './pages/TodayPlanPage';
import PlanPage from './pages/PlanPage';
import AlertsPage from './pages/AlertsPage';
import WalletPage from './pages/WalletPage';
import VerificationPage from './pages/VerificationPage';
import ReportsPage from './pages/ReportsPage';
import ImpactPage from './pages/ImpactPage';
import FarmPage from './pages/FarmPage';
import MorePage from './pages/MorePage';
import ProfilePage from './pages/ProfilePage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/signin" replace />;
  return <>{children}</>;
}

function MainLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { isCollapsed } = useNav();
  const isAuthOrLanding = ['/', '/signin', '/signup'].includes(location.pathname);

  if (isAuthOrLanding) return <>{children}</>;

  return (
    <div className="flex min-h-screen font-sans">
      <Sidebar />
      <div 
        className={`flex-1 flex flex-col w-full transition-all duration-300 ${isCollapsed ? 'md:ml-[80px]' : 'md:ml-[280px]'}`}
      >
        <TopBar />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full mx-auto max-w-[1600px]">
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      
      {/* Protected Layout Routes */}
      <Route path="/home" element={<ProtectedRoute><MainLayout><HomePage /></MainLayout></ProtectedRoute>} />
      <Route path="/plan/today" element={<ProtectedRoute><MainLayout><TodayPlanPage /></MainLayout></ProtectedRoute>} />
      <Route path="/plan" element={<ProtectedRoute><MainLayout><PlanPage /></MainLayout></ProtectedRoute>} />
      <Route path="/alerts" element={<ProtectedRoute><MainLayout><AlertsPage /></MainLayout></ProtectedRoute>} />
      <Route path="/wallet" element={<ProtectedRoute><MainLayout><WalletPage /></MainLayout></ProtectedRoute>} />
      <Route path="/verification" element={<ProtectedRoute><MainLayout><VerificationPage /></MainLayout></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute><MainLayout><ReportsPage /></MainLayout></ProtectedRoute>} />
      <Route path="/impact" element={<ProtectedRoute><MainLayout><ImpactPage /></MainLayout></ProtectedRoute>} />
      <Route path="/farm" element={<ProtectedRoute><MainLayout><FarmPage /></MainLayout></ProtectedRoute>} />
      <Route path="/more" element={<ProtectedRoute><MainLayout><MorePage /></MainLayout></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><MainLayout><ProfilePage /></MainLayout></ProtectedRoute>} />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
           <NavProvider>
             <AppRoutes />
           </NavProvider>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
