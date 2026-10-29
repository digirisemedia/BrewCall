import { User, CoffeeShop, MenuCategory, MenuItem, Table, ServiceRequest, WalletTransaction, PaymentMethod } from '../types';
import { db } from '../firebase/config';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp
} from 'firebase/firestore';

function genId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

// Convert Firestore document to app type
function fromFirestore<T>(docData: any, id: string): T {
  const data = { ...docData };
  // Convert timestamps
  if (data.created_at && data.created_at.toDate) {
    data.created_at = data.created_at.toDate().getTime();
  }
  if (data.resolved_at && data.resolved_at.toDate) {
    data.resolved_at = data.resolved_at.toDate().getTime();
  }
  return { ...data, id } as T;
}

// Convert app type to Firestore document
function toFirestore(data: any): any {
  const doc = { ...data };
  // Remove undefined values
  Object.keys(doc).forEach(key => {
    if (doc[key] === undefined) {
      delete doc[key];
    }
  });
  // Convert timestamps to Firestore format
  if (doc.created_at && typeof doc.created_at === 'number') {
    doc.created_at = Timestamp.fromMillis(doc.created_at);
  }
  if (doc.resolved_at && typeof doc.resolved_at === 'number') {
    doc.resolved_at = Timestamp.fromMillis(doc.resolved_at);
  }
  return doc;
}

// Seed initial data to Firestore
export async function seedInitialData() {
  try {
    // Check if users already exist
    const usersSnapshot = await getDocs(collection(db, 'users'));
    if (usersSnapshot.size > 0) return;

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
    await setDoc(doc(db, 'users', superAdmin.id), toFirestore(superAdmin));

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
    await setDoc(doc(db, 'users', shopAdmin.id), toFirestore(shopAdmin));

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
    await setDoc(doc(db, 'shops', shop.id), toFirestore(shop));

    console.log('Initial data seeded to Firestore');
  } catch (error) {
    console.error('Error seeding initial ', error);
  }
}

// Auth API
export const AuthAPI = {
  async login(email: string, password: string): Promise<User | null> {
    try {
      const q = query(collection(db, 'users'), where('email', '==', email));
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) return null;
      
      const user = fromFirestore<User>(snapshot.docs[0].data(), snapshot.docs[0].id);
      
      if (user.password !== password) return null;
      
      localStorage.setItem('scaas_current_user', JSON.stringify(user));
      
      return user;
    } catch (error) {
      console.error('Login error:', error);
      return null;
    }
  },

  logout() {
    localStorage.removeItem('scaas_current_user');
  },

  getCurrentUser(): User | null {
    try {
      const data = localStorage.getItem('scaas_current_user');
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  async getAllUsers(): Promise<User[]> {
    try {
      const snapshot = await getDocs(collection(db, 'users'));
      return snapshot.docs.map((docSnap: any) => fromFirestore<User>(docSnap.data(), docSnap.id));
    } catch (error) {
      console.error('Error getting users:', error);
      return [];
    }
  },

  async createUser(user: Omit<User, 'id' | 'created_at'>): Promise<User> {
    try {
      const newUser: User = { 
        ...user, 
        id: genId('user'), 
        created_at: Date.now() 
      };
      await setDoc(doc(db, 'users', newUser.id), toFirestore(newUser));
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const q = query(collection(db, 'users'), where('email', '==', email));
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) return null;
      
      return fromFirestore<User>(snapshot.docs[0].data(), snapshot.docs[0].id);
    } catch (error) {
      console.error('Error getting user by email:', error);
      return null;
    }
  },

  async updateUser(id: string, data: Partial<User>): Promise<void> {
    try {
      await updateDoc(doc(db, 'users', id), toFirestore(data));
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },
};

// Shop API
export const ShopAPI = {
  async getAll(): Promise<CoffeeShop[]> {
    try {
      const snapshot = await getDocs(collection(db, 'shops'));
      return snapshot.docs.map((docSnap: any) => fromFirestore<CoffeeShop>(docSnap.data(), docSnap.id));
    } catch (error) {
      console.error('Error getting shops:', error);
      return [];
    }
  },

  async getById(id: string): Promise<CoffeeShop | undefined> {
    try {
      const docSnap = await getDoc(doc(db, 'shops', id));
      if (!docSnap.exists()) return undefined;
      return fromFirestore<CoffeeShop>(docSnap.data(), docSnap.id);
    } catch (error) {
      console.error('Error getting shop:', error);
      return undefined;
    }
  },

  async update(id: string, data: Partial<CoffeeShop>): Promise<CoffeeShop | undefined> {
    try {
      console.log('Updating shop:', id, data);
      const firestoreData = toFirestore(data);
      console.log('Firestore data to update:', firestoreData);
      
      // Update in Firestore
      const docRef = doc(db, 'shops', id);
      await updateDoc(docRef, firestoreData);
      console.log('Shop updated in Firestore');
      
      // Verify by reading it back
      const updatedShop = await this.getById(id);
      if (updatedShop) {
        console.log('✓ Verification successful - shop updated in Firestore');
        return updatedShop;
      } else {
        console.error('✗ Verification failed - shop not found after update');
        return undefined;
      }
    } catch (error) {
      console.error('Error updating shop:', error);
      return undefined;
    }
  },

  async create(shop: Omit<CoffeeShop, 'id' | 'created_at'>): Promise<CoffeeShop> {
    try {
      const newShop: CoffeeShop = { 
        ...shop, 
        id: genId('shop'), 
        created_at: Date.now() 
      };
      await setDoc(doc(db, 'shops', newShop.id), toFirestore(newShop));
      return newShop;
    } catch (error) {
      console.error('Error creating shop:', error);
      throw error;
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'shops', id));
    } catch (error) {
      console.error('Error deleting shop:', error);
      throw error;
    }
  },
};

