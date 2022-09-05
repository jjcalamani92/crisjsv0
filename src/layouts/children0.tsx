import { useRouter } from "next/router";
import { FC } from "react"
import { Site } from "../interfaces/siteV1";
import { Hero } from "../components/hero";
import { ChildrenPage } from '../components';
import { children0 } from '../utils/functionV2';
import { SiteV2 } from "../interfaces/siteV2";

interface Props {
  site: SiteV2
}

export const Children0: FC<Props> = ({ site }) => {
  const { asPath, query } = useRouter()
  // console.log(children0(site, asPath));
  
  switch (asPath) {
    case '/':
      return <Hero title="Hola" />
    case '/tienda':
      // return <h1>Tienda</h1>
    return <ChildrenPage item={children0(site, asPath)!} />
    // case getPathsC0(sites, asPath):
    //   return (
    //     <>
    //       <ReactMarkdown rehypePlugins={[rehypeRaw]}>
    //         {children0.body.title}
    //       </ReactMarkdown>
    //     </>
    //   )
    default:
      return null;
  }
}
