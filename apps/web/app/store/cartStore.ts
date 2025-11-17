"use client";

import { create } from "zustand";
import type { Product } from "../lib/api";

function trackEvent(name: string, params: any = {}) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", name, params);
  }
}

export type CartItem = Product & {
  quantity: number;
};

export type CartStore = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  getTotal: () => number;
};

const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addToCart: (product) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === product.id);

      if (existing) {
        trackEvent("add_to_cart", {
          items: [
            {
              id: product.id,
              name: product.name,
              price: product.price,
              quantity: existing.quantity + 1,
            },
          ],
        });

        return {
          items: state.items.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }

      trackEvent("add_to_cart", {
        items: [
          {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
          },
        ],
      });

      return {
        items: [...state.items, { ...product, quantity: 1 }],
      };
    }),

  removeFromCart: (id) =>
    set((state) => {
      const item = state.items.find((i) => i.id === id);

      if (item) {
        trackEvent("remove_from_cart", {
          items: [
            {
              id: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
            },
          ],
        });
      }

      return {
        items: state.items.filter((item) => item.id !== id),
      };
    }),

  clearCart: () => {
    trackEvent("clear_cart");
    return set({ items: [] });
  },

  getTotal: () =>
    get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
}));

export default useCartStore;
