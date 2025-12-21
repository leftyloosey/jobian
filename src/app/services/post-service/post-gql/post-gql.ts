import { gql } from 'apollo-angular';

export const CREATE_POST = gql`
  mutation CreatePostInput($input: CreatePostInput!) {
    createPost(createPostInput: $input) {
      title
      content
    }
  }
`;

export const FIND_ONE_POST = gql`
  query findOne($id: Int!) {
    post(id: $id) {
      title
      content
    }
  }
`;

export const POSTS_IN_COLLECTION = gql`
  query PostsInCollection($collectionId: Int!) {
    postsInCollection(collectionId: $collectionId) {
      title
      content
      id
    }
  }
`;

export const UPDATE_POST = gql`
  mutation updatePostInput($input: UpdatePostInput!) {
    updatePost(updatePostInput: $input) {
      title
      content
    }
  }
`;

export const DELETE_POST = gql`
  mutation RemovePost($input: Int!) {
    removePost(id: $input) {
      id
      title
      content
    }
  }
`;
