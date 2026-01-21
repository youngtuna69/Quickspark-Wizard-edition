
export enum Tier {
  BRONZE = 'BRONZE',
  SILVER = 'SILVER',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM'
}

export type Sector = 'TRUCK';

export interface InventoryItem {
  id: string;
  name: string;
  price: number;
  cost: number;
  category: string;
  standardPortion: string;
  burnRate: number; 
  expiryDays: number;
  currentStock: number;
}

export interface Transaction {
  id: string;
  itemId: string;
  timestamp: Date;
  amount: number;
  quantity: number;
  customerId?: string;
}

export interface CustomerPersona {
  id: string;
  name: string;
  cohort: 'Solo Commuter' | 'Family Bulk' | 'Late Night Maverick';
  visitCount: number;
  favoriteItem: string;
  lastVisit: Date;
  streak: number;
}

export interface BusinessInsight {
  type: 'DEAD_ZONE' | 'YIELD_ALERT' | 'MARGIN_BOOST' | 'SOCIAL_OMEN' | 'EVENT_ALERT';
  message: string;
  action: string;
  severity: 'low' | 'medium' | 'high';
}

export interface SocialAccount {
  platform: 'instagram' | 'facebook' | 'tiktok';
  connected: boolean;
  username?: string;
}

export interface LocalEvent {
  name: string;
  date: string;
  impact: 'high' | 'medium';
  description: string;
}

// Added Review interface to fix error: Module '"./types"' has no exported member 'Review'
export interface Review {
  author: string;
  rating: number;
  comment: string;
  date: string;
}
