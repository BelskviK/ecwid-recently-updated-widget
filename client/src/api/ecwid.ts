import axios from "axios";

/** Single axios instance → http://localhost:3000 */
const api = axios.create({
  baseURL: "http://localhost:3000",
});

export interface EcwidProduct {
  id: number;
  name: string;
  price: number;
  currency: string;
  thumbnailUrl: string;
  imageUrl?: string;
  url?: string;
  defaultDisplayedPriceFormatted?: string;
}

/** All products (for /products page) */
export async function fetchRecentlyUpdated(limit = 6): Promise<EcwidProduct[]> {
  const { data } = await api.get("/api/products", {
    params: { limit, sortBy: "UPDATED_TIME_DESC" },
  });

  const currency = data.currency; // <-- store-wide currency comes from top level
  return (data.items as EcwidProduct[]).map((p) => ({
    ...p,
    currency, // inject currency so the widget can format
  }));
}

/** All products (optional — same fix if you need currency elsewhere) */
export async function fetchAllProducts(): Promise<EcwidProduct[]> {
  const { data } = await api.get("/api/products", { params: { limit: 100 } });

  const currency = data.currency;
  return (data.items as EcwidProduct[]).map((p) => ({
    ...p,
    currency,
  }));
}
