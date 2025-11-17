// apps/web/app/layout.tsx
import type { ReactNode } from "react";
import "./globals.css";
import { Providers } from "./providers"; // ✅ för named export
console.log("Providers är:", Providers);

export const metadata = {
  title: "E-handel",
  description: "Min shop",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="sv">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
