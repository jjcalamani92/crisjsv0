import Head from "next/head";
import { useRouter } from "next/router";
import { FC } from "react";
// import { Footer } from "../components/footer";
import { Data, HeadV1, Site } from "../interfaces/siteV1";
import { Main, HeaderPage } from '../components';
import { SeoV2, SiteV2 } from "../interfaces/siteV2";

interface Layout {
	seo?: SeoV2 ;
	children?: React.ReactNode;
	site: SiteV2
}

export const LayoutPages: FC<Layout> = ({
	seo,
	children,
	site
}) => {
	const router = useRouter()
  const { pathname, asPath } = router
	// console.log(sites);
	// const site = sites.find((site: { _id: string; }) => site._id === process.env.API_SITE)
	// const hero = site?.route[0].content.body
	// const header = site?.route .filter((data: { href: string}) => data.href !== 'home')
	
	
	
	return (
		<>
			<Head>
			<title>{seo ? seo.name : 'Cris'}</title>
				<meta name="keywords" />
				<meta name="description" content={seo ? seo.description : 'description'} />
				<meta property="og:title" content={seo ? seo.name : 'title'} />
				<meta property="og:description" content={seo ? seo.description : 'description'} />
				<meta property="og:type" content="og:product" />
				{seo && seo.image && <meta property="og:image" content={seo ? seo?.image.src :'image'} />}
				<link rel="icon" href={"https://regalosterrakota.com/wp-content/uploads/2021/11/cropped-icono-web-hhh-180x180.jpg"} />
			</Head>
      <HeaderPage />
			<Main>
				{children}
			</Main>
			{/* <Footer /> */}
			</>
	);
};
