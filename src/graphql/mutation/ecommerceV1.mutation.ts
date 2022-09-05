import { gql } from "graphql-request";

export const CREATE_WEAR_PRODUCT = gql`
  mutation CreateWear($input: CreateProductInput!) {
    createWear(input: $input) {
      _id
      site
    }
  }
`;
export const CREATE_FURNITURE_PRODUCT = gql`
  mutation CreateFurniture($input: CreateProductInput!) {
    createFurniture(input: $input) {
      _id
      site
    }
  }
`;
export const CREATE_GIFT_PRODUCT = gql`
  mutation CreateGift($input: CreateProductInput!) {
    createGift(input: $input) {
      _id
      site
    }
  }
`;
export const UPDATE_FURNITURE_PRODUCT = gql`
  mutation UpdateFurniture($_id: ID!, $input: UpdateProductInput!) {
    updateFurniture(_id: $_id, input: $input) {
      _id
      site
    }
  }
`;
export const UPDATE_GIFT_PRODUCT = gql`
  mutation UpdateGift($_id: ID!, $input: UpdateProductInput!) {
    updateGift(_id: $_id, input: $input) {
      _id
      site
    }
  }
`;
export const DELETE_FURNITURE_PRODUCT = gql`
  mutation RemoveFurniture($_id: ID!) {
    removeFurniture(_id: $_id) 
  }
`;
export const DELETE_GIFT_PRODUCT = gql`
  mutation RemoveGift($_id: ID!) {
    removeGift(_id: $_id) 
  }
`;

export const ADD_IMAGES_FURNITURE = gql`
mutation AddImagesFurniture($_id: ID!, $input: [AddImagesInput!]!) {
  addImagesFurniture(_id: $_id, input: $input) {
    _id
  }
}
`;
export const ADD_IMAGES_GIFT = gql`
mutation AddImagesGift($_id: ID!, $input: [AddImagesInput!]!) {
  addImagesGift(_id: $_id, input: $input) {
    _id
  }
}
`;