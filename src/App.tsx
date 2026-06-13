import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import TopBar from './components/TopBar';
import BottomNav from './components/BottomNav';

// Pages
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';
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

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/signin" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/plan/today" element={<ProtectedRoute><TodayPlanPage /></ProtectedRoute>} />
          <Route path="/plan" element={<ProtectedRoute><PlanPage /></ProtectedRoute>} />
          <Route path="/alerts" element={<ProtectedRoute><AlertsPage /></ProtectedRoute>} />
          <Route path="/wallet" element={<ProtectedRoute><WalletPage /></ProtectedRoute>} />
          <Route path="/verification" element={<ProtectedRoute><VerificationPage /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
          <Route path="/impact" element={<ProtectedRoute><ImpactPage /></ProtectedRoute>} />
          <Route path="/farm" element={<ProtectedRoute><FarmPage /></ProtectedRoute>} />
          <Route path="/more" element={<ProtectedRoute><MorePage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
