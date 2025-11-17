"use client";

import { create } from "zustand";
import type { Product } from "../lib/api";
import { sendGAEvent } from "../lib/analytics";

export type CartItem = Product & {
  quantity: number;
};

export type CartStore = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
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
        sendGAEvent("add_to_cart", {
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

      sendGAEvent("add_to_cart", {
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

  increaseQuantity: (id) =>
    set((state) => {
      const item = state.items.find((i) => i.id === id);
      if (!item) return state;

      sendGAEvent("add_to_cart", {
        items: [
          { id: item.id, name: item.name, price: item.price, quantity: item.quantity + 1 },
        ],
      });

      return {
        items: state.items.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    }),

  decreaseQuantity: (id) =>
    set((state) => {
      const item = state.items.find((i) => i.id === id);
      if (!item) return state;

      if (item.quantity <= 1) {
        sendGAEvent("remove_from_cart", {
          items: [{ id: item.id, name: item.name, price: item.price, quantity: 1 }],
        });
        return { items: state.items.filter((i) => i.id !== id) };
      }

      sendGAEvent("remove_from_cart", {
        items: [
          { id: item.id, name: item.name, price: item.price, quantity: 1 },
        ],
      });

      return {
        items: state.items.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        ),
      };
    }),

  removeFromCart: (id) =>
    set((state) => {
      const item = state.items.find((i) => i.id === id);

      if (item) {
        sendGAEvent("remove_from_cart", {
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
    sendGAEvent("clear_cart");
    return set({ items: [] });
  },

  getTotal: () =>
    get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
}));

export default useCartStore;
