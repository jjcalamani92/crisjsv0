
import { getQuery } from "./function";
import { ChildrenV2, SiteV2 } from "../interfaces/siteV2";
import { ProductV2, ProductsV2 } from '../interfaces/ecommerceV2';
import { BlogV2 } from "../interfaces/blogV2";
import { Option } from "../interfaces/Cart";

export const childrens0 = (site: SiteV2) => {
  return site?.children;
};

export const childrens1 = (site: SiteV2) => {
  return childrens0(site)
    .map((data0) => data0?.children)
    .filter((data) => data !== null)
    .flat(1);
};

export const childrens2 = (site: SiteV2) => {
  return childrens1(site)
    .map((data1) => data1?.children)
    .filter((data) => data !== null)
    .flat(2);
};

export const childrens3 = (site: SiteV2) => {
  return childrens2(site)
    .map((data2) => data2?.children)
    .filter((data) => data !== null)
    .flat(3);
};

export const childrens4 = (site: SiteV2) => {
  return childrens3(site)
    .map((data3) => data3?.children)
    .filter((data) => data !== null)
    .flat(4);
};

export const childrens5 = (site: SiteV2) => {
  return childrens4(site)
    .map((data4) => data4?.children)
    .filter((data) => data !== null)
    .flat(5);
};

//TODO: CHILDREN TODO:
export const children0 = (site: SiteV2, asPath: string) => {
  const query = getQuery(asPath);
  return childrens0(site)?.find((data) => data?.seo.href === query![3]);
};
export const children1 = (site: SiteV2, asPath: string) => {
  const query = getQuery(asPath);
  return childrens1(site)?.find((data) => data?.seo.href === query![4]);
};
export const children2 = (site: SiteV2, asPath: string) => {
  const query = getQuery(asPath);
  return childrens2(site)?.find((data) => data?.seo.href === query![5]);
};
export const children3 = (site: SiteV2, asPath: string) => {
  const query = getQuery(asPath);
  return childrens3(site)?.find((data) => data?.seo.href === query![6]);
};
export const children4 = (site: SiteV2, asPath: string) => {
  const query = getQuery(asPath);
  return childrens4(site)?.find((data) => data?.seo.href === query![7]);
};
export const children5 = (site: SiteV2, asPath: string) => {
  const query = getQuery(asPath);
  return childrens5(site)?.find((data) => data?.seo.href === query![8]);
};

export const children0Dashboard = (site: SiteV2, asPath: string) => {
  const query = getQuery(asPath);
  return childrens0(site)?.find((data) => data?.slug === query![3]);
};
export const children1Dashboard = (site: SiteV2, asPath: string) => {
  const query = getQuery(asPath);
  return childrens1(site)?.find((data) => data?.slug === query![4]);
};
export const children2Dashboard = (site: SiteV2, asPath: string) => {
  const query = getQuery(asPath);
  return childrens2(site)?.find((data) => data?.slug === query![5]);
};
export const children3Dashboard = (site: SiteV2, asPath: string) => {
  const query = getQuery(asPath);
  return childrens3(site)?.find((data) => data?.slug === query![6]);
};
export const children4Dashboard = (site: SiteV2, asPath: string) => {
  const query = getQuery(asPath);
  return childrens4(site)?.find((data) => data?.slug === query![7]);
};
export const children5Dashboard = (site: SiteV2, asPath: string) => {
  const query = getQuery(asPath);
  return childrens5(site)?.find((data) => data?.slug === query![8]);
};

// export const children4 = (site: Site, query: ParsedUrlQuery) => {
//   return childrens4(site)?.find((data) => data?.head.href === query.slug![4]);
// };
// export const children5 = (site: Site, query: ParsedUrlQuery) => {
//   return childrens5(site)?.find((data) => data?.head.href === query.slug![5]);
// };

export const getChildrenDashboard = (site: SiteV2, asPath: string) => {
  const query = getQuery(asPath);
  if (query.length === 9) {
    return children5Dashboard(site, asPath)!;
  } else if (query.length === 8) {
    return children4Dashboard(site, asPath)!;
  } else if (query.length === 7) {
    return children3Dashboard(site, asPath)!;
  } else if (query.length === 6) {
    return children2Dashboard(site, asPath)!;
  } else if (query.length === 5) {
    return children1Dashboard(site, asPath)!;
  } else if (query.length === 4) {
    return children0Dashboard(site, asPath)!;
  } 
};
export const getSite = (sites: SiteV2[], asPath: string) => {};
export const seoV2 = (site: SiteV2, asPath: string, products?: ProductsV2) => {
  const query = getQuery(asPath);
  if (productPaths(products?.jewelers!, "jeweler").includes(asPath)) {
    return getProduct(products?.jewelers!, asPath)?.article.seo;
  } else if (productPaths(products?.teddys!, "teddy").includes(asPath)) {
    return getProduct(products?.teddys!, asPath)?.article.seo;
  } else if (
    productPaths(products?.furnitures!, "furniture").includes(asPath)
  ) {
    return getProduct(products?.furnitures!, asPath)?.article.seo;
  } else if (productPaths(products?.gifts!, "gift").includes(asPath)) {
    return getProduct(products?.gifts!, asPath)?.article.seo;
  } else if (query[3]) {
    return children3(site, asPath)?.seo;
  } else if (query[2]) {
    return children2(site, asPath)?.seo;
  } else if (query[1]) {
    return children1(site, asPath)?.seo;
  } else {
    return children0(site, asPath)?.seo;
  }
};

