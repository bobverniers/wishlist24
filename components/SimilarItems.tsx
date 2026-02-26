import { ShopifyProduct } from "@/types";
import ProductGrid from "./ProductGrid";

interface SimilarItemsProps {
  products: ShopifyProduct[];
}

export default function SimilarItems({ products }: SimilarItemsProps) {
  if (products.length === 0) return null;

  return (
    <div className="w-full mt-8">
      <div className="border-t border-white/10 pt-8 mb-6">
        <p className="text-xs tracking-widest uppercase text-white/40 mb-1">
          No exact match found
        </p>
        <h2 className="text-xl font-black uppercase tracking-tighter">
          Similar Items
        </h2>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}