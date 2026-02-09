import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { NewPost } from '../../utils/interfaces/NewPost';
import { UpdatePost } from '../../utils/interfaces/UpdatePost';
import { map, Observable } from 'rxjs';
import {
  FindOneGQL,
  PostsInCollectionGQL,
  CreatePostInputGQL,
  UpdatePostInputGQL,
  RemovePostGQL,
  PostsInCollectionQuery,
  FindOneWithPostsDocument,
} from '../../../graphql/generated';
import { DeepPartial } from '@apollo/client/utilities';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private posts: PostsInCollectionGQL,
    private findOne: FindOneGQL,
    private createPost: CreatePostInputGQL,
    private updatePost: UpdatePostInputGQL,
    private removePost: RemovePostGQL,
  ) {}

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

  public watchOnePost(id: number) {
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
