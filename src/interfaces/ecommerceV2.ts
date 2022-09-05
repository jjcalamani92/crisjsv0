import { SeoV2 } from "./siteV2";

export interface ProductsV2 {
  furnitures?:  ProductV2[]
  gifts?: ProductV2[]
  teddys?: ProductV2[]
  jewelers?: ProductV2[]
  clothings?: ProductV2[]
}
export interface ProductV2 {
  _id: string;
  article: Article;
  site: string
}
// export interface Wear {
//   _id: string;
//   article: Article;
// }
export interface Article {
  name: string;
  slug: string;
  mark: string;
  description:string
  price:number
  inStock:number
  discountPrice:number
  route:string
  seo: SeoV2
  featured: FeaturedProduct
  details?: DetailProduct
  image: ImageProduct[]
}

export interface DetailProduct {
  material: string;
  color: string;
  finishing: string;
  logo: string;
  accessories: string;
  dimensions: string[];
}
export interface FeaturedProduct {
  name: string;
  href: string;
}
export interface ImageProduct {
  uid?: string;
  src: string;
  alt: string;
}

export interface CreateProductInput {
  name: string;
  mark: string;
  description: string;
  featured: string;
  inStock: number;
  price: number;
  discountPrice: number;
  site: string;

  // specs:string[];
  // imageSrc:any[];
  // tags:string[];
  route:string;
}
export interface AddProductImage {
  uid?:string
  src: string;
  alt: string;
}