import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { SITESV2, SITEV2 } from '../../../../graphql/query/siteV2.query';
import { SiteV2 } from '../../../../interfaces/siteV2';
import { LayoutDashboard } from '../../../../layouts'
import { graphQLClientS } from '../../../../react-query/graphQLClient';
import { useGetSite, useGetSites } from '../../../../react-query/reactQuery';
import { useRouter } from 'next/router';
import { getQuery, lastElement } from '../../../../utils/function';
import { HeadingChildrenDashboard } from '../../../../components/heading/headingChildrenDashboard';
import { CardChildrenDashboard } from '../../../../components/antd/cardChildren';
import { getChildrenDashboard } from '../../../../utils/functionV2';

const Index: NextPage = () => {
  const { asPath } = useRouter();
  const { data: site } = useGetSite(getQuery(asPath)[2]);
  return (
    <LayoutDashboard>
      {/* <ChildrenPageDashboard site={site!} /> */}
      <HeadingChildrenDashboard title={"Pages"} site={site!} />
      <div className="mt-6 space-y-12 md:space-y-0 md:grid md:grid-cols-3 md:gap-6 lg:grid-cols-5">
        {site?.children.map((data, i) => (
          // eslint-disable-next-line react/no-children-prop
          <CardChildrenDashboard key={i} children={data} />
        ))}
      </div>

    </LayoutDashboard>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { sitesV2 } = await graphQLClientS.request(SITESV2)
  return {
    paths: sitesV2.map((data: SiteV2) => ({ params: { id: data._id } })),
    // paths: [{ params: {id: "1234"} }],
    fallback: 'blocking'
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const _id = params?.id
  const queryClient = new QueryClient()

  // await queryClient.prefetchQuery(["get-sites"], async () => {
  //   const { sitesV2 } = await graphQLClientS.request(
  //     SITESV2
  //   );
  //   return sitesV2;
  // })
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