// Category API
export const CategoryAPI = {
  async getByShop(shopId: string): Promise<MenuCategory[]> {
    try {
      console.log('Getting categories for shop:', shopId);
      const q = query(
        collection(db, 'categories'),
        where('shop_id', '==', shopId),
        orderBy('order')
      );
      const snapshot = await getDocs(q);
      const categories = snapshot.docs.map((docSnap: any) => fromFirestore<MenuCategory>(docSnap.data(), docSnap.id));
      console.log('Categories retrieved:', categories.length);
      return categories;
    } catch (error) {
      console.error('Error getting categories:', error);
      return [];
    }
  },

  async create(cat: Omit<MenuCategory, 'id'>): Promise<MenuCategory> {
    try {
      console.log('Creating category:', cat);
      const newCat: MenuCategory = { ...cat, id: genId('cat') };
      const firestoreData = toFirestore(newCat);
      console.log('Firestore data to save:', firestoreData);
      
      // Write to Firestore
      const docRef = doc(db, 'categories', newCat.id);
      await setDoc(docRef, firestoreData);
      console.log('Category written to Firestore:', newCat.id);
      
      // Verify the write by reading it back
      const verifyDoc = await getDoc(docRef);
      if (verifyDoc.exists()) {
        console.log('✓ Verification successful - category exists in Firestore');
      } else {
        console.error('✗ Verification failed - category not found in Firestore after write');
      }
      
      return newCat;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'categories', id));
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  },
};

// Item API
export const ItemAPI = {
  async getByShop(shopId: string): Promise<MenuItem[]> {
    try {
      console.log('Getting items for shop:', shopId);
      const q = query(collection(db, 'items'), where('shop_id', '==', shopId));
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map((docSnap: any) => fromFirestore<MenuItem>(docSnap.data(), docSnap.id));
      console.log('Items retrieved:', items.length);
      return items;
    } catch (error) {
      console.error('Error getting items:', error);
      return [];
    }
  },

  async create(item: Omit<MenuItem, 'id' | 'created_at'>): Promise<MenuItem> {
    try {
      console.log('Creating item:', item);
      const newItem: MenuItem = { 
        ...item, 
        id: genId('item'), 
        created_at: Date.now() 
      };
      const firestoreData = toFirestore(newItem);
      console.log('Firestore data to save:', firestoreData);
      
      // Write to Firestore
      const docRef = doc(db, 'items', newItem.id);
      await setDoc(docRef, firestoreData);
      console.log('Item written to Firestore:', newItem.id);
      
      // Verify the write by reading it back
      const verifyDoc = await getDoc(docRef);
      if (verifyDoc.exists()) {
        console.log('✓ Verification successful - item exists in Firestore');
      } else {
        console.error('✗ Verification failed - item not found in Firestore after write');
      }
      
      return newItem;
    } catch (error) {
      console.error('Error creating item:', error);
      throw error;
    }
  },

  async update(id: string, data: Partial<MenuItem>): Promise<void> {
    try {
      console.log('Updating item:', id, data);
      const firestoreData = toFirestore(data);
      await updateDoc(doc(db, 'items', id), firestoreData);
      console.log('Item updated successfully');
    } catch (error) {
      console.error('Error updating item:', error);
      throw error;
    }
  },

  async delete(id: string): Promise<void> {
    try {
      console.log('Deleting item:', id);
      await deleteDoc(doc(db, 'items', id));
      console.log('Item deleted successfully');
    } catch (error) {
      console.error('Error deleting item:', error);
      throw error;
    }
  },
};

