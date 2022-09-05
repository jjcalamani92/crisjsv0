import { FC } from "react"
import { useRouter } from 'next/router';
import { Page404, Hero2 } from '../components';
import { useGetProductsFurniture, useGetProductsGift, useGetProductsJeweler, useGetProductsTeddy, useGetSite } from "../react-query/reactQuery";
import { Team } from "../components/team";
import { Blogs } from "../components/blogs";
import { Article } from "../components/article";
import Markdown from "markdown-to-jsx";
import { Pricing } from "../components/pricing";
import { MarkdownEditor } from "../components/form/markdown";


interface Routes {
}
const md3 = `<Hero2/>`;
export const Routes: FC<Routes> = ({ }) => {
  const { asPath } = useRouter()

  // console.log(children0Dashboard(site!, asPath));

  // console.log(children0Dashboard(site!, asPath));
  // console.log(childrens0(site!));
  // console.log(childrenPaths0Dashboard(site!));


  switch (asPath) {
    case '/dashboard/sites/blog':
    return <MarkdownEditor />
    case '/':
      return (

        <>
      <Markdown
        options={{
          overrides: {
            Hero2: {
              component: Hero2,
            },
          },
        }}
        >
        {`<Hero2/>`}
      </Markdown>
      <Markdown
        options={{
          overrides: {
            Pricing: {
              component: Pricing,
            },
          },
        }}
        >
        {`<Pricing/>`}
      </Markdown>
          </>
      )
    case '/team':
      return <Team />
    case '/blog':
      return <Blogs />
    case '/blog/article-01':
      return <Article />
    // case childrenPaths1(site!).find(data => data === asPath):
    //   return <Children1 site={site!}/>
    // case childrenPaths2(site!).find(data => data === asPath):
    //   return <Children2 site={site!} />
    // case productsPaths({furnitures, gifts, teddys, jewelers}, site!).find(data => data === asPath):
    //   return <ProductOverview site={site!}/>

    // case childrenPaths0Dashboard(site!).find(data => data === asPath):
    //   return <ChildrenPageDashboard site={site!} />

    // case '/auth/login':
    //   return <h1>Hola</h1>

    // case '/dashboard/products':
    //   return <ProductDashboard  site={site!}/>
    // case productDashboardDataBasePaths(site!).find(data => data === asPath):
    //   return <ProductPageDashboard site={site!}/>
    // case productsDashboardPaths({furnitures, gifts, teddys, jewelers}, site!).find(data => data === asPath):
    //   return <ProductOverviewDashboard site={site!}/>
    // case productDashboardPaths('gift', products.gifts).find(data => data === asPath):
    //   return <ProductOverview products={products.gifts} site={site}/>

    default:
      return <Page404 />

  }
}