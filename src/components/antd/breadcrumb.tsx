import { Breadcrumb } from 'antd';
import Link from 'next/link';
import React, { FC } from 'react';
import { useRouter } from 'next/router';

  interface Route {
    name: string
    href?: string
  }
  interface BreadcrumbComponent {
    route: Route[]
  }

export const BreadcrumbComponent: FC<BreadcrumbComponent> = ({route}) => {
  const { asPath } = useRouter()
  
  return (
    <div className='my-6'>
      <Breadcrumb >
      {
        route.map((data, i:number) => data.href ? (

        <Breadcrumb.Item key={i}>
          <Link href={data.href}>
            <a>{data.name}</a>
          </Link>
        </Breadcrumb.Item>
        ) : 
        <Breadcrumb.Item key={i}>
          {data.name}
        </Breadcrumb.Item>
        )
      }
           
        
      </Breadcrumb>
    </div>
  );
} 