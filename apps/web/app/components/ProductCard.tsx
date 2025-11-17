"use client";

import Link from "next/link";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import type { Product } from "../lib/api";
import useCartStore from "../store/cartStore";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const addToCart = useCartStore((state) => state.addToCart);
  const description = product.description;
  const productHref = `/products/${product.slug}`;

  const isRichDescription =
    Array.isArray(description) || typeof description === "object";

  return (
    <article className="flex h-full min-h-[500px] flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">
      {product.imageUrl && (
        <Link href={productHref} className="relative block aspect-[4/5] w-full overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </Link>
      )}

      <div className="flex flex-1 flex-col p-7">
        <Link href={productHref} className="mb-4 block text-2xl font-semibold text-gray-900">
          {product.name}
        </Link>

        <div className="mb-5 flex-grow text-base text-gray-600 line-clamp-5 leading-relaxed">
          {isRichDescription ? (
            <BlocksRenderer content={description as any} />
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
            className="w-full rounded-2xl bg-black px-4 py-4 text-lg font-semibold text-white transition-colors hover:bg-gray-900"
          >
            Lägg i kundkorg
          </button>
        </div>
      </div>
    </article>
  );
}
