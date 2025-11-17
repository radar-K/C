import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { notFound } from "next/navigation";
import { AddToCartButton } from "../../components/AddToCartButton";
import { fetchProductBySlug } from "../../lib/api";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const product = await fetchProductBySlug(params.slug);

  if (!product) {
    return {
      title: "Produkten hittades inte | E-handel Shop",
      description: "Produkten du letar efter är tyvärr inte tillgänglig.",
    };
  }

  const descriptionText =
    typeof product.description === "string"
      ? product.description
      : "Utforska mer information om denna produkt.";

  return {
    title: `${product.name} | E-handel Shop`,
    description: descriptionText.slice(0, 150),
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await fetchProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const isRichDescription =
    Array.isArray(product.description) || typeof product.description === "object";

  return (
    <main className="mx-auto grid max-w-5xl gap-10 py-10 lg:grid-cols-2">
      {product.imageUrl && (
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="flex flex-col rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <p className="text-sm uppercase tracking-wide text-gray-400">{product.category}</p>
        <h1 className="mt-2 text-4xl font-bold text-gray-900">{product.name}</h1>

        <p className="mt-6 text-3xl font-semibold text-gray-900">{product.price} kr</p>

        <div className="mt-6 text-gray-600">
          {isRichDescription ? (
            <BlocksRenderer content={product.description as any} />
          ) : (
            <p>{product.description}</p>
          )}
        </div>

        <AddToCartButton product={product} />
      </div>
    </main>
  );
}