// export const seo = (site: Site, query: ParsedUrlQuery, asPath: string, products: {
//   furnitures: Product[]
//   gifts: Product[]
// }) => {
//   if (productPaths(products.gifts).includes(asPath)) {
//     const product = products.gifts.find(data => data.article.slug === query.slug![1])
//     // console.log({name: product?.article.title, href: product?.article.slug, description: product?.article.description, image: product?.article.image[0].src});
//     return {name: product?.article.title, href: product?.article.slug, description: product?.article.description, image: {src: product?.article.image[0].src, alt: 'image description'}};
//   } else if (productPaths(products.furnitures).includes(asPath)) {
//     const product = products.furnitures.find(data => data.article.slug === query.slug![1])
//     // console.log({name: product?.article.title, href: product?.article.slug, description: product?.article.description, image: product?.article.image[0].src});
//     return {name: product?.article.title, href: product?.article.slug, description: product?.article.description, image: {src: product?.article.image[0].src, alt: 'image description'}};
//   } else if (query.slug && query.slug![5]) {
//     return children5(site, query)?.head!;
//   } else if (query.slug && query.slug![4]) {
//     return children4(site, query)?.head!;
//   } else if (query.slug && query.slug![3]) {
//     return children3(site, query)?.head!;
//   } else if (query.slug && query.slug![2]) {
//     return children2(site, query)?.head!;
//   } else if (query.slug && query.slug![1]) {
//     return children1(site, query)?.head!;
//   } else {
//     return children0(site, query)?.head!;
//   }
// };

//TODO: PATHS TODO:
export const childrenPaths0 = (site: SiteV2) => {
  return childrens0(site)!.map((data0) => `/${data0.seo.href}`);
};
export const childrenPaths1 = (site: SiteV2) => {
  return childrens0(site)!
    .map((data0) =>
      data0.children?.map((data1) => `/${data0.seo.href}/${data1.seo.href}`)
    )
    .flat(1)
    .filter((data) => typeof data !== "undefined");
};
export const childrenPaths2 = (site: SiteV2) => {
  return childrens0(site)!
    .map((data0) =>
      data0.children?.map((data1) =>
        data1.children?.map(
          (data2) => `/${data0.seo.href}/${data1.seo.href}/${data2.seo.href}`
        )
      )
    )
    .flat(2)
    .filter((data) => typeof data !== "undefined");
};

export const childrenPaths0Dashboard = (site: SiteV2) => {
  const pathsChildren = childrens0(site)!.map((data0) => [
    `/dashboard/pages/${data0.slug}`,
    data0.children &&
      data0.children.map((data1) => [
        `/dashboard/pages/${data0.slug}/${data1.slug}`,
        data1.children &&
          data1.children.map((data2) => [
            `/dashboard/pages/${data0.slug}/${data1.slug}/${data2.slug}`,
          ]),
      ]),
  ]);

  return [...pathsChildren, "/dashboard/pages"]
    .flat(5)
    .filter((data) => data !== null);
};

