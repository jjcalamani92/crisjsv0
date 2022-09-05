import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { SITESV2, SITEV2 } from '../../../../graphql/query/siteV2.query';
import { LayoutDashboard } from '../../../../layouts'
import { graphQLClientP, graphQLClientS } from '../../../../react-query/graphQLClient';
import { useGetBlogBySite, useGetSite, useGetSites } from '../../../../react-query/reactQuery';
import { useRouter } from 'next/router';
import { getQuery, lastElement } from '../../../../utils/function';
import { blogsDashboardPathsSlugV3, productsDashboardPathsV2 } from '../../../../utils/functionV2';
import { BLOGSBYSITEV2, BLOGSV2 } from '../../../../graphql/query/blogV2.query';
import { HeadingBlogDashboard } from '../../../../components/heading/headingBlogDashboard';
import { CardBlogDashboard } from '../../../../components/antd/cardBlog';
import { SiteV2 } from '../../../../interfaces/siteV2';

const Index: NextPage = () => {
  const { asPath } = useRouter()
  const { data: site } = useGetSite(getQuery(asPath)[2]);
  const query = getQuery(asPath)
  const { data: blogs } = useGetBlogBySite(query[2])

  return (
    <LayoutDashboard>

      <HeadingBlogDashboard title={"Blog"} site={site!} />
      <div className="mt-6 space-y-12 md:space-y-0 md:grid md:grid-cols-3 md:gap-6 lg:grid-cols-5">
        {blogs!.map((data, i) => (
          // eslint-disable-next-line react/no-children-prop
          <CardBlogDashboard key={i} article={data} />
        ))}
      </div>

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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const _id = params?.id
  const site = params?.id
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
  await queryClient.prefetchQuery(["get-blogs-by-site", site], async () => {
    const { blogsBySiteV2 } = await graphQLClientS.request(
      BLOGSBYSITEV2,
      { site }
    );
    return blogsBySiteV2;
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 86400,
  }
}

export default Index
