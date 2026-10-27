import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { ShopAPI, CategoryAPI, ItemAPI, TableAPI, RequestAPI, subscribeToChanges } from '../store';
import { CoffeeShop, MenuCategory, MenuItem, Table, ServiceRequest } from '../types';
import { useElapsedTime } from '../hooks/useElapsedTime';
import { playNotificationSound, playSuccessSound } from '../utils/audio';
import { QRCodeSVG } from 'qrcode.react';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import {
  LogOut, LayoutDashboard, Store, UtensilsCrossed, Grid3X3, Bell,
  Plus, Trash2, Edit3, X, Check, QrCode, Eye, EyeOff, Clock, Image
} from 'lucide-react';

type Tab = 'overview' | 'profile' | 'menu' | 'tables' | 'requests';

export default function ShopAdminDashboard() {
  const { user, logout } = useAuth();
  const { t, formatPrice } = useLanguage();
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
  }, [pendingRequests.length]);

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
        <div className="mb-6">
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
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<CoffeeShop | null>(null);

  useEffect(() => {
    if (shop) {
      setForm({ ...shop });
    }
  }, [shop, editing]);

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

  if (!shop || !form) return null;

  return (
    <div className="animate-fade-in max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Shop Profile</h1>
          <p className="text-gray-400 text-sm mt-1">Manage your coffee shop information</p>
        </div>
        {!editing ? (
          <button onClick={() => setEditing(true)} className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl text-sm font-medium hover:bg-white/20 transition-colors">
            <Edit3 className="w-4 h-4" /> Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={handleCancel} className="px-4 py-2 bg-white/10 rounded-xl text-sm font-medium hover:bg-white/20">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl text-sm font-medium">Save</button>
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
            { label: 'Shop Name', key: 'name' },
            { label: 'Tagline', key: 'tagline' },
            { label: 'Address', key: 'address' },
            { label: 'Phone', key: 'phone' },
            { label: 'Email', key: 'email' },
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
          <label className="block text-xs font-medium text-gray-400 mb-1">Description</label>
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

        {/* Subscription */}
        <div className="pt-4 border-t border-white/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Subscription Plan</p>
              <p className="text-xs text-gray-400 capitalize">{form.subscription_plan}</p>
            </div>
            <span className="px-3 py-1 bg-violet-500/20 text-violet-300 text-xs font-bold rounded-full uppercase">
              {form.subscription_plan}
            </span>
          </div>
        </div>
      </div>
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

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Categories Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="glass rounded-2xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm">Categories</h3>
              <button onClick={() => setShowAddCategory(true)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {showAddCategory && (
              <div className="mb-3 p-3 bg-white/5 rounded-xl space-y-2 animate-fade-in">
                <div className="flex gap-2">
                  <input value={newCatIcon} onChange={(e) => setNewCatIcon(e.target.value)} className="w-12 input-dark text-center" maxLength={2} />
                  <input value={newCatName} onChange={(e) => setNewCatName(e.target.value)} className="flex-1 input-dark" placeholder="Category name" />
                </div>
                <div className="flex gap-2">
                  <button onClick={addCategory} className="flex-1 py-1.5 bg-violet-600 rounded-lg text-xs font-medium">Add</button>
                  <button onClick={() => setShowAddCategory(false)} className="flex-1 py-1.5 bg-white/10 rounded-lg text-xs font-medium">Cancel</button>
                </div>
              </div>
            )}

            <div className="space-y-1">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-all group ${
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

          <div className="space-y-3">
            {categoryItems.map((item, i) => (
              <div key={item.id} className={`glass rounded-xl p-4 flex items-center gap-4 card-hover animate-fade-in-up ${!item.is_available ? 'opacity-50' : ''}`} style={{ animationDelay: `${i * 0.05}s` }}>
                {item.image_url ? (
                  <img src={item.image_url} alt={item.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500/20 to-orange-500/10 rounded-xl flex items-center justify-center text-2xl">
                    {item.image_emoji}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-sm">{item.name}</h4>
                    {item.is_popular && <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded-full font-bold">POPULAR</span>}
                  </div>
                  <p className="text-xs text-gray-400 truncate">{item.description}</p>
                </div>
                <span className="font-bold text-amber-400">{formatPrice(item.price)}</span>
                <button
                  onClick={() => toggleItemAvailability(item.id, item.is_available)}
                  className={`p-2 rounded-lg transition-colors ${item.is_available ? 'text-emerald-400 hover:bg-emerald-500/10' : 'text-gray-500 hover:bg-white/5'}`}
                >
                  {item.is_available ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button onClick={() => deleteItem(item.id)} className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
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
