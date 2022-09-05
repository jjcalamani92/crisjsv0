
import { FC } from 'react';
import Image from "next/image"

import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChildrenV2 } from '../../interfaces/siteV2';
interface ChildrenPage {
  item: ChildrenV2
}
export const ChildrenPage: FC<ChildrenPage> = ({ item }) => {
  const { asPath } = useRouter()
  // console.log(item);

  return (
    <section className=''>
      <h2 className="text-2xl font-bold text-gray-900 py-6 mb-0">{item.seo.name}</h2>
      <div className="md:space-y-0 md:grid md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {item.children.map((data, i) => (
          <Link key={i} href={`${asPath}/${data.seo.href}`}>
            <a className="shadow-xl">
              <div className="w-full bg-white rounded-lg   leading-none relative">
                <Image
                  src={data.seo.image.src}
                  alt={data.seo.image.alt}
                  width={500}
                  height={600}
                  objectFit='cover'
                />
              </div>
              <div className='p-2'>

                <h3 className="mt-6 text-sm text-gray-500">

                  {data.seo.name}
                </h3>
                <p className="text-base font-semibold text-gray-900">{data.seo.description}</p>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </section>

  )
}
