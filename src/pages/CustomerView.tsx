import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { ShopAPI, CategoryAPI, ItemAPI, TableAPI, RequestAPI, subscribeToChanges } from '../store';
import { CoffeeShop, MenuCategory, MenuItem, Table, ServiceRequest } from '../types';
import { Toast } from '../components/Toast';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { CurrencySwitcher } from '../components/CurrencySwitcher';
import { Bell, Droplets, Receipt, X, MapPin, Users } from 'lucide-react';

export default function CustomerView() {
  const { shopId, tableId } = useParams<{ shopId: string; tableId: string }>();
  const { t, dir } = useLanguage();
  const { formatPrice, convertPrice } = useCurrency();
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
    if (!shopId || !tableId) {
      setLoading(false);
      return;
    }
    
    const s = ShopAPI.getById(shopId);
    const tbl = TableAPI.getById(tableId);
    
    // Validate shop exists and is active
    if (!s || !s.is_active) {
      setShop(null);
      setTable(null);
      setLoading(false);
      return;
    }
    
    // Validate table exists and belongs to this shop
    if (!tbl || tbl.shop_id !== shopId) {
      setShop(s);
      setTable(null);
      setLoading(false);
      return;
    }
    
    setShop(s);
    setTable(tbl);
    
    // Load menu data
    const cats = CategoryAPI.getByShop(shopId).filter((c) => c.is_active);
    setCategories(cats);
    
    // Set active category to first available if not set or invalid
    if (cats.length > 0) {
      if (!activeCategory || !cats.find(c => c.id === activeCategory)) {
        setActiveCategory(cats[0].id);
      }
    }
    
    // Load available items for this shop
    const shopItems = ItemAPI.getByShop(shopId).filter((i) => i.is_available);
    setItems(shopItems);
    
    // Check for active request
    const activeReq = RequestAPI.getActiveForTable(shopId, tableId);
    setActiveRequest(activeReq);
    
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
        waiter: t('customer.waiterToast'),
        water: t('customer.waterToast'),
        bill: t('customer.billToast'),
      };
      setToast({ message: messages[type], type: 'success' });
      loadData();
    },
    [shopId, tableId, table, activeRequest]
  );

  const handleCancel = useCallback(() => {
    if (!shopId || !tableId) return;
    RequestAPI.cancel(shopId, tableId);
    setToast({ message: t('customer.cancelToast'), type: 'info' });
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
          <p className="text-gray-500 text-sm">{t('customer.loading')}</p>
        </div>
      </div>
    );
  }

  if (!shop || !table) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4" dir={dir}>
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">{t('customer.notFound')}</h2>
          <p className="text-gray-600 text-sm mb-6">
            {!shop 
              ? 'This coffee shop may have been removed or is no longer active.'
              : !table 
              ? 'This table does not exist or has been removed.'
              : t('customer.notFoundDesc')
            }
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-left">
            <p className="text-xs text-amber-800 font-semibold mb-2">Need help?</p>
            <p className="text-xs text-amber-700">
              Please ask a staff member for assistance or scan a QR code from your table.
            </p>
          </div>
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

      {/* Header - Restaurant Branding */}
      <header className="bg-white shadow-lg sticky top-0 z-40 border-b border-gray-100">
        <div className="max-w-lg mx-auto px-4 py-6">
          {/* Restaurant Logo & Name - Prominent Display */}
          <div className="text-center mb-4">
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center text-5xl shadow-xl mx-auto mb-3"
              style={{ background: `linear-gradient(135deg, ${primaryColor}40, ${primaryColor}20)`, border: `3px solid ${primaryColor}30` }}
            >
              {shop.logo_emoji}
            </div>
            <h1 className="font-bold text-gray-800 text-2xl leading-tight mb-1">{shop.name}</h1>
            {shop.tagline && (
              <p className="text-sm text-gray-500">{shop.tagline}</p>
            )}
          </div>

          {/* Table Info Card */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4 mb-3 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
                  style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}CC)`, color: 'white' }}
                >
                  <span className="text-2xl font-black">{table.table_number}</span>
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-base">{table.label}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {table.seats} {t('customer.seats')}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {table.location}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CurrencySwitcher variant="light" />
                <LanguageSwitcher variant="light" />
              </div>
            </div>
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
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                    ) : (
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                        style={{ background: `linear-gradient(135deg, ${primaryColor}15, ${primaryColor}05)` }}
                      >
                        {item.image_emoji}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-800 text-sm">{item.name}</h3>
                          {item.is_popular && (
                            <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-bold">
                              {t('customer.popular')}
                            </span>
                          )}
                        </div>
                        <span className="font-bold text-sm whitespace-nowrap" style={{ color: primaryColor }}>
                          {formatPrice(item.price)}
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

      {/* Centered Cancel Modal - When Request is Active */}
      {activeRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-scale-in">
            {/* Animated Icon */}
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: primaryColor }}></div>
              <div className="relative w-24 h-24 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${primaryColor}20, ${primaryColor}10)`, border: `3px solid ${primaryColor}40` }}>
                {activeRequest.request_type === 'waiter' && <Bell className="w-12 h-12" style={{ color: primaryColor }} />}
                {activeRequest.request_type === 'water' && <Droplets className="w-12 h-12" style={{ color: primaryColor }} />}
                {activeRequest.request_type === 'bill' && <Receipt className="w-12 h-12" style={{ color: primaryColor }} />}
              </div>
            </div>

            {/* Status Message */}
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {activeRequest.request_type === 'waiter' && t('customer.waiterCalled')}
                {activeRequest.request_type === 'water' && t('customer.waterRequested')}
                {activeRequest.request_type === 'bill' && t('customer.billRequested')}
              </h3>
              <p className="text-sm text-gray-600">{t('customer.staffNotified')}</p>
            </div>

            {/* Cancel Button - Centered and Prominent */}
            <button
              onClick={handleCancel}
              className="w-full py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-2xl transition-all active:scale-[0.98] shadow-xl shadow-red-300/50 text-base flex items-center justify-center gap-2"
            >
              <X className="w-5 h-5" />
              {t('customer.cancelRequest')}
            </button>
          </div>
        </div>
      )}

      {/* Floating Service Panel - Only Show When No Active Request */}
      {!activeRequest && (
        <div className="fixed bottom-0 left-0 right-0 z-40">
          <div className="bg-gradient-to-t from-white via-white to-white/95 backdrop-blur-lg border-t border-gray-200 shadow-2xl">
            <div className="max-w-lg mx-auto px-4 py-5">
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleServiceRequest('waiter')}
                  className="group flex flex-col items-center gap-3 py-6 px-3 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl transition-all active:scale-[0.95] shadow-xl shadow-blue-400/40 hover:shadow-blue-500/60 hover:-translate-y-1"
                >
                  <Bell className="w-10 h-10 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                  <span className="text-sm font-bold">{t('customer.waiter')}</span>
                </button>
                <button
                  onClick={() => handleServiceRequest('water')}
                  className="group flex flex-col items-center gap-3 py-6 px-3 bg-gradient-to-br from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white rounded-2xl transition-all active:scale-[0.95] shadow-xl shadow-cyan-400/40 hover:shadow-cyan-500/60 hover:-translate-y-1"
                >
                  <Droplets className="w-10 h-10 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                  <span className="text-sm font-bold">{t('customer.water')}</span>
                </button>
                <button
                  onClick={() => handleServiceRequest('bill')}
                  className="group flex flex-col items-center gap-3 py-6 px-3 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-2xl transition-all active:scale-[0.95] shadow-xl shadow-purple-400/40 hover:shadow-purple-500/60 hover:-translate-y-1"
                >
                  <Receipt className="w-10 h-10 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                  <span className="text-sm font-bold">{t('customer.bill')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
