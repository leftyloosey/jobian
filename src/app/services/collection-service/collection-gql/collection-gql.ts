import { gql } from 'apollo-angular';

export const COLLECTIONS_BY_USER = gql`
  query CollectionByUser($authorId: Int!) {
    collectionByUser(authorId: $authorId) {
      title
      heading
      id
      posts {
        id
        title
        content
      }
    }
  }
`;

export const COLLECTION_WITH_POSTS = gql`
  query FindOneWithPosts($id: Int!) {
    collectionWithPosts(id: $id) {
      id
      title
      heading
      posts {
        id
        title
        content
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
