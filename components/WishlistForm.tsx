"use client";

import { useState } from "react";
import { Wish } from "@/types";

interface WishlistFormProps {
  defaultBrand?: string;
  defaultCategory?: string;
}

export default function WishlistForm({
  defaultBrand = "",
  defaultCategory = "",
}: WishlistFormProps) {
    const [form, setForm] = useState<Wish>({
        name: "",
        whatsapp: "",
        description: "",
        size: "",
      });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="border border-white/10 p-6 mt-8">
        <p className="text-xs tracking-widest uppercase text-white/40 mb-1">Wish saved</p>
        <h3 className="text-xl font-black uppercase tracking-tighter">
          We'll notify you on WhatsApp when it drops.
        </h3>
      </div>
    );
  }

  return (
    <div className="border-t border-white/10 pt-8 mt-8">
      <p className="text-xs tracking-widest uppercase text-white/40 mb-1">
        Nothing found?
      </p>
      <h2 className="text-xl font-black uppercase tracking-tighter mb-6">
        Set a Wish
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {[
            { name: "name", placeholder: "Your name" },
            { name: "whatsapp", placeholder: "WhatsApp number (e.g. +31612345678)" },
            { name: "description", placeholder: "Describe what you're looking for... (e.g. green oversized hoodie, European brand)" },
            { name: "size", placeholder: "Size (e.g. M, 42, One size)" },
            ].map((field) => (
          <input
            key={field.name}
            name={field.name}
            value={form[field.name as keyof Wish]}
            onChange={handleChange}
            placeholder={field.placeholder}
            required
            className="bg-transparent border border-white/20 text-white placeholder:text-white/20 px-4 py-3 text-sm focus:outline-none focus:border-white transition-colors"
          />
        ))}
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-white text-black px-6 py-3 text-sm font-bold uppercase tracking-widest disabled:opacity-30 transition-opacity mt-2"
        >
          {status === "loading" ? "Saving..." : "Save Wish"}
        </button>
        {status === "error" && (
          <p className="text-xs text-red-400 tracking-widest uppercase">
            Something went wrong. Try again.
          </p>
        )}
      </form>
    </div>
  );
}