/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
		API_SITE: process.env.API_SITE,
		APIU_URL: process.env.APIU_URL,
		APIS_URL: process.env.APIS_URL,
		APISS_URL: process.env.APISS_URL,
		APIP_URL: process.env.APIP_URL,
		APIPP_URL: process.env.APIPP_URL,
		APIUP_URL: process.env.APIUP_URL,
		GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
		GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
		MONGO_URL: process.env.MONGO_URL,
		PORT: process.env.PORT,
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
		JWT_SECRET: process.env.JWT_SECRET,
		NEXTAUTH_URL: process.env.NEXTAUTH_URL,

	},
	images: {
		// loader: 'cloudinary',
		domains: ["res.cloudinary.com", "regalosterrakota.com", "tailwindui.com" ],
	}
}

module.exports = nextConfig
