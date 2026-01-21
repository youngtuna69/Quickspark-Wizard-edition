
// Fix: Removed non-existent 'Member' import from '../types'
import { Transaction, BusinessInsight, InventoryItem } from '../types';

export const calculateProfit = (transactions: Transaction[], inventory: InventoryItem[]) => {
  return transactions.reduce((acc, tx) => {
    const item = inventory.find(i => i.id === tx.itemId);
    if (!item) return acc;
    return acc + (item.price - item.cost);
  }, 0);
};

export const detectDeadZones = (transactions: Transaction[]): BusinessInsight[] => {
  // Logic to find gaps in timestamps
  // Mock logic for simulation
  const hours = transactions.map(t => t.timestamp.getHours());
  const insight: BusinessInsight[] = [];
  
  // Example: If few transactions between 2pm-4pm
  insight.push({
    type: 'DEAD_ZONE',
    severity: 'high',
    message: "Traffic drop detected: 2:00 PM - 3:30 PM (Tuesday Slump).",
    // Fix: Changed property name to 'action' to match BusinessInsight interface defined in types.ts
    action: "☕ Afternoon slump? Flash sale! Get a 2-for-1 Cold Brew until 4 PM. Mention 'QUICKSPARK' at the counter! #ShopLocal"
  });

  return insight;
};

export const generateSocialPost = (memberCount: number, topItem: string, growth: number): string => {
  return `✨ Business is booming! Our community just hit ${memberCount} local legends. ${topItem} is flying off the shelves ${growth}% faster today. Come see what the hype is about!`;
};