import { Injectable } from '@angular/core';
import { DeepPartial } from '@apollo/client/utilities';
import { QueryRef, Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import {
  PostsInCollectionGQL,
  FindOneGQL,
  CreatePostInputGQL,
  UpdatePostInputGQL,
  RemovePostGQL,
  PostsInCollectionQuery,
  FindOneQuery,
  Exact,
  Scalars,
  FindOneWithPostsDocument,
  CollectionByUserDocument,
  FindOneDocument,
  PostsInCollectionDocument,
} from '../../../graphql/generated';
import { NewPost } from '../../utils/interfaces/NewPost';
import {
  PostServiceBase,
  PostServiceBaseClass,
} from '../../utils/interfaces/PostServiceBase';
import { UpdatePost } from '../../utils/interfaces/UpdatePost';
import { NameService } from '../name-service/name-service';

@Injectable({
  providedIn: 'root',
})
export class PostService extends PostServiceBaseClass {
  override collectionId: number = 0;
  override postId: number = 0;
  override updateMode: boolean = false;
  constructor(
    override name: NameService,
    override posts: PostsInCollectionGQL,
    override findOne: FindOneGQL,
    override createPost: CreatePostInputGQL,
    override updatePost: UpdatePostInputGQL,
    override removePost: RemovePostGQL,
  ) {
    super();
  }

  public postsInCollection(
    collectionId: number,
  ): Observable<
    PostsInCollectionQuery | DeepPartial<PostsInCollectionQuery> | undefined
  > {
    return this.posts
      .watch({
        variables: {
          collectionId,
        },
      })
      .valueChanges.pipe(
        map((result) => {
          return result.data;
        }),
      );
  }

  public watchOnePost(id: number): QueryRef<
    FindOneQuery,
    Exact<{
      id: Scalars['Int']['input'];
    }>
  > {
    return this.findOne.watch({ variables: { id } });
  }

  public newPost(input: NewPost): Observable<Apollo.MutateResult<unknown>> {
    return this.createPost.mutate({
      variables: { input },
      refetchQueries: [
        {
          query: FindOneWithPostsDocument,
          variables: { id: input.collectionId },
        },
        {
          query: CollectionByUserDocument,
          variables: { authorId: this.name.getUser() },
        },
      ],
    });
  }

  public updateOne(
    input2: UpdatePost,
  ): Observable<Apollo.MutateResult<unknown>> {
    const { title, id, content } = input2;
    const input = { title, id, content };
    return this.updatePost.mutate({
      variables: { input },
      refetchQueries: [
        {
          query: FindOneWithPostsDocument,
          variables: { id: input2.collectionId },
        },
        {
          query: FindOneDocument,
          variables: { id },
        },
        {
          query: PostsInCollectionDocument,
          variables: { id: input2.collectionId },
        },
        {
          query: CollectionByUserDocument,
          variables: { authorId: this.name.getUser() },
        },
      ],
    });
  }

  public deletePost(
    postId: number,
    collectionId: number,
  ): Observable<Apollo.MutateResult<unknown>> {
    return this.removePost.mutate({
      variables: { input: postId },
      refetchQueries: [
        {
          query: FindOneWithPostsDocument,
          variables: { id: collectionId },
        },
      ],
    });
  }
}
