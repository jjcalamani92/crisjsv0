import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { SitesDashboard } from '../../../../components/dashboard/siteDashboard';
import { SITESV2, SITEV2 } from '../../../../graphql/query/siteV2.query';
import { SiteV2 } from '../../../../interfaces/siteV2';
import { LayoutDashboard } from '../../../../layouts'
import { graphQLClientP, graphQLClientS } from '../../../../react-query/graphQLClient';
import { useGetSite, useGetSites } from '../../../../react-query/reactQuery';
import { useRouter } from 'next/router';
import { getQuery, lastElement } from '../../../../utils/function';
import { ChildrenPageDashboard } from '../../../../components';
import { ProductDashboard } from '../../../../components/productDashboard';
import { productsDashboardPathsV2 } from '../../../../utils/functionV2';
import { FURNITURIES, GIFTS, JEWELERS, TEDDYS } from '../../../../graphql/query/ecommerceV2.query';

const Index: NextPage = () => {
  const {asPath, query} = useRouter()
  // console.log(lastElement(asPath));
  const { data: site } = useGetSite(getQuery(asPath)[2]);
  const { data: sites } = useGetSites();
  
  return (
    <LayoutDashboard>
      <ProductDashboard site={site!}/>
    </LayoutDashboard>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { sitesV2 } = await graphQLClientS.request(SITESV2)
  return {
    paths: sitesV2.map((data:SiteV2) => ({ params: {id: data._id} })),
    // paths: [{ params: {id: "1234"} }],
    fallback: 'blocking'
  };
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const _id = params?.id
  const queryClient = new QueryClient()

  // const site = process.env.API_SITE

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

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 86400,
  }
}

export default Index
