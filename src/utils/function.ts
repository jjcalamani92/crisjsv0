import { Children, HeadV1, Site } from "../interfaces/siteV1";
import { ParsedUrlQuery } from "querystring";

declare global {
  interface Array<T> {
    compacta(this: string[]): any;
  }
}


if (!Array.prototype.compacta) {
  Array.prototype.compacta = function () {
    for(var i = this.length - 1; i >=0 ; i--){
      if(typeof this[i] === 'undefined'){
          this.splice(i , 1);
      }
  }
  };
}

export function capitalizar(str: string) {
  return str
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });
}
export function capitalizar0(palabras: string) {
  return palabras.split(" ").map(palabra => palabra[0].toUpperCase() + palabra.substring(1)
).join(" ");
}

export function slug(str: string) {
  return str
    .trim()
    .toLowerCase()
    .replace(/[\u002F]/g, "")
    .replace(/-/g, " ")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/-/g, "")
    .replace(/\s+/g, " ")
    .replace(/ /g, "-");
}

export const getURL = (asPath: string) => {
  let url = asPath.split("/");
  url.length = url.length - 1;
  return url.join("/");
};

export const seo = (site: Site, asPath: string) => {
  const path = lastElement(asPath)
  return site.children.find(data => path === '' ? data.slug === 'home' : data.slug === path)?.head
};
export const seo2 = (site: Site, asPath: string) => {
  const path = lastElement(asPath)
  return site.children.find(data => path === '' ? data.slug === 'home' : data.slug === path)?.head
};

export const getQuery = (asPath: string) => {
  return asPath.slice(1).split("/");
};

export const lastElement = (asPath: string): string => {
  let url = getQuery(asPath);
  return url[url.length - 1];
};

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export const findSite = (arr: Site[]) => {
  return arr.find((data) => data._id === process.env.API_SITE);
};


export const getChildrens0 = (arr: Site[]) => {
  return findSite(arr)?.children.map(data0 => data0.slug === "home" ? '/' : `/${data0.slug}`);
};

export const getChildrens1 = (arr: Site[]) => {
  return findSite(arr)?.children.map(data0 => [
    data0.children?.map( data1 => `/${data0.slug}/${data1.slug}`), 
    data0.blogs?.map(data1 => `/${data0.slug}/${data1.slug}`)
  ]).flat(2).filter(data => typeof data !== 'undefined');
};  
export const getChildrens2 = (arr: Site[]) => {
  return findSite(arr)?.children.map(data0 => [
    data0.children?.map( data1 => data1.children?.map(data2 => `/${data0.slug}/${data1.slug}/${data2.slug}`)), 
  ]).flat(3).filter(data => typeof data !== 'undefined');
};  
// export const getChildrens2 = (arr: Site[]) => {
//   return findSite(arr)?.children.map(data1 => data1.children?.map(data2 => data2.children?.map(data3 => `/${data1.slug}/${data2.slug}/${data3.slug}`))).flat(2)
//   .filter(data => typeof data !== 'undefined');
// };

export const getChildrens3 = (arr: Site[]) => {
  return findSite(arr)?.children.map(data1 => data1.children?.map(data2 => data2.children?.map(data3 => `/${data1.slug}/${data2.slug}/${data3.slug}`))).flat(2)
  .filter(data => typeof data !== 'undefined');
};

export const getChildren0 = (arr: Site[], query: ParsedUrlQuery) => {
  return findSite(arr)?.children.find(data => query.slug  ? data.slug === query.slug![0] : data.slug === 'home');
};
export const getChildren1 = (arr: Site[], query: ParsedUrlQuery) => {
  return findSite(arr)
  ?.children.find(data => data.slug === query.slug![0])
  ?.children.find(data => data.slug[1]);
};
export const getChildren2 = (arr: Site[], query: ParsedUrlQuery) => {
  return findSite(arr)
    ?.children.find(data => data.slug === query.slug![0])
    ?.children.find(data => data.slug[1])
    ?.children.find(data => data.slug[2]);
};
export const getChildren3 = (arr: Site[], query: ParsedUrlQuery) => {
  // return findSite(arr)
  //   ?.children.find(data => data.slug === query.slug![0])
  //   ?.children.find(data => data.slug[1])
  //   ?.children.find(data => data.slug[2]);
};

export const seo3 = (arr: Site[], query: ParsedUrlQuery) => {
  if (query.slug && query.slug![2]) {
    return getChildren2(arr, query)?.head!
  } else if (query.slug && query.slug![1]) {
    return getChildren1(arr, query)?.head!
  } else {
    return getChildren0(arr, query)?.head!
  }
}

export const mapArray = (arr: Children[]) => {
  return arr.map((data0) => (data0.slug === "home" ? "/" : `/${data0.slug}`));
};
