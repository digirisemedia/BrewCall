import { User, CoffeeShop, MenuCategory, MenuItem, Table, ServiceRequest, WalletTransaction, PaymentMethod } from '../types';

function genId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

// LocalStorage keys
const KEYS = {
  USERS: 'brewcall_users',
  SHOPS: 'brewcall_shops',
  CATEGORIES: 'brewcall_categories',
  ITEMS: 'brewcall_items',
  TABLES: 'brewcall_tables',
  REQUESTS: 'brewcall_requests',
  TRANSACTIONS: 'brewcall_transactions',
  CURRENT_USER: 'brewcall_current_user',
};

// Helper functions
function get<T>(key: string): T[] {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function set<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}

// Seed initial data
export async function seedInitialData() {
  const users = get<User>(KEYS.USERS);
  if (users.length > 0) return;

  // Create super admin
  const superAdmin: User = {
    id: 'user_superadmin',
    email: 'admin@brewcall.com',
    password: 'admin123',
    name: 'Platform Admin',
    role: 'super_admin',
    shop_id: null,
    created_at: Date.now(),
  };

  // Create shop admin
  const shopAdmin: User = {
    id: 'user_shop1',
    email: 'owner@aroma.coffee',
    password: 'owner123',
    name: 'Marco Rossi',
    role: 'shop_admin',
    shop_id: 'shop_1',
    created_at: Date.now(),
  };

  set(KEYS.USERS, [superAdmin, shopAdmin]);

  // Create shop
  const shop: CoffeeShop = {
    id: 'shop_1',
    name: 'Aroma Coffee House',
    tagline: 'Where every cup tells a story',
    description: 'Premium specialty coffee roasted in-house daily.',
    address: '42 Brew Street, Downtown',
    phone: '+1 (555) 123-4567',
    email: 'hello@aroma.coffee',
    logo_emoji: '☕',
    primary_color: '#8B4513',
    owner_id: 'user_shop1',
    is_active: true,
    created_at: Date.now() - 86400000 * 30,
    subscription_plan: 'pro',
    wallet_balance: 500,
    payment_methods: [
      { id: 'pm_1', type: 'cash_plus', label: 'Cash Plus', is_default: true, details: 'Account: 123456789' },
    ],
  };
  set(KEYS.SHOPS, [shop]);

  // Create categories
  const categories: MenuCategory[] = [
    { id: 'cat_1_1', shop_id: 'shop_1', name: 'Espresso Drinks', icon: '☕', order: 1, is_active: true },
    { id: 'cat_1_2', shop_id: 'shop_1', name: 'Brewed Coffee', icon: '🍵', order: 2, is_active: true },
    { id: 'cat_1_3', shop_id: 'shop_1', name: 'Cold Drinks', icon: '🧊', order: 3, is_active: true },
    { id: 'cat_1_4', shop_id: 'shop_1', name: 'Pastries', icon: '🥐', order: 4, is_active: true },
  ];
  set(KEYS.CATEGORIES, categories);

  // Create menu items
  const items: MenuItem[] = [
    { id: 'item_1', shop_id: 'shop_1', category_id: 'cat_1_1', name: 'Espresso', description: 'Rich double shot', price: 15, image_emoji: '☕', is_available: true, is_popular: true, created_at: Date.now() },
    { id: 'item_2', shop_id: 'shop_1', category_id: 'cat_1_1', name: 'Cappuccino', description: 'Espresso with velvety foam', price: 25, image_emoji: '☕', is_available: true, is_popular: true, created_at: Date.now() },
    { id: 'item_3', shop_id: 'shop_1', category_id: 'cat_1_2', name: 'Pour Over', description: 'Hand-brewed single origin', price: 25, image_emoji: '🫗', is_available: true, is_popular: true, created_at: Date.now() },
    { id: 'item_4', shop_id: 'shop_1', category_id: 'cat_1_3', name: 'Cold Brew', description: '24-hour steeped', price: 30, image_emoji: '🧊', is_available: true, is_popular: true, created_at: Date.now() },
    { id: 'item_5', shop_id: 'shop_1', category_id: 'cat_1_4', name: 'Croissant', description: 'Fresh baked daily', price: 12, image_emoji: '🥐', is_available: true, is_popular: true, created_at: Date.now() },
  ];
  set(KEYS.ITEMS, items);

  // Create tables
  const tables: Table[] = [
    { id: 'tbl_1_1', shop_id: 'shop_1', table_number: 1, label: 'Window Seat', seats: 2, location: 'Indoor', is_active: true, created_at: Date.now() },
    { id: 'tbl_1_2', shop_id: 'shop_1', table_number: 2, label: 'Corner Booth', seats: 4, location: 'Indoor', is_active: true, created_at: Date.now() },
    { id: 'tbl_1_3', shop_id: 'shop_1', table_number: 3, label: 'Patio Table', seats: 4, location: 'Outdoor', is_active: true, created_at: Date.now() },
  ];
  set(KEYS.TABLES, tables);

  set(KEYS.REQUESTS, []);
  set(KEYS.TRANSACTIONS, []);
}

