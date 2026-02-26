import Airtable from "airtable";
import { Wish } from "@/types";

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID!);

export async function saveWish(wish: Wish): Promise<void> {
  await base(process.env.AIRTABLE_TABLE_NAME!).create([
    {
      fields: {
        Name: wish.name,
        WhatsApp: wish.whatsapp,
        Description: wish.description,
        Size: wish.size,
      },
    },
  ]);
}