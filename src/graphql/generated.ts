import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Date custom scalar type */
  Date: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type Auth = {
  __typename?: 'Auth';
  email?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
};

export type Collection = {
  __typename?: 'Collection';
  author: User;
  authorId: Scalars['Int']['output'];
  headerImageString: Scalars['String']['output'];
  heading: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  posts?: Maybe<Array<Maybe<Post>>>;
  timestamp: Scalars['Date']['output'];
  title: Scalars['String']['output'];
  urlTitle: Scalars['String']['output'];
};

export type CreateAuthInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCollectionInput = {
  authorId: Scalars['Int']['input'];
  headerImageString: Scalars['String']['input'];
  heading: Scalars['String']['input'];
  title: Scalars['String']['input'];
  urlTitle: Scalars['String']['input'];
};

export type CreateNavHeadingInput = {
  authorId: Scalars['Int']['input'];
  blogTitle: Scalars['String']['input'];
};

export type CreateNavMemberInput = {
  collectionId: Scalars['Int']['input'];
  content: Scalars['JSON']['input'];
  timestamp?: InputMaybe<Scalars['Date']['input']>;
  title: Scalars['String']['input'];
};

export type CreatePostInput = {
  collectionId?: InputMaybe<Scalars['Int']['input']>;
  content?: InputMaybe<Scalars['JSON']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  owner: Scalars['Boolean']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAuth: Token;
  createCollection: Collection;
  createNavHeading: NavHeading;
  createNavMember: NavMember;
  createPost: Post;
  createUser: User;
  removeAuth?: Maybe<Auth>;
  removeCollection?: Maybe<Collection>;
  removeNavHeading?: Maybe<NavHeading>;
  removeNavMember?: Maybe<NavMember>;
  removePost?: Maybe<Post>;
  removeUser?: Maybe<User>;
  updateAuth: Auth;
  updateCollection: Collection;
  updateNavHeading: NavHeading;
  updateNavMember: NavMember;
  updatePost: Post;
  updateUser: User;
  upsertCollection: Collection;
  upsertNavHeading: NavHeading;
};


export type MutationCreateAuthArgs = {
  createAuthInput: CreateAuthInput;
};


export type MutationCreateCollectionArgs = {
  createCollectionInput: CreateCollectionInput;
};


export type MutationCreateNavHeadingArgs = {
  createNavHeadingInput: CreateNavHeadingInput;
};


