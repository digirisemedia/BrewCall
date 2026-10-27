import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col">
      {/* Header */}
      <header className="max-w-5xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center text-xl shadow-lg">
            🛎️
          </div>
          <span className="text-white font-bold text-xl">WaiterCall</span>
        </div>
        <div className="flex gap-3">
          <Link
            to="/staff/dashboard"
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg text-sm font-medium transition-all border border-gray-600"
          >
            Staff Login
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-7xl mb-6">🍽️</div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            Digital Menu &<br />
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Waiter Call System
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-xl mx-auto">
            Real-time service requests for restaurants and cafes. Customers call, staff responds instantly.
          </p>

          {/* Demo Access Cards */}
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {/* Customer Demo */}
            <Link
              to="/table/1"
              className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-orange-500/50 transition-all hover:shadow-xl hover:shadow-orange-500/10"
            >
              <div className="text-4xl mb-3">📱</div>
              <h3 className="text-white font-bold text-lg mb-1">Customer View</h3>
              <p className="text-gray-400 text-sm mb-4">Mobile-optimized menu & service buttons</p>
              <div className="inline-flex items-center gap-2 text-orange-400 text-sm font-semibold group-hover:gap-3 transition-all">
                Try Demo →
              </div>
              <div className="mt-3 text-xs text-gray-500">/table/1 through /table/10</div>
            </Link>

            {/* Staff Demo */}
            <Link
              to="/staff/dashboard"
              className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-emerald-500/50 transition-all hover:shadow-xl hover:shadow-emerald-500/10"
            >
              <div className="text-4xl mb-3">🖥️</div>
              <h3 className="text-white font-bold text-lg mb-1">Staff Dashboard</h3>
              <p className="text-gray-400 text-sm mb-4">Live request monitoring & management</p>
              <div className="inline-flex items-center gap-2 text-emerald-400 text-sm font-semibold group-hover:gap-3 transition-all">
                Open Dashboard →
              </div>
              <div className="mt-3 text-xs text-gray-500">Real-time updates</div>
            </Link>
          </div>

          {/* Features */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '⚡', label: 'Real-time' },
              { icon: '📱', label: 'Mobile-first' },
              { icon: '🔔', label: 'Instant Alerts' },
              { icon: '📊', label: 'Live Tracking' },
            ].map((f) => (
              <div key={f.label} className="text-center">
                <div className="text-2xl mb-1">{f.icon}</div>
                <p className="text-gray-400 text-xs font-medium">{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto w-full px-6 py-6 text-center">
        <p className="text-gray-500 text-sm">
          WaiterCall Demo • Open in two tabs to see real-time sync
        </p>
      </footer>
    </div>
  );
}
