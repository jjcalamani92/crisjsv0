export interface SiteV2 {
  _id: string
  data: DataV2
  dataBase: DataBaseV2[]
  children: ChildrenV2[]
  client: string
  type: string
}
export interface DataV2 {
  name: string;
  numberPhone: number;
  address: string;
  description: string;
  location: string;
  url: string
}

export interface ChildrenV2 {
  uid: string;
  seo: SeoV2;
  // body: Body;
  // blogs: Blog[];
  slug: string;
  type: string;
  children:ChildrenV2[];
}

export interface SeoV2 {
  name: string;
  href: string;
  description: string;
  image: Image
}
export interface DataBaseV2 {
  uid: string
  name: string;
  type: string;
  image: Image
}

export interface Timestamps {
  created: number;
  updated?: number;
}
export interface SiteForm {
  _id?: string
  title: string;
  domain: string;
  logo: string;
  icon: string;
  imageSrc: string;
  imageAlt: string;
  numberPhone: number;
  address: string;
  location: string;
  description: string;
  type: string;
  client: string;
}
export interface ChildrenForm {
  uid?: string
  name: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}
export interface Domain {
  name: string;
  dlt: string;
}
export interface Image {
  src: string;
  alt: string;
}

// export interface Route {
//   section_level_0: Section0[];
// }

// export interface Section {
//   id: string;
//   name: string;
//   href: string;
//   description: string;
//   imageSrc: string;
//   imageAlt: string;
//   items: Item[];
//   featured:Featured[];
// }

// export interface Section0 extends Section {
//   section_level_1: any
// }
// export interface Section1 extends Section0 {
//   section_level_2: any
// }
// export interface Section2 extends Section1 {
//   section_level_3: any
// }
// export interface Section3 extends Section2 {
//   section_level_4: any
// }
// export interface Section4 extends Section3 {
//   section_level_5: any
// }
// export interface Section5 extends Section4 {
//   section_level_6: any
// }
// export interface Featured {
//   uid: string;
//   name: string;
//   href: string;
//   description: string;
//   imageSrc: string;
//   imageAlt: string;
// }
// export interface Item {
//   uid: string;
//   name: string;
//   href: string;
//   description: string;
//   imageSrc: string;
//   imageAlt: string;
// }