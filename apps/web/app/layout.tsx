import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "../app/components/NavBar";
import Analytics from "./analytics";

export const metadata = {
  title: "E-handel Shop",
  description: "Fullstack e-handel med Strapi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <body className="bg-[var(--background)] text-[var(--foreground)] antialiased">
        <Providers>
          <Navbar />
          <main className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-8 lg:max-w-7xl lg:px-16 lg:py-16">
            {children}
          </main>
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