export const childrenPath0Dashboard = (sites: SiteV2[]) => {
  return sites
    .map((data) =>
      data.children.map((data0) => [
        { id: data._id, children: [data0.slug] },
        data0.children &&
          data0.children.map((data1) => [
            {
              id: data._id,
              children: [data0.slug, data1.slug],
            },
            data1.children &&
              data1.children.map((data2) => [
                {
                  id: data._id,
                  children: [data0.slug, data1.slug, data2.slug],
                },
                data2.children &&
                  data2.children.map((data3) => [
                    {
                      id: data._id,
                      children: [
                        data0.slug,
                        data1.slug,
                        data2.slug,
                        data3.slug,
                      ],
                    },
                    data3.children &&
                      data3.children.map((data4) => [
                        {
                          id: data._id,
                          children: [
                            data0.slug,
                            data1.slug,
                            data2.slug,
                            data3.slug,
                            data4.slug,
                          ],
                        },
                        // data4.children &&
                        // data4.children.map((data5) => [
                        //   {
                        //           id: data._id,
                        //           children: [
                        //             data0.slug,
                        //             data1.slug,
                        //             data2.slug,
                        //             data3.slug,
                        //             data4.slug,
                        //             data5.slug,
                        //           ]
                        //         }
                        // ])
                        // data4.children &&
                        //   data4.children.map((data5) => [
                        //     {
                        //       id: data._id,
                        //       children: [
                        //         data0.slug,
                        //         data1.slug,
                        //         data2.slug,
                        //         data3.slug,
                        //         data4.slug,
                        //         data5.slug,
                        //       ]
                        //     }
                        //   ])
                      ]),
                  ]),
              ]),
          ]),
      ])
    )
    .flat(10)
    .filter((data) => typeof data !== "undefined")
    .filter((data) => data !== null)
};

export const sitePaths = (sites: SiteV2[]) => {
  return sites.map((data) => `/dashboard/sites/${data._id}`);
};

export const paths = (site: SiteV2) => {
  return site.children
    .map((data0) => [
      {
        slug: data0.slug === "home" ? [] : [data0.slug],
      },
      data0.children &&
        data0.children.map((data1) => [
          {
            slug: [data0.slug, data1.slug],
          },
          data1.children &&
            data1.children.map((data2) => [
              {
                slug: [data0.slug, data1.slug, data2.slug],
              },
            ]),
        ]),
    ])
    .flat(5)
    .filter((data) => data !== null);
};
export const getProduct = (products: ProductV2[], asPath: string) => {
  const query = getQuery(asPath);
  return products.find((data) => data.article.slug === query![2])!;
};

export const getProductRoute = (site: SiteV2, product: ProductV2) => {
  // const { furnitures } = await graphQLClientP.request(FURNITURIES, { site: process.env.API_SITE })
  // console.log('furnitures', furnitures);

  const url = getQuery(product?.article.route);
  if (url[2]) {
    const children0 = childrens0(site).filter((data) => data.slug === url[0]);
    const children1 = childrens1(site).filter((data) => data.slug === url[1]);
    const children2 = childrens2(site).filter((data) => data.slug === url[2]);
    return [
      children0.map((children0) => [
        {
          name: children0.seo.name,
          href: `/${children0.seo.href}`,
        },
        children0.children &&
          children1.map((children1) => [
            {
              name: children1.seo.name,
              href: `/${children0.seo.href}/${children1.seo.href}`,
            },
            children1.children &&
              children2.map((children2) => [
                {
                  name: children2.seo.name,
                  href: `/${children0.seo.href}/${children1.seo.href}/${children2.seo.href}`,
                },
              ]),
          ]),
        {
          name: product.article.name,
        },
      ]),
    ].flat(6);
  } else if (url[1]) {
    const children0 = childrens0(site).filter((data) => data.slug === url[0]);
    const children1 = childrens1(site).filter((data) => data.slug === url[1]);
    return [
      children0.map((children0) => [
        {
          name: children0.seo.name,
          href: `/${children0.seo.href}`,
        },
        children0.children &&
          children1.map((children1) => [
            {
              name: children1.seo.name,
              href: `/${children0.seo.href}/${children1.seo.href}`,
            },
          ]),
        {
          name: product.article.name,
        },
      ]),
    ].flat(6);
  } else {
    const children0 = childrens0(site).filter((data) => data.slug === url[0]);
    return [
      children0.map((children0) => [
        {
          name: children0.seo.name,
          href: `/${children0.seo.href}`,
        },

        {
          name: product.article.name,
        },
      ]),
    ].flat(6);
  }
};
export const productPaths = (products: ProductV2[], type: string) => {
  return products.map((data) => `/detalles/${type}/${data.article.slug}`);
};
export const productsPaths = (products: ProductsV2, site: SiteV2) => {
  const productsPaths = site.dataBase!.map((data) =>
    data.type === "furniture"
      ? products.furnitures!.map(
          (product) => `/detalles/${data.type}/${product.article.slug}`
        )
      : data.type === "gift"
      ? products.gifts!.map(
          (product) => `/detalles/${data.type}/${product.article.slug}`
        )
      : data.type === "teddy"
      ? products.teddys!.map(
          (product) => `/detalles/${data.type}/${product.article.slug}`
        )
      : data.type === "jeweler"
      ? products.jewelers!.map(
          (product) => `/detalles/${data.type}/${product.article.slug}`
        )
      : null
  );

  return productsPaths.flat(1);
  // return products.furnitures!.map((data) => `/detalles/furniture/${data.article.slug}`);
};

