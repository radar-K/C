"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import useCartStore from "../store/cartStore";

export function Navbar() {
  const items = useCartStore((state) => state.items);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="navbar-logo">
          En affär med vackra föremål för den som är intresserad
        </Link>

        <nav
          className="navbar-links"
          style={{ display: "flex", alignItems: "center", gap: "2rem" }}
        >
          <Link
            href="/"
            className="navbar-link"
            style={{ display: "flex", alignItems: "center" }}
          >
            Produkter
          </Link>

          <Link
            href="/cart"
            className="navbar-cart"
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              padding: "0.5rem",
            }}
          >
            <ShoppingCart style={{ width: "20px", height: "20px" }} />
            {itemCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  right: "-4px",
                  top: "-4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "black",
                  color: "white",
                  fontSize: "10px",
                  fontWeight: "600",
                }}
              >
                {itemCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
