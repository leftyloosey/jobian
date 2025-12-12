import { gql } from 'apollo-angular';

export const MINISTRIES_WITH_POSTS = gql`
  {
    ministriesWithPosts {
      id
      title
      heading
      timestamp
      posts {
        title
        id
      }
    }
  }
`;

export const CREATE_MINISTRY = gql`
  mutation CreateMinistryInput($input: CreateMinistryInput!) {
    createMinistry(createMinistryInput: $input) {
      authorId
      title
      heading
    }
  }
`;

export const UPDATE_MINISTRY = gql`
  mutation UpdateMinistryInput($input: UpdateMinistryInput!) {
    updateMinistry(updateMinistryInput: $input) {
      title
      heading
    }
  }
`;

export const DELETE_MINISTRY = gql`
  mutation RemoveMinistry($id: Int!) {
    removeMinistry(id: $id) {
      id
      title
      heading
    }
  }
`;