export type MutationCreateNavMemberArgs = {
  createNavMemberInput: CreateNavMemberInput;
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


export type MutationRemoveNavHeadingArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveNavMemberArgs = {
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


export type MutationUpdateNavHeadingArgs = {
  updateNavHeadingInput: UpdateNavHeadingInput;
};


export type MutationUpdateNavMemberArgs = {
  updateNavMemberInput: UpdateNavMemberInput;
};


export type MutationUpdatePostArgs = {
  updatePostInput: UpdatePostInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};


export type MutationUpsertCollectionArgs = {
  updateCollectionInput: UpdateCollectionInput;
};


export type MutationUpsertNavHeadingArgs = {
  updateNavHeadingInput: UpdateNavHeadingInput;
};

export type NavHeading = {
  __typename?: 'NavHeading';
  author: User;
  authorId: Scalars['Int']['output'];
  blogTitle: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  navRow: Array<Maybe<NavMember>>;
};

export type NavMember = {
  __typename?: 'NavMember';
  collectionId: Scalars['Int']['output'];
  content: Scalars['JSON']['output'];
  id: Scalars['Int']['output'];
  navHeading: NavHeading;
  timestamp?: Maybe<Scalars['Date']['output']>;
  title: Scalars['String']['output'];
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
  collectionsOfOwner: User;
  collectionsWithPosts: Array<Maybe<Collection>>;
  navHeading?: Maybe<NavHeading>;
  navHeadings?: Maybe<Array<Maybe<NavHeading>>>;
  navMember?: Maybe<NavMember>;
  navMembers?: Maybe<Array<Maybe<NavMember>>>;
  navMembersInHeading?: Maybe<Array<Maybe<NavMember>>>;
  post?: Maybe<Post>;
  posts: Array<Maybe<Post>>;
  postsByCollectionTitle: Array<Maybe<Post>>;
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


export type QueryNavHeadingArgs = {
  id: Scalars['Int']['input'];
};


export type QueryNavMemberArgs = {
  id: Scalars['Int']['input'];
};


export type QueryNavMembersInHeadingArgs = {
  collectionId: Scalars['Int']['input'];
};


export type QueryPostArgs = {
  id: Scalars['Int']['input'];
};


export type QueryPostsByCollectionTitleArgs = {
  collectionTitle: Scalars['String']['input'];
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
  authorId: Scalars['Int']['input'];
  headerImageString: Scalars['String']['input'];
  heading: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  title: Scalars['String']['input'];
  urlTitle: Scalars['String']['input'];
};

export type UpdateNavHeadingInput = {
  authorId: Scalars['Int']['input'];
  blogTitle: Scalars['String']['input'];
  id: Scalars['Int']['input'];
};

export type UpdateNavMemberInput = {
  content: Scalars['JSON']['input'];
  id: Scalars['Int']['input'];
  title: Scalars['String']['input'];
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
  collections?: Maybe<Array<Maybe<Collection>>>;
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  owner: Scalars['Boolean']['output'];
  password: Scalars['String']['output'];
  posts?: Maybe<Array<Maybe<Post>>>;
};

export type CollectionByUserQueryVariables = Exact<{
  authorId: Scalars['Int']['input'];
}>;


export type CollectionByUserQuery = { __typename?: 'Query', collectionByUser: Array<{ __typename?: 'Collection', title: string, urlTitle: string, heading: string, headerImageString: string, id: number, posts?: Array<{ __typename?: 'Post', id: number, title?: string | null, content?: any | null } | null> | null } | null> };

export type FindOneWithPostsQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type FindOneWithPostsQuery = { __typename?: 'Query', collectionWithPosts?: { __typename?: 'Collection', id: number, title: string, heading: string, posts?: Array<{ __typename?: 'Post', id: number, title?: string | null, content?: any | null, timestamp?: any | null } | null> | null } | null };

export type CreateCollectionInputMutationVariables = Exact<{
  input: CreateCollectionInput;
}>;


export type CreateCollectionInputMutation = { __typename?: 'Mutation', createCollection: { __typename?: 'Collection', authorId: number, title: string, urlTitle: string, heading: string, headerImageString: string } };

export type UpsertCollectionInputMutationVariables = Exact<{
  input: UpdateCollectionInput;
}>;


export type UpsertCollectionInputMutation = { __typename?: 'Mutation', upsertCollection: { __typename?: 'Collection', id: number, authorId: number, title: string, urlTitle: string, headerImageString: string, heading: string } };

export type UpdateCollectionInputMutationVariables = Exact<{
  input: UpdateCollectionInput;
}>;


export type UpdateCollectionInputMutation = { __typename?: 'Mutation', updateCollection: { __typename?: 'Collection', title: string, urlTitle: string, heading: string, headerImageString: string } };

export type RemoveCollectionMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type RemoveCollectionMutation = { __typename?: 'Mutation', removeCollection?: { __typename?: 'Collection', id: number, title: string, heading: string } | null };

export type CreateAuthInputMutationVariables = Exact<{
  input: CreateAuthInput;
}>;


export type CreateAuthInputMutation = { __typename?: 'Mutation', createAuth: { __typename?: 'Token', token?: string | null } };

export type CreateUserInputMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserInputMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', email: string, password: string, owner: boolean } };

export type AllNavHeadingsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllNavHeadingsQuery = { __typename?: 'Query', navHeadings?: Array<{ __typename?: 'NavHeading', id: number, blogTitle: string, authorId: number } | null> | null };

export type CreateNavHeadingMutationVariables = Exact<{
  input: CreateNavHeadingInput;
}>;


export type CreateNavHeadingMutation = { __typename?: 'Mutation', createNavHeading: { __typename?: 'NavHeading', blogTitle: string, authorId: number, id: number } };

export type UpsertNavHeadingMutationVariables = Exact<{
  input: UpdateNavHeadingInput;
}>;


export type UpsertNavHeadingMutation = { __typename?: 'Mutation', upsertNavHeading: { __typename?: 'NavHeading', blogTitle: string, authorId: number, id: number } };

export type UpdateNavHeadingMutationVariables = Exact<{
  input: UpdateNavHeadingInput;
}>;


export type UpdateNavHeadingMutation = { __typename?: 'Mutation', updateNavHeading: { __typename?: 'NavHeading', blogTitle: string, id: number } };

export type RemoveNavHeadingMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type RemoveNavHeadingMutation = { __typename?: 'Mutation', removeNavHeading?: { __typename?: 'NavHeading', id: number, blogTitle: string } | null };

export type AllNavMembersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllNavMembersQuery = { __typename?: 'Query', navMembers?: Array<{ __typename?: 'NavMember', id: number, title: string, content: any } | null> | null };

export type FindOneNavQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type FindOneNavQuery = { __typename?: 'Query', navMember?: { __typename?: 'NavMember', title: string, content: any, collectionId: number } | null };

export type NavMembersByHeadingQueryVariables = Exact<{
  collectionId: Scalars['Int']['input'];
}>;


export type NavMembersByHeadingQuery = { __typename?: 'Query', navMembersInHeading?: Array<{ __typename?: 'NavMember', title: string, timestamp?: any | null, id: number } | null> | null };

export type NavMembersByHeadingLengthQueryVariables = Exact<{
  collectionId: Scalars['Int']['input'];
}>;


export type NavMembersByHeadingLengthQuery = { __typename?: 'Query', navMembersInHeading?: Array<{ __typename?: 'NavMember', id: number } | null> | null };

export type CreateNavMemberMutationVariables = Exact<{
  input: CreateNavMemberInput;
}>;


export type CreateNavMemberMutation = { __typename?: 'Mutation', createNavMember: { __typename?: 'NavMember', id: number, collectionId: number, title: string, content: any } };

export type UpdateNavMemberMutationVariables = Exact<{
  input: UpdateNavMemberInput;
}>;


export type UpdateNavMemberMutation = { __typename?: 'Mutation', updateNavMember: { __typename?: 'NavMember', id: number, title: string, content: any } };

export type RemoveNavMemberMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type RemoveNavMemberMutation = { __typename?: 'Mutation', removeNavMember?: { __typename?: 'NavMember', id: number, title: string, content: any } | null };

export type CreatePostInputMutationVariables = Exact<{
  input: CreatePostInput;
}>;


export type CreatePostInputMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', title?: string | null, content?: any | null } };

export type FindOneQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type FindOneQuery = { __typename?: 'Query', post?: { __typename?: 'Post', title?: string | null, content?: any | null, collectionId?: number | null } | null };

export type PostsInCollectionQueryVariables = Exact<{
  collectionId: Scalars['Int']['input'];
}>;


export type PostsInCollectionQuery = { __typename?: 'Query', postsInCollection: Array<{ __typename?: 'Post', title?: string | null, content?: any | null, id: number } | null> };

export type PostsByCollectionTitleQueryVariables = Exact<{
  collectionTitle: Scalars['String']['input'];
}>;


export type PostsByCollectionTitleQuery = { __typename?: 'Query', postsByCollectionTitle: Array<{ __typename?: 'Post', title?: string | null, content?: any | null, id: number, collectionId?: number | null, timestamp?: any | null } | null> };

export type UpdatePostInputMutationVariables = Exact<{
  input: UpdatePostInput;
}>;


export type UpdatePostInputMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'Post', title?: string | null, content?: any | null } };

export type RemovePostMutationVariables = Exact<{
  input: Scalars['Int']['input'];
}>;


export type RemovePostMutation = { __typename?: 'Mutation', removePost?: { __typename?: 'Post', id: number, title?: string | null, content?: any | null } | null };

export type CollectionsOfOwnerQueryVariables = Exact<{ [key: string]: never; }>;


export type CollectionsOfOwnerQuery = { __typename?: 'Query', collectionsOfOwner: { __typename?: 'User', collections?: Array<{ __typename?: 'Collection', id: number, heading: string, title: string, urlTitle: string, headerImageString: string, timestamp: any } | null> | null } };

export type CollectionsOfOwnerTitleQueryVariables = Exact<{ [key: string]: never; }>;


export type CollectionsOfOwnerTitleQuery = { __typename?: 'Query', collectionsOfOwner: { __typename?: 'User', collections?: Array<{ __typename?: 'Collection', id: number, title: string, urlTitle: string } | null> | null } };

export const CollectionByUserDocument = gql`
    query CollectionByUser($authorId: Int!) {
  collectionByUser(authorId: $authorId) {
    title
    urlTitle
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

  @Injectable({
    providedIn: 'root'
  })
  export class CollectionByUserGQL extends Apollo.Query<CollectionByUserQuery, CollectionByUserQueryVariables> {
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
      timestamp
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FindOneWithPostsGQL extends Apollo.Query<FindOneWithPostsQuery, FindOneWithPostsQueryVariables> {
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
    urlTitle
    heading
    headerImageString
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateCollectionInputGQL extends Apollo.Mutation<CreateCollectionInputMutation, CreateCollectionInputMutationVariables> {
    document = CreateCollectionInputDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpsertCollectionInputDocument = gql`
    mutation UpsertCollectionInput($input: UpdateCollectionInput!) {
  upsertCollection(updateCollectionInput: $input) {
    id
    authorId
    title
    urlTitle
    headerImageString
    heading
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpsertCollectionInputGQL extends Apollo.Mutation<UpsertCollectionInputMutation, UpsertCollectionInputMutationVariables> {
    document = UpsertCollectionInputDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateCollectionInputDocument = gql`
    mutation UpdateCollectionInput($input: UpdateCollectionInput!) {
  updateCollection(updateCollectionInput: $input) {
    title
    urlTitle
    heading
    headerImageString
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateCollectionInputGQL extends Apollo.Mutation<UpdateCollectionInputMutation, UpdateCollectionInputMutationVariables> {
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
    providedIn: 'root'
  })
  export class RemoveCollectionGQL extends Apollo.Mutation<RemoveCollectionMutation, RemoveCollectionMutationVariables> {
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
    providedIn: 'root'
  })
  export class CreateAuthInputGQL extends Apollo.Mutation<CreateAuthInputMutation, CreateAuthInputMutationVariables> {
    document = CreateAuthInputDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateUserInputDocument = gql`
    mutation CreateUserInput($input: CreateUserInput!) {
  createUser(createUserInput: $input) {
    email
    password
    owner
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateUserInputGQL extends Apollo.Mutation<CreateUserInputMutation, CreateUserInputMutationVariables> {
    document = CreateUserInputDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AllNavHeadingsDocument = gql`
    query AllNavHeadings {
  navHeadings {
    id
    blogTitle
    authorId
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AllNavHeadingsGQL extends Apollo.Query<AllNavHeadingsQuery, AllNavHeadingsQueryVariables> {
    document = AllNavHeadingsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateNavHeadingDocument = gql`
    mutation CreateNavHeading($input: CreateNavHeadingInput!) {
  createNavHeading(createNavHeadingInput: $input) {
    blogTitle
    authorId
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateNavHeadingGQL extends Apollo.Mutation<CreateNavHeadingMutation, CreateNavHeadingMutationVariables> {
    document = CreateNavHeadingDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpsertNavHeadingDocument = gql`
    mutation UpsertNavHeading($input: UpdateNavHeadingInput!) {
  upsertNavHeading(updateNavHeadingInput: $input) {
    blogTitle
    authorId
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpsertNavHeadingGQL extends Apollo.Mutation<UpsertNavHeadingMutation, UpsertNavHeadingMutationVariables> {
    document = UpsertNavHeadingDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateNavHeadingDocument = gql`
    mutation UpdateNavHeading($input: UpdateNavHeadingInput!) {
  updateNavHeading(updateNavHeadingInput: $input) {
    blogTitle
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateNavHeadingGQL extends Apollo.Mutation<UpdateNavHeadingMutation, UpdateNavHeadingMutationVariables> {
    document = UpdateNavHeadingDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RemoveNavHeadingDocument = gql`
    mutation RemoveNavHeading($id: Int!) {
  removeNavHeading(id: $id) {
    id
    blogTitle
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RemoveNavHeadingGQL extends Apollo.Mutation<RemoveNavHeadingMutation, RemoveNavHeadingMutationVariables> {
    document = RemoveNavHeadingDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AllNavMembersDocument = gql`
    query AllNavMembers {
  navMembers {
    id
    title
    content
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AllNavMembersGQL extends Apollo.Query<AllNavMembersQuery, AllNavMembersQueryVariables> {
    document = AllNavMembersDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindOneNavDocument = gql`
    query findOneNav($id: Int!) {
  navMember(id: $id) {
    title
    content
    collectionId
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FindOneNavGQL extends Apollo.Query<FindOneNavQuery, FindOneNavQueryVariables> {
    document = FindOneNavDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const NavMembersByHeadingDocument = gql`
    query NavMembersByHeading($collectionId: Int!) {
  navMembersInHeading(collectionId: $collectionId) {
    title
    timestamp
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class NavMembersByHeadingGQL extends Apollo.Query<NavMembersByHeadingQuery, NavMembersByHeadingQueryVariables> {
    document = NavMembersByHeadingDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const NavMembersByHeadingLengthDocument = gql`
    query NavMembersByHeadingLength($collectionId: Int!) {
  navMembersInHeading(collectionId: $collectionId) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class NavMembersByHeadingLengthGQL extends Apollo.Query<NavMembersByHeadingLengthQuery, NavMembersByHeadingLengthQueryVariables> {
    document = NavMembersByHeadingLengthDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateNavMemberDocument = gql`
    mutation CreateNavMember($input: CreateNavMemberInput!) {
  createNavMember(createNavMemberInput: $input) {
    id
    collectionId
    title
    content
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateNavMemberGQL extends Apollo.Mutation<CreateNavMemberMutation, CreateNavMemberMutationVariables> {
    document = CreateNavMemberDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateNavMemberDocument = gql`
    mutation UpdateNavMember($input: UpdateNavMemberInput!) {
  updateNavMember(updateNavMemberInput: $input) {
    id
    title
    content
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateNavMemberGQL extends Apollo.Mutation<UpdateNavMemberMutation, UpdateNavMemberMutationVariables> {
    document = UpdateNavMemberDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RemoveNavMemberDocument = gql`
    mutation RemoveNavMember($id: Int!) {
  removeNavMember(id: $id) {
    id
    title
    content
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RemoveNavMemberGQL extends Apollo.Mutation<RemoveNavMemberMutation, RemoveNavMemberMutationVariables> {
    document = RemoveNavMemberDocument;
    
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
    providedIn: 'root'
  })
  export class CreatePostInputGQL extends Apollo.Mutation<CreatePostInputMutation, CreatePostInputMutationVariables> {
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
    collectionId
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FindOneGQL extends Apollo.Query<FindOneQuery, FindOneQueryVariables> {
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
    providedIn: 'root'
  })
  export class PostsInCollectionGQL extends Apollo.Query<PostsInCollectionQuery, PostsInCollectionQueryVariables> {
    document = PostsInCollectionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const PostsByCollectionTitleDocument = gql`
    query PostsByCollectionTitle($collectionTitle: String!) {
  postsByCollectionTitle(collectionTitle: $collectionTitle) {
    title
    content
    id
    collectionId
    timestamp
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PostsByCollectionTitleGQL extends Apollo.Query<PostsByCollectionTitleQuery, PostsByCollectionTitleQueryVariables> {
    document = PostsByCollectionTitleDocument;
    
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
    providedIn: 'root'
  })
  export class UpdatePostInputGQL extends Apollo.Mutation<UpdatePostInputMutation, UpdatePostInputMutationVariables> {
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
    providedIn: 'root'
  })
  export class RemovePostGQL extends Apollo.Mutation<RemovePostMutation, RemovePostMutationVariables> {
    document = RemovePostDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CollectionsOfOwnerDocument = gql`
    query CollectionsOfOwner {
  collectionsOfOwner {
    collections {
      id
      heading
      title
      urlTitle
      headerImageString
      timestamp
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CollectionsOfOwnerGQL extends Apollo.Query<CollectionsOfOwnerQuery, CollectionsOfOwnerQueryVariables> {
    document = CollectionsOfOwnerDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CollectionsOfOwnerTitleDocument = gql`
    query CollectionsOfOwnerTitle {
  collectionsOfOwner {
    collections {
      id
      title
      urlTitle
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CollectionsOfOwnerTitleGQL extends Apollo.Query<CollectionsOfOwnerTitleQuery, CollectionsOfOwnerTitleQueryVariables> {
    document = CollectionsOfOwnerTitleDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }