import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { ShopAPI, CategoryAPI, ItemAPI, TableAPI, RequestAPI, WalletAPI, subscribeToChanges } from '../store';
import { CoffeeShop, MenuCategory, MenuItem, Table, ServiceRequest } from '../types';
import { useElapsedTime } from '../hooks/useElapsedTime';
import { playNotificationSound, playSuccessSound, startContinuousAlert, stopContinuousAlert } from '../utils/audio';
import { QRCodeSVG } from 'qrcode.react';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { CurrencySwitcher } from '../components/CurrencySwitcher';
import {
  LogOut, LayoutDashboard, Store, UtensilsCrossed, Grid3X3, Bell,
  Plus, Trash2, Edit3, X, Check, QrCode, Eye, EyeOff, Clock, Image,
  Wallet, TrendingUp, TrendingDown
} from 'lucide-react';

type Tab = 'overview' | 'profile' | 'menu' | 'tables' | 'requests';

export default function ShopAdminDashboard() {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const { formatPrice, convertPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [shop, setShop] = useState<CoffeeShop | null>(null);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [tables, setTables] = useState<Table[]>([]);
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [pendingRequests, setPendingRequests] = useState<ServiceRequest[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const prevPendingCount = useState(0);

  useEffect(() => {
    loadData();
    return subscribeToChanges(loadData);
  }, []);

  useEffect(() => {
    if (pendingRequests.length > prevPendingCount[0] && soundEnabled && activeTab === 'requests') {
      playNotificationSound();
    }
    prevPendingCount[1](pendingRequests.length);
    
    // Start continuous alert when there are pending requests
    if (pendingRequests.length > 0 && soundEnabled) {
      startContinuousAlert();
    } else {
      stopContinuousAlert();
    }
  }, [pendingRequests.length, soundEnabled]);
  
  // Stop continuous alert when component unmounts or tab changes
  useEffect(() => {
    if (activeTab !== 'requests') {
      stopContinuousAlert();
    }
    return () => {
      stopContinuousAlert();
    };
  }, [activeTab]);

  const loadData = () => {
    if (!user?.shop_id) return;
    const s = ShopAPI.getById(user.shop_id);
    setShop(s || null);
    setCategories(CategoryAPI.getByShop(user.shop_id));
    setItems(ItemAPI.getByShop(user.shop_id));
    setTables(TableAPI.getByShop(user.shop_id));
    setRequests(RequestAPI.getByShop(user.shop_id));
    setPendingRequests(RequestAPI.getPendingByShop(user.shop_id));
  };

  const tabs = [
    { id: 'overview' as Tab, label: t('shop.overview'), icon: LayoutDashboard },
    { id: 'requests' as Tab, label: t('shop.requests'), icon: Bell, badge: pendingRequests.length },
    { id: 'menu' as Tab, label: t('shop.menu'), icon: UtensilsCrossed },
    { id: 'tables' as Tab, label: t('shop.tables'), icon: Grid3X3 },
    { id: 'profile' as Tab, label: t('shop.profile'), icon: Store },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-gray-900/50 border-r border-white/5 p-6 flex flex-col z-40 hidden lg:flex">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-lg"
            style={{ background: shop ? `linear-gradient(135deg, ${shop.primary_color}60, ${shop.primary_color}30)` : 'linear-gradient(135deg, #f59e0b, #d97706)' }}
          >
            {shop?.logo_emoji || '☕'}
          </div>
          <div className="min-w-0">
            <p className="font-bold text-sm truncate">{shop?.name || t('common.loading')}</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">{t('admin.shopAdmin')}</p>
          </div>
        </div>
        <div className="mb-6 flex items-center gap-2">
          <CurrencySwitcher />
          <LanguageSwitcher />
        </div>

        <nav className="flex-1 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all text-left ${
                activeTab === tab.id
                  ? 'bg-violet-600/20 text-violet-300 border border-violet-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-sm font-medium flex-1">{tab.label}</span>
              {tab.badge ? (
                <span className="w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce-gentle">
                  {tab.badge}
                </span>
              ) : null}
            </button>
          ))}
        </nav>

        <div className="border-t border-white/5 pt-4">
          <div className="flex items-center gap-3 px-3 py-2 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-xs font-bold">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-[10px] text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 w-full px-4 py-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" />
            {t('common.signOut')}
          </button>
        </div>
      </aside>

      {/* Mobile Tab Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-lg border-t border-white/10 px-2 py-2">
        <div className="flex justify-around">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-all relative ${
                activeTab === tab.id ? 'text-violet-400' : 'text-gray-500'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-[9px] font-medium">{tab.label}</span>
              {tab.badge ? (
                <span className="absolute -top-0.5 right-1 w-4 h-4 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                  {tab.badge}
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-4 lg:p-8 pb-24 lg:pb-8">
        {activeTab === 'overview' && <OverviewTab shop={shop} categories={categories} items={items} tables={tables} requests={requests} pendingRequests={pendingRequests} />}
        {activeTab === 'profile' && <ProfileTab shop={shop} onUpdate={loadData} />}
        {activeTab === 'menu' && <MenuTab shop={shop} categories={categories} items={items} onUpdate={loadData} />}
        {activeTab === 'tables' && <TablesTab shop={shop} tables={tables} onUpdate={loadData} />}
        {activeTab === 'requests' && (
          <RequestsTab
            shop={shop}
            pendingRequests={pendingRequests}
            allRequests={requests}
            onResolve={(id: string) => { RequestAPI.resolve(id); playSuccessSound(); loadData(); }}
            soundEnabled={soundEnabled}
            onToggleSound={() => setSoundEnabled(!soundEnabled)}
          />
        )}
      </main>
    </div>
  );
}

// ==========================================
// Overview Tab
// ==========================================
function OverviewTab({ shop, categories, items, tables, requests, pendingRequests }: any) {
  const stats = shop ? RequestAPI.getStats(shop.id) : { pending: 0, today: 0, total: 0, resolved: 0 };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Welcome back! Here's what's happening at {shop?.name}.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Pending Requests', value: stats.pending, icon: Bell, color: 'from-red-500 to-orange-500' },
          { label: 'Today\'s Requests', value: stats.today, icon: Clock, color: 'from-blue-500 to-indigo-500' },
          { label: 'Menu Items', value: items.length, icon: UtensilsCrossed, color: 'from-emerald-500 to-teal-500' },
          { label: 'Active Tables', value: tables.filter((t: Table) => t.is_active).length, icon: Grid3X3, color: 'from-violet-500 to-purple-500' },
        ].map((stat, i) => (
          <div key={i} className="glass rounded-2xl p-5 card-hover animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-3 shadow-lg`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="glass rounded-2xl p-6">
        <h3 className="font-bold text-lg mb-4">Recent Requests</h3>
        {requests.slice(0, 5).map((req: ServiceRequest) => (
          <div key={req.id} className="flex items-center gap-3 py-3 border-b border-white/5 last:border-0">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
              req.request_type === 'waiter' ? 'bg-blue-500/20' :
              req.request_type === 'water' ? 'bg-cyan-500/20' : 'bg-purple-500/20'
            }`}>
              {req.request_type === 'waiter' ? '🛎️' : req.request_type === 'water' ? '💧' : '💳'}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Table {req.table_number}</p>
              <p className="text-xs text-gray-500 capitalize">{req.request_type}</p>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              req.status === 'pending' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
            }`}>
              {req.status}
            </span>
          </div>
        ))}
        {requests.length === 0 && (
          <p className="text-gray-500 text-sm text-center py-8">No requests yet</p>
        )}
      </div>
    </div>
  );
}

// ==========================================
// Profile Tab
// ==========================================
function ProfileTab({ shop, onUpdate }: { shop: CoffeeShop | null; onUpdate: () => void }) {
  const { formatPrice, t } = useLanguage();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<CoffeeShop | null>(null);
  const [showTopUp, setShowTopUp] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [newPayment, setNewPayment] = useState<{ type: 'cash_plus' | 'bank_transfer' | 'credit_card' | 'paypal'; label: string; details: string }>({
    type: 'cash_plus',
    label: '',
    details: '',
  });

  useEffect(() => {
    if (shop) {
      setForm({ ...shop });
    }
  }, [shop]);

  const handleSave = () => {
    if (!shop || !form) return;
    ShopAPI.update(shop.id, form);
    setEditing(false);
    onUpdate();
  };

  const handleCancel = () => {
    if (shop) {
      setForm({ ...shop });
    }
    setEditing(false);
  };

  const handleTopUp = () => {
    if (!shop || !topUpAmount) return;
    const amount = parseFloat(topUpAmount);
    if (amount <= 0) return;
    
    const defaultMethod = shop.payment_methods.find(m => m.is_default);
    WalletAPI.topUp(shop.id, amount, defaultMethod?.type);
    setTopUpAmount('');
    setShowTopUp(false);
    onUpdate();
  };

  const handleAddPayment = () => {
    if (!shop || !newPayment.label) return;
    WalletAPI.addPaymentMethod(shop.id, {
      ...newPayment,
      is_default: shop.payment_methods.length === 0,
    });
    setNewPayment({ type: 'cash_plus', label: '', details: '' });
    setShowAddPayment(false);
    onUpdate();
  };

  const handleRemovePayment = (methodId: string) => {
    if (!shop) return;
    WalletAPI.removePaymentMethod(shop.id, methodId);
    onUpdate();
  };

  if (!shop || !form) return null;

  const transactions = WalletAPI.getTransactions(shop.id);

  return (
    <div className="animate-fade-in max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">{t('shop.shopProfile')}</h1>
          <p className="text-gray-400 text-sm mt-1">{t('shop.manageInfo')}</p>
        </div>
        {!editing ? (
          <button onClick={() => setEditing(true)} className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl text-sm font-medium hover:bg-white/20 transition-colors">
            <Edit3 className="w-4 h-4" /> {t('common.edit')}
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={handleCancel} className="px-4 py-2 bg-white/10 rounded-xl text-sm font-medium hover:bg-white/20">{t('common.cancel')}</button>
            <button onClick={handleSave} className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl text-sm font-medium">{t('common.save')}</button>
          </div>
        )}
      </div>

      <div className="glass rounded-2xl p-6 space-y-6">
        {/* Logo & Name */}
        <div className="flex items-center gap-4">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-xl"
            style={{ background: `linear-gradient(135deg, ${form.primary_color}40, ${form.primary_color}20)`, border: `2px solid ${form.primary_color}30` }}
          >
            {form.logo_emoji}
          </div>
          <div className="flex-1">
            {editing ? (
              <div className="grid grid-cols-2 gap-3">
                <input value={form.logo_emoji} onChange={(e) => setForm({ ...form, logo_emoji: e.target.value })} className="input-dark" placeholder="Emoji" />
                <input type="color" value={form.primary_color} onChange={(e) => setForm({ ...form, primary_color: e.target.value })} className="input-dark h-[46px] p-1" />
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold">{form.name}</h2>
                <p className="text-gray-400 text-sm">{form.tagline}</p>
              </>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: t('admin.shopName'), key: 'name' },
            { label: t('admin.tagline'), key: 'tagline' },
            { label: t('admin.address'), key: 'address' },
            { label: t('admin.phone'), key: 'phone' },
            { label: t('admin.shopEmail'), key: 'email' },
          ].map((field) => (
            <div key={field.key}>
              <label className="block text-xs font-medium text-gray-400 mb-1">{field.label}</label>
              {editing ? (
                <input
                  value={(form as any)[field.key] || ''}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value } as CoffeeShop)}
                  className="input-dark"
                />
              ) : (
                <p className="text-white py-2">{(form as any)[field.key] || '—'}</p>
              )}
            </div>
          ))}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">{t('admin.description')}</label>
          {editing ? (
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value } as CoffeeShop)}
              className="input-dark resize-none h-24"
            />
          ) : (
            <p className="text-white">{form.description || '—'}</p>
          )}
        </div>

        {/* Social Media Links */}
        <div className="pt-4 border-t border-white/5">
          <h3 className="text-sm font-medium mb-4">{t('shop.socialMedia')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Google Business */}
            <div>
              <label className="flex items-center gap-2 text-xs font-medium text-gray-400 mb-1">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google Business
              </label>
              {editing ? (
                <input
                  value={form.google_business || ''}
                  onChange={(e) => setForm({ ...form, google_business: e.target.value } as CoffeeShop)}
                  className="input-dark"
                  placeholder="https://g.page/your-business"
                />
              ) : (
                <p className="text-white py-2 text-sm">{form.google_business || '—'}</p>
              )}
            </div>

            {/* Instagram */}
            <div>
              <label className="flex items-center gap-2 text-xs font-medium text-gray-400 mb-1">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="url(#instagram-gradient)">
                  <defs>
                    <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FD5949"/>
                      <stop offset="50%" stopColor="#D6249F"/>
                      <stop offset="100%" stopColor="#285AEB"/>
                    </linearGradient>
                  </defs>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Instagram
              </label>
              {editing ? (
                <input
                  value={form.instagram || ''}
                  onChange={(e) => setForm({ ...form, instagram: e.target.value } as CoffeeShop)}
                  className="input-dark"
                  placeholder="https://instagram.com/yourshop"
                />
              ) : (
                <p className="text-white py-2 text-sm">{form.instagram || '—'}</p>
              )}
            </div>

            {/* Facebook */}
            <div>
              <label className="flex items-center gap-2 text-xs font-medium text-gray-400 mb-1">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </label>
              {editing ? (
                <input
                  value={form.facebook || ''}
                  onChange={(e) => setForm({ ...form, facebook: e.target.value } as CoffeeShop)}
                  className="input-dark"
                  placeholder="https://facebook.com/yourshop"
                />
              ) : (
                <p className="text-white py-2 text-sm">{form.facebook || '—'}</p>
              )}
            </div>

            {/* TikTok */}
            <div>
              <label className="flex items-center gap-2 text-xs font-medium text-gray-400 mb-1">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
                TikTok
              </label>
              {editing ? (
                <input
                  value={form.tiktok || ''}
                  onChange={(e) => setForm({ ...form, tiktok: e.target.value } as CoffeeShop)}
                  className="input-dark"
                  placeholder="https://tiktok.com/@yourshop"
                />
              ) : (
                <p className="text-white py-2 text-sm">{form.tiktok || '—'}</p>
              )}
            </div>
          </div>
        </div>

        {/* Wallet & Payment */}
        <div className="pt-4 border-t border-white/5">
          <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
            <Wallet className="w-4 h-4 text-emerald-400" />
            {t('shop.walletPayment')}
          </h3>
          
          {/* Wallet Balance */}
          <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">{t('shop.currentBalance')}</span>
              <button
                onClick={() => setShowTopUp(true)}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-medium"
              >
                + {t('shop.topUp')}
              </button>
            </div>
            <p className="text-3xl font-bold text-emerald-400">{formatPrice(shop.wallet_balance)}</p>
          </div>

          {/* Payment Methods */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-gray-400">{t('shop.paymentMethods')}</span>
              <button
                onClick={() => setShowAddPayment(true)}
                className="text-xs text-violet-400 hover:text-violet-300 font-medium"
              >
                + {t('shop.addMethod')}
              </button>
            </div>
            <div className="space-y-2">
              {shop.payment_methods.map((method) => (
                <div key={method.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-indigo-500/10 rounded-lg flex items-center justify-center">
                    {method.type === 'cash_plus' && <span className="text-sm">💵</span>}
                    {method.type === 'bank_transfer' && <span className="text-sm">🏦</span>}
                    {method.type === 'credit_card' && <span className="text-sm">💳</span>}
                    {method.type === 'paypal' && <span className="text-sm">🅿️</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{method.label}</p>
                    <p className="text-xs text-gray-400 truncate">{method.details || 'No details'}</p>
                  </div>
                  {method.is_default && (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                      DEFAULT
                    </span>
                  )}
                  <button
                    onClick={() => handleRemovePayment(method.id)}
                    className="p-1 text-gray-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {shop.payment_methods.length === 0 && (
                <p className="text-xs text-gray-500 text-center py-4">No payment methods added</p>
              )}
            </div>
          </div>

          {/* Recent Transactions */}
          <div>
            <span className="text-xs font-medium text-gray-400 mb-3 block">{t('shop.recentTransactions')}</span>
            <div className="space-y-2">
              {transactions.slice(0, 5).map((txn) => (
                <div key={txn.id} className="flex items-center gap-3 p-2 bg-white/5 rounded-lg">
                  <div className={`w-6 h-6 rounded flex items-center justify-center ${
                    txn.type === 'top_up' ? 'bg-emerald-500/20' : 'bg-red-500/20'
                  }`}>
                    {txn.type === 'top_up' ? (
                      <TrendingUp className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{txn.description}</p>
                    <p className="text-[10px] text-gray-500">{new Date(txn.created_at).toLocaleDateString()}</p>
                  </div>
                  <span className={`text-xs font-bold ${
                    txn.type === 'top_up' ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {txn.type === 'top_up' ? '+' : '-'}{formatPrice(txn.amount)}
                  </span>
                </div>
              ))}
              {transactions.length === 0 && (
                <p className="text-xs text-gray-500 text-center py-2">No transactions yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Subscription */}
        <div className="pt-4 border-t border-white/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{t('shop.subscription')}</p>
              <p className="text-xs text-gray-400 capitalize">{form.subscription_plan}</p>
            </div>
            <span className="px-3 py-1 bg-violet-500/20 text-violet-300 text-xs font-bold rounded-full uppercase">
              {form.subscription_plan}
            </span>
          </div>
        </div>
      </div>

      {/* Top-Up Modal */}
      {showTopUp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setShowTopUp(false)}>
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 w-full max-w-sm animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-4">{t('shop.topUp')}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">{t('shop.amount')} ({t('currency.symbol')})</label>
                <input
                  type="number"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  className="input-dark"
                  placeholder="100"
                  min="1"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[50, 100, 200].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setTopUpAmount(amount.toString())}
                    className="py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors"
                  >
                    {amount} MAD
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowTopUp(false)}
                  className="flex-1 py-2.5 bg-white/10 rounded-xl text-sm font-medium hover:bg-white/20 transition-colors"
                >
                  {t('common.cancel')}
                </button>
                <button
                  onClick={handleTopUp}
                  className="flex-1 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-sm font-medium hover:from-emerald-600 hover:to-teal-700 transition-all"
                >
                  {t('shop.topUp')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Payment Method Modal */}
      {showAddPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setShowAddPayment(false)}>
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 w-full max-w-sm animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-4">{t('shop.addMethod')}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Payment Type</label>
                <select
                  value={newPayment.type}
                  onChange={(e) => setNewPayment({ ...newPayment, type: e.target.value as any })}
                  className="input-dark"
                >
                  <option value="cash_plus">{t('shop.cashPlus')}</option>
                  <option value="bank_transfer">{t('shop.bankTransfer')}</option>
                  <option value="credit_card">{t('shop.creditCard')}</option>
                  <option value="paypal">{t('shop.paypal')}</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">{t('shop.label')}</label>
                <input
                  value={newPayment.label}
                  onChange={(e) => setNewPayment({ ...newPayment, label: e.target.value })}
                  className="input-dark"
                  placeholder="My Cash Plus Account"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">{t('shop.details')}</label>
                <input
                  value={newPayment.details}
                  onChange={(e) => setNewPayment({ ...newPayment, details: e.target.value })}
                  className="input-dark"
                  placeholder={t('shop.accountNumber')}
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowAddPayment(false)}
                  className="flex-1 py-2.5 bg-white/10 rounded-xl text-sm font-medium hover:bg-white/20 transition-colors"
                >
                  {t('common.cancel')}
                </button>
                <button
                  onClick={handleAddPayment}
                  className="flex-1 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl text-sm font-medium hover:from-violet-700 hover:to-indigo-700 transition-all"
                >
                  {t('shop.addMethod')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// Menu Tab
// ==========================================
function MenuTab({ shop, categories, items, onUpdate }: { shop: CoffeeShop | null; categories: MenuCategory[]; items: MenuItem[]; onUpdate: () => void }) {
  const { t, formatPrice } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('☕');
  const [newItem, setNewItem] = useState({ name: '', description: '', price: '', image_emoji: '☕', image_url: '', is_popular: false });
  const [imagePreview, setImagePreview] = useState<string>('');

  // Ensure selected category is always valid
  useEffect(() => {
    if (categories.length > 0 && !categories.find(c => c.id === selectedCategory)) {
      setSelectedCategory(categories[0].id);
    }
  }, [categories, selectedCategory]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Image size must be less than 2MB');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setNewItem({ ...newItem, image_url: base64 });
      setImagePreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setNewItem({ ...newItem, image_url: '' });
    setImagePreview('');
  };

  if (!shop) return null;

  const categoryItems = items.filter((i) => i.category_id === selectedCategory);

  const addCategory = () => {
    if (!newCatName) return;
    CategoryAPI.create({ shop_id: shop.id, name: newCatName, icon: newCatIcon, order: categories.length + 1, is_active: true });
    setNewCatName('');
    setShowAddCategory(false);
    onUpdate();
  };

  const addItem = () => {
    if (!newItem.name || !newItem.price || !selectedCategory) return;
    ItemAPI.create({
      shop_id: shop.id,
      category_id: selectedCategory,
      name: newItem.name,
      description: newItem.description,
      price: parseFloat(newItem.price),
      image_emoji: newItem.image_emoji,
      image_url: newItem.image_url || undefined,
      is_available: true,
      is_popular: newItem.is_popular,
    });
    setNewItem({ name: '', description: '', price: '', image_emoji: '☕', image_url: '', is_popular: false });
    setShowAddItem(false);
    onUpdate();
  };

  const toggleItemAvailability = (itemId: string, current: boolean) => {
    ItemAPI.update(itemId, { is_available: !current });
    onUpdate();
  };

  const deleteItem = (itemId: string) => {
    ItemAPI.delete(itemId);
    onUpdate();
  };

  const deleteCategory = (catId: string) => {
    CategoryAPI.delete(catId);
    if (selectedCategory === catId && categories.length > 1) {
      setSelectedCategory(categories.find((c) => c.id !== catId)?.id || '');
    }
    onUpdate();
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Menu Management</h1>
          <p className="text-gray-400 text-sm mt-1">Organize your menu categories and items</p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Categories Section - Horizontal on mobile, sidebar on desktop */}
        <div className="w-full">
          <div className="glass rounded-2xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm">Categories</h3>
              <button onClick={() => setShowAddCategory(true)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {showAddCategory && (
              <div className="mb-3 p-3 bg-white/5 rounded-xl space-y-3 animate-fade-in">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Category Name *</label>
                  <input 
                    value={newCatName} 
                    onChange={(e) => setNewCatName(e.target.value)} 
                    className="w-full input-dark" 
                    placeholder="e.g., Hot Drinks, Pastries, etc." 
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Emoji Icon</label>
                  <input 
                    value={newCatIcon} 
                    onChange={(e) => setNewCatIcon(e.target.value)} 
                    className="w-full input-dark text-center text-2xl" 
                    maxLength={2} 
                    placeholder="☕"
                  />
                  <p className="text-[10px] text-gray-500 mt-1">Paste an emoji or type one (e.g., ☕ 🥐 🍰)</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={addCategory} className="flex-1 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg text-xs font-medium transition-colors">Add Category</button>
                  <button onClick={() => { setShowAddCategory(false); setNewCatName(''); setNewCatIcon('☕'); }} className="flex-1 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium transition-colors">Cancel</button>
                </div>
              </div>
            )}

            {/* Horizontal scroll on mobile, grid on desktop */}
            <div className="flex gap-2 overflow-x-auto pb-2 lg:grid lg:grid-cols-1 lg:gap-1 scrollbar-hide">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-all group whitespace-nowrap flex-shrink-0 lg:whitespace-normal lg:flex-shrink ${
                    selectedCategory === cat.id ? 'bg-violet-600/20 text-violet-300 border border-violet-500/20' : 'hover:bg-white/5 text-gray-400'
                  }`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <span className="text-lg">{cat.icon}</span>
                  <span className="text-sm font-medium flex-1">{cat.name}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteCategory(cat.id); }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded transition-all"
                  >
                    <Trash2 className="w-3 h-3 text-red-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">
              {categories.find((c) => c.id === selectedCategory)?.name || 'Select a category'} Items
            </h3>
            <button
              onClick={() => setShowAddItem(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl text-sm font-medium shadow-lg shadow-violet-500/20"
            >
              <Plus className="w-4 h-4" /> Add Item
            </button>
          </div>

          {showAddItem && (
            <div className="glass rounded-2xl p-5 mb-4 animate-fade-in">
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">{t('shop.itemName')}</label>
                  <input value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} className="input-dark" placeholder="e.g., Cappuccino" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">{t('shop.price')}</label>
                  <div className="relative">
                    <input 
                      value={newItem.price} 
                      onChange={(e) => {
                        const value = e.target.value;
                        // Allow only numbers and one decimal point
                        if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
                          setNewItem({ ...newItem, price: value });
                        }
                      }}
                      className="input-dark pr-12" 
                      placeholder="0.00" 
                      type="text"
                      inputMode="decimal"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-medium">
                      MAD
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Emoji Icon</label>
                  <input value={newItem.image_emoji} onChange={(e) => setNewItem({ ...newItem, image_emoji: e.target.value })} className="input-dark text-center" maxLength={2} placeholder="☕" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Category</label>
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="input-dark"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <input value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} className="input-dark mb-3" placeholder={t('shop.itemDesc')} />
              
              {/* Image Upload Section */}
              <div className="mb-3">
                <label className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                  <Image className="w-3 h-3" /> {t('shop.itemImage')}
                </label>
                
                {/* Image Preview */}
                {imagePreview && (
                  <div className="relative mb-3 inline-block">
                    <img src={imagePreview} alt="Preview" className="w-24 h-24 rounded-xl object-cover border-2 border-violet-500/30" />
                    <button
                      type="button"
                      onClick={clearImage}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                )}
                
                {/* Upload Options */}
                <div className="space-y-2">
                  {/* File Upload */}
                  <label className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:bg-white/10 hover:border-violet-500/30 transition-all">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-sm text-gray-300">Upload Image (max 2MB)</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  
                  {/* OR divider */}
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <div className="flex-1 h-px bg-white/10"></div>
                    <span>OR</span>
                    <div className="flex-1 h-px bg-white/10"></div>
                  </div>
                  
                  {/* URL Input */}
                  <input
                    value={newItem.image_url.startsWith('data:') ? '' : newItem.image_url}
                    onChange={(e) => {
                      setNewItem({ ...newItem, image_url: e.target.value });
                      setImagePreview(e.target.value);
                    }}
                    className="input-dark"
                    placeholder="Paste image URL..."
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 mb-3">
                <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                  <input type="checkbox" checked={newItem.is_popular} onChange={(e) => setNewItem({ ...newItem, is_popular: e.target.checked })} className="rounded" />
                  {t('shop.popularItem')}
                </label>
              </div>
              <div className="flex gap-2">
                <button onClick={addItem} className="px-4 py-2 bg-violet-600 rounded-lg text-sm font-medium">{t('common.add')}</button>
                <button onClick={() => { setShowAddItem(false); clearImage(); }} className="px-4 py-2 bg-white/10 rounded-lg text-sm font-medium">{t('common.cancel')}</button>
              </div>
            </div>
          )}

          {/* Responsive grid for items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {categoryItems.map((item, i) => (
              <div key={item.id} className={`glass rounded-xl p-4 card-hover animate-fade-in-up ${!item.is_available ? 'opacity-50' : ''}`} style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="flex items-start gap-3">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-500/20 to-orange-500/10 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                      {item.image_emoji}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-sm">{item.name}</h4>
                      {item.is_popular && <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded-full font-bold">POPULAR</span>}
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-2 mb-2">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-400 text-sm">{formatPrice(item.price)}</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => toggleItemAvailability(item.id, item.is_available)}
                          className={`p-1.5 rounded-lg transition-colors ${item.is_available ? 'text-emerald-400 hover:bg-emerald-500/10' : 'text-gray-500 hover:bg-white/5'}`}
                        >
                          {item.is_available ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                        <button onClick={() => deleteItem(item.id)} className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {categoryItems.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p className="text-4xl mb-2">🍽️</p>
              <p className="text-sm">No items in this category yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Tables Tab
// ==========================================
function TablesTab({ shop, tables, onUpdate }: { shop: CoffeeShop | null; tables: Table[]; onUpdate: () => void }) {
  const { t } = useLanguage();
  const [showAddTable, setShowAddTable] = useState(false);
  const [showQR, setShowQR] = useState<Table | null>(null);
  const [newTable, setNewTable] = useState({ table_number: '', label: '', seats: '2', location: 'Indoor' });

  if (!shop) return null;

  const addTable = () => {
    if (!newTable.table_number) return;
    const newTableData = TableAPI.create({
      shop_id: shop.id,
      table_number: parseInt(newTable.table_number),
      label: newTable.label || `Table ${newTable.table_number}`,
      seats: parseInt(newTable.seats) || 2,
      location: newTable.location,
      is_active: true,
    });
    setNewTable({ table_number: '', label: '', seats: '2', location: 'Indoor' });
    setShowAddTable(false);
    onUpdate();
    // Show success message with the new table
    alert(`Table ${newTableData.table_number} created successfully! You can now view and test the QR code.`);
  };

  const deleteTable = (id: string) => {
    TableAPI.delete(id);
    onUpdate();
  };

  const getQRUrl = (table: Table) => {
    return `${window.location.origin}${window.location.pathname}#/customer/${shop.id}/${table.id}`;
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Tables & QR Codes</h1>
          <p className="text-gray-400 text-sm mt-1">Manage tables and generate QR codes for each</p>
        </div>
        <button
          onClick={() => setShowAddTable(true)}
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/25"
        >
          <Plus className="w-5 h-5" /> Add Table
        </button>
      </div>

      {showAddTable && (
        <div className="glass rounded-2xl p-5 mb-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">{t('shop.tableNumber')} *</label>
              <input value={newTable.table_number} onChange={(e) => setNewTable({ ...newTable, table_number: e.target.value })} className="input-dark" placeholder="1, 2, 3..." type="number" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">{t('shop.tableLabel')}</label>
              <input value={newTable.label} onChange={(e) => setNewTable({ ...newTable, label: e.target.value })} className="input-dark" placeholder="Window Seat, Corner Booth..." />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">{t('shop.seats')}</label>
              <input value={newTable.seats} onChange={(e) => setNewTable({ ...newTable, seats: e.target.value })} className="input-dark" placeholder="2" type="number" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">{t('shop.location')}</label>
              <select value={newTable.location} onChange={(e) => setNewTable({ ...newTable, location: e.target.value })} className="input-dark">
                <option value="Indoor">{t('shop.indoor')}</option>
                <option value="Outdoor">{t('shop.outdoor')}</option>
                <option value="Bar">{t('shop.bar')}</option>
                <option value="Patio">{t('shop.patio')}</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={addTable} className="px-4 py-2 bg-violet-600 rounded-lg text-sm font-medium">{t('common.add')}</button>
            <button onClick={() => setShowAddTable(false)} className="px-4 py-2 bg-white/10 rounded-lg text-sm font-medium">{t('common.cancel')}</button>
          </div>
        </div>
      )}

      {/* Tables Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tables.map((table, i) => (
          <div key={table.id} className="glass rounded-2xl p-5 card-hover animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500/20 to-purple-500/10 border border-violet-500/20 rounded-xl flex items-center justify-center">
                  <span className="text-xl font-black text-violet-300">{table.table_number}</span>
                </div>
                <div>
                  <h3 className="font-bold">{table.label}</h3>
                  <p className="text-xs text-gray-400">{table.seats} seats • {table.location}</p>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${table.is_active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-500/20 text-gray-400'}`}>
                {table.is_active ? 'ACTIVE' : 'OFF'}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowQR(table)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-violet-600/20 text-violet-300 rounded-xl text-sm font-medium hover:bg-violet-600/30 transition-colors"
              >
                <QrCode className="w-4 h-4" /> View QR
              </button>
              <button
                onClick={() => window.open(getQRUrl(table), '_blank')}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-emerald-600/20 text-emerald-300 rounded-xl text-sm font-medium hover:bg-emerald-600/30 transition-colors"
                title="Test this QR code"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Test
              </button>
              <button
                onClick={() => deleteTable(table.id)}
                className="p-2.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {tables.length === 0 && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🪑</div>
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No tables yet</h3>
          <p className="text-gray-500 text-sm">Add your first table to start generating QR codes.</p>
        </div>
      )}

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setShowQR(null)}>
          <div className="bg-gray-900 border border-white/10 rounded-3xl p-8 w-full max-w-sm animate-scale-in text-center" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-2">{t('shop.qrTitle')} {showQR.table_number} - {showQR.label}</h3>
            <p className="text-gray-400 text-sm mb-6">{t('shop.qrDesc')}</p>
            
            <div id="qr-code-container" className="bg-white rounded-2xl p-6 inline-block mb-6">
              <QRCodeSVG
                value={getQRUrl(showQR)}
                size={200}
                level="H"
                includeMargin={false}
              />
            </div>

            <div className="bg-white/5 rounded-xl p-3 mb-4">
              <p className="text-xs text-gray-400 break-all font-mono">{getQRUrl(showQR)}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  const svg = document.querySelector('#qr-code-container svg');
                  if (svg) {
                    const svgData = new XMLSerializer().serializeToString(svg);
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const img = document.createElement('img');
                    img.onload = () => {
                      canvas.width = img.width;
                      canvas.height = img.height;
                      ctx?.drawImage(img, 0, 0);
                      const pngFile = canvas.toDataURL('image/png');
                      const downloadLink = document.createElement('a');
                      downloadLink.download = `qr-table-${showQR.table_number}.png`;
                      downloadLink.href = pngFile;
                      downloadLink.click();
                    };
                    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
                  }
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-violet-600 rounded-xl font-medium hover:bg-violet-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </button>
              <button
                onClick={() => setShowQR(null)}
                className="flex-1 py-3 bg-white/10 rounded-xl font-medium hover:bg-white/20 transition-colors"
              >
                {t('common.close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// Requests Tab (Live)
// ==========================================
function RequestsTab({ shop, pendingRequests, allRequests, onResolve, soundEnabled, onToggleSound }: any) {
  const sorted = [...pendingRequests].sort((a: ServiceRequest, b: ServiceRequest) => a.created_at - b.created_at);

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            Live Requests
            {pendingRequests.length > 0 && (
              <span className="w-8 h-8 bg-red-500 text-white text-sm font-bold rounded-full flex items-center justify-center animate-bounce-gentle">
                {pendingRequests.length}
              </span>
            )}
          </h1>
          <p className="text-gray-400 text-sm mt-1">Real-time service requests from customers</p>
        </div>
        <button
          onClick={onToggleSound}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            soundEnabled ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-white/5 text-gray-400 border border-white/10'
          }`}
        >
          {soundEnabled ? '🔔 Sound On' : '🔕 Sound Off'}
        </button>
      </div>

      {sorted.length === 0 ? (
        <div className="text-center py-20 animate-fade-in">
          <div className="text-6xl mb-4 animate-float">✨</div>
          <h3 className="text-xl font-semibold text-gray-400 mb-2">All Clear!</h3>
          <p className="text-gray-500">No pending requests. Waiting for customers...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sorted.map((req: ServiceRequest, i: number) => (
            <RequestCard key={req.id} request={req} onResolve={onResolve} index={i} />
          ))}
        </div>
      )}

      {/* Recent Resolved */}
      {allRequests.filter((r: ServiceRequest) => r.status === 'resolved').length > 0 && (
        <div className="mt-10">
          <h3 className="font-bold text-gray-400 text-sm mb-4 uppercase tracking-wider">Recently Resolved</h3>
          <div className="space-y-2">
            {allRequests
              .filter((r: ServiceRequest) => r.status === 'resolved')
              .slice(0, 5)
              .map((req: ServiceRequest) => (
                <div key={req.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl opacity-60">
                  <span className="text-lg">
                    {req.request_type === 'waiter' ? '🛎️' : req.request_type === 'water' ? '💧' : '💳'}
                  </span>
                  <span className="text-sm font-medium">Table {req.table_number}</span>
                  <span className="text-xs text-gray-500 capitalize">{req.request_type}</span>
                  <span className="ml-auto text-xs text-emerald-400">✓ Resolved</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

function RequestCard({ request, onResolve, index }: { request: ServiceRequest; onResolve: (id: string) => void; index: number }) {
  const elapsed = useElapsedTime(request.created_at);
  const minutesElapsed = Math.floor((Date.now() - request.created_at) / 60000);
  const isUrgent = minutesElapsed >= 3;
  const isCritical = minutesElapsed >= 7;

  const configMap: Record<string, { icon: string; label: string; gradient: string; border: string; text: string }> = {
    waiter: { icon: '🛎️', label: 'Call Waiter', gradient: 'from-blue-900/40 to-blue-800/20', border: 'border-blue-500/30', text: 'text-blue-300' },
    water: { icon: '💧', label: 'Water', gradient: 'from-cyan-900/40 to-cyan-800/20', border: 'border-cyan-500/30', text: 'text-cyan-300' },
    bill: { icon: '💳', label: 'Bill', gradient: 'from-purple-900/40 to-purple-800/20', border: 'border-purple-500/30', text: 'text-purple-300' },
  };
  const config = configMap[request.request_type] || { icon: '📋', label: 'Custom', gradient: 'from-gray-900/40 to-gray-800/20', border: 'border-gray-500/30', text: 'text-gray-300' };

  return (
    <div
      className={`relative bg-gradient-to-br ${config.gradient} rounded-2xl p-5 border ${config.border} shadow-xl card-hover-scale animate-fade-in-up ${
        isCritical ? 'ring-2 ring-red-500/50 animate-pulse' : ''
      }`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {isUrgent && (
        <div className="absolute top-3 right-3">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
            isCritical ? 'bg-red-500 text-white' : 'bg-amber-500/80 text-white'
          }`}>
            {isCritical ? '⚠ CRITICAL' : 'URGENT'}
          </span>
        </div>
      )}

      <div className="flex items-center gap-3 mb-4">
        <div className="w-14 h-14 bg-gray-800/80 rounded-xl flex items-center justify-center border border-gray-600">
          <span className="text-2xl font-black text-white">{request.table_number}</span>
        </div>
        <div>
          <p className="text-gray-400 text-xs uppercase tracking-wider">Table</p>
          <p className="text-white font-bold text-lg">Table {request.table_number}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{config.icon}</span>
        <span className={`font-semibold ${config.text}`}>{config.label}</span>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-4 h-4 text-gray-500" />
        <span className="text-gray-400 text-sm">{elapsed}</span>
      </div>

      <button
        onClick={() => onResolve(request.id)}
        className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl transition-all active:scale-[0.97] shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
      >
        <Check className="w-5 h-5" />
        Mark as Done
      </button>
    </div>
  );
}