// Auth API
export const AuthAPI = {
  login(email: string, password: string): User | null {
    const users = get<User>(KEYS.USERS);
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
    }
    return user || null;
  },

  logout() {
    localStorage.removeItem(KEYS.CURRENT_USER);
  },

  getCurrentUser(): User | null {
    try {
      const data = localStorage.getItem(KEYS.CURRENT_USER);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  getAllUsers(): User[] {
    return get<User>(KEYS.USERS);
  },

  createUser(user: Omit<User, 'id' | 'created_at'>): User {
    const users = get<User>(KEYS.USERS);
    const newUser: User = { ...user, id: genId('user'), created_at: Date.now() };
    users.push(newUser);
    set(KEYS.USERS, users);
    return newUser;
  },

  getUserByEmail(email: string): User | null {
    const users = get<User>(KEYS.USERS);
    return users.find((u) => u.email === email) || null;
  },

  updateUser(id: string, data: Partial<User>): void {
    const users = get<User>(KEYS.USERS);
    const idx = users.findIndex((u) => u.id === id);
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...data };
      set(KEYS.USERS, users);
    }
  },
};

// Shop API
export const ShopAPI = {
  getAll(): CoffeeShop[] {
    return get<CoffeeShop>(KEYS.SHOPS);
  },

  getById(id: string): CoffeeShop | undefined {
    return get<CoffeeShop>(KEYS.SHOPS).find((s) => s.id === id);
  },

  update(id: string, data: Partial<CoffeeShop>): CoffeeShop | undefined {
    const shops = get<CoffeeShop>(KEYS.SHOPS);
    const idx = shops.findIndex((s) => s.id === id);
    if (idx === -1) return undefined;
    shops[idx] = { ...shops[idx], ...data };
    set(KEYS.SHOPS, shops);
    return shops[idx];
  },

  create(shop: Omit<CoffeeShop, 'id' | 'created_at'>): CoffeeShop {
    const shops = get<CoffeeShop>(KEYS.SHOPS);
    const newShop: CoffeeShop = { ...shop, id: genId('shop'), created_at: Date.now() };
    shops.push(newShop);
    set(KEYS.SHOPS, shops);
    return newShop;
  },

  delete(id: string): void {
    set(KEYS.SHOPS, get<CoffeeShop>(KEYS.SHOPS).filter((s) => s.id !== id));
  },
};

// Category API
export const CategoryAPI = {
  getByShop(shopId: string): MenuCategory[] {
    return get<MenuCategory>(KEYS.CATEGORIES)
      .filter((c) => c.shop_id === shopId)
      .sort((a, b) => a.order - b.order);
  },

  create(cat: Omit<MenuCategory, 'id'>): MenuCategory {
    const cats = get<MenuCategory>(KEYS.CATEGORIES);
    const newCat: MenuCategory = { ...cat, id: genId('cat') };
    cats.push(newCat);
    set(KEYS.CATEGORIES, cats);
    return newCat;
  },

  delete(id: string): void {
    set(KEYS.CATEGORIES, get<MenuCategory>(KEYS.CATEGORIES).filter((c) => c.id !== id));
  },
};

// Item API
export const ItemAPI = {
  getByShop(shopId: string): MenuItem[] {
    return get<MenuItem>(KEYS.ITEMS).filter((i) => i.shop_id === shopId);
  },

  create(item: Omit<MenuItem, 'id' | 'created_at'>): MenuItem {
    const items = get<MenuItem>(KEYS.ITEMS);
    const newItem: MenuItem = { ...item, id: genId('item'), created_at: Date.now() };
    items.push(newItem);
    set(KEYS.ITEMS, items);
    return newItem;
  },

  update(id: string, data: Partial<MenuItem>): void {
    const items = get<MenuItem>(KEYS.ITEMS);
    const idx = items.findIndex((i) => i.id === id);
    if (idx !== -1) {
      items[idx] = { ...items[idx], ...data };
      set(KEYS.ITEMS, items);
    }
  },

  delete(id: string): void {
    set(KEYS.ITEMS, get<MenuItem>(KEYS.ITEMS).filter((i) => i.id !== id));
  },
};

// Table API
export const TableAPI = {
  getByShop(shopId: string): Table[] {
    return get<Table>(KEYS.TABLES)
      .filter((t) => t.shop_id === shopId)
      .sort((a, b) => a.table_number - b.table_number);
  },

  getById(id: string): Table | undefined {
    return get<Table>(KEYS.TABLES).find((t) => t.id === id);
  },

  create(table: Omit<Table, 'id' | 'created_at'>): Table {
    const tables = get<Table>(KEYS.TABLES);
    const newTable: Table = { ...table, id: genId('tbl'), created_at: Date.now() };
    tables.push(newTable);
    set(KEYS.TABLES, tables);
    return newTable;
  },

  delete(id: string): void {
    set(KEYS.TABLES, get<Table>(KEYS.TABLES).filter((t) => t.id !== id));
  },
};

