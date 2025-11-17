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
    <main className="p-10">
      <section className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold">Våra Produkter</h1>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
