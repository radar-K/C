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
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      {product.imageUrl && (
        <div className="relative aspect-square w-full overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          {product.name}
        </h2>

        <div className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">
          {Array.isArray(description) || typeof description === "object" ? (
            <BlocksRenderer content={description} />
          ) : (
            <p>{description}</p>
          )}
        </div>

        <div className="mt-auto">
          <div className="mb-3">
            <span className="text-xl font-bold text-gray-900">
              {product.price} kr
            </span>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="w-full rounded-lg bg-black px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800 active:translate-y-px"
          >
            Lägg i kundkorg
          </button>
        </div>
      </div>
    </article>
  );
}
