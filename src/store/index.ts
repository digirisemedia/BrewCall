import {
  User,
  CoffeeShop,
  MenuCategory,
  MenuItem,
  Table,
  ServiceRequest,
} from '../types';

// ==========================================
// Storage Keys
// ==========================================
const KEYS = {
  USERS: 'scaas_users',
  SHOPS: 'scaas_shops',
  CATEGORIES: 'scaas_categories',
  ITEMS: 'scaas_items',
  TABLES: 'scaas_tables',
  REQUESTS: 'scaas_requests',
  CURRENT_USER: 'scaas_current_user',
};

// ==========================================
// Generic CRUD helpers
// ==========================================
function get<T>(key: string): T[] {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function set<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
  // Dispatch custom event for real-time sync
  window.dispatchEvent(new CustomEvent('scaas-data-change', { detail: { key } }));
}

function genId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

// ==========================================
// Seed Data
// ==========================================
export function seedInitialData() {
  const users = get<User>(KEYS.USERS);
  if (users.length > 0) return; // Already seeded

  // Super Admin
  const superAdmin: User = {
    id: 'user_superadmin',
    email: 'admin@brewcall.com',
    password: 'admin123',
    name: 'Platform Admin',
    role: 'super_admin',
    shop_id: null,
    created_at: Date.now(),
  };

  // Shop Admin 1
  const shopAdmin1: User = {
    id: 'user_shop1',
    email: 'owner@aroma.coffee',
    password: 'owner123',
    name: 'Marco Rossi',
    role: 'shop_admin',
    shop_id: 'shop_1',
    created_at: Date.now(),
  };

  // Shop Admin 2
  const shopAdmin2: User = {
    id: 'user_shop2',
    email: 'manager@beanhaus.com',
    password: 'owner123',
    name: 'Sarah Chen',
    role: 'shop_admin',
    shop_id: 'shop_2',
    created_at: Date.now(),
  };

  set(KEYS.USERS, [superAdmin, shopAdmin1, shopAdmin2]);

  // Coffee Shops
  const shops: CoffeeShop[] = [
    {
      id: 'shop_1',
      name: 'Aroma Coffee House',
      tagline: 'Where every cup tells a story',
      description: 'Premium specialty coffee roasted in-house daily. Cozy atmosphere with artisan pastries.',
      address: '42 Brew Street, Downtown',
      phone: '+1 (555) 123-4567',
      email: 'hello@aroma.coffee',
      logo_emoji: '☕',
      primary_color: '#8B4513',
      owner_id: 'user_shop1',
      is_active: true,
      created_at: Date.now() - 86400000 * 30,
      subscription_plan: 'pro',
    },
    {
      id: 'shop_2',
      name: 'The Bean Haus',
      tagline: 'Craft coffee, crafted for you',
      description: 'Modern coffee experience with single-origin beans and creative seasonal drinks.',
      address: '15 Roast Avenue, Midtown',
      phone: '+1 (555) 987-6543',
      email: 'info@beanhaus.com',
      logo_emoji: '🫘',
      primary_color: '#2F4F4F',
      owner_id: 'user_shop2',
      is_active: true,
      created_at: Date.now() - 86400000 * 15,
      subscription_plan: 'starter',
    },
  ];
  set(KEYS.SHOPS, shops);

  // Menu Categories for Shop 1
  const categories: MenuCategory[] = [
    { id: 'cat_1_1', shop_id: 'shop_1', name: 'Espresso Drinks', icon: '☕', order: 1, is_active: true },
    { id: 'cat_1_2', shop_id: 'shop_1', name: 'Brewed Coffee', icon: '🍵', order: 2, is_active: true },
    { id: 'cat_1_3', shop_id: 'shop_1', name: 'Cold Drinks', icon: '🧊', order: 3, is_active: true },
    { id: 'cat_1_4', shop_id: 'shop_1', name: 'Pastries & Food', icon: '🥐', order: 4, is_active: true },
    { id: 'cat_1_5', shop_id: 'shop_1', name: 'Specialty', icon: '✨', order: 5, is_active: true },
  ];
  set(KEYS.CATEGORIES, categories);

  // Menu Items for Shop 1 (Moroccan pricing in MAD)
  const items: MenuItem[] = [
    { id: 'item_1', shop_id: 'shop_1', category_id: 'cat_1_1', name: 'Espresso', description: 'Double shot riche, notre mélange signature', price: 15, image_emoji: '☕', is_available: true, is_popular: true, created_at: Date.now() },
    { id: 'item_2', shop_id: 'shop_1', category_id: 'cat_1_1', name: 'Cappuccino', description: 'Espresso avec mousse de lait veloutée', price: 25, image_emoji: '☕', is_available: true, is_popular: true, created_at: Date.now() },
    { id: 'item_3', shop_id: 'shop_1', category_id: 'cat_1_1', name: 'Latte', description: 'Espresso doux avec lait vapeur', price: 28, image_emoji: '🥛', is_available: true, is_popular: false, created_at: Date.now() },
    { id: 'item_4', shop_id: 'shop_1', category_id: 'cat_1_1', name: 'Flat White', description: 'Double ristretto avec micro-mousse de lait', price: 30, image_emoji: '🤍', is_available: true, is_popular: true, created_at: Date.now() },
    { id: 'item_5', shop_id: 'shop_1', category_id: 'cat_1_1', name: 'Mocha', description: 'Espresso, chocolat, lait vapeur et crème fouettée', price: 35, image_emoji: '🍫', is_available: true, is_popular: false, created_at: Date.now() },
    { id: 'item_6', shop_id: 'shop_1', category_id: 'cat_1_2', name: 'Café Filtre', description: 'Infusion manuelle d\'origine unique, sélection tournante', price: 25, image_emoji: '🫗', is_available: true, is_popular: true, created_at: Date.now() },
    { id: 'item_7', shop_id: 'shop_1', category_id: 'cat_1_2', name: 'Café Presse', description: 'Infusion corsée, sert 2 personnes', price: 35, image_emoji: '🍵', is_available: true, is_popular: false, created_at: Date.now() },
    { id: 'item_8', shop_id: 'shop_1', category_id: 'cat_1_3', name: 'Americano Glacé', description: 'Double espresso sur glace avec eau froide', price: 25, image_emoji: '🧊', is_available: true, is_popular: true, created_at: Date.now() },
    { id: 'item_9', shop_id: 'shop_1', category_id: 'cat_1_3', name: 'Cold Brew', description: 'Infusion 24h, doux et rafraîchissant', price: 30, image_emoji: '🥶', is_available: true, is_popular: true, created_at: Date.now() },
    { id: 'item_10', shop_id: 'shop_1', category_id: 'cat_1_4', name: 'Croissant au Beurre', description: 'Feuilleté, doré, cuit frais chaque matin', price: 12, image_emoji: '🥐', is_available: true, is_popular: true, created_at: Date.now() },
    { id: 'item_11', shop_id: 'shop_1', category_id: 'cat_1_4', name: 'Toast Avocat', description: 'Pain levain, avocat écrasé, piment, graines', price: 45, image_emoji: '🥑', is_available: true, is_popular: false, created_at: Date.now() },
    { id: 'item_12', shop_id: 'shop_1', category_id: 'cat_1_4', name: 'Muffin Myrtille', description: 'Éclatant de myrtilles fraîches, topping croustillant', price: 20, image_emoji: '🫐', is_available: true, is_popular: false, created_at: Date.now() },
    { id: 'item_13', shop_id: 'shop_1', category_id: 'cat_1_5', name: 'Latte Lavande', description: 'Espresso, sirop de lavande, lait d\'avoine', price: 38, image_emoji: '💜', is_available: true, is_popular: true, created_at: Date.now() },
    { id: 'item_14', shop_id: 'shop_1', category_id: 'cat_1_5', name: 'Matcha Latte', description: 'Matcha grade cérémonial, lait d\'avoine vapeur', price: 40, image_emoji: '🍵', is_available: true, is_popular: true, created_at: Date.now() },
  ];
  set(KEYS.ITEMS, items);

  // Tables for Shop 1
  const tables: Table[] = [
    { id: 'tbl_1_1', shop_id: 'shop_1', table_number: 1, label: 'Window Seat', seats: 2, location: 'Indoor', is_active: true, created_at: Date.now() },
    { id: 'tbl_1_2', shop_id: 'shop_1', table_number: 2, label: 'Corner Booth', seats: 4, location: 'Indoor', is_active: true, created_at: Date.now() },
    { id: 'tbl_1_3', shop_id: 'shop_1', table_number: 3, label: 'Bar High-Top', seats: 2, location: 'Bar', is_active: true, created_at: Date.now() },
    { id: 'tbl_1_4', shop_id: 'shop_1', table_number: 4, label: 'Garden Table', seats: 4, location: 'Outdoor', is_active: true, created_at: Date.now() },
    { id: 'tbl_1_5', shop_id: 'shop_1', table_number: 5, label: 'Lounge Sofa', seats: 3, location: 'Indoor', is_active: true, created_at: Date.now() },
  ];
  set(KEYS.TABLES, tables);

  // Some initial requests
  const requests: ServiceRequest[] = [
    {
      id: 'req_seed_1',
      shop_id: 'shop_1',
      table_id: 'tbl_1_1',
      table_number: 1,
      request_type: 'waiter',
      status: 'pending',
      created_at: Date.now() - 120000,
    },
    {
      id: 'req_seed_2',
      shop_id: 'shop_1',
      table_id: 'tbl_1_3',
      table_number: 3,
      request_type: 'water',
      status: 'pending',
      created_at: Date.now() - 60000,
    },
  ];
  set(KEYS.REQUESTS, requests);
}

