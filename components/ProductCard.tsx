import { ShopifyProduct } from "@/types";

interface ProductCardProps {
  product: ShopifyProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const image = product.images[0]?.src;
  const variant = product.variants[0];
  const price = variant ? `€${parseFloat(variant.price).toFixed(2)}` : null;
  const available = product.variants.some((v) => v.available);

  return (
    <a
    
    href={`https://mokumvintage.com/collections/all/products/${product.handle}`}
    target="_blank"
    rel="noopener noreferrer"
    className="block border border-white/10 hover:border-white transition-colors"
  >
    {image && (
      <div className="aspect-[3/4] overflow-hidden bg-white/5">
        <img
          src={image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>
    )}
    <div className="p-3">
      <p className="text-xs text-white/40 uppercase tracking-widest mb-1">
        {product.product_type || "Vintage"}
      </p>
      <h3 className="text-sm font-bold leading-tight mb-2">{product.title}</h3>
      <div className="flex items-center justify-between">
        {price && <span className="text-sm">{price}</span>}
        {!available && (
          <span className="text-xs text-white/30 uppercase tracking-widest">
            Sold out
          </span>
        )}
      </div>
    </div>
  </a>
);
}