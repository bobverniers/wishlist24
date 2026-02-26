"use client";

import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mb-8">
      <p className="text-xs tracking-widest uppercase text-white/40 mb-3">
        Search by brand or category
      </p>
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. Prada, Nylon, Outerwear..."
          className="flex-1 bg-transparent border border-white/20 text-white placeholder:text-white/20 px-4 py-3 text-sm focus:outline-none focus:border-white transition-colors"
        />
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="bg-white text-black px-6 py-3 text-sm font-bold uppercase tracking-widest disabled:opacity-30 transition-opacity"
        >
          {isLoading ? "..." : "Search"}
        </button>
      </div>
    </form>
  );
}