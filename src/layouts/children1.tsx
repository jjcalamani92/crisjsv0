import { useRouter } from "next/router";
import { FC } from "react"
import { Site } from "../interfaces/siteV1";
import { ChildrenPage } from '../components';
import { children0, childrenPaths1, children1 } from '../utils/functionV2';
import { SiteV2 } from "../interfaces/siteV2";

interface Props {
  site: SiteV2
}

export const Children1: FC<Props> = ({ site }) => {
  const { asPath, query } = useRouter()
  switch (asPath) {
    case childrenPaths1(site).find(data => data === asPath):
      return <ChildrenPage item={children1(site, asPath)!} />
      
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
