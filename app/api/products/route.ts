import { fetchAllProducts } from "@/lib/shopify";
import { NextResponse } from "next/server";

export const revalidate = 300;

export async function GET() {
  try {
    const products = await fetchAllProducts();
    return NextResponse.json({ products });
  } catch (error) {
    console.error("[/api/products] fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}