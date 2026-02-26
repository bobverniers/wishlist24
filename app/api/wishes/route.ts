import { NextResponse } from "next/server";
import { saveWish } from "@/lib/airtable";
import { Wish } from "@/types";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const wish: Wish = await req.json();
    await saveWish(wish);

    const waLink = `https://wa.me/${wish.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
      `Hi ${wish.name}! We found something you might like. Check our store: https://mokumvintage.com/collections/all`
    )}`;

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.SHOP_OWNER_EMAIL!,
      subject: `New Wish from ${wish.name}`,
      html: `
        <h2>New Wish Received</h2>
        <p><strong>Name:</strong> ${wish.name}</p>
        <p><strong>WhatsApp:</strong> ${wish.whatsapp}</p>
        <p><strong>Looking for:</strong> ${wish.description}</p>
        <p><strong>Size:</strong> ${wish.size}</p>
        <br/>
        <p>When you find a match, notify them on WhatsApp:</p>
        <a href="${waLink}" style="background:#000;color:#fff;padding:12px 24px;text-decoration:none;font-weight:bold;">
          Send WhatsApp
        </a>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[/api/wishes] error:", error);
    return NextResponse.json({ error: "Failed to save wish" }, { status: 500 });
  }
}