// Table API
export const TableAPI = {
  async getByShop(shopId: string): Promise<Table[]> {
    try {
      console.log('Getting tables for shop:', shopId);
      const q = query(
        collection(db, 'tables'),
        where('shop_id', '==', shopId),
        orderBy('table_number')
      );
      const snapshot = await getDocs(q);
      const tables = snapshot.docs.map((docSnap: any) => fromFirestore<Table>(docSnap.data(), docSnap.id));
      console.log('Tables retrieved:', tables.length);
      return tables;
    } catch (error) {
      console.error('Error getting tables:', error);
      return [];
    }
  },

  async getById(id: string): Promise<Table | undefined> {
    try {
      console.log('Getting table by ID:', id);
      const docSnap = await getDoc(doc(db, 'tables', id));
      if (!docSnap.exists()) {
        console.log('Table not found');
        return undefined;
      }
      const table = fromFirestore<Table>(docSnap.data(), docSnap.id);
      console.log('Table retrieved:', table);
      return table;
    } catch (error) {
      console.error('Error getting table:', error);
      return undefined;
    }
  },

  async create(table: Omit<Table, 'id' | 'created_at'>): Promise<Table> {
    try {
      console.log('Creating table:', table);
      const newTable: Table = { 
        ...table, 
        id: genId('tbl'), 
        created_at: Date.now() 
      };
      const firestoreData = toFirestore(newTable);
      console.log('Firestore data to save:', firestoreData);
      
      // Write to Firestore
      const docRef = doc(db, 'tables', newTable.id);
      await setDoc(docRef, firestoreData);
      console.log('Table written to Firestore:', newTable.id);
      
      // Verify the write by reading it back
      const verifyDoc = await getDoc(docRef);
      if (verifyDoc.exists()) {
        console.log('✓ Verification successful - table exists in Firestore');
      } else {
        console.error('✗ Verification failed - table not found in Firestore after write');
      }
      
      return newTable;
    } catch (error) {
      console.error('Error creating table:', error);
      throw error;
    }
  },

  async delete(id: string): Promise<void> {
    try {
      console.log('Deleting table:', id);
      await deleteDoc(doc(db, 'tables', id));
      console.log('Table deleted successfully');
    } catch (error) {
      console.error('Error deleting table:', error);
      throw error;
    }
  },
};

