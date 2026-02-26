import { ShopifyProduct } from "@/types";

const BASE_URL = "https://mokumvintage.com/products.json";
const PAGE_LIMIT = 250;

export async function fetchAllProducts(): Promise<ShopifyProduct[]> {
  const allProducts: ShopifyProduct[] = [];
  let page = 1;

  while (true) {
    const url = `${BASE_URL}?limit=${PAGE_LIMIT}&page=${page}`;

    const res = await fetch(url, {
      next: { revalidate: 300 }, // cache for 5 minutes
    });

    if (!res.ok) {
      throw new Error(`Shopify fetch failed: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    const products: ShopifyProduct[] = data.products ?? [];

    if (products.length === 0) break;
    allProducts.push(...products);
    if (products.length < PAGE_LIMIT) break;

    page++;
  }

  return allProducts;
}