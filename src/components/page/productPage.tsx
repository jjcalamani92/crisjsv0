import { FC, Key } from 'react';
import Image from "next/image"
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChildrenV2 } from '../../interfaces/siteV2';
import { ProductV2 } from '../../interfaces/ecommerceV2';
import { useGetProductsFurniture, useGetProductsGift, useGetProductsJeweler, useGetProductsTeddy } from '../../react-query/reactQuery';

interface ProductPage {
  item?: ChildrenV2
}
export const ProductPage: FC<ProductPage> = ({ item }) => {
  const { asPath, query } = useRouter()
  const { data: furnituries } = useGetProductsFurniture(process.env.API_SITE!);
  const { data: gifts } = useGetProductsGift(process.env.API_SITE!);
  const { data: teddys  } = useGetProductsTeddy(process.env.API_SITE!);
  const { data: jewelers  } = useGetProductsJeweler(process.env.API_SITE!);
  let products: ProductV2[]
  if (item!.type === 'jeweler') {
    products = jewelers!
  } else if (item!.type === 'teddy') {
    products = teddys!
  } else if (item!.type === 'furniture') {
    products = furnituries!
  } else if (item!.type === 'gift') {
    products = gifts!
  }

  return (
    <section className='py-10'>
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">{item!.seo.name}</h2>
      
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 mt-6 ">
            {products!.filter(data => data.article.route === asPath).map(product => (
              <Link href={`/detalles/${item!.type}/${product.article.slug}`} key={product._id}>
                <a className="group">
                  <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                    <Image
                      src={product.article.image ? product.article.image[0].src : "https://res.cloudinary.com/dvcyhn0lj/image/upload/v1655217461/14.1_no-image.jpg_gkwtld.jpg"}
                      alt={product.article.image ? product.article.image[0].alt : "description image"}
                      width={500}
                      height={600}
                      objectFit='cover'
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{product.article.name}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">{product.article.price} Bs.</p>
                </a>
              </Link>
            ))}
          </div>

    </section>

  )
}
