import { useRouter } from "next/router";
import { FC } from "react"
import { children0, childrenPaths1, children1, children2, childrenPaths2 } from '../utils/functionV2';
import { ProductPage } from "../components";
import { Product } from "../interfaces/ecommerceV1";
import { SiteV2 } from "../interfaces/siteV2";
import { ProductV2 } from "../interfaces/ecommerceV2";

interface Props {
  site: SiteV2
  
}

export const Children2: FC<Props> = ({ site }) => {
  const { asPath, query } = useRouter()
  // console.log(childrenPaths2(site));
  
  switch (asPath) {
    case childrenPaths2(site).find(data => data === asPath):
      return <ProductPage item={children2(site, asPath)!}/>
      // if (children2(site, asPath)!.type === 'furniture') {
      //   return <ProductPage item={children2(site, asPath)!}/>
      // } else if (children2(site, asPath)!.type === 'gift') {
      //   return <ProductPage item={children2(site, asPath)!}/>
      // }

    default:
      return null;
  }
}