// Request API
export const RequestAPI = {
  getByShop(shopId: string): ServiceRequest[] {
    return get<ServiceRequest>(KEYS.REQUESTS)
      .filter((r) => r.shop_id === shopId)
      .sort((a, b) => b.created_at - a.created_at);
  },

  getPendingByShop(shopId: string): ServiceRequest[] {
    return get<ServiceRequest>(KEYS.REQUESTS)
      .filter((r) => r.shop_id === shopId && r.status === 'pending')
      .sort((a, b) => a.created_at - b.created_at);
  },

  getActiveForTable(shopId: string, tableId: string): ServiceRequest | null {
    return get<ServiceRequest>(KEYS.REQUESTS).find(
      (r) => r.shop_id === shopId && r.table_id === tableId && r.status === 'pending'
    ) || null;
  },

  create(req: Omit<ServiceRequest, 'id' | 'created_at'>): ServiceRequest {
    const reqs = get<ServiceRequest>(KEYS.REQUESTS);
    const newReq: ServiceRequest = { ...req, id: genId('req'), created_at: Date.now() };
    reqs.push(newReq);
    set(KEYS.REQUESTS, reqs);
    return newReq;
  },

  resolve(id: string): void {
    const reqs = get<ServiceRequest>(KEYS.REQUESTS);
    const idx = reqs.findIndex((r) => r.id === id);
    if (idx !== -1) {
      reqs[idx] = { ...reqs[idx], status: 'resolved' };
      set(KEYS.REQUESTS, reqs);
    }
  },

  cancel(shopId: string, tableId: string): void {
    set(
      KEYS.REQUESTS,
      get<ServiceRequest>(KEYS.REQUESTS).filter(
        (r) => !(r.shop_id === shopId && r.table_id === tableId && r.status === 'pending')
      )
    );
  },

  getStats(shopId: string) {
    const reqs = get<ServiceRequest>(KEYS.REQUESTS).filter((r) => r.shop_id === shopId);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return {
      pending: reqs.filter((r) => r.status === 'pending').length,
      today: reqs.filter((r) => r.created_at >= today.getTime()).length,
      total: reqs.length,
      resolved: reqs.filter((r) => r.status === 'resolved').length,
    };
  },
};

// Wallet API
export const WalletAPI = {
  getBalance(shopId: string): number {
    const shop = ShopAPI.getById(shopId);
    return shop?.wallet_balance || 0;
  },

  topUp(shopId: string, amount: number, paymentMethod?: string): boolean {
    const shops = get<CoffeeShop>(KEYS.SHOPS);
    const idx = shops.findIndex((s) => s.id === shopId);
    if (idx === -1 || amount <= 0) return false;
    
    shops[idx].wallet_balance += amount;
    set(KEYS.SHOPS, shops);
    
    const transactions = get<WalletTransaction>(KEYS.TRANSACTIONS);
    transactions.push({
      id: genId('txn'),
      shop_id: shopId,
      type: 'top_up',
      amount,
      description: `Wallet top-up via ${paymentMethod || 'Wallet'}`,
      payment_method: paymentMethod,
      status: 'completed',
      created_at: Date.now(),
    });
    set(KEYS.TRANSACTIONS, transactions);
    
    return true;
  },

  getTransactions(shopId: string): WalletTransaction[] {
    return get<WalletTransaction>(KEYS.TRANSACTIONS)
      .filter((t) => t.shop_id === shopId)
      .sort((a, b) => b.created_at - a.created_at);
  },

  addPaymentMethod(shopId: string, method: Omit<PaymentMethod, 'id'>): PaymentMethod {
    const shops = get<CoffeeShop>(KEYS.SHOPS);
    const idx = shops.findIndex((s) => s.id === shopId);
    if (idx === -1) throw new Error('Shop not found');
    
    const newMethod: PaymentMethod = { ...method, id: genId('pm') };
    shops[idx].payment_methods.push(newMethod);
    set(KEYS.SHOPS, shops);
    
    return newMethod;
  },

  removePaymentMethod(shopId: string, methodId: string): boolean {
    const shops = get<CoffeeShop>(KEYS.SHOPS);
    const idx = shops.findIndex((s) => s.id === shopId);
    if (idx === -1) return false;
    
    shops[idx].payment_methods = shops[idx].payment_methods.filter((m) => m.id !== methodId);
    set(KEYS.SHOPS, shops);
    
    return true;
  },
};

// Subscribe to changes
export function subscribeToChanges(callback: () => void): () => void {
  const handler = () => callback();
  window.addEventListener('storage', handler);
  const interval = setInterval(callback, 1000);
  return () => {
    window.removeEventListener('storage', handler);
    clearInterval(interval);
  };
}
