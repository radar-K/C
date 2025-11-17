// app/lib/api.ts
export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  inStock: boolean;
  imageUrl?: string;
};

const STRAPI_URL = "http://localhost:1337";

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${STRAPI_URL}/api/products?populate=image`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const json = await res.json();
  console.log("Strapi JSON:", json);

  return json.data.map((item: any) => {
    // Strapi v4: fält ligger i item.attributes
    const attrs = item.attributes ?? item;

    // hantera om det saknas bild utan att krascha
    const imgData =
      attrs.image?.data?.attributes?.url ??
      attrs.image?.attributes?.url ??
      attrs.image?.url;

    const imageUrl = imgData ? `${STRAPI_URL}${imgData}` : undefined;

    return {
      id: item.id,
      name: attrs.name,
      price: attrs.price,
      description: attrs.description,
      category: attrs.category,
      inStock: attrs.inStock,
      imageUrl,
    };
  });
}
