import { gql } from "graphql-request";

export const ALL_WEARS = gql`
  query AllWears {
    allWears {
      _id
      article {
        title
        slug
      }
    }
  }
`;
export const WEARS = gql`
  query Wears($site: String!) {
    wears(site: $site) {
      _id
      article {
        title
        slug
      }
    }
  }
`;
export const WEAR = gql`
  query Wear($_id: ID!) {
    wear(_id: $_id) {
      _id
      article {
        title
        slug
        description
        price
        discountPrice
        image {
          src
          alt
        }
      }
    }
  }
`;

// export const ALL_FURNITURIES = gql`
//   query AllFurnitures {
//     allFurnitures{
//       _id
// 			article{
//         title
//         slug
//       }
//     }
//   }
// `;
// export const FURNITURIES1 = gql`
//   query Furnitures1($site:String!, $route:String!) {
//     furnitures1(site:$site, route:$route) {
//       _id
// 			article{
//         title
//         slug
//         price
//         route
//         image{
//           src
//           alt
//         }
//       }
//     }
//   }
// `;
export const FURNITURIES = gql`
  query Furnitures($site: String!) {
    furnitures(site: $site) {
      _id

      article {
        title
        slug
        price
        discountPrice
        inStock
        route
        mark
        description
        image {
          src
          alt
        }
        featured {
          name
          href
        }
      }
    }
  }
`;
// export const FURNITURIE = gql`
//   query Furniture($_id:ID!) {
//     furniture(_id:$_id) {
//       _id
// 			article{
//         title
//         slug
//         description
//         price
//         discountPrice
//         image{
//           src
//           alt
//         }
//         route
//       }
//     }
//   }
// `;
export const GIFTS = gql`
  query Gifts($site: String!) {
    gifts(site: $site) {
      _id
      article {
        title
        slug
        price
        discountPrice
        inStock
        route
        mark
        description
        image {
          src
          alt
        }
        featured {
          name
          href
        }
      }
    }
  }
`;
