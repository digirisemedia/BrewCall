import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { LanguageProvider } from './context/LanguageContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ShopAdminDashboard from './pages/ShopAdminDashboard';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import CustomerView from './pages/CustomerView';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AdminDashboard() {
  const { user } = useAuth();
  return user?.role === 'super_admin' ? <SuperAdminDashboard /> : <ShopAdminDashboard />;
}

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <CurrencyProvider>
          <HashRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/customer/:shopId/:tableId" element={<CustomerView />} />
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          </HashRouter>
        </CurrencyProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
