// import { gql } from 'apollo-angular';

// export const USERS_WITH_POSTS = gql`
//   {
//     posts {
//       title
//       content
//       authorId
//     }
//   }
// `;

// export const CREATE_POST = gql`
//   mutation CreatePostInput($input: CreatePostInput!) {
//     createPost(createPostInput: $input) {
//       title
//       authorId
//       content
//     }
//   }
// `;

// export const FIND_ONE = gql`
//   query findOne($id: Int!) {
//     post(id: $id) {
//       title
//       content
//       author {
//         id
//       }
//     }
//   }
// `;

// export const UPDATE_POST = gql`
//   mutation updatePostInput($input: UpdatePostInput!) {
//     updatePost(updatePostInput: $input) {
//       title
//       authorId
//       content
//     }
//   }
// `;
// export const usersWithPosts = gql`
//   {
//     users {
//       name
//       posts {
//         timestamp
//         title
//         content
//         id
//       }
//     }
//   }
// `;
