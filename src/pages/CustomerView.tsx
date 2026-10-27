import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { ShopAPI, CategoryAPI, ItemAPI, TableAPI, RequestAPI, subscribeToChanges } from '../store';
import { CoffeeShop, MenuCategory, MenuItem, Table, ServiceRequest } from '../types';
import { Toast } from '../components/Toast';

export default function CustomerView() {
  const { shopId, tableId } = useParams<{ shopId: string; tableId: string }>();
  const [shop, setShop] = useState<CoffeeShop | null>(null);
  const [table, setTable] = useState<Table | null>(null);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [activeRequest, setActiveRequest] = useState<ServiceRequest | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
    return subscribeToChanges(loadData);
  }, [shopId, tableId]);

  const loadData = () => {
    if (!shopId || !tableId) return;
    const s = ShopAPI.getById(shopId);
    const t = TableAPI.getById(tableId);
    setShop(s || null);
    setTable(t || null);
    if (s) {
      const cats = CategoryAPI.getByShop(shopId).filter((c) => c.is_active);
      setCategories(cats);
      if (cats.length > 0 && !activeCategory) {
        setActiveCategory(cats[0].id);
      }
      setItems(ItemAPI.getByShop(shopId).filter((i) => i.is_available));
      setActiveRequest(RequestAPI.getActiveForTable(shopId, tableId));
    }
    setLoading(false);
  };

  const handleServiceRequest = useCallback(
    (type: 'waiter' | 'water' | 'bill') => {
      if (!shopId || !tableId || !table || activeRequest) return;
      RequestAPI.create({
        shop_id: shopId,
        table_id: tableId,
        table_number: table.table_number,
        request_type: type,
        status: 'pending',
      });
      const messages: Record<string, string> = {
        waiter: '🛎️ Waiter has been called! They\'ll be with you shortly.',
        water: '💧 Water request sent! Coming right up.',
        bill: '💳 Bill request sent! Preparing your check.',
      };
      setToast({ message: messages[type], type: 'success' });
      loadData();
    },
    [shopId, tableId, table, activeRequest]
  );

  const handleCancel = useCallback(() => {
    if (!shopId || !tableId) return;
    RequestAPI.cancel(shopId, tableId);
    setToast({ message: 'Request cancelled.', type: 'info' });
    setActiveRequest(null);
  }, [shopId, tableId]);

  const scrollToCategory = (catId: string) => {
    setActiveCategory(catId);
    const el = document.getElementById(`category-${catId}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-amber-200 border-t-amber-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm">Loading menu...</p>
        </div>
      </div>
    );
  }

  if (!shop || !table) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-5xl mb-4">😕</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Table Not Found</h2>
          <p className="text-gray-500 text-sm">This QR code may be invalid or the table has been removed.</p>
        </div>
      </div>
    );
  }

  const primaryColor = shop.primary_color || '#8B4513';

  return (
    <div className="min-h-screen bg-gray-50 pb-48">
      {/* Toast */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-md"
              style={{ background: `linear-gradient(135deg, ${primaryColor}40, ${primaryColor}20)`, border: `1px solid ${primaryColor}30` }}
            >
              {shop.logo_emoji}
            </div>
            <div>
              <h1 className="font-bold text-gray-800 text-base leading-tight">{shop.name}</h1>
              <p className="text-xs text-gray-500">
                {table.label} • {table.seats} seats
              </p>
            </div>
          </div>
          <div
            className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{ background: `${primaryColor}15`, color: primaryColor }}
          >
            Table {table.table_number}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="max-w-lg mx-auto px-4 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollToCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              style={activeCategory === cat.id ? { background: primaryColor } : {}}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Menu Content */}
      <main className="max-w-lg mx-auto px-4 pt-4">
        {categories.map((category) => {
          const categoryItems = items.filter((i) => i.category_id === category.id);
          if (categoryItems.length === 0) return null;
          return (
            <section key={category.id} id={`category-${category.id}`} className="mb-8">
              <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span className="text-xl">{category.icon}</span>
                {category.name}
              </h2>
              <div className="space-y-3">
                {categoryItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex gap-4 card-hover"
                  >
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${primaryColor}15, ${primaryColor}05)` }}
                    >
                      {item.image_emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-800 text-sm">{item.name}</h3>
                          {item.is_popular && (
                            <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-bold">
                              ★ POPULAR
                            </span>
                          )}
                        </div>
                        <span className="font-bold text-sm whitespace-nowrap" style={{ color: primaryColor }}>
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </main>

      {/* Floating Service Panel */}
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <div className="bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-2xl">
          <div className="max-w-lg mx-auto px-4 py-4">
            {activeRequest ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: `${primaryColor}10`, border: `1px solid ${primaryColor}30` }}>
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full" style={{ background: primaryColor }}></div>
                    <div className="absolute inset-0 w-3 h-3 rounded-full animate-ping" style={{ background: primaryColor }}></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: primaryColor }}>
                      {activeRequest.request_type === 'waiter' && '🛎️ Waiter Called'}
                      {activeRequest.request_type === 'water' && '💧 Water Requested'}
                      {activeRequest.request_type === 'bill' && '💳 Bill Requested'}
                    </p>
                    <p className="text-xs text-gray-500">Staff has been notified</p>
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
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleServiceRequest('waiter')}
                  className="flex flex-col items-center gap-1 py-3 px-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all active:scale-[0.96] shadow-lg shadow-blue-200"
                >
                  <span className="text-2xl">🛎️</span>
                  <span className="text-xs font-semibold">Waiter</span>
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
