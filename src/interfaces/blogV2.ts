import { Image, SeoV2 } from "./siteV2"

export interface BlogV2 {
  _id: string
  data: DataBlogV2
  site: string
  type: string
  createdAt: Date
  updatedAt: Date
}
export interface DataBlogV2 {
  title: string
  slug: string
  content: string
  meta: string
  tags: Tags[]
  author: string
  thumbnail: Image
  seo: SeoV2

}
export interface Tags {
  uid: string
  text: string
}