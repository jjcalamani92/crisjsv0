import { gql } from "graphql-request";

export const BLOGSV2 = gql`
  query BlogsV2 {
    blogsV2 {
      _id
      data {
        title
        slug
        content
        meta
        tags {
          text
        }
        author
        thumbnail {
          src
          alt
        }
        seo{
          name
          href
          description
          image{
            src
            alt
          }
        }
      }
    }
  }
`;
export const BLOGSBYSITEV2 = gql`
  query BlogsBySiteV2($site: String!) {
    blogsBySiteV2(site: $site) {
      _id
      site
      data {
        title
        slug
        content
        meta
        tags {
          text
        }
        author
        thumbnail {
          src
          alt
        }
        seo{
          name
          href
          description
          image{
            src
            alt
          }
        }
      }
    }
  }
`;
