import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  stock: number;
  category: string;
};

type CheckoutMode = "cart" | "buynow";

type CartStore = {
  items: CartItem[];
  buyNowItem: CartItem | null;
  checkoutMode: CheckoutMode;

  // Cart actions
  addItem: (product: Omit<CartItem, "quantity">, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  // Buy now actions
  setBuyNowItem: (item: CartItem) => void;
  clearBuyNowItem: () => void;

  // Mode — determines what checkout page shows
  setCheckoutMode: (mode: CheckoutMode) => void;

  // Derived
  getTotalItems: () => number;
  getTotalPrice: () => number;

  // Returns items for checkout based on current mode
  getCheckoutItems: () => CartItem[];
  getCheckoutTotal: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      buyNowItem: null,
      checkoutMode: "cart",

      setCheckoutMode: (mode) => set({ checkoutMode: mode }),

      // addItem — increments if already in cart, caps at stock
      addItem: (product, quantity) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === product.productId,
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === product.productId
                  ? {
                      ...i,
                      quantity: Math.min(i.quantity + quantity, product.stock),
                    }
                  : i,
              ),
            };
          }
          return {
            items: [
              ...state.items,
              { ...product, quantity: Math.min(quantity, product.stock) },
            ],
          };
        });
      },

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.productId !== productId)
              : state.items.map((i) =>
                  i.productId === productId
                    ? { ...i, quantity: Math.min(quantity, i.stock) }
                    : i,
                ),
        })),

      // clearCart wipes items AND resets buy now and mode
      clearCart: () =>
        set({ items: [], buyNowItem: null, checkoutMode: "cart" }),

      setBuyNowItem: (item) =>
        set({ buyNowItem: item, checkoutMode: "buynow" }),

      clearBuyNowItem: () => set({ buyNowItem: null, checkoutMode: "cart" }),

      getTotalItems: () => get().items.reduce((s, i) => s + i.quantity, 0),

      getTotalPrice: () =>
        get().items.reduce((s, i) => s + i.price * i.quantity, 0),

      // The checkout page calls these — works for both cart and buy now mode
      getCheckoutItems: () => {
        const { checkoutMode, buyNowItem, items } = get();
        if (checkoutMode === "buynow" && buyNowItem) return [buyNowItem];
        return items;
      },

      getCheckoutTotal: () => {
        const { checkoutMode, buyNowItem, items } = get();
        if (checkoutMode === "buynow" && buyNowItem) {
          return buyNowItem.price * buyNowItem.quantity;
        }
        return items.reduce((s, i) => s + i.price * i.quantity, 0);
      },
    }),
    { name: "cart-storage" },
  ),
);
