declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type GAEventParams = Record<string, unknown>;

export const sendGAEvent = (name: string, params: GAEventParams = {}) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
};

export const formatGAItems = (items: Array<{ id: number; name: string; price: number; quantity: number }>) =>
  items.map((item) => ({
    item_id: item.id,
    item_name: item.name,
    price: item.price,
    quantity: item.quantity,
  }));
