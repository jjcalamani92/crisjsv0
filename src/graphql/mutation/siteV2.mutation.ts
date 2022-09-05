import {  gql } from 'graphql-request'

export const ADD_SITE = gql`
  mutation AddSiteV2($input: CreateSiteV2!) {
    addSiteV2(input: $input) {
			_id
    }
  }
`;
export const UPDATE_SITE = gql`
  mutation UpdateSite($_id:ID!, $input: UpdateSiteInput!) {
    updateSite(_id:$_id, input: $input) {
			_id
    }
  }
`;
export const DELETE_SITE = gql`
  mutation DeleteSiteV2($_id: ID!) {
    deleteSiteV2(_id: $_id)
  }
`;

export const ADD_CHILDREN_0 = gql`
  mutation AddChildren0V2($_id:ID!, $input: AddChildrenV2!) {
    addChildren0V2(_id:$_id, input: $input) {
			_id
    }
  }
`;
export const ADD_CHILDREN_1 = gql`
  mutation AddChildren1V2($_id:ID!, $input: AddChildrenV2!) {
    addChildren1V2(_id:$_id, input: $input) {
			_id
    }
  }
`;
export const ADD_CHILDREN_2 = gql`
  mutation AddChildren2V2($_id:ID!, $input: AddChildrenV2!) {
    addChildren2V2(_id:$_id, input: $input) {
			_id
    }
  }
`;
export const ADD_CHILDREN_3 = gql`
  mutation AddChildren3V2($_id:ID!, $input: AddChildrenV2!) {
    addChildren3V2(_id:$_id, input: $input) {
			_id
    }
  }
`;
export const ADD_CHILDREN_4 = gql`
  mutation AddChildren4V2($_id:ID!, $input: AddChildrenV2!) {
    addChildren4V2(_id:$_id, input: $input) {
			_id
    }
  }
`;
export const ADD_CHILDREN_5 = gql`
  mutation AddChildren5V2($_id:ID!, $input: AddChildrenV2!) {
    addChildren5V2(_id:$_id, input: $input) {
			_id
    }
  }
`;
export const UPDATE_CHILDREN_0 = gql`
  mutation UpdateChildren0V2($_id:ID!, $input: UpdateChildrenV2!) {
    updateChildren0V2(_id:$_id, input: $input) {
			_id
    }
  }
`;
export const UPDATE_CHILDREN_1 = gql`
  mutation UpdateChildren1V2($_id:ID!, $input: UpdateChildrenV2!) {
    updateChildren1V2(_id:$_id, input: $input) {
			_id
    }
  }
`;
export const UPDATE_CHILDREN_2 = gql`
  mutation UpdateChildren2V2($_id:ID!, $input: UpdateChildrenV2!) {
    updateChildren2V2(_id:$_id, input: $input) {
			_id
    }
  }
`;
export const UPDATE_CHILDREN_3 = gql`
  mutation UpdateChildren3V2($_id:ID!, $input: UpdateChildrenV2!) {
    updateChildren3V2(_id:$_id, input: $input) {
			_id
    }
  }
`;
export const UPDATE_CHILDREN_4 = gql`
  mutation UpdateChildren4V2($_id:ID!, $input: UpdateChildrenV2!) {
    updateChildren4V2(_id:$_id, input: $input) {
			_id
    }
  }
`;
export const UPDATE_CHILDREN_5 = gql`
  mutation UpdateChildren5V2($_id:ID!, $input: UpdateChildrenV2!) {
    updateChildren5V2(_id:$_id, input: $input) {
			_id
    }
  }
`;
export const DELETE_CHILDREN_0 = gql`
  mutation DeleteChildren0V2($_id: ID!, $input: DeleteChildrenV2!) {
    deleteChildren0V2(_id: $_id, input: $input) {
			_id
    }
  }
`;
export const DELETE_CHILDREN_1 = gql`
  mutation DeleteChildren1V2($_id: ID!, $input: DeleteChildrenV2!) {
    deleteChildren1V2(_id: $_id, input: $input) {
			_id
    }
  }
`;
export const DELETE_CHILDREN_2 = gql`
  mutation DeleteChildren2V2($_id: ID!, $input: DeleteChildrenV2!) {
    deleteChildren2V2(_id: $_id, input: $input) {
			_id
    }
  }
`;
export const DELETE_CHILDREN_3 = gql`
  mutation DeleteChildren3V2($_id: ID!, $input: DeleteChildrenV2!) {
    deleteChildren3V2(_id: $_id, input: $input) {
			_id
    }
  }
`;
export const DELETE_CHILDREN_4 = gql`
  mutation DeleteChildren4V2($_id: ID!, $input: DeleteChildrenV2!) {
    deleteChildren4V2(_id: $_id, input: $input) {
			_id
    }
  }
`;
export const DELETE_CHILDREN_5 = gql`
  mutation DeleteChildren5V2($_id: ID!, $input: DeleteChildrenV2!) {
    deleteChildren5V2(_id: $_id, input: $input) {
			_id
    }
  }
`;

