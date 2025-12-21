import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** Date custom scalar type */
  Date: { input: any; output: any };
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any };
};

export type Auth = {
  __typename?: 'Auth';
  email?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
};

export type Collection = {
  __typename?: 'Collection';
  author?: Maybe<User>;
  authorId: Scalars['Int']['output'];
  heading?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  posts?: Maybe<Array<Maybe<Post>>>;
  timestamp?: Maybe<Scalars['Date']['output']>;
  title: Scalars['String']['output'];
};

export type CreateAuthInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCollectionInput = {
  authorId?: InputMaybe<Scalars['Int']['input']>;
  heading?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePostInput = {
  collectionId?: InputMaybe<Scalars['Int']['input']>;
  content?: InputMaybe<Scalars['JSON']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAuth: Token;
  createCollection: Collection;
  createPost: Post;
  createUser: User;
  removeAuth?: Maybe<Auth>;
  removeCollection?: Maybe<Collection>;
  removePost?: Maybe<Post>;
  removeUser?: Maybe<User>;
  updateAuth: Auth;
  updateCollection: Collection;
  updatePost: Post;
  updateUser: User;
};

export type MutationCreateAuthArgs = {
  createAuthInput: CreateAuthInput;
};

export type MutationCreateCollectionArgs = {
  createCollectionInput: CreateCollectionInput;
};

export type MutationCreatePostArgs = {
  createPostInput: CreatePostInput;
};

export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};

export type MutationRemoveAuthArgs = {
  id: Scalars['Int']['input'];
};

export type MutationRemoveCollectionArgs = {
  id: Scalars['Int']['input'];
};

export type MutationRemovePostArgs = {
  id: Scalars['Int']['input'];
};

export type MutationRemoveUserArgs = {
  id: Scalars['Int']['input'];
};

export type MutationUpdateAuthArgs = {
  updateAuthInput: UpdateAuthInput;
};

export type MutationUpdateCollectionArgs = {
  updateCollectionInput: UpdateCollectionInput;
};

export type MutationUpdatePostArgs = {
  updatePostInput: UpdatePostInput;
};

export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Post = {
  __typename?: 'Post';
  collection?: Maybe<Collection>;
  collectionId?: Maybe<Scalars['Int']['output']>;
  content?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['Int']['output'];
  published?: Maybe<Scalars['Boolean']['output']>;
  timestamp?: Maybe<Scalars['Date']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  auth: Token;
  collectionByUser: Array<Maybe<Collection>>;
  collectionWithPosts?: Maybe<Collection>;
  collections: Array<Maybe<Collection>>;
  collectionsWithPosts: Array<Maybe<Collection>>;
  post?: Maybe<Post>;
  posts: Array<Maybe<Post>>;
  postsInCollection: Array<Maybe<Post>>;
  user?: Maybe<User>;
  users: Array<Maybe<User>>;
};

export type QueryAuthArgs = {
  createAuthInput: CreateAuthInput;
};

export type QueryCollectionByUserArgs = {
  authorId: Scalars['Int']['input'];
};

export type QueryCollectionWithPostsArgs = {
  id: Scalars['Int']['input'];
};

export type QueryPostArgs = {
  id: Scalars['Int']['input'];
};

export type QueryPostsInCollectionArgs = {
  collectionId: Scalars['Int']['input'];
};

export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};

export type Token = {
  __typename?: 'Token';
  token?: Maybe<Scalars['String']['output']>;
};

export type UpdateAuthInput = {
  id: Scalars['Int']['input'];
};

