/* This example requires Tailwind CSS v2.0+ */
import { FC, Fragment } from 'react'
import { HeaderDashboard, Main } from '../components'
import { useRouter } from 'next/router'
import Link from 'next/link';
import Head from 'next/head';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Dashboard', href: '/dashboard', current: true },
  { name: 'Pages', href: '/dashboard/pages', current: false },
  { name: 'Products', href: '/dashboard/products', current: false },
  // { name: 'Projects', href: '#', current: false },
  // { name: 'Calendar', href: '#', current: false },
  { name: 'Reports', href: '#', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

interface LayoutDashboard {
  children: React.ReactNode;
}

export const LayoutDashboard: FC<LayoutDashboard> = ({ children }) => {
  const { query, asPath } = useRouter()


  return (
    <>

      <div className="min-h-full">
        <Head>
          <title>Dashboard</title>
          <meta name="keywords" />

          <link rel="icon" href={"https://regalosterrakota.com/wp-content/uploads/2021/11/cropped-icono-web-hhh-180x180.jpg"} />
        </Head>
        <HeaderDashboard />
        <Main>
          {children}
        </Main>
        
      </div>
    </>
  )
}
