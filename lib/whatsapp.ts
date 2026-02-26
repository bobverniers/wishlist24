export function generateWhatsAppLink(
    phone: string,
    description: string
  ): string {
    const message = `Hi! I'm looking for: *${description}*. Do you have something like this in stock?`;
    const encoded = encodeURIComponent(message);
    return `https://wa.me/${phone}?text=${encoded}`;
  }