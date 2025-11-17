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
    <article className="flex h-full min-h-[500px] flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">
      {product.imageUrl && (
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-7">
        <h2 className="mb-4 text-2xl font-semibold text-gray-900">
          {product.name}
        </h2>

        <div className="mb-5 flex-grow text-base text-gray-600 line-clamp-5 leading-relaxed">
          {Array.isArray(description) || typeof description === "object" ? (
            <BlocksRenderer content={description} />
          ) : (
            <p>{description}</p>
          )}
        </div>

        <div className="mt-auto">
          <div className="mb-4">
            <span className="text-3xl font-bold text-gray-900">
              {product.price} kr
            </span>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="w-full rounded-2xl bg-black px-4 py-4 text-lg font-semibold text-white transition-colors hover:bg-gray-900 active:translate-y-px"
          >
            Lägg i kundkorg
          </button>
        </div>
      </div>
    </article>
  );
}
