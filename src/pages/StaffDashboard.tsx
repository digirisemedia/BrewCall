import { useState, useEffect, useRef } from 'react';
import { useRequests } from '../context/RequestContext';
import { playNotificationSound, playSuccessSound } from '../utils/audio';
import { RequestCard } from '../components/RequestCard';

export default function StaffDashboard() {
  const { pendingRequests, resolveRequest, requests } = useRequests();
  const [newRequestFlash, setNewRequestFlash] = useState(false);
  const prevCountRef = useRef(pendingRequests.length);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [filter, setFilter] = useState<'all' | 'waiter' | 'water' | 'bill'>('all');

  // Detect new requests and play sound
  useEffect(() => {
    const currentCount = pendingRequests.length;
    if (currentCount > prevCountRef.current) {
      setNewRequestFlash(true);
      if (soundEnabled) {
        playNotificationSound();
      }
      setTimeout(() => setNewRequestFlash(false), 1000);
    }
    prevCountRef.current = currentCount;
  }, [pendingRequests.length, soundEnabled]);

  const handleResolve = (requestId: string) => {
    resolveRequest(requestId);
    if (soundEnabled) {
      playSuccessSound();
    }
  };

  // Filter requests
  const filteredRequests = filter === 'all'
    ? pendingRequests
    : pendingRequests.filter((r) => r.request_type === filter);

  // Sort by oldest first
  const sortedRequests = [...filteredRequests].sort(
    (a, b) => a.created_at - b.created_at
  );

  // Stats
  const totalPending = pendingRequests.length;
  const waiterCount = pendingRequests.filter((r) => r.request_type === 'waiter').length;
  const waterCount = pendingRequests.filter((r) => r.request_type === 'water').length;
  const billCount = pendingRequests.filter((r) => r.request_type === 'bill').length;
  const totalResolved = requests.filter((r) => r.status === 'resolved').length;

  return (
    <div className={`min-h-screen bg-gray-900 transition-all duration-300 ${newRequestFlash ? 'ring-4 ring-amber-400 ring-inset' : ''}`}>
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center text-xl shadow-lg">
                🛎️
              </div>
              <div>
                <h1 className="text-white font-bold text-xl">Staff Dashboard</h1>
                <p className="text-gray-400 text-xs">Live Service Requests</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                soundEnabled
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-gray-700 text-gray-400 border border-gray-600'
              }`}
            >
              {soundEnabled ? '🔔' : '🔕'}
              <span className="hidden sm:inline">{soundEnabled ? 'Sound On' : 'Sound Off'}</span>
            </button>

            {/* Status Indicator */}
            <div className="flex items-center gap-2 bg-gray-700/50 px-3 py-2 rounded-lg">
              <div className="relative">
                <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full"></div>
                <div className="absolute inset-0 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></div>
              </div>
              <span className="text-emerald-400 text-sm font-medium">Live</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Pending</p>
            <p className="text-3xl font-bold text-white mt-1">{totalPending}</p>
          </div>
          <div className="bg-blue-900/30 rounded-xl p-4 border border-blue-700/30">
            <p className="text-blue-400 text-xs font-medium uppercase tracking-wider">🛎️ Waiter</p>
            <p className="text-3xl font-bold text-blue-300 mt-1">{waiterCount}</p>
          </div>
          <div className="bg-cyan-900/30 rounded-xl p-4 border border-cyan-700/30">
            <p className="text-cyan-400 text-xs font-medium uppercase tracking-wider">💧 Water</p>
            <p className="text-3xl font-bold text-cyan-300 mt-1">{waterCount}</p>
          </div>
          <div className="bg-purple-900/30 rounded-xl p-4 border border-purple-700/30">
            <p className="text-purple-400 text-xs font-medium uppercase tracking-wider">💳 Bill</p>
            <p className="text-3xl font-bold text-purple-300 mt-1">{billCount}</p>
          </div>
          <div className="bg-emerald-900/30 rounded-xl p-4 border border-emerald-700/30">
            <p className="text-emerald-400 text-xs font-medium uppercase tracking-wider">✓ Resolved</p>
            <p className="text-3xl font-bold text-emerald-300 mt-1">{totalResolved}</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            { key: 'all', label: 'All Requests', count: totalPending },
            { key: 'waiter', label: '🛎️ Waiter', count: waiterCount },
            { key: 'water', label: '💧 Water', count: waterCount },
            { key: 'bill', label: '💳 Bill', count: billCount },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                filter === tab.key
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Request Grid */}
        {sortedRequests.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">✨</div>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">All Clear!</h3>
            <p className="text-gray-500">No pending requests at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {sortedRequests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                onResolve={handleResolve}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