// ==========================================
// Auth API
// ==========================================
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

  createUser(user: Omit<User, 'id' | 'created_at'>): User {
    const users = get<User>(KEYS.USERS);
    const newUser: User = { ...user, id: genId('user'), created_at: Date.now() };
    users.push(newUser);
    set(KEYS.USERS, users);
    return newUser;
  },

  register(data: { email: string; password: string; name: string; shopName: string }): { user: User; shop: CoffeeShop } | { error: string } {
    const users = get<User>(KEYS.USERS);
    if (users.find((u) => u.email === data.email)) {
      return { error: 'Email already registered' };
    }
    // Create owner user
    const owner: User = {
      id: genId('user'),
      email: data.email,
      password: data.password,
      name: data.name,
      role: 'shop_admin',
      shop_id: null,
      created_at: Date.now(),
    };
    const allUsers = [...users, owner];
    localStorage.setItem(KEYS.USERS, JSON.stringify(allUsers));
    // Create shop
    const shop: CoffeeShop = {
      id: genId('shop'),
      name: data.shopName,
      tagline: '',
      description: '',
      address: '',
      phone: '',
      email: data.email,
      logo_emoji: '☕',
      primary_color: '#8B4513',
      owner_id: owner.id,
      is_active: true,
      created_at: Date.now(),
      subscription_plan: 'free',
    };
    const shops = get<CoffeeShop>(KEYS.SHOPS);
    shops.push(shop);
    localStorage.setItem(KEYS.SHOPS, JSON.stringify(shops));
    // Link shop to owner
    owner.shop_id = shop.id;
    const finalUsers = get<User>(KEYS.USERS).map((u) =>
      u.id === owner.id ? { ...u, shop_id: shop.id } : u
    );
    localStorage.setItem(KEYS.USERS, JSON.stringify(finalUsers));
    window.dispatchEvent(new CustomEvent('scaas-data-change', { detail: { key: 'all' } }));
    return { user: { ...owner, shop_id: shop.id }, shop };
  },

  emailExists(email: string): boolean {
    return get<User>(KEYS.USERS).some((u) => u.email === email);
  },

  deleteUser(userId: string) {
    const users = get<User>(KEYS.USERS).filter((u) => u.id !== userId);
    set(KEYS.USERS, users);
  },

  getAllUsers(): User[] {
    return get<User>(KEYS.USERS);
  },
};

