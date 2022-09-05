import { dehydrate, QueryClient } from '@tanstack/react-query'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ProductOverviewDashboard } from '../../../../../../components/dashboard/productOverviewDashboard';
import { ALL_FURNITURIES, ALL_GIFTS, ALL_TEDDYS, FURNITURIES, ALL_JEWELERS, ALL_CLOTHINGS, CLOTHING_BY_SLUG, TEDDY_BY_SLUG, FURNITURE_BY_SLUG, JEWELER_BY_SLUG, GIFT_BY_SLUG } from '../../../../../../graphql/query/ecommerceV2.query';
import { SITESV2, SITEV2 } from '../../../../../../graphql/query/siteV2.query'
import { LayoutDashboard } from '../../../../../../layouts'
import { graphQLClientP, graphQLClientS } from '../../../../../../react-query/graphQLClient'
import { useAllProductsFurniture, useAllProductsGift, useAllProductsJeweler, useAllProductsTeddy, useGetSite, useGetSites } from '../../../../../../react-query/reactQuery'
import { getQuery } from '../../../../../../utils/function';
import { productsDashboardPathsSlugV3, productsDashboardPathsV2 } from '../../../../../../utils/functionV2'
import { useRouter } from 'next/router';

const Index: NextPage = () => {
  const {asPath} = useRouter()
  // console.log(getQuery(asPath)[1]);
  
  const { data: sites } = useGetSites();
  const { data: site } = useGetSite(getQuery(asPath)[2]);

  const { data: allFurnitures } = useAllProductsFurniture();
  // const { data: allGifts } = useAllProductsGift();
  // const { data: allTeddys } = useAllProductsTeddy();
  // const { data: allJewelers } = useAllProductsJeweler();
  // const products = {furnitures:allFurnitures, gifts:allGifts, teddys:allTeddys, jewelers:allJewelers}
  // console.log(productsDashboardPathsSlugV3(sites!, products));
  // console.log(allFurnitures);
  
  return (
    <LayoutDashboard>
      <ProductOverviewDashboard site={site!}/>
    </LayoutDashboard>
  )
}
export const getStaticPaths: any = async () => {
  const { sitesV2 } = await graphQLClientS.request(SITESV2)
  const { allFurnitures } = await graphQLClientP.request( ALL_FURNITURIES)
  const { allGifts } = await graphQLClientP.request( ALL_GIFTS)
  const { allTeddys } = await graphQLClientP.request( ALL_TEDDYS)
  const { allJewelers } = await graphQLClientP.request( ALL_JEWELERS)
  const { allClothings } = await graphQLClientP.request( ALL_CLOTHINGS)
  const products = {furnitures:allFurnitures, gifts:allGifts, teddys:allTeddys, jewelers:allJewelers, clothings: allClothings}
  
  // console.log(productsDashboardPathsSlugV3(sitesV2, products).map(data => ({ params: data })));
  
  return {
    paths: productsDashboardPathsSlugV3(sitesV2, products).map(data => ({ params: data })),
    // paths: [{ params: {id:"630a4577345bf39185008b7d", type:"furniture", slug:"caja-de-escritorio-m6"} }],
    fallback: 'blocking'
  };
}
export const getStaticProps: GetStaticProps = async ({params}) => {
  const _id = params?.id
  const site = params?.id
  const type = params?.type
  const slug = params?.slug
  // console.log(params);
  
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(["get-sites"], async () => {
    const { sitesV2 } = await graphQLClientS.request(
      SITESV2
    );
    return sitesV2;
  })
  await queryClient.prefetchQuery(["get-site", _id], async () => {
    const { siteV2 } = await graphQLClientS.request(
      SITEV2,
      { _id }
    );
    return siteV2;
  })

  if (type ==='gift'  ) {
    await queryClient.prefetchQuery(["get-product-gift-by-slug", slug, site], async () => {
      const { giftBySlug } = await graphQLClientP.request( GIFT_BY_SLUG, { slug, site } );
      return giftBySlug;
    })
  } else
  if (type ==='jeweler'  ) {
    await queryClient.prefetchQuery(["get-product-jeweler-by-slug", slug, site], async () => {
      const { jewelerBySlug } = await graphQLClientP.request( JEWELER_BY_SLUG, { slug, site } );
      return jewelerBySlug;
    })
  } else
  if (type ==='furniture'  ) {
    await queryClient.prefetchQuery(["get-product-furniture-by-slug", slug, site], async () => {
      const { furnitureBySlug } = await graphQLClientP.request( FURNITURE_BY_SLUG, { slug, site } );
      return furnitureBySlug;
    })
  } else
  if (type ==='clothing'  ) {
    await queryClient.prefetchQuery(["get-product-clothing-by-slug", slug, site], async () => {
      const { clothingBySlug } = await graphQLClientP.request( CLOTHING_BY_SLUG, { slug, site } );
      return clothingBySlug;
    })
  } else
  if (type ==='teddy' ) {
    await queryClient.prefetchQuery(["get-product-teddy-by-slug", slug, site], async () => {
      const { teddyBySlug } = await graphQLClientP.request( TEDDY_BY_SLUG, { slug, site } );
      return teddyBySlug;
    })
  // } else if ((slug[0] === 'detalles' && slug[1] ==='teddy') || (slug[0] === 'dashboard' && slug[2] ==='teddy')  ) {
  //   const slug = params?.slug![0] === 'detalles' ? params?.slug![2] : params?.slug![3]
  //   await queryClient.prefetchQuery(["get-product-teddy-by-slug", slug], async () => {
  //     const { teddyBySlug } = await graphQLClientP.request( TEDDY_BY_SLUG, { slug } );
  //     return teddyBySlug;
  //   })
  // } else if ((slug[0] === 'detalles' && slug[1] ==='furniture') || (slug[0] === 'dashboard' && slug[2] ==='furniture')  ) {
  //   const slug = params?.slug![0] === 'detalles' ? params?.slug![2] : params?.slug![3]
  //   await queryClient.prefetchQuery(["get-product-furniture-by-slug", slug], async () => {
  //     const { furnitureBySlug } = await graphQLClientP.request( FURNITURE_BY_SLUG, { slug } );
  //     return furnitureBySlug;
  //   })
  // } else if ((slug[0] === 'detalles' && slug[1] ==='gift') || (slug[0] === 'dashboard' && slug[2] ==='gift')) {
  //   const slug = params?.slug![0] === 'detalles' ? params?.slug![2] : params?.slug![3]
  //   await queryClient.prefetchQuery(["get-product-gift-by-slug", slug], async () => {
  //     const { giftBySlug } = await graphQLClientP.request( GIFT_BY_SLUG, { slug } );
  //     return giftBySlug;
  //   })
  }
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 86400,
  }
}
export default Index