export type UpdateCollectionInput = {
  heading?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePostInput = {
  content?: InputMaybe<Scalars['JSON']['input']>;
  id: Scalars['Int']['input'];
  modified?: InputMaybe<Scalars['Date']['input']>;
  published?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  id: Scalars['Int']['input'];
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  password?: Maybe<Scalars['String']['output']>;
  posts?: Maybe<Array<Maybe<Post>>>;
};

export type CollectionByUserQueryVariables = Exact<{
  authorId: Scalars['Int']['input'];
}>;

export type CollectionByUserQuery = {
  __typename?: 'Query';
  collectionByUser: Array<{
    __typename?: 'Collection';
    title: string;
    heading?: string | null;
    id: number;
    posts?: Array<{
      __typename?: 'Post';
      id: number;
      title?: string | null;
      content?: any | null;
    } | null> | null;
  } | null>;
};

export type FindOneWithPostsQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;

export type FindOneWithPostsQuery = {
  __typename?: 'Query';
  collectionWithPosts?: {
    __typename?: 'Collection';
    id: number;
    title: string;
    heading?: string | null;
    posts?: Array<{
      __typename?: 'Post';
      id: number;
      title?: string | null;
      content?: any | null;
    } | null> | null;
  } | null;
};

export type CreateCollectionInputMutationVariables = Exact<{
  input: CreateCollectionInput;
}>;

export type CreateCollectionInputMutation = {
  __typename?: 'Mutation';
  createCollection: {
    __typename?: 'Collection';
    authorId: number;
    title: string;
    heading?: string | null;
  };
};

export type UpdateCollectionInputMutationVariables = Exact<{
  input: UpdateCollectionInput;
}>;

export type UpdateCollectionInputMutation = {
  __typename?: 'Mutation';
  updateCollection: {
    __typename?: 'Collection';
    title: string;
    heading?: string | null;
  };
};

export type RemoveCollectionMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;

export type RemoveCollectionMutation = {
  __typename?: 'Mutation';
  removeCollection?: {
    __typename?: 'Collection';
    id: number;
    title: string;
    heading?: string | null;
  } | null;
};

export type CreateAuthInputMutationVariables = Exact<{
  input: CreateAuthInput;
}>;

export type CreateAuthInputMutation = {
  __typename?: 'Mutation';
  createAuth: { __typename?: 'Token'; token?: string | null };
};

export type CreateUserInputMutationVariables = Exact<{
  input: CreateUserInput;
}>;

export type CreateUserInputMutation = {
  __typename?: 'Mutation';
  createUser: {
    __typename?: 'User';
    name: string;
    email?: string | null;
    password?: string | null;
  };
};

export type CreatePostInputMutationVariables = Exact<{
  input: CreatePostInput;
}>;

export type CreatePostInputMutation = {
  __typename?: 'Mutation';
  createPost: {
    __typename?: 'Post';
    title?: string | null;
    content?: any | null;
  };
};

export type FindOneQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;

export type FindOneQuery = {
  __typename?: 'Query';
  post?: {
    __typename?: 'Post';
    title?: string | null;
    content?: any | null;
  } | null;
};

export type PostsInCollectionQueryVariables = Exact<{
  collectionId: Scalars['Int']['input'];
}>;

export type PostsInCollectionQuery = {
  __typename?: 'Query';
  postsInCollection: Array<{
    __typename?: 'Post';
    title?: string | null;
    content?: any | null;
    id: number;
  } | null>;
};

export type UpdatePostInputMutationVariables = Exact<{
  input: UpdatePostInput;
}>;

export type UpdatePostInputMutation = {
  __typename?: 'Mutation';
  updatePost: {
    __typename?: 'Post';
    title?: string | null;
    content?: any | null;
  };
};

export type RemovePostMutationVariables = Exact<{
  input: Scalars['Int']['input'];
}>;

export type RemovePostMutation = {
  __typename?: 'Mutation';
  removePost?: {
    __typename?: 'Post';
    id: number;
    title?: string | null;
    content?: any | null;
  } | null;
};

export const CollectionByUserDocument = gql`
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

@Injectable({
  providedIn: 'root',
})
export class CollectionByUserGQL extends Apollo.Query<
  CollectionByUserQuery,
  CollectionByUserQueryVariables
> {
  document = CollectionByUserDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const FindOneWithPostsDocument = gql`
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

@Injectable({
  providedIn: 'root',
})
export class FindOneWithPostsGQL extends Apollo.Query<
  FindOneWithPostsQuery,
  FindOneWithPostsQueryVariables
> {
  document = FindOneWithPostsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const CreateCollectionInputDocument = gql`
  mutation CreateCollectionInput($input: CreateCollectionInput!) {
    createCollection(createCollectionInput: $input) {
      authorId
      title
      heading
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CreateCollectionInputGQL extends Apollo.Mutation<
  CreateCollectionInputMutation,
  CreateCollectionInputMutationVariables
> {
  document = CreateCollectionInputDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const UpdateCollectionInputDocument = gql`
  mutation UpdateCollectionInput($input: UpdateCollectionInput!) {
    updateCollection(updateCollectionInput: $input) {
      title
      heading
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class UpdateCollectionInputGQL extends Apollo.Mutation<
  UpdateCollectionInputMutation,
  UpdateCollectionInputMutationVariables
> {
  document = UpdateCollectionInputDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const RemoveCollectionDocument = gql`
  mutation RemoveCollection($id: Int!) {
    removeCollection(id: $id) {
      id
      title
      heading
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class RemoveCollectionGQL extends Apollo.Mutation<
  RemoveCollectionMutation,
  RemoveCollectionMutationVariables
> {
  document = RemoveCollectionDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const CreateAuthInputDocument = gql`
  mutation CreateAuthInput($input: CreateAuthInput!) {
    createAuth(createAuthInput: $input) {
      token
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CreateAuthInputGQL extends Apollo.Mutation<
  CreateAuthInputMutation,
  CreateAuthInputMutationVariables
> {
  document = CreateAuthInputDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const CreateUserInputDocument = gql`
  mutation CreateUserInput($input: CreateUserInput!) {
    createUser(createUserInput: $input) {
      name
      email
      password
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CreateUserInputGQL extends Apollo.Mutation<
  CreateUserInputMutation,
  CreateUserInputMutationVariables
> {
  document = CreateUserInputDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const CreatePostInputDocument = gql`
  mutation CreatePostInput($input: CreatePostInput!) {
    createPost(createPostInput: $input) {
      title
      content
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CreatePostInputGQL extends Apollo.Mutation<
  CreatePostInputMutation,
  CreatePostInputMutationVariables
> {
  document = CreatePostInputDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const FindOneDocument = gql`
  query findOne($id: Int!) {
    post(id: $id) {
      title
      content
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class FindOneGQL extends Apollo.Query<
  FindOneQuery,
  FindOneQueryVariables
> {
  document = FindOneDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const PostsInCollectionDocument = gql`
  query PostsInCollection($collectionId: Int!) {
    postsInCollection(collectionId: $collectionId) {
      title
      content
      id
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class PostsInCollectionGQL extends Apollo.Query<
  PostsInCollectionQuery,
  PostsInCollectionQueryVariables
> {
  document = PostsInCollectionDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const UpdatePostInputDocument = gql`
  mutation updatePostInput($input: UpdatePostInput!) {
    updatePost(updatePostInput: $input) {
      title
      content
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class UpdatePostInputGQL extends Apollo.Mutation<
  UpdatePostInputMutation,
  UpdatePostInputMutationVariables
> {
  document = UpdatePostInputDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const RemovePostDocument = gql`
  mutation RemovePost($input: Int!) {
    removePost(id: $input) {
      id
      title
      content
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class RemovePostGQL extends Apollo.Mutation<
  RemovePostMutation,
  RemovePostMutationVariables
> {
  document = RemovePostDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
