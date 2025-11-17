# Grupp-workshop (3 veckor): Fullstack E-handel

Med Strapi, React Native, PayPal & Google Analytics

Bygg en **fullständig e-handelslösning** i grupp med **webbapp**, **mobilapp**, **Strapi-CMS**, **kundkorg och checkout**, samt fokus på **SEO**, **CRO (Conversion Rate Optimization)**, **tester** och **Google Analytics**.  
Ni tränar på att arbeta som ett riktigt utvecklingsteam med planering, koddelning och gemensamma beslut.

---

## Mål

Efter tre veckor ska ni kunna:

- bygga ett **headless e-handelssystem**
- koppla ihop **Strapi CMS + frontend + mobilapp**
- hantera **kundkorg, checkout och betalningar** (PayPal sandbox)
- förbättra **SEO och konvertering (CRO)**
- mäta beteende via **Google Analytics**
- skriva **enhetstester och end-to-end-tester**
- arbeta effektivt i **grupp med Git och PR-flöden**

---

## Tekniska krav

| Del               | Krav                                                                                |
| ----------------- | ----------------------------------------------------------------------------------- |
| **CMS / Backend** | Strapi (standard). Grupper som vill kan använda Medusa.js (svårare, backend-fokus). |
| **Webbapp**       | React (gärna Next.js eller TanStack Start).                                         |
| **Mobilapp**      | React Native / Expo – visar produkter, kundkorg, checkout.                          |
| **Databas**       | SQLite eller MySQL (beroende på CMS-val).                                           |
| **Betalning**     | PayPal sandbox-integration (checkout button + redirect + success page).             |
| **Tester**        | Vitest + Testing Library (frontend) och Cypress (E2E).                              |
| **SEO & CRO**     | Meta-tags, schema.org, titlar (h1,h2) url:er, Sitemap                               |
| **Analytics**     | Google Analytics 4 – spårning av produktvisningar, kundkorg och checkout.           |
| **Verktyg**       | Turborepo och yarn workspaces för monorepo-setup.                                   |

---

## 🗂️ Projektstruktur (förslag)

```text
ecommerce-monorepo/
├── apps/
│   ├── web/          # React / Next.js
│   ├── mobile/       # React Native / Expo
│   └── cms/          # Strapi
├── packages/
│   └── shared/       # Typdefinitioner, hooks, utils
└── README.md
```

---

## 🗓️ Vecka 1 – Setup och Backend (CMS + API)

### Mål

Få upp Strapi, skapa produktmodell och koppla till frontend.

Ni kan utgå från detta projekt:

[https://github.com/davidshore/my-monorepo3-with-mobile](https://github.com/davidshore/my-monorepo3-with-mobile)

### Steg

1. **Setup monorepo**

   ```bash
   yarn create turbo@latest ecommerce-monorepo
   ```

2. **Skapa Strapi-projekt**

   ```bash
   cd apps && npx create-strapi-app@latest cms --quickstart

   ```

3. **Modeller i Strapi**

   - Product: name, price, description, image, category, inStock
   - Order: items, total, user, status

4. **Seed data**  
   Lägg till minst 10 produkter med bilder och beskrivningar.

5. **Testa API**

   ```bash
   curl http://localhost:1337/api/products

   ```

6. **Koppla frontend**

   - Skapa `apps/web`
   - Hämta produkter med TanStack Query
   - Visa produktlista

7. **Installera Google Analytics**
   - Skapa GA4-property på [analytics.google.com](https://analytics.google.com)
   - Lägg in tracking-script i webapp
   - Spåra events: `page_view`, `product_view`, `add_to_cart`

### 📈 SEO & CRO

- Lägg till title-taggar och meta-descriptions
- Skapa struktur för produkt-URL:er (t.ex. `/products/[slug]`)

---

## 🗓️ Vecka 2 – Frontend & App (Kundkorg och Checkout)

### Mål

Bygg webapp + mobilapp med kundkorg och PayPal-checkout.

### Steg

1. **Webbapp**

   - Produktlista och produktsida
   - Kundkorg med Zustand, Context eller Redux
   - Checkout med PayPal sandbox

     ```bash
     npm install @paypal/react-paypal-js
     ```

2. **Mobilapp**

   - Visa produkter från Strapi
   - Kundkorg och checkout (samma API)

3. **Dela kod**

   - Skapa `packages/shared` för typ- och API-funktioner

4. **Orderlogik**

   - När checkout lyckas → spara order i Strapi  
     Endpoint: `POST /api/orders`

5. **Tester**

   - Skriv enhetstester för kundkorgslogik
   - E2E-tester för checkout med Cypress (mocka PayPal)

6. **Google Analytics**
   - Spåra `begin_checkout`, `purchase`, `add_payment_info`
   - Lägg till event-triggers i kundkorg och checkout

### 📈 CRO & SEO

- Se till att titlar, url, h1 och h2, meta-taggar följer SEO
- Skapa en sitemap för SEO
- Optimera produktbeskrivningar (för sökord och klarhet)
- Analysera PageSpeed och Core Web Vitals

---

## 🗓️ Vecka 3 – Polering, CRO, Analytics och Tester

### 🎯 Mål

Förbättra upplevelse, säkerhet, konvertering och testtäckning.

### Steg

1. **Autentisering**

   - Lägg till login + registrering (Strapi Users plugin)

2. **SEO**

   - Dynamiska og-taggar (titel, bild)
   - Schema.org (Product, Breadcrumb)
   - Sitemap

3. **Tester**

   - Tester av viktiga funktioner i frontend

4. **CRO**

   - Google Analytics events för CTA och funnel analysis

5. **Presentation**
   - Visa live-demo (webb och mobil)
   - Förklara valda tekniker och CRO/SEO/Analytics-strategier

---

## 🧠 VG-nivå – fördjupning

För VG-nivå ska ni dessutom ha:

- Responsiv och tillgänglig UI (ARIA, WCAG)
- Visa orderhistorik för inloggad användare
- End-to-end tester med cypress
- Genomtänkt CRO/SEO/Analytics-strategi dokumenterad i README
- Live-demo på Vercel + Expo build (public link)
