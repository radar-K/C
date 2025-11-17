"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProducts, type Product } from "../app/lib/api";

export default function Page() {
  const { data, isLoading, isError, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <p>Laddar...</p>;

  if (isError) {
    console.error("React Query error:", error);
    return <p>Något gick fel</p>;
  }

  if (!data || data.length === 0) {
    return <p>Inga produkter hittades.</p>;
  }

  return (
    <main>
      <h1>Produkter</h1>
      <ul>
        {data.map((p) => (
          <li key={p.id}>
            <strong>{p.name}</strong> – {p.price} kr
          </li>
        ))}
      </ul>
    </main>
  );
}
