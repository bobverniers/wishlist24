export interface ShopifyImage {
    src: string;
    alt?: string;
  }
  
  export interface ShopifyVariant {
    id: number;
    title: string;
    price: string;
    available: boolean;
  }
  
  export interface ShopifyProduct {
    id: number;
    title: string;
    handle: string;
    product_type: string;
    tags: string[];
    images: ShopifyImage[];
    variants: ShopifyVariant[];
  }
  
  export interface Wish {
    name: string;
    whatsapp: string;
    description: string;
    size: string;
  }
  
  export interface SearchResult {
    exact: ShopifyProduct[];
    similar: ShopifyProduct[];
  }