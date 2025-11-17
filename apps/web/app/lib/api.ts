// app/lib/api.ts
export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  inStock: boolean;
  imageUrl?: string;
  slug: string;
};

const STRAPI_URL = "http://localhost:1337";

const slugify = (value: string) =>
  value
    .toString()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

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

    const name = attrs.name ?? `produkt-${item.id}`;

    return {
      id: item.id,
      name,
      price: attrs.price,
      description: attrs.description,
      category: attrs.category,
      inStock: attrs.inStock,
      imageUrl,
      slug: attrs.slug ?? slugify(name),
    };
  });
}

export async function fetchProductBySlug(
  slug: string
): Promise<Product | null> {
  const products = await fetchProducts();
  return products.find((product) => product.slug === slug) ?? null;
}
