"use client";

import type { Product } from "../lib/api";
import useCartStore from "../store/cartStore";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const addToCart = useCartStore((state) => state.addToCart);

  const description = product.description;

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm">
      {product.imageUrl && (
        <div className="relative aspect-[4/3] w-full">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h2 className="text-lg font-semibold">{product.name}</h2>

        <div className="text-sm text-gray-600">
          {Array.isArray(description) || typeof description === "object" ? (
            // Strapi rich text / blocks
            <BlocksRenderer content={description} />
          ) : (
            // Vanlig text-string
            <p>{description}</p>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-base font-semibold">{product.price} kr</span>

          <button
            onClick={() => addToCart(product)}
            className="rounded bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 active:translate-y-px"
          >
            Lägg i kundkorg
          </button>
        </div>
      </div>
    </article>
  );
}
