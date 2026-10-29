import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Coffee, LogOut } from 'lucide-react';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="fixed inset-0 gradient-mesh opacity-30"></div>
      
      <nav className="relative z-50 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Coffee className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-sm">BrewCall</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Dashboard</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-sm"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="glass rounded-3xl p-8 animate-fade-in-up">
          <h1 className="text-3xl font-bold mb-4">Welcome, {user?.name}!</h1>
          <p className="text-gray-400 mb-8">
            {user?.role === 'super_admin' ? 'Super Admin Dashboard' : 'Shop Owner Dashboard'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass rounded-2xl p-6 card-hover">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <Coffee className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Dashboard</h3>
              <p className="text-gray-400 text-sm">View your shop overview and analytics</p>
            </div>

            <div className="glass rounded-2xl p-6 card-hover">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Menu</h3>
              <p className="text-gray-400 text-sm">Manage your menu items and categories</p>
            </div>

            <div className="glass rounded-2xl p-6 card-hover">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Live Requests</h3>
              <p className="text-gray-400 text-sm">Monitor customer service requests</p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 border border-violet-500/20 rounded-2xl">
            <h2 className="text-xl font-bold mb-2">🎉 Your app is ready!</h2>
            <p className="text-gray-300 text-sm">
              This is a minimal dashboard. The full-featured dashboard with menu management, 
              table management, QR codes, wallet system, and analytics is available in the complete version.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
