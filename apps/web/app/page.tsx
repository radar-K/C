"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProducts, type Product } from "./lib/api"; // kolla sökvägen!

export default function Page() {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <p>Laddar...</p>;
  if (error) return <p>Något gick fel</p>;

  return (
    <main className="p-10">
      <h1>Produkter</h1>
      <ul>
        {products?.map((p) => (
          <li key={p.id}>
            <strong>{p.name}</strong> {p.price} kr
            {p.imageUrl && (
              <div>
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  style={{ maxWidth: 150, display: "block" }}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
