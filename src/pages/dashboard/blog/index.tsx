import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router';
import { CardSiteDashboard } from '../../../components/antd/cardSite';
import { HeadingSiteDashboard } from '../../../components/heading/headingSiteDashboard';
import { SITESV2 } from '../../../graphql/query/siteV2.query';
import { LayoutDashboard } from '../../../layouts'
import { graphQLClientS } from '../../../react-query/graphQLClient';
import { useGetSite, useGetSites } from '../../../react-query/reactQuery';
import { getQuery } from '../../../utils/function';

const Index: NextPage = () => {
  const {asPath} = useRouter()

  const { data: sites } = useGetSites();
  // console.log(sites);
  
  return (
    <LayoutDashboard>
       <HeadingSiteDashboard title="Sites" sites={sites!} />
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 ">
            {sites?.filter(data => data.type !== 'ecommerce').map((site, i:number) => (
              <CardSiteDashboard key={i} site={site} />
            ))}
          </div>
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
