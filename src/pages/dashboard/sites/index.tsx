import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { GetStaticProps, NextPage } from 'next'
import { SitesDashboard } from '../../../components/dashboard/siteDashboard';
import { SITESV2, SITEV2 } from '../../../graphql/query/siteV2.query';
import { LayoutDashboard } from '../../../layouts'
import { graphQLClientS } from '../../../react-query/graphQLClient';
import { useGetSite, useGetSites } from '../../../react-query/reactQuery';

const Index: NextPage = () => {
  const { data: site } = useGetSite(process.env.API_SITE!);
  const { data: sites } = useGetSites();

  return (
    <LayoutDashboard>
      <SitesDashboard sites={sites!}/>
    </LayoutDashboard>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(["get-sites"], async () => {
    const { sitesV2 } = await graphQLClientS.request(
      SITESV2
    );
    return sitesV2;
  })
  
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 86400,
  }
}

export default Index
