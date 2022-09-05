import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { SITESV2, SITEV2 } from '../../../../graphql/query/siteV2.query';
import { SiteV2 } from '../../../../interfaces/siteV2';
import { LayoutDashboard } from '../../../../layouts'
import { graphQLClientP, graphQLClientS } from '../../../../react-query/graphQLClient';
import { useGetSite, useGetSites } from '../../../../react-query/reactQuery';
import { useRouter } from 'next/router';
import { getQuery, lastElement } from '../../../../utils/function';
import { productsDashboardPathsV2 } from '../../../../utils/functionV2';
import { FURNITURIES, GIFTS, JEWELERS, TEDDYS } from '../../../../graphql/query/ecommerceV2.query';
import { CardProduct } from '../../../../components/antd/cardProduct';
import Link from 'next/link';
import Image from 'next/image';
import { HeadingDashboardProducts } from '../../../../components/heading/headingProductDashboard';

const Index: NextPage = () => {
  const {asPath} = useRouter()
  const { data: site } = useGetSite(getQuery(asPath)[2]);
  
  return (
    <LayoutDashboard>
      <HeadingDashboardProducts title={"Data Base"} site={site!} />

      <div className=" grid grid-cols-1 sm:grid-cols-3 gap-6 lg:grid-cols-5 ">
        {
          site?.dataBase.map(data => (

            <Link key={data.name} href={`${asPath}/${data.type}`} >
              <a className='shadow-lg '>
                <div className="w-full bg-white rounded-sm overflow-hidden leading-none">
                  <Image
                    src={data.image.src}
                    alt={data.image.alt}
                    width={300}
                    height={300}
                    objectFit={'cover'}
                  />
                </div>
                <div className="p-2 flex justify-between">
                  <h3 className="text-xs md:text-sm text-gray-700">
                    {data.name}
                  </h3>
                </div>
              </a>
            </Link>
          ))
        }
        {/* <Button bg="none" content='eliminar' click={() => onDelete(_id)} /> */}
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

export const getStaticProps: GetStaticProps = async ({params}) => {
  const _id = params?.id
  const queryClient = new QueryClient()

  // const site = process.env.API_SITE

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

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 86400,
  }
}

export default Index
