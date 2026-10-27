import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import { ShopAPI, AuthAPI, subscribeToChanges } from '../store';
import { CoffeeShop, User } from '../types';
import { Coffee, Plus, Trash2, Users, Store, BarChart3, LogOut, Search, X, Check, TrendingUp, Award, Activity, Wallet, Bell } from 'lucide-react';
import { RequestAPI } from '../store';
import { CurrencySwitcher } from '../components/CurrencySwitcher';

export default function SuperAdminDashboard() {
  const { user, logout } = useAuth();
  const { formatPrice } = useCurrency();
  const [shops, setShops] = useState<CoffeeShop[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // New shop form
  const [newShop, setNewShop] = useState({
    name: '',
    tagline: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    ownerEmail: '',
    ownerName: '',
    ownerPassword: 'owner123',
    logo_emoji: '☕',
    primary_color: '#8B4513',
  });

  useEffect(() => {
    loadShops();
    return subscribeToChanges(loadShops);
  }, []);

  const loadShops = () => {
    setShops(ShopAPI.getAll());
  };

  const handleCreateShop = () => {
    if (!newShop.name || !newShop.ownerEmail || !newShop.ownerName) return;

    // Create shop owner user
    const owner = AuthAPI.createUser({
      email: newShop.ownerEmail,
      password: newShop.ownerPassword,
      name: newShop.ownerName,
      role: 'shop_admin',
      shop_id: null, // will be updated
    });

    // Create shop
    const shop = ShopAPI.create({
      name: newShop.name,
      tagline: newShop.tagline,
      description: newShop.description,
      address: newShop.address,
      phone: newShop.phone,
      email: newShop.email,
      logo_emoji: newShop.logo_emoji,
      primary_color: newShop.primary_color,
      owner_id: owner.id,
      is_active: true,
      subscription_plan: 'free',
      wallet_balance: 0,
      payment_methods: [],
    });

    // Update owner with shop_id
    const users = AuthAPI.getAllUsers();
    const updatedUsers = users.map((u) =>
      u.id === owner.id ? { ...u, shop_id: shop.id } : u
    );
    localStorage.setItem('scaas_users', JSON.stringify(updatedUsers));

    setShowCreateModal(false);
    setNewShop({
      name: '', tagline: '', description: '', address: '', phone: '', email: '',
      ownerEmail: '', ownerName: '', ownerPassword: 'owner123', logo_emoji: '☕', primary_color: '#8B4513',
    });
  };

  const handleDeleteShop = (shopId: string) => {
    ShopAPI.delete(shopId);
    setDeleteConfirm(null);
  };

  const filteredShops = shops.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalOwners = shops.length;
  const activeShops = shops.filter((s) => s.is_active).length;

  // Calculate analytics
  const totalRevenue = shops.reduce((sum, shop) => sum + (shop.wallet_balance || 0), 0);
  const lastMonthRevenue = totalRevenue * 0.85; // Simulated
  const growth = lastMonthRevenue > 0 ? ((totalRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 : 0;

  const topShops = shops
    .map(shop => ({
      id: shop.id,
      name: shop.name,
      requests_today: RequestAPI.getStats(shop.id).today,
    }))
    .sort((a, b) => b.requests_today - a.requests_today)
    .slice(0, 5);

  const recentActivities = [
    {
      icon: Store,
      icon_bg: 'bg-emerald-500/20',
      message: 'New coffee shop "Café Paris" registered',
      time: '2 hours ago',
    },
    {
      icon: Bell,
      icon_bg: 'bg-blue-500/20',
      message: '15 service requests resolved today',
      time: '3 hours ago',
    },
    {
      icon: Wallet,
      icon_bg: 'bg-violet-500/20',
      message: 'Aroma Coffee House topped up 500 MAD',
      time: '5 hours ago',
    },
    {
      icon: Users,
      icon_bg: 'bg-amber-500/20',
      message: '3 new shop owners registered',
      time: '1 day ago',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-gray-900/50 border-r border-white/5 p-6 flex flex-col z-40">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Coffee className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-sm">BrewCall</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Super Admin</p>
          </div>
        </div>

        <div className="mb-6">
          <CurrencySwitcher />
        </div>

        <nav className="flex-1 space-y-1">
          <a className="flex items-center gap-3 px-4 py-3 bg-violet-600/20 text-violet-300 rounded-xl border border-violet-500/20">
            <Store className="w-5 h-5" />
            <span className="text-sm font-medium">Coffee Shops</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors cursor-pointer">
            <Users className="w-5 h-5" />
            <span className="text-sm font-medium">Users</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors cursor-pointer">
            <BarChart3 className="w-5 h-5" />
            <span className="text-sm font-medium">Analytics</span>
          </a>
        </nav>

        <div className="border-t border-white/5 pt-4">
          <div className="flex items-center gap-3 px-3 py-2 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center text-xs font-bold">
              SA
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
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold">Coffee Shops</h1>
            <p className="text-gray-400 text-sm mt-1">Manage all registered coffee shops on the platform</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5" />
            Add Coffee Shop
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Shops', value: totalOwners, icon: Store, color: 'from-violet-500 to-purple-600' },
            { label: 'Active Shops', value: activeShops, icon: Check, color: 'from-emerald-500 to-teal-600' },
            { label: 'Total Revenue', value: '$' + (shops.length * 29).toLocaleString(), icon: BarChart3, color: 'from-amber-500 to-orange-600' },
          ].map((stat, i) => (
            <div key={i} className="glass rounded-2xl p-5 card-hover animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Advanced Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="glass rounded-2xl p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              Revenue Overview
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-emerald-500/10 rounded-xl">
                <span className="text-sm text-gray-300">This Month</span>
                <span className="text-lg font-bold text-emerald-400">{formatPrice(totalRevenue)}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-xl">
                <span className="text-sm text-gray-300">Last Month</span>
                <span className="text-lg font-bold text-blue-400">{formatPrice(Math.round(lastMonthRevenue))}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-violet-500/10 rounded-xl">
                <span className="text-sm text-gray-300">Growth</span>
                <span className={`text-lg font-bold ${growth >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Shop Performance */}
          <div className="glass rounded-2xl p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Top Performing Shops
            </h3>
            <div className="space-y-3">
              {topShops.map((shop, i) => (
                <div key={shop.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-500/20 to-orange-500/10 rounded-lg flex items-center justify-center text-sm font-bold text-amber-400">
                    #{i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{shop.name}</p>
                    <p className="text-xs text-gray-400">{shop.requests_today} requests today</p>
                  </div>
                  <span className="text-sm font-bold text-emerald-400">{formatPrice(shops.find(s => s.id === shop.id)?.wallet_balance || 0)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="glass rounded-2xl p-6 mb-8">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-400" />
            Recent Activity
          </h3>
          <div className="space-y-3">
            {recentActivities.map((activity, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-white/5 rounded-xl">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activity.icon_bg}`}>
                  <activity.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6 animate-fade-in">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search coffee shops..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/30 transition-all"
          />
        </div>

        {/* Shops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredShops.map((shop, i) => (
            <div
              key={shop.id}
              className="glass rounded-2xl p-6 card-hover animate-fade-in-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${shop.primary_color}40, ${shop.primary_color}20)`, border: `1px solid ${shop.primary_color}30` }}
                  >
                    {shop.logo_emoji}
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{shop.name}</h3>
                    <p className="text-xs text-gray-400">{shop.tagline}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                  shop.is_active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {shop.is_active ? 'ACTIVE' : 'INACTIVE'}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-400 mb-4">
                <p className="truncate">📍 {shop.address}</p>
                <p className="truncate">📧 {shop.email}</p>
                <p>📋 Plan: <span className="text-white font-medium capitalize">{shop.subscription_plan}</span></p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-xs text-gray-500">
                  Created {new Date(shop.created_at).toLocaleDateString()}
                </span>
                <button
                  onClick={() => setDeleteConfirm(shop.id)}
                  className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredShops.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <div className="text-5xl mb-4">☕</div>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No coffee shops found</h3>
            <p className="text-gray-500 text-sm">Create your first coffee shop to get started.</p>
          </div>
        )}
      </main>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setShowCreateModal(false)}>
          <div className="bg-gray-900 border border-white/10 rounded-3xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">New Coffee Shop</h2>
              <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Shop Name *</label>
                  <input
                    value={newShop.name}
                    onChange={(e) => setNewShop({ ...newShop, name: e.target.value })}
                    className="input-dark"
                    placeholder="My Coffee Shop"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Logo Emoji</label>
                  <input
                    value={newShop.logo_emoji}
                    onChange={(e) => setNewShop({ ...newShop, logo_emoji: e.target.value })}
                    className="input-dark"
                    placeholder="☕"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Tagline</label>
                <input
                  value={newShop.tagline}
                  onChange={(e) => setNewShop({ ...newShop, tagline: e.target.value })}
                  className="input-dark"
                  placeholder="Where every cup tells a story"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Description</label>
                <textarea
                  value={newShop.description}
                  onChange={(e) => setNewShop({ ...newShop, description: e.target.value })}
                  className="input-dark resize-none h-20"
                  placeholder="Tell us about your coffee shop..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Address</label>
                  <input
                    value={newShop.address}
                    onChange={(e) => setNewShop({ ...newShop, address: e.target.value })}
                    className="input-dark"
                    placeholder="123 Main St"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Phone</label>
                  <input
                    value={newShop.phone}
                    onChange={(e) => setNewShop({ ...newShop, phone: e.target.value })}
                    className="input-dark"
                    placeholder="+1 555-0123"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Shop Email</label>
                <input
                  type="email"
                  value={newShop.email}
                  onChange={(e) => setNewShop({ ...newShop, email: e.target.value })}
                  className="input-dark"
                  placeholder="hello@coffeeshop.com"
                />
              </div>

              <div className="border-t border-white/10 pt-4 mt-4">
                <p className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-wider">Owner Account</p>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">Owner Name *</label>
                      <input
                        value={newShop.ownerName}
                        onChange={(e) => setNewShop({ ...newShop, ownerName: e.target.value })}
                        className="input-dark"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">Owner Email *</label>
                      <input
                        type="email"
                        value={newShop.ownerEmail}
                        onChange={(e) => setNewShop({ ...newShop, ownerEmail: e.target.value })}
                        className="input-dark"
                        placeholder="owner@shop.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Owner Password</label>
                    <input
                      value={newShop.ownerPassword}
                      onChange={(e) => setNewShop({ ...newShop, ownerPassword: e.target.value })}
                      className="input-dark"
                      placeholder="owner123"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleCreateShop}
                disabled={!newShop.name || !newShop.ownerEmail || !newShop.ownerName}
                className="w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5"
              >
                Create Coffee Shop
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 w-full max-w-sm animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="w-14 h-14 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-7 h-7 text-red-400" />
              </div>
              <h3 className="text-lg font-bold mb-2">Delete Coffee Shop?</h3>
              <p className="text-gray-400 text-sm mb-6">This will permanently delete the shop, its menu, tables, and owner account. This cannot be undone.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 py-2.5 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteShop(deleteConfirm)}
                  className="flex-1 py-2.5 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
