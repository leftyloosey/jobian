import { gql } from 'apollo-angular';

export const COLLECTIONS_WITH_POSTS = gql`
  {
    collectionsWithPosts {
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

export const CREATE_COLLECTION = gql`
  mutation CreateCollectionInput($input: CreateCollectionInput!) {
    createCollection(createCollectionInput: $input) {
      authorId
      title
      heading
    }
  }
`;

export const UPDATE_COLLECTION = gql`
  mutation UpdateCollectionInput($input: UpdateCollectionInput!) {
    updateCollection(updateCollectionInput: $input) {
      title
      heading
    }
  }
`;

export const DELETE_COLLECTION = gql`
  mutation RemoveCollection($id: Int!) {
    removeCollection(id: $id) {
      id
      title
      heading
    }
  }
`;
