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
    // Fungerar både om datan ligger i item.attributes eller direkt i item
    const attrs = item.attributes ?? item ?? {};

    // --- Bild (valfri) ---
    let imageUrl: string | undefined;

    const imageField = attrs.image;
    if (imageField) {
      // single media: { data: { attributes: { url } } }
      const media = imageField.data ?? imageField;

      if (Array.isArray(media)) {
        const first = media[0];
        if (first?.attributes?.url) {
          imageUrl = `${STRAPI_URL}${first.attributes.url}`;
        } else if (first?.url) {
          imageUrl = `${STRAPI_URL}${first.url}`;
        }
      } else if (media?.attributes?.url) {
        imageUrl = `${STRAPI_URL}${media.attributes.url}`;
      } else if (media?.url) {
        imageUrl = `${STRAPI_URL}${media.url}`;
      }
    }

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
