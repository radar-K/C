"use client";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import Link from "next/link";
import { formatGAItems, sendGAEvent } from "../lib/analytics";
import useCartStore from "../store/cartStore";

const formatPrice = (value: number) =>
  new Intl.NumberFormat("sv-SE", { minimumFractionDigits: 0 }).format(value);

const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "test";

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const subtotal = items.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
  const gaItems = formatGAItems(items);

  if (!items.length) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center text-gray-600">
        <p className="mb-4">Din kundvagn är tom.</p>
        <Link
          href="/"
          className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white"
        >
          Fortsätt handla
        </Link>
      </main>
    );
  }

  return (
    <main className="w-full px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <div>
          <p className="text-sm uppercase tracking-wide text-gray-500">
            Kassan
          </p>
          <h1 className="text-4xl font-bold text-gray-900">Checkout</h1>
        </div>

        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-md sm:p-8">
          <h2 className="text-xl font-semibold text-gray-900">
            Ordersammanfattning
          </h2>

          <div className="mt-4 space-y-3 text-sm text-gray-600">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-2xl border border-gray-100 px-4 py-3"
              >
                <div>
                  <p className="text-base font-semibold text-gray-900">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.quantity} × {formatPrice(item.price)} kr
                  </p>
                </div>
                <p className="text-base font-semibold text-gray-900">
                  {formatPrice(item.price * item.quantity)} kr
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-gray-200 pt-4 text-gray-700">
            <div className="flex items-center justify-between text-base">
              <span>Totalt</span>
              <span className="text-xl font-semibold text-gray-900">
                {formatPrice(subtotal)} kr
              </span>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-600">
              Betalning
            </h3>
            <PayPalScriptProvider
              options={{
                clientId,
                currency: "SEK",
                intent: "CAPTURE",
              }}
            >
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(_, actions) =>
                  actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                      {
                        amount: {
                          currency_code: "SEK",
                          value: subtotal.toFixed(2),
                          breakdown: {
                            item_total: {
                              currency_code: "SEK",
                              value: subtotal.toFixed(2),
                            },
                          },
                        },
                        items: items.map((item) => ({
                          name: item.name,
                          quantity: item.quantity.toString(),
                          unit_amount: {
                            currency_code: "SEK",
                            value: item.price.toFixed(2),
                          },
                        })),
                      },
                    ],
                  })
                }
                onClick={() => {
                  sendGAEvent("add_payment_info", {
                    payment_type: "paypal",
                    currency: "SEK",
                    value: subtotal,
                    items: gaItems,
                  });
                }}
                onApprove={(_, actions) =>
                  actions.order!.capture().then((details) => {
                    const firstName =
                      details?.payer?.name?.given_name ?? "shoppare";
                    sendGAEvent("purchase", {
                      transaction_id: details?.id ?? `sandbox-${Date.now()}`,
                      currency: "SEK",
                      value: subtotal,
                      items: gaItems,
                    });
                    alert(
                      `Tack ${firstName}! Betalningen slutfördes i PayPal Sandbox.`
                    );
                      clearCart();
                    })
                }
                onError={(err) => {
                  console.error(err);
                  alert("Något gick fel med PayPal. Försök igen.");
                }}
              />
            </PayPalScriptProvider>
          </div>
        </section>

        <Link
          href="/cart"
          className="self-center text-sm font-medium text-gray-500 hover:text-gray-800"
        >
          ← Tillbaka till kundvagnen
        </Link>
      </div>
    </main>
  );
}
