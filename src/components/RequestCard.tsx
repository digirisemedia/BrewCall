import { ServiceRequest, RequestType } from '../context/RequestContext';
import { useElapsedTime } from '../hooks/useElapsedTime';

interface RequestCardProps {
  request: ServiceRequest;
  onResolve: (requestId: string) => void;
}

const requestConfig: Record<RequestType, { icon: string; label: string; color: string; bgColor: string; borderColor: string }> = {
  waiter: {
    icon: '🛎️',
    label: 'Call Waiter',
    color: 'text-blue-300',
    bgColor: 'from-blue-900/40 to-blue-800/20',
    borderColor: 'border-blue-500/30',
  },
  water: {
    icon: '💧',
    label: 'Request Water',
    color: 'text-cyan-300',
    bgColor: 'from-cyan-900/40 to-cyan-800/20',
    borderColor: 'border-cyan-500/30',
  },
  bill: {
    icon: '💳',
    label: 'Request Bill',
    color: 'text-purple-300',
    bgColor: 'from-purple-900/40 to-purple-800/20',
    borderColor: 'border-purple-500/30',
  },
};

export function RequestCard({ request, onResolve }: RequestCardProps) {
  const elapsed = useElapsedTime(request.created_at);
  const config = requestConfig[request.request_type];

  // Determine urgency
  const minutesElapsed = Math.floor((Date.now() - request.created_at) / 60000);
  const isUrgent = minutesElapsed >= 5;
  const isCritical = minutesElapsed >= 10;

  return (
    <div
      className={`relative bg-gradient-to-br ${config.bgColor} rounded-2xl p-5 border ${config.borderColor} shadow-xl transition-all hover:scale-[1.02] ${
        isCritical ? 'animate-pulse ring-2 ring-red-500/50' : ''
      }`}
    >
      {/* Urgency indicator */}
      {isUrgent && (
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
            isCritical ? 'bg-red-500 text-white animate-pulse' : 'bg-amber-500/80 text-white'
          }`}>
            {isCritical ? 'CRITICAL' : 'URGENT'}
          </span>
        </div>
      )}

      {/* Table Number */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-14 h-14 bg-gray-800/80 rounded-xl flex items-center justify-center border border-gray-600">
          <span className="text-2xl font-black text-white">{request.table_id}</span>
        </div>
        <div>
          <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Table</p>
          <p className="text-white font-bold text-lg">Table {request.table_id}</p>
        </div>
      </div>

      {/* Request Type */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">{config.icon}</span>
        <span className={`font-semibold ${config.color}`}>{config.label}</span>
      </div>

      {/* Time */}
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-gray-400 text-sm">{elapsed}</span>
      </div>

      {/* Resolve Button */}
      <button
        onClick={() => onResolve(request.id)}
        className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl transition-all active:scale-[0.97] shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
        Mark as Done
      </button>
    </div>
  );
}
