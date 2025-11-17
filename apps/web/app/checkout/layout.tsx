import type { ReactNode } from "react";

export const metadata = {
  title: "Checkout | E-handel Shop",
  description:
    "Slutför ditt köp tryggt i vår kassa och betala med PayPal eller kort via PayPal Sandbox.",
};

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
