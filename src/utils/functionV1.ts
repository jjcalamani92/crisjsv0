import { Site } from "../interfaces/siteV1";
import { ParsedUrlQuery } from "querystring";
import { Product } from "../interfaces/ecommerceV1";
import { Option } from "../components/formModal/formProduct";
import { getQuery, slug } from './function';

export const childrens0 = (site: Site) => {
  return site?.children;
};
export const childrens1 = (site: Site) => {
  return childrens0(site)
    .map((data0) => data0?.children)
    .filter((data) => data !== null)
    .flat(1);
};
export const childrens2 = (site: Site) => {
  return childrens1(site)
    .map((data1) => data1?.children)
    .filter((data) => data !== null)
    .flat(2);
};
export const childrens3 = (site: Site) => {
  return childrens2(site)
    .map((data2) => data2?.children)
    .filter((data) => data !== null)
    .flat(3);
};
export const childrens4 = (site: Site) => {
  return childrens3(site)
    .map((data3) => data3?.children)
    .filter((data) => data !== null)
    .flat(4);
};
export const childrens5 = (site: Site) => {
  return childrens4(site)
    .map((data4) => data4?.children)
    .filter((data) => data !== null)
    .flat(5);
};

//TODO: CHILDREN TODO:
export const children0 = (site: Site, query: ParsedUrlQuery) => {
  return childrens0(site)?.find((data) =>
    query.slug ? data?.head.href === query.slug![0] : data?.head.href === ""
  );
};
export const children1 = (site: Site, query: ParsedUrlQuery) => {
  return childrens1(site)?.find((data) => data?.head.href === query.slug![1]);
};
export const children2 = (site: Site, query: ParsedUrlQuery) => {
  return childrens2(site)?.find((data) => data?.head.href === query.slug![2]);
};
export const children3 = (site: Site, query: ParsedUrlQuery) => {
  return childrens3(site)?.find((data) => data?.head.href === query.slug![3]);
};
export const children4 = (site: Site, query: ParsedUrlQuery) => {
  return childrens4(site)?.find((data) => data?.head.href === query.slug![4]);
};
export const children5 = (site: Site, query: ParsedUrlQuery) => {
  return childrens5(site)?.find((data) => data?.head.href === query.slug![5]);
};

export const seo = (site: Site, query: ParsedUrlQuery, asPath: string, products: {
  furnitures: Product[]
  gifts: Product[]
}) => {
  if (productPaths(products.gifts).includes(asPath)) {
    const product = products.gifts.find(data => data.article.slug === query.slug![1])
    // console.log({name: product?.article.title, href: product?.article.slug, description: product?.article.description, image: product?.article.image[0].src});
    return {name: product?.article.title, href: product?.article.slug, description: product?.article.description, image: {src: product?.article.image[0].src, alt: 'image description'}};
  } else if (productPaths(products.furnitures).includes(asPath)) {
    const product = products.furnitures.find(data => data.article.slug === query.slug![1])
    // console.log({name: product?.article.title, href: product?.article.slug, description: product?.article.description, image: product?.article.image[0].src});
    return {name: product?.article.title, href: product?.article.slug, description: product?.article.description, image: {src: product?.article.image[0].src, alt: 'image description'}};
  } else if (query.slug && query.slug![5]) {
    return children5(site, query)?.head!;
  } else if (query.slug && query.slug![4]) {
    return children4(site, query)?.head!;
  } else if (query.slug && query.slug![3]) {
    return children3(site, query)?.head!;
  } else if (query.slug && query.slug![2]) {
    return children2(site, query)?.head!;
  } else if (query.slug && query.slug![1]) {
    return children1(site, query)?.head!;
  } else {
    return children0(site, query)?.head!;
  }
};

//TODO: PATHS TODO:
export const childrenPaths0 = (site: Site) => {
  return childrens0(site)!.map((data0) => `/${data0.head.href}`);
};
export const childrenPaths1 = (site: Site) => {
  return childrens0(site)!
    .map((data0) =>
      data0.children?.map((data1) => `/${data0.head.href}/${data1.head.href}`)
    )
    .flat(1)
    .filter((data) => typeof data !== "undefined");
};
export const childrenPaths2 = (site: Site) => {
  return childrens0(site)!
    .map((data0) =>
      data0.children?.map((data1) =>
        data1.children?.map(
          (data2) => `/${data0.head.href}/${data1.head.href}/${data2.head.href}`
        )
      )
    )
    .flat(2)
    .filter((data) => typeof data !== "undefined");
};
export const paths = (site: Site) => {
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
export const getProduct = (products: Product[], query: ParsedUrlQuery) => {
  return products.find((data) =>
    query.slug![0] === "dashboard"
      ? data.article.slug === query.slug![3]
      : data.article.slug === query.slug![1]
  )!;
};

export const getProductRoute = (site: Site, product: Product) => {
  const url = getQuery(product.article.route);
  if (url[2]) {
    const children0 = childrens0(site).filter((data) => data.slug === url[0]);
    const children1 = childrens1(site).filter((data) => data.slug === url[1]);
    const children2 = childrens2(site).filter((data) => data.slug === url[2]);
    return [
      children0.map((children0) => [
        {
          name: children0.head.name,
          href: `/${children0.head.href}`,
        },
        children0.children &&
          children1.map((children1) => [
            {
              name: children1.head.name,
              href: `/${children0.head.href}/${children1.head.href}`,
            },
            children1.children &&
              children2.map((children2) => [
                {
                  name: children2.head.name,
                  href: `/${children0.head.href}/${children1.head.href}/${children2.head.href}`,
                },
              ]),
          ]),
          {
            name: product.article.title,
          }
      ]),
    ].flat(6);
  } else if (url[1]) {
    const children0 = childrens0(site).filter((data) => data.slug === url[0]);
    const children1 = childrens1(site).filter((data) => data.slug === url[1]);
    return [
      children0.map((children0) => [
        {
          name: children0.head.name,
          href: `/${children0.head.href}`,
        },
        children0.children &&
          children1.map((children1) => [
            {
              name: children1.head.name,
              href: `/${children0.head.href}/${children1.head.href}`,
            }
          ]),
          {
            name: product.article.title,
          }
      ]),
    ].flat(6);
  } else {
    const children0 = childrens0(site).filter((data) => data.slug === url[0]);
    return [
      children0.map((children0) => [
        {
          name: children0.head.name,
          href: `/${children0.head.href}`,
        },
        
          {
            name: product.article.title,
          }
      ]),
    ].flat(6);
  }
  // return children0.map(children0 => [{name: children0.head.name, href: children0.head.href}, children0.children && children0.children.filter(data => data.slug === url[1]).map(children1 => [{name: children1.head.name, href: children1.head.href}]) ]).flat(5)
};
export const productPaths = (products: Product[]) => {
  return products.map((data) => `/detalles/${data.article.slug}`);
};
export const routes = (site: Site): Option[] => {
  return site.children
    .filter((data) => data.type === "ecommerce")
    .map((data0) => ({
      value: data0.head.href,
      label: data0.head.name,
      children:
        data0.children &&
        data0.children.map((data1) => ({
          value: data1.head.href,
          label: data1.head.name,
          children:
            data1.children &&
            data1.children.map((data2) => ({
              value: data2.head.href,
              label: data2.head.name,
            })),
        })),
    }));
};
export const productDashboardPaths = (type: string, products: Product[]) => {
  return products.map(
    (data) => `/dashboard/products/${type}/${data.article.slug}`
  );
};
