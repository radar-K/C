// apps/web/app/components/ProductCard.tsx
"use client";

import Image from "next/image";
import type { Product } from "../lib/api";

type ProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm">
      {product.imageUrl && (
        <div className="relative h-48 w-full">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-sm text-gray-600 line-clamp-3">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-base font-semibold">{product.price} kr</span>

          <button
            onClick={() => onAddToCart(product)}
            className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Lägg i kundkorg
          </button>
        </div>
      </div>
    </article>
  );
}
