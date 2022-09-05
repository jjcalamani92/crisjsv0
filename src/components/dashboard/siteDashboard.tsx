
import { FC } from 'react';
import { ChildrenV2, SiteV2 } from '../../interfaces/siteV2';
import { useGetProductsFurniture, useGetProductsGift, useGetProductsJeweler, useGetProductsTeddy } from '../../react-query/reactQuery';
import { getQuery } from '../../utils/function';
import { CardSiteDashboard } from '../antd/cardSite';
import { HeadingSiteDashboard } from '../heading/headingSiteDashboard';
import { useRouter } from 'next/router';
/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/

interface SitesDashboard {
  sites: SiteV2[]
}
export const SitesDashboard: FC<SitesDashboard> = ({ sites }) => {
  const { asPath } = useRouter()
  // let products!: ProductV2[]
  // if (query.slug![2] === 'jeweler') {
  //   products = jewelers!
  // } else 
  // if (query.slug![2] === 'teddy') {
  //   products = teddys!
  // } else 
  // if (query.slug![2] === 'furniture') {
  //   products = furnituries!
  // } else 
  // if (query.slug![2] === 'gifts') {
  //   products = gifts!
  // }

  return (
    <section className=''>
      
      <HeadingSiteDashboard title={ getQuery(asPath)[1] === 'products' ? 'Products' : getQuery(asPath)[1] === 'blog' ? 'Blog':'Sites' } sites={sites} />
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 ">
            {sites.filter(data => getQuery(asPath)[1] === 'products' ? data.type === 'ecommerce' : data.type !== 'ecommerce').map((site, i:number) => (
              <CardSiteDashboard key={i} site={site} />
            ))}
          </div>
    </section>
  )
}
