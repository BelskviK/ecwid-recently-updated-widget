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
export async function fetchAllProducts(): Promise<EcwidProduct[]> {
  const { data } = await api.get("/api/products", { params: { limit: 100 } });
  return data.items as EcwidProduct[];
}

/** N most-recently updated products (for widget) */
export async function fetchRecentlyUpdated(limit = 6): Promise<EcwidProduct[]> {
  const { data } = await api.get("/api/products", {
    params: { limit, sortBy: "updateDateDesc" },
  });
  return data.items as EcwidProduct[];
}
