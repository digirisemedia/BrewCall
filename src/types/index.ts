// ==========================================
// SaaS Data Types - Multi-tenant Coffee Shop Platform
// ==========================================

export type UserRole = 'super_admin' | 'shop_admin';
export type RequestType = 'waiter' | 'water' | 'bill' | 'custom';
export type RequestStatus = 'pending' | 'in_progress' | 'resolved';

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  shop_id: string | null; // null for super_admin
  avatar?: string;
  created_at: number;
}

export interface CoffeeShop {
  id: string;
  name: string;
  tagline: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  logo_emoji: string;
  primary_color: string;
  owner_id: string;
  is_active: boolean;
  created_at: number;
  subscription_plan: 'free' | 'starter' | 'pro';
  // Social media links
  google_business?: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  // Payment & Wallet
  wallet_balance: number;
  payment_methods: PaymentMethod[];
}

export type PaymentMethodType = 'cash_plus' | 'bank_transfer' | 'credit_card' | 'paypal' | 'wallet';

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  label: string;
  is_default: boolean;
  details?: string;
}

export interface WalletTransaction {
  id: string;
  shop_id: string;
  type: 'top_up' | 'payment' | 'refund';
  amount: number;
  description: string;
  payment_method?: PaymentMethodType;
  status: 'completed' | 'pending' | 'failed';
  created_at: number;
}

export interface MenuCategory {
  id: string;
  shop_id: string;
  name: string;
  icon: string;
  order: number;
  is_active: boolean;
}

export interface MenuItem {
  id: string;
  shop_id: string;
  category_id: string;
  name: string;
  description: string;
  price: number;
  image_emoji: string;
  image_url?: string;
  is_available: boolean;
  is_popular: boolean;
  created_at: number;
}

export interface Table {
  id: string;
  shop_id: string;
  table_number: number;
  label: string;
  seats: number;
  location: string;
  is_active: boolean;
  created_at: number;
}

export interface ServiceRequest {
  id: string;
  shop_id: string;
  table_id: string;
  table_number: number;
  request_type: RequestType;
  custom_message?: string;
  status: RequestStatus;
  created_at: number;
  resolved_at?: number;
}

export interface DashboardStats {
  total_shops: number;
  active_shops: number;
  total_requests_today: number;
  total_users: number;
}
