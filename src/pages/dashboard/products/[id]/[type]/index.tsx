import { dehydrate, QueryClient } from '@tanstack/react-query'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { CLOTHINGS, FURNITURIES, GIFTS, JEWELERS, TEDDYS } from '../../../../../graphql/query/ecommerceV2.query'
import { SITESV2, SITEV2 } from '../../../../../graphql/query/siteV2.query'
import { LayoutDashboard } from '../../../../../layouts'
import { graphQLClientP, graphQLClientS } from '../../../../../react-query/graphQLClient'
import { useGetProductsClothing, useGetProductsFurniture, useGetProductsGift, useGetProductsJeweler, useGetProductsTeddy, useGetSite, useGetSites } from '../../../../../react-query/reactQuery'
import { productsDashboardPathsV2, productsDashboardPathsSlugV3 } from '../../../../../utils/functionV2'
import { useRouter } from 'next/router';
import { getQuery, lastElement } from '../../../../../utils/function'
import { ProductV2 } from '../../../../../interfaces/ecommerceV2'
import { CardProduct } from '../../../../../components/antd/cardProduct'
import { HeadingDashboardProducts } from '../../../../../components/heading/headingProductDashboard'

const Index: NextPage = () => {
  const {asPath} = useRouter();
  const query = getQuery(asPath);
  const { data: sites } = useGetSites();
  
  const { data: site } = useGetSite(query[2]);
  const { data: furnitures } = useGetProductsFurniture(query[2]);
  const { data: gifts } = useGetProductsGift(query[2]);
  const { data: teddys } = useGetProductsTeddy(query[2]);
  const { data: jewelers } = useGetProductsJeweler(query[2]);
  const { data: clothings } = useGetProductsClothing(query[2]);
  const productos = {furnitures, gifts, teddys, jewelers, clothings}
  console.log(productsDashboardPathsSlugV3(sites!, productos));
  
  let products!: ProductV2[]
  if (query[3] === 'clothing') {
    products = clothings!
  } else 
  if (query[3] === 'jeweler') {
    products = jewelers!
  } else 
  if (query[3] === 'teddy') {
    products = teddys!
  } else 
  if (query[3] === 'furniture') {
    products = furnitures!
  } else 
  if (query[3] === 'gift') {
    products = gifts!
  }
  return (

    <LayoutDashboard>
      <section className=''>
      <HeadingDashboardProducts title={lastElement(asPath)} site={site!} />
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 ">
            {products.map((product, i:number) => (
              <CardProduct key={i} product={product!} />
            ))}
          </div>
    </section>
    </LayoutDashboard>
  )
}
export const getStaticPaths: GetStaticPaths = async () => {
  const { sitesV2 } = await graphQLClientS.request(SITESV2)
  
  return {
    paths: productsDashboardPathsV2(sitesV2).map(data => ({ params: data })),
    fallback: 'blocking'
  };
}
export const getStaticProps: GetStaticProps = async ({params}) => {
  const _id = params?.id
  const site = params?.id
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
  await queryClient.prefetchQuery(["get-products-furniture", site], async () => {
    const { furnitures } = await graphQLClientP.request( FURNITURIES, { site } );
    return furnitures;
  })
  await queryClient.prefetchQuery(["get-products-gift", site], async () => {
    const { gifts } = await graphQLClientP.request( GIFTS, { site } );
    return gifts;
  })
  await queryClient.prefetchQuery(["get-products-teddy", site], async () => {
    const { teddys } = await graphQLClientP.request( TEDDYS, { site } );
    return teddys;
  })
  await queryClient.prefetchQuery(["get-products-jeweler", site], async () => {
    const { jewelers } = await graphQLClientP.request( JEWELERS, { site } );
    return jewelers;
  })
  await queryClient.prefetchQuery(["get-products-clothing", site], async () => {
    const { clothings } = await graphQLClientP.request( CLOTHINGS, { site } );
    return clothings;
  })
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 86400,
  }
}
export default Index
