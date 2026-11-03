export type Inventory = Readonly<Record<string, number>>;

export function addItem(inventory: Inventory, itemId: string): Inventory {
  return { ...inventory, [itemId]: (inventory[itemId] ?? 0) + 1 };
}

export function inventoryToList(inventory: Inventory, labels: Record<string, string>): string[] {
  return Object.entries(inventory).map(([id, count]) => `${labels[id] ?? id}${count > 1 ? ` ×${count}` : ''}`);
}
