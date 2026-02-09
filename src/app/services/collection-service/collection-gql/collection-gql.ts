import { gql } from 'apollo-angular';

export const COLLECTIONS_BY_USER = gql`
  query CollectionByUser($authorId: Int!) {
    collectionByUser(authorId: $authorId) {
      title
      heading
      headerImageString
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
      headerImageString
    }
  }
`;

export const UPSERT_COLLECTION = gql`
  mutation UpsertCollectionInput($input: UpdateCollectionInput!) {
    upsertCollection(updateCollectionInput: $input) {
      id
      authorId
      title
      headerImageString
      heading
    }
  }
`;

export const UPDATE_COLLECTION = gql`
  mutation UpdateCollectionInput($input: UpdateCollectionInput!) {
    updateCollection(updateCollectionInput: $input) {
      title
      heading
      headerImageString
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
