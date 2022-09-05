import { dehydrate, QueryClient } from '@tanstack/react-query'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { SITESV2, SITEV2 } from '../../../../../graphql/query/siteV2.query'
import { LayoutDashboard } from '../../../../../layouts'
import { graphQLClientP, graphQLClientS } from '../../../../../react-query/graphQLClient'
import { useAllProductsFurniture, useAllProductsGift, useAllProductsJeweler, useAllProductsTeddy, useGetSite, useGetSites } from '../../../../../react-query/reactQuery'
import { getQuery } from '../../../../../utils/function';
import { blogsDashboardPathsSlugV3, productsDashboardPathsSlugV3, productsDashboardPathsV2 } from '../../../../../utils/functionV2'
import { useRouter } from 'next/router';
import { BLOGSV2 } from '../../../../../graphql/query/blogV2.query';
import { MarkdownEditor } from '../../../../../components/form/markdown'

const Index: NextPage = () => {
  const {asPath} = useRouter()
  
  const { data: sites } = useGetSites();
  const { data: site } = useGetSite(getQuery(asPath)[2]);


  return (
    <LayoutDashboard>
      <MarkdownEditor />
    </LayoutDashboard>
  )
}
export const getStaticPaths: any = async () => {
  const { sitesV2 } = await graphQLClientS.request(SITESV2)
  const { blogsV2 } = await graphQLClientS.request(
    BLOGSV2
  );
  return {
    paths: blogsDashboardPathsSlugV3(sitesV2, blogsV2).map(data => ({ params: data })),
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

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 86400,
  }
}
export default Index