// Request API
export const RequestAPI = {
  async getByShop(shopId: string): Promise<ServiceRequest[]> {
    try {
      const q = query(
        collection(db, 'requests'),
        where('shop_id', '==', shopId),
        orderBy('created_at', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((docSnap: any) => fromFirestore<ServiceRequest>(docSnap.data(), docSnap.id));
    } catch (error) {
      console.error('Error getting requests:', error);
      return [];
    }
  },

  async getPendingByShop(shopId: string): Promise<ServiceRequest[]> {
    try {
      const q = query(
        collection(db, 'requests'),
        where('shop_id', '==', shopId),
        where('status', '==', 'pending'),
        orderBy('created_at', 'asc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((docSnap: any) => fromFirestore<ServiceRequest>(docSnap.data(), docSnap.id));
    } catch (error) {
      console.error('Error getting pending requests:', error);
      return [];
    }
  },

  async getActiveForTable(shopId: string, tableId: string): Promise<ServiceRequest | null> {
    try {
      const q = query(
        collection(db, 'requests'),
        where('shop_id', '==', shopId),
        where('table_id', '==', tableId),
        where('status', '==', 'pending')
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) return null;
      return fromFirestore<ServiceRequest>(snapshot.docs[0].data(), snapshot.docs[0].id);
    } catch (error) {
      console.error('Error getting active request:', error);
      return null;
    }
  },

  async create(req: Omit<ServiceRequest, 'id' | 'created_at'>): Promise<ServiceRequest> {
    try {
      const newReq: ServiceRequest = { 
        ...req, 
        id: genId('req'), 
        created_at: Date.now() 
      };
      await setDoc(doc(db, 'requests', newReq.id), toFirestore(newReq));
      return newReq;
    } catch (error) {
      console.error('Error creating request:', error);
      throw error;
    }
  },

  async resolve(id: string): Promise<void> {
    try {
      await updateDoc(doc(db, 'requests', id), {
        status: 'resolved',
        resolved_at: Timestamp.fromMillis(Date.now())
      });
    } catch (error) {
      console.error('Error resolving request:', error);
      throw error;
    }
  },

  async cancel(shopId: string, tableId: string): Promise<void> {
    try {
      const q = query(
        collection(db, 'requests'),
        where('shop_id', '==', shopId),
        where('table_id', '==', tableId),
        where('status', '==', 'pending')
      );
      const snapshot = await getDocs(q);
      for (const docSnap of snapshot.docs) {
        await deleteDoc(docSnap.ref);
      }
    } catch (error) {
      console.error('Error canceling request:', error);
      throw error;
    }
  },

  async getStats(shopId: string): Promise<{ pending: number; today: number; total: number; resolved: number }> {
    try {
      const allRequests = await this.getByShop(shopId);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      return {
        pending: allRequests.filter(r => r.status === 'pending').length,
        today: allRequests.filter(r => r.created_at >= today.getTime()).length,
        total: allRequests.length,
        resolved: allRequests.filter(r => r.status === 'resolved').length,
      };
    } catch (error) {
      console.error('Error getting stats:', error);
      return { pending: 0, today: 0, total: 0, resolved: 0 };
    }
  },
};

// Wallet API
export const WalletAPI = {
  async getBalance(shopId: string): Promise<number> {
    try {
      const shop = await ShopAPI.getById(shopId);
      return shop?.wallet_balance || 0;
    } catch (error) {
      console.error('Error getting balance:', error);
      return 0;
    }
  },

  async topUp(shopId: string, amount: number, paymentMethod?: string): Promise<boolean> {
    try {
      const shop = await ShopAPI.getById(shopId);
      if (!shop || amount <= 0) return false;
      
      await ShopAPI.update(shopId, { 
        wallet_balance: (shop.wallet_balance || 0) + amount 
      });
      
      const transaction: WalletTransaction = {
        id: genId('txn'),
        shop_id: shopId,
        type: 'top_up',
        amount,
        description: `Wallet top-up via ${paymentMethod || 'Wallet'}`,
        payment_method: paymentMethod,
        status: 'completed',
        created_at: Date.now(),
      };
      await setDoc(doc(db, 'transactions', transaction.id), toFirestore(transaction));
      
      return true;
    } catch (error) {
      console.error('Error topping up:', error);
      return false;
    }
  },

  async getTransactions(shopId: string): Promise<WalletTransaction[]> {
    try {
      const q = query(
        collection(db, 'transactions'),
        where('shop_id', '==', shopId),
        orderBy('created_at', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((docSnap: any) => fromFirestore<WalletTransaction>(docSnap.data(), docSnap.id));
    } catch (error) {
      console.error('Error getting transactions:', error);
      return [];
    }
  },

  async addPaymentMethod(shopId: string, method: Omit<PaymentMethod, 'id'>): Promise<PaymentMethod> {
    try {
      const shop = await ShopAPI.getById(shopId);
      if (!shop) throw new Error('Shop not found');
      
      const newMethod: PaymentMethod = { ...method, id: genId('pm') };
      const updatedMethods = [...(shop.payment_methods || []), newMethod];
      
      await ShopAPI.update(shopId, { payment_methods: updatedMethods });
      
      return newMethod;
    } catch (error) {
      console.error('Error adding payment method:', error);
      throw error;
    }
  },

  async removePaymentMethod(shopId: string, methodId: string): Promise<boolean> {
    try {
      const shop = await ShopAPI.getById(shopId);
      if (!shop) return false;
      
      const updatedMethods = (shop.payment_methods || []).filter((m: any) => m.id !== methodId);
      await ShopAPI.update(shopId, { payment_methods: updatedMethods });
      
      return true;
    } catch (error) {
      console.error('Error removing payment method:', error);
      return false;
    }
  },
};

// Subscribe to real-time changes
export function subscribeToChanges(callback: () => void): () => void {
  const interval = setInterval(callback, 2000);
  
  return () => {
    clearInterval(interval);
  };
}
