import { QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Exact, Scalars } from '../../../graphql/generated';
import { NameService } from '../../services/name-service/name-service';
import { NewPost } from './NewPost';
import { UpdatePost } from './UpdatePost';
import { DeepPartial } from '@apollo/client/utilities';
import { Router } from '@angular/router';

export interface PostServiceBase<A, AA, B, BB, C, D, E> {
  collectionId: number;
  postId: number;
  updateMode: boolean;
  name: NameService;
  router: Router;
  posts: AA;
  findOne: BB;
  createPost: C;
  updatePost: D;
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
  deletePost: (postId: number, collectionId: number) => Observable<any>;
  backToMenu(): void;
}
export abstract class PostServiceBaseClass<
  A,
  AA,
  B,
  BB,
  C,
  D,
  E,
> implements PostServiceBase<A, AA, B, BB, C, D, E> {
  abstract name: NameService;
  abstract router: Router;
  abstract collectionId: number;
  abstract postId: number;
  abstract updateMode: boolean;
  abstract posts: AA;
  abstract findOne: BB;
  abstract createPost: C;
  abstract updatePost: D;
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
  abstract backToMenu(): void;
}
