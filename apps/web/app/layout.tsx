import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "../app/components/NavBar";

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
      <body>
        <Providers>
          <Navbar />
          <main
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "2rem 1.5rem",
            }}
          >
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
