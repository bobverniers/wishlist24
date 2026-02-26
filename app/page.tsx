"use client";

import { useState } from "react";
import { ShopifyProduct } from "@/types";
import { exactSearch, similarSearch } from "@/lib/matcher";
import SearchBar from "@/components/SearchBar";
import ProductGrid from "@/components/ProductGrid";
import SimilarItems from "@/components/SimilarItems";
import WishlistForm from "@/components/WishlistForm";

type SearchState = "idle" | "loading" | "exact" | "similar" | "none";

export default function Home() {
  const [state, setState] = useState<SearchState>("idle");
  const [exactResults, setExactResults] = useState<ShopifyProduct[]>([]);
  const [similarResults, setSimilarResults] = useState<ShopifyProduct[]>([]);
  const [lastQuery, setLastQuery] = useState("");

  const handleSearch = async (query: string) => {
    setState("loading");
    setLastQuery(query);

    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      const products: ShopifyProduct[] = data.products ?? [];

      const exact = exactSearch(products, query);

      if (exact.length > 0) {
        setExactResults(exact);
        setState("exact");
        return;
      }

      const similar = similarSearch(products, query);

      if (similar.length > 0) {
        setSimilarResults(similar);
        setState("similar");
        return;
      }

      setState("none");
    } catch {
      setState("none");
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} isLoading={state === "loading"} />

      {state === "loading" && (
        <p className="text-xs tracking-widest uppercase text-white/40 animate-pulse">
          Searching the archive...
        </p>
      )}

      {state === "exact" && (
        <ProductGrid
          products={exactResults}
          label={`${exactResults.length} result${exactResults.length !== 1 ? "s" : ""} found`}
        />
      )}

      {state === "similar" && (
        <>
          <SimilarItems products={similarResults} />
          <WishlistForm defaultBrand={lastQuery} />
        </>
      )}

      {state === "none" && (
        <>
          <div className="border-t border-white/10 pt-8 mb-6">
            <p className="text-xs tracking-widest uppercase text-white/40 mb-1">
              Nothing in the archive
            </p>
            <h2 className="text-xl font-black uppercase tracking-tighter">
              No results for "{lastQuery}"
            </h2>
          </div>
          <WishlistForm defaultBrand={lastQuery} />
        </>
      )}
    </div>
  );
}