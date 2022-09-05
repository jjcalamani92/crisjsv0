import { GraphQLClient } from "graphql-request";

export const graphQLClient = new GraphQLClient(
  `${process.env.APIS_URL}/graphql`,
  {
    headers: {
      authorization: "Bearer MY_TOKEN",
    },
  }
);
export const graphQLClientS = new GraphQLClient(
  `${process.env.APIS_URL}/graphql`,
  {
    headers: {
      authorization: "Bearer MY_TOKEN",
    },
  }
);
export const graphQLClientP = new GraphQLClient(
  `${process.env.APIP_URL}/graphql`,
  {
    headers: {
      authorization: "Bearer MY_TOKEN",
    },
  }
);

