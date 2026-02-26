import { ShopifyProduct } from "@/types";

export function exactSearch(
  products: ShopifyProduct[],
  query: string
): ShopifyProduct[] {
  const q = query.toLowerCase().trim();
  return products.filter((p) => {
    const inTitle = p.title.toLowerCase().includes(q);
    const inType = p.product_type.toLowerCase().includes(q);
    const inTags = p.tags.some((tag) => tag.toLowerCase().includes(q));
    return inTitle || inType || inTags;
  });
}

export function similarSearch(
  products: ShopifyProduct[],
  query: string
): ShopifyProduct[] {
  const q = query.toLowerCase().trim();
  const words = q.split(" ").filter((w) => w.length > 2);

  return products.filter((p) => {
    const searchable = [
      p.title,
      p.product_type,
      ...p.tags,
    ]
      .join(" ")
      .toLowerCase();

    return words.some((word) => searchable.includes(word));
  });
}