import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { SITESV2, SITEV2 } from '../../../../../graphql/query/siteV2.query';
import { LayoutDashboard } from '../../../../../layouts'
import { graphQLClientS } from '../../../../../react-query/graphQLClient';
import { useGetSite, useGetSites } from '../../../../../react-query/reactQuery';
import { useRouter } from 'next/router';
import { getQuery, lastElement } from '../../../../../utils/function';
import { childrenPath0Dashboard, childrenPaths0Dashboard } from '../../../../../utils/functionV2';
import { ChildrenPageDashboard } from '../../../../../components';

const Index: NextPage = () => {
  const {asPath, query} = useRouter()
  // console.log(lastElement(asPath));
  const { data: site } = useGetSite(getQuery(asPath)[2]);
  const { data: sites } = useGetSites();
  // console.log(sites);
  
  // console.log(childrenPath0Dashboard(sites!));
  
  
  return (
    <LayoutDashboard>
      <ChildrenPageDashboard site={site!}/>
    </LayoutDashboard>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { sitesV2 } = await graphQLClientS.request(SITESV2)
  return {
    paths: childrenPath0Dashboard(sitesV2!).map(data => ({ params: data })),
    // paths: [{ params: { id: "6312c48aed202aeff0ac9081", children: ["1234"]} }],
    fallback: 'blocking'
  };
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  // console.log(' params', params);
  const _id = params?.id
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
  //   await queryClient.prefetchQuery(["get-site", site], async () => {
  //   const { furnitures } = await graphQLClientP.request( FURNITURIES, { site } );
  //   return furnitures;
  // })
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 86400,
  }
}

export default Index
