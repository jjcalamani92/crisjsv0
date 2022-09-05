import { gql } from "graphql-request";

export const ADD_CLOTHING_PRODUCT = gql`
  mutation AddClothing($input: CreateProductInput!) {
    addClothing(input: $input) {
      _id
      site
    }
  }
`;
export const UPDATE_CLOTHING_PRODUCT = gql`
  mutation UpdateClothing($_id: ID!, $input: UpdateProductInput!) {
    updateClothing(_id: $_id, input: $input) {
      _id
      site
    }
  }
`;
export const DELETE_CLOTHING_PRODUCT = gql`
  mutation RemoveClothing($_id: ID!) {
    removeClothing(_id: $_id) 
  }
`;
export const UPDATE_IMAGES_CLOTHING = gql`
mutation UpdateImagesClothing($_id: ID!, $input: [UpdateImagesInput!]!) {
  updateImagesClothing(_id: $_id, input: $input) {
    _id
  }
}
`;


export const ADD_TEDDY_PRODUCT = gql`
  mutation AddTeddy($input: CreateProductInput!) {
    addTeddy(input: $input) {
      _id
      site
    }
  }
`;
export const UPDATE_TEDDY_PRODUCT = gql`
  mutation UpdateTeddy($_id: ID!, $input: UpdateProductInput!) {
    updateTeddy(_id: $_id, input: $input) {
      _id
      site
    }
  }
`;
export const DELETE_TEDDY_PRODUCT = gql`
  mutation RemoveTeddy($_id: ID!) {
    removeTeddy(_id: $_id) 
  }
`;
export const UPDATE_IMAGES_TEDDY = gql`
mutation UpdateImagesTeddy($_id: ID!, $input: [UpdateImagesInput!]!) {
  updateImagesTeddy(_id: $_id, input: $input) {
    _id
  }
}
`;


export const ADD_JEWELER_PRODUCT = gql`
  mutation AddJeweler($input: CreateProductInput!) {
    addJeweler(input: $input) {
      _id
      site
    }
  }
`;
export const UPDATE_JEWELER_PRODUCT = gql`
  mutation UpdateJeweler($_id: ID!, $input: UpdateProductInput!) {
    updateJeweler(_id: $_id, input: $input) {
      _id
      site
    }
  }
`;
export const DELETE_JEWELER_PRODUCT = gql`
  mutation RemoveJeweler($_id: ID!) {
    removeJeweler(_id: $_id) 
  }
`;
export const UPDATE_IMAGES_JEWELER = gql`
mutation UpdateImagesJeweler($_id: ID!, $input: [UpdateImagesInput!]!) {
  updateImagesJeweler(_id: $_id, input: $input) {
    _id
  }
}
`;



export const ADD_FURNITURE_PRODUCT = gql`
  mutation AddFurniture($input: CreateProductInput!) {
    addFurniture(input: $input) {
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
export const DELETE_FURNITURE_PRODUCT = gql`
  mutation RemoveFurniture($_id: ID!) {
    removeFurniture(_id: $_id) 
  }
`;
export const UPDATE_IMAGES_FURNITURE = gql`
mutation UpdateImagesFurniture($_id: ID!, $input: [UpdateImagesInput!]!) {
  updateImagesFurniture(_id: $_id, input: $input) {
    _id
  }
}
`;



export const ADD_GIFT_PRODUCT = gql`
  mutation AddGift($input: CreateProductInput!) {
    addGift(input: $input) {
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
export const DELETE_GIFT_PRODUCT = gql`
  mutation RemoveGift($_id: ID!) {
    removeGift(_id: $_id) 
  }
`;
export const UPDATE_IMAGES_GIFT = gql`
mutation UpdateImagesGift($_id: ID!, $input: [UpdateImagesInput!]!) {
  updateImagesGift(_id: $_id, input: $input) {
    _id
  }
}
`;



