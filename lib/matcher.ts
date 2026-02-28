import { ShopifyProduct } from "@/types";

export function exactSearch(
  products: ShopifyProduct[],
  query: string
): ShopifyProduct[] {
  const q = query.toLowerCase().trim();
  const words = q.split(" ").filter((w) => w.length > 0);

  return products.filter((p) => {
    const searchable = [p.title, p.product_type, ...p.tags]
      .join(" ")
      .toLowerCase();

    // Original: full query string match
    const fullMatch =
      p.title.toLowerCase().includes(q) ||
      p.product_type.toLowerCase().includes(q) ||
      p.tags.some((tag) => tag.toLowerCase().includes(q));

    // New: all words in query must appear somewhere in the product
    const allWordsMatch = words.every((word) => searchable.includes(word));

    return fullMatch || allWordsMatch;
  });
}

export function similarSearch(
  products: ShopifyProduct[],
  query: string
): ShopifyProduct[] {
  const q = query.toLowerCase().trim();
  const words = q.split(" ").filter((w) => w.length > 2);

  const scored = products
    .map((p) => {
      const searchable = [p.title, p.product_type, ...p.tags]
        .join(" ")
        .toLowerCase();

      const score = words.filter((word) => searchable.includes(word)).length;
      return { p, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

  return scored.map(({ p }) => p);
}