export interface Product {
  _id: string;
  article: Article;
}
// export interface Wear {
//   _id: string;
//   article: Article;
// }
export interface Article {
  title: string;
  slug: string;
  mark: string;
  description:string
  price:number
  inStock:number
  discountPrice:number
  route:string
  featured: FeaturedProduct
  image: ImageProduct[]
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
  title: string;
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