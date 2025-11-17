"use client";

import { Trash2 } from "lucide-react";
import useCartStore from "../store/cartStore";

const formatPrice = (value: number) =>
  new Intl.NumberFormat("sv-SE").format(value);

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!items.length) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center px-4">
        <p className="max-w-md text-center text-gray-600">
          Din kundvagn är tom just nu.
        </p>
      </main>
    );
  }

  return (
    <main className="w-full px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 lg:max-w-6xl">
        <section>
          <h1 className="mb-6 text-3xl font-bold text-gray-900">
            Din Kundkorg
          </h1>

          <div className="space-y-5">
            {items.map((item) => (
              <article
                key={item.id}
                className="flex flex-col gap-5 rounded-3xl border border-gray-200 bg-white p-6 shadow-md md:flex-row md:items-center"
              >
                <div className="flex flex-1 items-center gap-5">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-24 w-24 rounded-2xl object-cover"
                    />
                  )}
                  <div>
                    <p className="text-xl font-semibold text-gray-900">
                      {item.name}
                    </p>
                    <p className="text-base text-gray-500">
                      {formatPrice(item.price)} kr
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-end md:gap-5">
                  <div className="flex items-center rounded-full border border-gray-200">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="h-11 w-11 text-lg font-semibold text-gray-700 transition hover:text-gray-900"
                    >
                      -
                    </button>
                    <span className="w-14 text-center text-lg font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="h-11 w-11 text-lg font-semibold text-gray-700 transition hover:text-gray-900"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-xl font-semibold text-gray-900">
                    {formatPrice(item.price * item.quantity)} kr
                  </p>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 transition hover:text-gray-700"
                    aria-label={`Ta bort ${item.name}`}
                  >
                    <Trash2 className="h-6 w-6" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            Ordersammanfattning
          </h2>

          <div className="mt-4 space-y-3 text-sm text-gray-600">
            <div className="flex items-center justify-between">
              <span>Delsumma</span>
              <span>{formatPrice(subtotal)} kr</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Frakt</span>
              <span>Gratis</span>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between text-lg font-semibold text-gray-900">
            <span>Totalt</span>
            <span>{formatPrice(subtotal)} kr</span>
          </div>

          <button className="mt-6 w-full rounded-full bg-black py-3 text-center text-base font-semibold text-white transition hover:bg-gray-900">
            Gå till kassan
          </button>
        </section>
      </div>
    </main>
  );
}
