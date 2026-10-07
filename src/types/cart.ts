export interface CartItem {
  id: string; // unique cart item id (can be combination of service id and options)
  serviceId: string;
  slug: string;
  name: string;
  image: string;
  category: string;
  marketId: string;
  basePrice: number;
  quantity: number;
  options: Record<string, string>; // e.g., { "Package": "Premium (20 Posts)", "Finish": "Matte" }
}

export interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}
