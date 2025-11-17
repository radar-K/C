"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "./lib/api";

export default function Page() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <p>Laddar...</p>;
  if (error) return <p>Något gick fel</p>;

  return (
    <main>
      <h1>Produkter</h1>
      <ul>
        {data?.map((p) => (
          <li key={p.id}>
            <strong>{p.name}</strong> – {p.price} kr
          </li>
        ))}
      </ul>
    </main>
  );
}
