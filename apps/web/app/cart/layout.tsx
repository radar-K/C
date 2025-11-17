import type { ReactNode } from "react";

export const metadata = {
  title: "Din kundkorg | E-handel Shop",
  description:
    "Se över dina valda produkter, uppdatera mängder och gå vidare till kassan för att avsluta köpet.",
};

export default function CartLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
