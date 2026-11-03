import { addItem, inventoryToList } from './inventory';

describe('inventory', () => {
  it('adds an item without mutating the previous inventory', () => {
    const initial = { notes: 1 };
    const next = addItem(initial, 'token');
    expect(next).toEqual({ notes: 1, token: 1 });
    expect(initial).toEqual({ notes: 1 });
  });

  it('increments an existing item', () => {
    expect(addItem({ token: 1 }, 'token')).toEqual({ token: 2 });
  });

  it('creates readable labels', () => {
    expect(inventoryToList({ notes: 2 }, { notes: 'Field notes' })).toEqual(['Field notes ×2']);
  });
});
