"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProducts, type Product } from "./lib/api";
import ProductCard from "./components/ProductCard";

export default function Page() {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <main className="p-10">Laddar...</main>;
  if (error || !products) return <main className="p-10">Något gick fel</main>;

  return (
    <main className="space-y-10">
      <div className="mx-auto max-w-6xl 2xl:max-w-[88rem]">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Våra Produkter
          </h1>
        </header>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 2xl:gap-12">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </main>
  );
}