// ==========================================
// Coffee Shops API
// ==========================================
export const ShopAPI = {
  getAll(): CoffeeShop[] {
    return get<CoffeeShop>(KEYS.SHOPS);
  },

  getById(id: string): CoffeeShop | undefined {
    return get<CoffeeShop>(KEYS.SHOPS).find((s) => s.id === id);
  },

  getByOwner(ownerId: string): CoffeeShop | undefined {
    return get<CoffeeShop>(KEYS.SHOPS).find((s) => s.owner_id === ownerId);
  },

  create(shop: Omit<CoffeeShop, 'id' | 'created_at'>): CoffeeShop {
    const shops = get<CoffeeShop>(KEYS.SHOPS);
    const newShop: CoffeeShop = { ...shop, id: genId('shop'), created_at: Date.now() };
    shops.push(newShop);
    set(KEYS.SHOPS, shops);
    return newShop;
  },

  update(id: string, data: Partial<CoffeeShop>): CoffeeShop | undefined {
    const shops = get<CoffeeShop>(KEYS.SHOPS);
    const idx = shops.findIndex((s) => s.id === id);
    if (idx === -1) return undefined;
    shops[idx] = { ...shops[idx], ...data };
    set(KEYS.SHOPS, shops);
    return shops[idx];
  },

  delete(id: string) {
    const shops = get<CoffeeShop>(KEYS.SHOPS).filter((s) => s.id !== id);
    set(KEYS.SHOPS, shops);
    // Cascade delete related data
    set(KEYS.CATEGORIES, get<MenuCategory>(KEYS.CATEGORIES).filter((c) => c.shop_id !== id));
    set(KEYS.ITEMS, get<MenuItem>(KEYS.ITEMS).filter((i) => i.shop_id !== id));
    set(KEYS.TABLES, get<Table>(KEYS.TABLES).filter((t) => t.shop_id !== id));
    set(KEYS.REQUESTS, get<ServiceRequest>(KEYS.REQUESTS).filter((r) => r.shop_id !== id));
    // Delete owner user
    const shop = get<CoffeeShop>(KEYS.SHOPS).find((s) => s.id === id);
    if (shop) {
      AuthAPI.deleteUser(shop.owner_id);
    }
  },
};

