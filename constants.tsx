
import { InventoryItem, Review, LocalEvent, CustomerPersona } from './types';

export const TRUCK_MENU: InventoryItem[] = [
  { id: 't1', name: 'Tacos', price: 4.25, cost: 1.10, category: 'Main', standardPortion: '2oz meat', burnRate: 15, expiryDays: 3, currentStock: 450 },
  { id: 't2', name: 'Queso birria', price: 5.99, cost: 1.80, category: 'Premium', standardPortion: '3oz birria', burnRate: 25, expiryDays: 2, currentStock: 120 },
  { id: 't3', name: 'Super Burritos', price: 14.99, cost: 4.50, category: 'Main', standardPortion: '6oz meat', burnRate: 35, expiryDays: 4, currentStock: 80 },
  { id: 't4', name: 'Regular Burritos', price: 12.25, cost: 3.80, category: 'Main', standardPortion: '4oz meat', burnRate: 20, expiryDays: 4, currentStock: 65 },
  { id: 't5', name: 'Veggie Burrito', price: 12.25, cost: 2.50, category: 'Main', standardPortion: 'beans/rice', burnRate: 10, expiryDays: 5, currentStock: 40 },
  { id: 't6', name: 'Quesadilla', price: 13.75, cost: 4.00, category: 'Main', standardPortion: '5oz cheese/meat', burnRate: 30, expiryDays: 4, currentStock: 55 },
  { id: 't7', name: 'Torta', price: 13.75, cost: 4.20, category: 'Sandwich', standardPortion: 'Multi-meat', burnRate: 15, expiryDays: 3, currentStock: 25 },
  { id: 't8', name: 'Agua Fresca', price: 5.50, cost: 0.80, category: 'Drinks', standardPortion: '20oz', burnRate: 5, expiryDays: 2, currentStock: 100 },
];

export const HISTORICAL_SALES = [
  { name: 'Tacos', qty: 941, net: 3058.25, cost: 1.10 },
  { name: 'Queso birria', qty: 407, net: 1831.50, cost: 1.80 },
  { name: 'Soda/water', qty: 243, net: 607.50, cost: 0.50 },
  { name: 'Super Burritos', qty: 237, net: 2832.00, cost: 4.50 },
  { name: 'Regular Burritos', qty: 124, net: 1240.00, cost: 3.80 },
  { name: 'Agua Fresca', qty: 78, net: 351.00, cost: 0.80 },
  { name: 'Quesadilla', qty: 58, net: 739.50, cost: 4.00 },
  { name: 'Veggie Burrito', qty: 32, net: 352.00, cost: 2.50 },
];

export const GOOGLE_REVIEWS: Review[] = [
  { author: "Sara Rogers", rating: 5, comment: "I love their carne asada tacos and their chicken nachos.", date: "1 month ago" },
  { author: "Nokia n900", rating: 5, comment: "Carne asada was perfectly seasoned. Salsa pairs well.", date: "3 years ago" },
  { author: "Alejandra Ramirez", rating: 5, comment: "Tacos de tripa are top tier - ask for extra crunchy", date: "1 year ago" },
];

export const LOCAL_EVENTS: LocalEvent[] = [
  { name: "Apple Blossom Festival", date: "2025-04-20", impact: "high", description: "Large crowds in downtown Sebastopol." },
  { name: "Gravenstein Apple Fair", date: "2025-08-12", impact: "high", description: "Major regional draw for tourists." },
  { name: "Cajun Festival", date: "2025-06-15", impact: "medium", description: "Increased weekend foot traffic." },
  { name: "St. Patrick's Day", date: "2025-03-17", impact: "medium", description: "Higher demand for hearty evening meals." }
];

export const CUSTOMERS: CustomerPersona[] = [
  { id: 'c1', name: 'Sebastopol Regular', cohort: 'Solo Commuter', visitCount: 15, favoriteItem: 'Super Burritos', lastVisit: new Date(), streak: 4 },
  { id: 'c2', name: 'The Park Family', cohort: 'Family Bulk', visitCount: 8, favoriteItem: 'Queso birria', lastVisit: new Date(), streak: 1 },
  { id: 'c3', name: 'Gravenstein Local', cohort: 'Solo Commuter', visitCount: 22, favoriteItem: 'Tacos', lastVisit: new Date(), streak: 5 },
];
