import { Query, Mutation, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import {
  FindOneQuery,
  Exact,
  Scalars,
  CreatePostInputGQL,
  CreateNavMemberGQL,
  UpdatePostInputGQL,
  UpdateNavMemberGQL,
  RemovePostGQL,
  RemoveNavMemberGQL,
} from '../../../graphql/generated';
import { NameService } from '../../services/name-service/name-service';
import { NewPost } from './NewPost';
import { UpdatePost } from './UpdatePost';
import { DeepPartial } from '@apollo/client/utilities';

export interface PostServiceBase {
  collectionId: number;
  postId: number;
  updateMode: boolean;

  name: NameService;
  posts: Query<any, any>;
  findOne: Query<any, any>;
  // findOne: FindOneGQL;
  createPost: Mutation<any, any>;
  updatePost: Mutation<any, any>;
  removePost: Mutation<any, any>;
  postsInCollection: (collectionId: number) => Observable<any>;
  watchOnePost: (id: number) => QueryRef<
    FindOneQuery,
    Exact<{
      id: Scalars['Int']['input'];
    }>
  >;
  newPost: (input: NewPost) => Observable<any>;
  updateOne: (input2: UpdatePost) => Observable<any>;
  deletePost: (postId: number, collectionId: number) => Observable<any>;
}

export abstract class PostServiceBaseClass implements PostServiceBase {
  abstract name: NameService;
  abstract collectionId: number;
  abstract postId: number;
  abstract updateMode: boolean;
  abstract posts: Query<any, any>;
  abstract findOne: Query<any, any>;
  // abstract findOne: FindOneGQL;
  abstract createPost: CreatePostInputGQL | CreateNavMemberGQL;
  abstract updatePost: UpdatePostInputGQL | UpdateNavMemberGQL;
  abstract removePost: RemovePostGQL | RemoveNavMemberGQL;
  abstract postsInCollection(collectionId: number): Observable<any>;
  abstract watchOnePost(id: number): QueryRef<
    FindOneQuery,
    Exact<{
      id: Scalars['Int']['input'];
    }>
  >;
  abstract newPost(input: NewPost): Observable<any>;
  abstract updateOne(input2: UpdatePost): Observable<any>;
  abstract deletePost(postId: number, collectionId: number): Observable<any>;
}

export interface GostServiceBase<A, AA, B, BB, C, D, E> {
  collectionId: number;
  postId: number;
  updateMode: boolean;

  name: NameService;
  posts: AA;
  findOne: BB;

  // createPost: Mutation<any, any>;
  createPost: C;
  // updatePost: Mutation<any, any>;
  updatePost: D;
  // removePost: Mutation<any, any>;
  removePost: E;
  postsInCollection: (
    collectionId: number,
  ) => Observable<A | DeepPartial<A> | undefined>;

  watchOnePost: (id: number) => QueryRef<
    B,
    Exact<{
      id: Scalars['Int']['input'];
    }>
  >;
  newPost: (input: NewPost) => Observable<any>;
  updateOne: (input2: UpdatePost) => Observable<any>;
  // deletePost: (postId: number, collectionId: number) => Observable<any>;
}
// export type postcol = PostsInCollectionQuery | DeepPartial<PostsInCollectionQuery> | undefined
export abstract class GostServiceBaseClass<
  A,
  AA,
  B,
  BB,
  C,
  D,
  E,
> implements GostServiceBase<A, AA, B, BB, C, D, E> {
  abstract name: NameService;
  abstract collectionId: number;
  abstract postId: number;
  abstract updateMode: boolean;
  abstract posts: AA;
  abstract findOne: BB;
  abstract createPost: C;
  // abstract createPost: CreatePostInputGQL | CreateNavMemberGQL;
  // abstract updatePost: UpdatePostInputGQL | UpdateNavMemberGQL;
  abstract updatePost: D;
  // abstract removePost: RemovePostGQL | RemoveNavMemberGQL;
  abstract removePost: E;
  abstract postsInCollection(
    collectionId: number,
  ): Observable<A | DeepPartial<A> | undefined>;
  abstract watchOnePost(id: number): QueryRef<
    B,
    Exact<{
      id: Scalars['Int']['input'];
    }>
  >;
  abstract newPost(input: NewPost): Observable<any>;
  abstract updateOne(input2: UpdatePost): Observable<any>;
  abstract deletePost(postId: number, collectionId: number): Observable<any>;
}