// ==========================================
// Menu Categories API
// ==========================================
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

  update(id: string, data: Partial<MenuCategory>) {
    const cats = get<MenuCategory>(KEYS.CATEGORIES);
    const idx = cats.findIndex((c) => c.id === id);
    if (idx !== -1) {
      cats[idx] = { ...cats[idx], ...data };
      set(KEYS.CATEGORIES, cats);
    }
  },

  delete(id: string) {
    set(KEYS.CATEGORIES, get<MenuCategory>(KEYS.CATEGORIES).filter((c) => c.id !== id));
    set(KEYS.ITEMS, get<MenuItem>(KEYS.ITEMS).filter((i) => i.category_id !== id));
  },
};

// ==========================================
// Menu Items API
// ==========================================
export const ItemAPI = {
  getByShop(shopId: string): MenuItem[] {
    return get<MenuItem>(KEYS.ITEMS).filter((i) => i.shop_id === shopId);
  },

  getByCategory(categoryId: string): MenuItem[] {
    return get<MenuItem>(KEYS.ITEMS).filter((i) => i.category_id === categoryId);
  },

  create(item: Omit<MenuItem, 'id' | 'created_at'>): MenuItem {
    const items = get<MenuItem>(KEYS.ITEMS);
    const newItem: MenuItem = { ...item, id: genId('item'), created_at: Date.now() };
    items.push(newItem);
    set(KEYS.ITEMS, items);
    return newItem;
  },

  update(id: string, data: Partial<MenuItem>) {
    const items = get<MenuItem>(KEYS.ITEMS);
    const idx = items.findIndex((i) => i.id === id);
    if (idx !== -1) {
      items[idx] = { ...items[idx], ...data };
      set(KEYS.ITEMS, items);
    }
  },

  delete(id: string) {
    set(KEYS.ITEMS, get<MenuItem>(KEYS.ITEMS).filter((i) => i.id !== id));
  },
};

// ==========================================
// Tables API
// ==========================================
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

  update(id: string, data: Partial<Table>) {
    const tables = get<Table>(KEYS.TABLES);
    const idx = tables.findIndex((t) => t.id === id);
    if (idx !== -1) {
      tables[idx] = { ...tables[idx], ...data };
      set(KEYS.TABLES, tables);
    }
  },

  delete(id: string) {
    set(KEYS.TABLES, get<Table>(KEYS.TABLES).filter((t) => t.id !== id));
  },
};

// ==========================================
// Service Requests API
// ==========================================
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
    return (
      get<ServiceRequest>(KEYS.REQUESTS).find(
        (r) => r.shop_id === shopId && r.table_id === tableId && r.status === 'pending'
      ) || null
    );
  },

  create(req: Omit<ServiceRequest, 'id' | 'created_at'>): ServiceRequest {
    const reqs = get<ServiceRequest>(KEYS.REQUESTS);
    const newReq: ServiceRequest = { ...req, id: genId('req'), created_at: Date.now() };
    reqs.push(newReq);
    set(KEYS.REQUESTS, reqs);
    return newReq;
  },

  resolve(id: string) {
    const reqs = get<ServiceRequest>(KEYS.REQUESTS);
    const idx = reqs.findIndex((r) => r.id === id);
    if (idx !== -1) {
      reqs[idx] = { ...reqs[idx], status: 'resolved', resolved_at: Date.now() };
      set(KEYS.REQUESTS, reqs);
    }
  },

  cancel(shopId: string, tableId: string) {
    const reqs = get<ServiceRequest>(KEYS.REQUESTS).filter(
      (r) => !(r.shop_id === shopId && r.table_id === tableId && r.status === 'pending')
    );
    set(KEYS.REQUESTS, reqs);
  },

  getStats(shopId: string) {
    const reqs = get<ServiceRequest>(KEYS.REQUESTS).filter((r) => r.shop_id === shopId);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayReqs = reqs.filter((r) => r.created_at >= today.getTime());
    return {
      pending: reqs.filter((r) => r.status === 'pending').length,
      today: todayReqs.length,
      total: reqs.length,
      resolved: reqs.filter((r) => r.status === 'resolved').length,
    };
  },
};

// ==========================================
// Subscribe to changes (for real-time updates)
// ==========================================
export function subscribeToChanges(callback: () => void): () => void {
  const handler = () => callback();
  window.addEventListener('scaas-data-change', handler);
  window.addEventListener('storage', handler);
  // Also poll for same-tab changes
  const interval = setInterval(callback, 500);
  return () => {
    window.removeEventListener('scaas-data-change', handler);
    window.removeEventListener('storage', handler);
    clearInterval(interval);
  };
}
