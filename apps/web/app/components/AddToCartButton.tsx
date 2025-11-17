"use client";

import type { Product } from "../lib/api";
import useCartStore from "../store/cartStore";

type Props = {
  product: Product;
};

export function AddToCartButton({ product }: Props) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <button
      onClick={() => addToCart(product)}
      className="mt-6 w-full rounded-2xl bg-black px-4 py-4 text-lg font-semibold text-white transition-colors hover:bg-gray-900"
    >
      Lägg i kundkorg
    </button>
  );
}
