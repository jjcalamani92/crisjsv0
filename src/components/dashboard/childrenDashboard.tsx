
import { FC } from 'react';
import { useRouter } from 'next/router';
import { ChildrenV2, SiteV2 } from '../../interfaces/siteV2';
import { children0Dashboard, getChildrenDashboard } from '../../utils/functionV2';
import { CardChildrenDashboard } from '../antd/cardChildren';
import { HeadingChildrenDashboard } from '../heading/headingChildrenDashboard';
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

interface ChildrenPage {
  site: SiteV2
}
export const ChildrenPageDashboard: FC<ChildrenPage> = ({ site }) => {
  const { asPath, query } = useRouter()
  const data = getChildrenDashboard(site, asPath)
  
  
  return (
    <section className=''>
      <HeadingChildrenDashboard title={data?.seo.name!} site={site} />
      {
        data?.children ?
          <div className="mt-6 space-y-12 md:space-y-0 md:grid md:grid-cols-3 md:gap-6 lg:grid-cols-5">
            {data.children.map((data, i) => (
              // eslint-disable-next-line react/no-children-prop
              <CardChildrenDashboard key={i} children={data} />
            ))}
          </div>
          : null
      }


    </section>
  )
}
