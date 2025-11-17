// apps/web/app/lib/api.ts

export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  inStock: boolean;
  imageUrl?: string;
};

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${STRAPI_URL}/api/products?populate=image`, {
    cache: "no-store",
  });

  if (!res.ok) {
    // bra vid felsökning
    console.error("Strapi error:", await res.text());
    throw new Error("Failed to fetch products");
  }

  const json = await res.json();

  return json.data.map((item: any) => {
    const attrs = item.attributes;
    const imgData = attrs.image?.data;
    const imgUrl = imgData?.attributes?.url;

    return {
      id: item.id,
      name: attrs.name,
      price: attrs.price,
      description: attrs.description,
      category: attrs.category,
      inStock: attrs.inStock,
      imageUrl: imgUrl ? `${STRAPI_URL}${imgUrl}` : undefined,
    };
  });
}
