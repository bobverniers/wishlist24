import { ShopifyProduct } from "@/types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: ShopifyProduct[];
  label?: string;
}

export default function ProductGrid({ products, label }: ProductGridProps) {
  return (
    <div className="w-full">
      {label && (
        <p className="text-xs tracking-widest uppercase text-white/40 mb-4">
          {label}
        </p>
      )}
      <div className="grid grid-cols-2 gap-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}