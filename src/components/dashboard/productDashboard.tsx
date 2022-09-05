
import { FC } from 'react';

import { Children, Site } from '../../interfaces/siteV1';
import { useRouter } from 'next/router';

import { Product } from '../../interfaces/ecommerceV1';
import { CardProduct } from '../antd/cardProduct';
import { lastElement, slug } from '../../utils/function';
import { ChildrenV2, SiteV2 } from '../../interfaces/siteV2';
import { ProductV2 } from '../../interfaces/ecommerceV2';
import { useGetProductsFurniture, useGetProductsGift, useGetProductsJeweler, useGetProductsTeddy } from '../../react-query/reactQuery';
import { HeadingDashboardProducts } from '../heading/headingProductDashboard';
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

interface ProductPageDashboard {
  site: SiteV2
}
export const ProductPageDashboard: FC<ProductPageDashboard> = ({ site }) => {
  const { asPath, query } = useRouter()
  const { data: furnituries } = useGetProductsFurniture(process.env.API_SITE!);
  const { data: gifts } = useGetProductsGift(process.env.API_SITE!);
  const { data: teddys  } = useGetProductsTeddy(process.env.API_SITE!);
  const { data: jewelers  } = useGetProductsJeweler(process.env.API_SITE!);
  let products!: ProductV2[]
  if (query.slug![2] === 'jeweler') {
    products = jewelers!
  } else 
  if (query.slug![2] === 'teddy') {
    products = teddys!
  } else 
  if (query.slug![2] === 'furniture') {
    products = furnituries!
  } else 
  if (query.slug![2] === 'gifts') {
    products = gifts!
  }

  return (
    <section className=''>
      <HeadingDashboardProducts title={lastElement(asPath)} site={site} />
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 ">
            {products.map((product, i:number) => (
              <CardProduct key={i} product={product!} />
            ))}
          </div>
    </section>
  )
}
