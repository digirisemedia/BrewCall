import { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useRequests, RequestType } from '../context/RequestContext';
import { menuData } from '../data/menuData';
import { Toast } from '../components/Toast';

export default function CustomerView() {
  const { tableId } = useParams<{ tableId: string }>();
  const tableNumber = parseInt(tableId || '1', 10);
  const { createRequest, cancelRequest, getActiveRequestForTable } = useRequests();
  const [activeCategory, setActiveCategory] = useState(menuData[0].id);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

  const activeRequest = getActiveRequestForTable(tableNumber);

  const handleServiceRequest = useCallback(
    (type: RequestType) => {
      if (activeRequest) return;
      createRequest(tableNumber, type);
      const messages: Record<RequestType, string> = {
        waiter: '🛎️ Waiter has been called! They\'ll be with you shortly.',
        water: '💧 Water request sent! Coming right up.',
        bill: '💳 Bill request sent! Preparing your check.',
      };
      setToast({ message: messages[type], type: 'success' });
    },
    [activeRequest, createRequest, tableNumber]
  );

  const handleCancel = useCallback(() => {
    cancelRequest(tableNumber);
    setToast({ message: 'Request cancelled.', type: 'info' });
  }, [cancelRequest, tableNumber]);

  const scrollToCategory = (catId: string) => {
    setActiveCategory(catId);
    const el = document.getElementById(`category-${catId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-48">
      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍽️</span>
            <div>
              <h1 className="font-bold text-gray-800 text-lg leading-tight">La Bella Cucina</h1>
              <p className="text-xs text-gray-500">Table {tableNumber}</p>
            </div>
          </div>
          <div className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
            Digital Menu
          </div>
        </div>

        {/* Category Tabs */}
        <div className="max-w-lg mx-auto px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
          {menuData.map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollToCategory(cat.id)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Menu Content */}
      <main className="max-w-lg mx-auto px-4 pt-4">
        {menuData.map((category) => (
          <section key={category.id} id={`category-${category.id}`} className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-xl">{category.icon}</span>
              {category.name}
            </h2>
            <div className="space-y-3">
              {category.items.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex gap-4 ${
                    !item.is_available ? 'opacity-50' : ''
                  }`}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                    {item.image_url}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-gray-800 text-sm">{item.name}</h3>
                      <span className="font-bold text-orange-600 text-sm whitespace-nowrap">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                    {!item.is_available && (
                      <span className="text-xs text-red-500 font-medium mt-1">Unavailable</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Floating Service Panel */}
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <div className="bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-2xl">
          <div className="max-w-lg mx-auto px-4 py-4">
            {activeRequest ? (
              /* Active Request State */
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                  <div className="relative">
                    <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-amber-500 rounded-full animate-ping"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-amber-800">
                      {activeRequest.request_type === 'waiter' && '🛎️ Waiter Called'}
                      {activeRequest.request_type === 'water' && '💧 Water Requested'}
                      {activeRequest.request_type === 'bill' && '💳 Bill Requested'}
                    </p>
                    <p className="text-xs text-amber-600">Staff has been notified</p>
                  </div>
                </div>
                <button
                  onClick={handleCancel}
                  className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-red-200"
                >
                  ✕ Cancel Request
                </button>
              </div>
            ) : (
              /* Service Buttons */
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleServiceRequest('waiter')}
                  className="flex flex-col items-center gap-1 py-3 px-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all active:scale-[0.96] shadow-lg shadow-blue-200"
                >
                  <span className="text-2xl">🛎️</span>
                  <span className="text-xs font-semibold">Call Waiter</span>
                </button>
                <button
                  onClick={() => handleServiceRequest('water')}
                  className="flex flex-col items-center gap-1 py-3 px-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl transition-all active:scale-[0.96] shadow-lg shadow-cyan-200"
                >
                  <span className="text-2xl">💧</span>
                  <span className="text-xs font-semibold">Water</span>
                </button>
                <button
                  onClick={() => handleServiceRequest('bill')}
                  className="flex flex-col items-center gap-1 py-3 px-2 bg-purple-500 hover:bg-purple-600 text-white rounded-xl transition-all active:scale-[0.96] shadow-lg shadow-purple-200"
                >
                  <span className="text-2xl">💳</span>
                  <span className="text-xs font-semibold">Bill</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
