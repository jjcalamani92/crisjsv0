import { useQuery } from "@tanstack/react-query";
import { ALL_CLOTHINGS, ALL_FURNITURIES, ALL_GIFTS, ALL_JEWELERS, ALL_TEDDYS, CLOTHINGS, CLOTHING_BY_SLUG, FURNITURE_BY_SLUG, FURNITURIES, GIFTS, GIFT_BY_SLUG, JEWELERS, JEWELER_BY_SLUG, TEDDYS, TEDDY_BY_SLUG } from "../graphql/query/ecommerceV2.query";
import { SITESV2, SITEV2 } from "../graphql/query/siteV2.query";
import { Product } from "../interfaces";
import { ProductV2 } from "../interfaces/ecommerceV2";
import { graphQLClientP, graphQLClientS } from "./graphQLClient";
import { SiteV2 } from '../interfaces/siteV2';
import { BlogV2 } from "../interfaces/blogV2";
import { BLOGSBYSITEV2, BLOGSV2 } from "../graphql/query/blogV2.query";

export function useGetSite(_id: string) {
  return useQuery<SiteV2>(["get-site", _id], async () => {
    const { siteV2 } = await graphQLClientS.request(
      SITEV2,
      { _id }
    );
    return siteV2;
  });
}

export function useGetSites() {
  return useQuery<[SiteV2]>(["get-sites"], async () => {
    const { sitesV2 } = await graphQLClientS.request(
      SITESV2
    );
    return sitesV2;
  });
}

export function useGetBlogs() {
  return useQuery<[BlogV2]>(["get-blogs"], async () => {
    const { blogsV2 } = await graphQLClientS.request(
      BLOGSV2
    );
    return blogsV2;
  });
}
export function useGetBlogBySite(site: string) {
  return useQuery<[BlogV2]>(["get-blogs-by-site", site], async () => {
    const { blogsBySiteV2 } = await graphQLClientS.request(
      BLOGSBYSITEV2,
      { site }
    );
    return blogsBySiteV2;
  });
}

export function useAllProductsFurniture() {
  return useQuery<ProductV2[]>(["all-products-furniture"], async () => {
    const { allFurnitures } = await graphQLClientP.request(
      ALL_FURNITURIES
    );
    return allFurnitures;
  });
}
export function useGetProductsFurniture(site: string) {
  return useQuery<ProductV2[]>(["get-products-furniture", site], async () => {
    const { furnitures } = await graphQLClientP.request(
      FURNITURIES,
      { site }
    );
    return furnitures;
  });
}
export function useGetProductFurnitureBySlug(slug: string, site: string) {
  return useQuery<ProductV2>(["get-product-furniture-by-slug", slug, site], async () => {
    const { furnitureBySlug } = await graphQLClientP.request(
      FURNITURE_BY_SLUG,
      { slug, site}
    );
    return furnitureBySlug;
  });
}

export function useAllProductsGift() {
  return useQuery<ProductV2[]>(["all-products-gift"], async () => {
    const { allGifts } = await graphQLClientP.request(
      ALL_GIFTS
    );
    return allGifts;
  });
}
export function useGetProductsGift(site: string) {
  return useQuery<ProductV2[]>(["get-products-gift", site], async () => {
    const { gifts } = await graphQLClientP.request(
      GIFTS,
      { site }
    );
    return gifts;
  });
}
export function useGetProductGiftBySlug(slug: string, site: string) {
  return useQuery<ProductV2>(["get-product-gift-by-slug", slug, site], async () => {
    const { giftBySlug } = await graphQLClientP.request(
      GIFT_BY_SLUG,
      { slug, site }
    );
    return giftBySlug;
  });
}

export function useAllProductsTeddy() {
  return useQuery<ProductV2[]>(["all-products-teddy"], async () => {
    const { allTeddys } = await graphQLClientP.request(
      ALL_TEDDYS
    );
    return allTeddys;
  });
}
export function useGetProductsTeddy(site: string) {
  return useQuery<ProductV2[]>(["get-products-teddy", site], async () => {
    const { teddys } = await graphQLClientP.request(
      TEDDYS,
      { site }
    );
    return teddys;
  });
}
export function useGetProductTeddyBySlug(slug: string, site: string) {
  return useQuery<ProductV2>(["get-product-teddy-by-slug", slug, site], async () => {
    const { teddyBySlug } = await graphQLClientP.request(
      TEDDY_BY_SLUG,
      { slug, site }
    );
    return teddyBySlug ;
  });
}

export function useAllProductsJeweler() {
  return useQuery<ProductV2[]>(["all-products-jeweler"], async () => {
    const { allJewelers } = await graphQLClientP.request(
      ALL_JEWELERS
    );
    return allJewelers;
  });
}
export function useGetProductsJeweler(site: string) {
  return useQuery<ProductV2[]>(["get-products-jeweler", site], async () => {
    const { jewelers } = await graphQLClientP.request(
      JEWELERS,
      { site }
    );
    return jewelers;
  });
}
export function useGetProductJewelerBySlug(slug: string, site: string) {
  return useQuery<ProductV2>(["get-product-jeweler-by-slug", slug, site], async () => {
    const { jewelerBySlug } = await graphQLClientP.request(
      JEWELER_BY_SLUG,
      { slug, site}
    );
    return jewelerBySlug ;
  });
}

export function useAllProductsClothing() {
  return useQuery<ProductV2[]>(["all-products-clothing"], async () => {
    const { allClothings } = await graphQLClientP.request(
      ALL_CLOTHINGS
    );
    return allClothings;
  });
}
export function useGetProductsClothing(site: string) {
  return useQuery<ProductV2[]>(["get-products-clothing", site], async () => {
    const { clothings } = await graphQLClientP.request(
      CLOTHINGS,
      { site }
    );
    return clothings;
  });
}
export function useGetProductClothingBySlug(slug: string, site: string) {
  return useQuery<ProductV2>(["get-product-clothing-by-slug", slug, site], async () => {
    const { clothingBySlug } = await graphQLClientP.request(
      CLOTHING_BY_SLUG,
      { slug, site }
    );
    return clothingBySlug;
  });
}