export const productsDashboardPaths = (products: ProductsV2, site: SiteV2) => {
  const productsPaths = site.dataBase!.map((data) =>
    data.type === "furniture"
      ? products.furnitures!.map(
          (product) =>
            `/dashboard/products/${data.type}/${product.article.slug}`
        )
      : data.type === "gift"
      ? products.gifts!.map(
          (product) =>
            `/dashboard/products/${data.type}/${product.article.slug}`
        )
      : data.type === "teddy"
      ? products.teddys!.map(
          (product) =>
            `/dashboard/products/${data.type}/${product.article.slug}`
        )
      : data.type === "jeweler"
      ? products.jewelers!.map(
          (product) =>
            `/dashboard/products/${data.type}/${product.article.slug}`
        )
      : null
  );

  return productsPaths.flat(1);
  // return products.furnitures!.map((data) => `/detalles/furniture/${data.article.slug}`);
};
export const productsDashboardPathsV2 = ( sites: SiteV2[]) => {
  const product = sites.filter(data => data.type === 'ecommerce').map(data => data.dataBase.map(data0 => ({id: data._id, type: data0.type})))
  // const productsPaths = site.dataBase!.map((data) =>
  //   data.type === "furniture"
  //     ? products.furnitures!.map(
  //         (product) =>
  //           `/dashboard/products/${data.type}/${product.article.slug}`
  //       )
  //     : data.type === "gift"
  //     ? products.gifts!.map(
  //         (product) =>
  //           `/dashboard/products/${data.type}/${product.article.slug}`
  //       )
  //     : data.type === "teddy"
  //     ? products.teddys!.map(
  //         (product) =>
  //           `/dashboard/products/${data.type}/${product.article.slug}`
  //       )
  //     : data.type === "jeweler"
  //     ? products.jewelers!.map(
  //         (product) =>
  //           `/dashboard/products/${data.type}/${product.article.slug}`
  //       )
  //     : null
  // );

  return product.flat(1);
  // return products.furnitures!.map((data) => `/detalles/furniture/${data.article.slug}`);
};
export const productsDashboardPathsSlugV3 = ( sites: SiteV2[], products: ProductsV2) => {
  const product = sites.filter(data => data.type === 'ecommerce').map(data => data.dataBase.map(data0 => 
    [ 
      data0.type === "furniture" && products.furnitures?.filter(dataf => dataf.site === data._id)?.map(product => ({id: data._id, type: data0.type, slug:product.article.slug})),
      data0.type === "gift" && products.gifts?.filter(dataf => dataf.site === data._id)?.map(product => ({id: data._id, type: data0.type, slug:product.article.slug})),
      data0.type === "teddy" && products.teddys?.filter(dataf => dataf.site === data._id)?.map(product => ({id: data._id, type: data0.type, slug:product.article.slug})),
      data0.type === "jeweler" && products.jewelers?.filter(dataf => dataf.site === data._id)?.map(product => ({id: data._id, type: data0.type, slug:product.article.slug})),
      data0.type === "clothing" && products.clothings?.filter(dataf => dataf.site === data._id)?.map(product => ({id: data._id, type: data0.type, slug:product.article.slug})),
    ]
    ))
  return product.flat(10).filter((data) => typeof data !== "boolean");
};
export const blogsDashboardPathsSlugV3 = ( sites: SiteV2[], blogs: BlogV2[]) => {
  const blog = sites.filter(data => data.type !== 'ecommerce').map(data => blogs.filter(dataf => dataf.site === data._id)?.map(blog => ({id: data._id, slug:blog.data.slug})))
  return blog.flat(10).filter((data) => typeof data !== "boolean");
};

export const productDashboardDataBasePaths = (site: SiteV2) => {
  return site.dataBase.map((data) => `/dashboard/products/${data.type}`);
};

export const productDashboardPaths = (type: string, products: ProductV2[]) => {
  return products.map(
    (data) => `/dashboard/products/${type}/${data.article.slug}`
  );
};

export const routes = (site: SiteV2): Option[] => {
  return site.children
    .filter((data) => data.type === "ecommerce")
    .map((data0) => ({
      value: data0.seo.href,
      label: data0.seo.name,
      children:
        data0.children &&
        data0.children.map((data1) => ({
          value: data1.seo.href,
          label: data1.seo.name,
          children:
            data1.children &&
            data1.children.map((data2) => ({
              value: data2.seo.href,
              label: data2.seo.name,
            })),
        })),
    }));
};

// export const productDashboardPaths = (type: string, products: Product[]) => {
//   return products.map(
//     (data) => `/dashboard/products/${type}/${data.article.slug}`
//   );
// };
