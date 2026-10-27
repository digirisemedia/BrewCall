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
