import { FC } from "react";
import { useRouter } from 'next/router';
import { FacebookOutlined, WhatsAppOutlined, InstagramOutlined } from '@ant-design/icons';
import { SwiperDetail, SwiperPaginationDynamic } from '../swiper';
import { HeadingDashboardProduct } from "../heading/headingDashboardProduct";
import { Description } from '../antd/description';
import Link from "next/link";
import MoreProduct from "../moreProducts";
import { BreadcrumbComponent } from "../antd/breadcrumb";
import { getProduct, getProductRoute } from "../../utils/functionV2";
import { SiteV2 } from "../../interfaces/siteV2";
import { useGetProductFurnitureBySlug, useGetProductGiftBySlug, useGetProductJewelerBySlug, useGetProductTeddyBySlug } from "../../react-query/reactQuery";
import { ProductV2 } from "../../interfaces/ecommerceV2";

interface ProductOverview {
	site: SiteV2
}

export const ProductOverview: FC<ProductOverview> = ({ site }) => {
	const { asPath, query } = useRouter()
	// console.log(asPath);
	
  const { data:furniture } = useGetProductFurnitureBySlug(query.slug![2]);
  const { data:gift } = useGetProductGiftBySlug(query.slug![2]);
	const { data:teddy } = useGetProductTeddyBySlug(query.slug![2]);
  const { data:jeweler } = useGetProductJewelerBySlug(query.slug![2]);
	let product!: ProductV2
  if (query.slug![1] === 'jeweler') {
    product = jeweler!
  } else 
  if (query.slug![1] === 'teddy') {
    product = teddy!
  } else 
  if (query.slug![1] === 'furniture') {
    product = furniture!
  } else 
	if (query.slug![1] === 'gift') {
    product = gift!
  }


	return (
		<>
			<section className="bg-white">
				{
					query.slug![0] === 'dashboard' ?
						<HeadingDashboardProduct title='Product Edit' product={product} site={site} />
						: <BreadcrumbComponent route={getProductRoute(site, product)} />
				}
				<div className=" py-0 px-0 sm:px-0 lg:max-w-7xl lg:py-0 lg:px-0 grid grid-cols-1 lg:gap-6 lg:grid-cols-5">
					<div className="col-span-3" >
						{/* <SwiperDetail image={product.article.image} /> */}
						<SwiperPaginationDynamic images={product?.article.image} />
					</div>
					<div className="col-span-2 mt-3 lg:mt-0" >
						<div className="mb-4">
							<h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
								{product?.article.name}
							</h1>
						</div>
						<div className="mb-4">
							{
								product?.article.discountPrice
									?
									<div className='flex '>
										<p className="text-3xl text-gray-500 line-through mr-2">{product?.article.price}.00 Bs </p>
										<p className="font-semibold text-3xl text-gray-900 ">{product?.article.discountPrice}.00 Bs </p>
									</div>
									:
									<p className="text-3xl text-gray-900 ">{product?.article.price}.00 Bs </p>
							}

						</div>
						<div className="mb-4">
							<form >
								<div className="mt-6">
									{/* <div className="flex items-center justify-between">
                  <h3 className="text-sm text-gray-900 font-medium">Tallas</h3>
                  <a href="#" className="text-sm font-medium text-pink-700 hover:text-pink-600">
                    Guia de tallas
                  </a>
                </div> */}

									{/* <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                  <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {product.sizes.map((size, i) => (
                      <RadioGroup.Option
                        key={i}
                        value={size}
                        // disabled={!size.inStock}
                        className={({ active }) =>
                          classNames(
                            size
                            // size.inStock
                              ? 'bg-white shadow-sm text-gray-900 cursor-pointer'
                              : 'bg-gray-50 text-gray-200 cursor-not-allowed',
                            active ? 'ring-2 ring-pink-600' : '',
                            'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label as="span">{size}</RadioGroup.Label>
                            {/* {size.inStock ? (
                              <span
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked ? 'border-pink-600' : 'border-transparent',
                                  'absolute -inset-px rounded-md pointer-events-none'
                                )}
                                aria-hidden="true"
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="absolute -inset-px rounded-md border-2 border-gray-200 pointer-events-none"
                              >
                                <svg
                                  className="absolute inset-0 w-full h-full text-gray-200 stroke-2"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                  stroke="currentColor"
                                >
                                  <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                </svg>
                              </span>
                            )} 
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup> */}
								</div>
								{/* <button
									type="submit"
									className="mt-10 w-full bg-pink-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400"
								>
									Agregar al carrito
								</button> */}
							</form>
							{/* <form className="mt-5">
								<button
									type="submit"
									className="mt-4 w-full bg-pink-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400"
								>
									Agregar al carrito
								</button>65525049
							</form> */}
							<a
								href={`https://wa.me/59163039181?text=Hola%20me%20interesa%20este%20producto:%20https://regalosterrakota.vercel.app${asPath}`}
								target={'blank'}
								className="mt-3 w-full bg-pink-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400"
							>
								Preguntar por WhatsApp
							</a>
						</div>
						<div className="mb-4">
							<h2 className="text-md font-bold text-gray-900">Descripción</h2>
							<div className="mt-4 space-y-3">
								<p className="text-xs md:text-sm text-gray-600">{product?.article.description}</p>
							</div>
						</div>
						{/* <h2 className="text-sm font-medium text-gray-900">Detalles</h2> */}
						{
							product?.article.details &&
							<div className="mb-4">
								<h2 className="text-md font-bold text-gray-900">Detalles</h2>
								<Description details={product?.article.details!} />
							</div>
						}

						<div className="mb-4">
							<h2 className="text-md font-bold text-gray-900">Compartir</h2>
							<div className="grid grid-cols-7 gap-2 text-pink-600 mt-4">
								<Link href={`https://www.facebook.com`}>
									{/* <Link href={`https://www.facebook.com/sharer.php?u=https://${site.domain}${router.asPath}`}> */}
									<a target={'_blank'} >
										<FacebookOutlined style={{ fontSize: '30px' }} className="text-pink-600 " />
									</a>
								</Link>
								<Link href={`#`}>
									{/* <Link href={`https://www.facebook.com/sharer.php?u=https://${site.domain}${router.asPath}`}> */}
									<a target={'_blank'} >
										<WhatsAppOutlined style={{ fontSize: '30px' }} className="text-pink-600 " />
										{/* <WhatsAppOutlined /> */}
									</a>
								</Link>
								<Link href={`#`}>
									{/* <Link href={`https://www.facebook.com/sharer.php?u=https://${site.domain}${router.asPath}`}> */}
									<a target={'_blank'} >
										<InstagramOutlined style={{ fontSize: '30px' }} className="text-pink-600 " />
										{/* <WhatsAppOutlined /> */}
									</a>
								</Link>
							</div>

						</div>
					</div>

				</div>
				{
					query.slug![0] === 'dashboard' ?
						null
						: <MoreProduct />
				}
			</section>
		</>
	)
}
