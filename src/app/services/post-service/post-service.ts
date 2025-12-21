import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CREATE_POST, UPDATE_POST, DELETE_POST } from './post-gql/post-gql';
import { Delta, Op } from 'quill';
import { NewPost } from '../../utils/interfaces/NewPost';
import { UpdatePost } from '../../utils/interfaces/UpdatePost';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import {
  FindOneGQL,
  PostsInCollectionGQL,
  CreatePostInputGQL,
  UpdatePostInputGQL,
  RemovePostGQL,
  PostsInCollectionQuery,
} from '../../../graphql/generated';
import { DeepPartial } from '@apollo/client/utilities';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private readonly apollo: Apollo,
    private posts: PostsInCollectionGQL,
    private findOne: FindOneGQL,
    private createPost: CreatePostInputGQL,
    private updatePost: UpdatePostInputGQL,
    private removePost: RemovePostGQL
  ) {}

  public postsInCollection(
    collectionId: number
  ): Observable<
    PostsInCollectionQuery | DeepPartial<PostsInCollectionQuery> | undefined
  > {
    console.log(collectionId);
    return this.posts
      .watch({
        variables: {
          collectionId,
        },
      })
      .valueChanges.pipe(
        map((result) => {
          return result.data;
        })
      );
  }

  public watchOnePost(id: number) {
    return this.findOne.watch({ variables: { id } });
  }

  public newPost(
    title: string,
    content: Op[],
    collectionId: number
  ): Observable<Apollo.MutateResult<unknown>> {
    const input: NewPost = { title, collectionId, content };
    console.log(input);
    return this.createPost.mutate({ variables: { input } });
    // return this.apollo.mutate({
    //   mutation: CREATE_POST,
    //   variables: {
    //     input,
    //   },
    // });
  }

  public updateOne(
    title: string,
    content: Op[],
    id: number
  ): Observable<Apollo.MutateResult<unknown>> {
    const input: UpdatePost = { title, id, content };
    return this.updatePost.mutate({ variables: { input } });
    // return this.apollo.mutate({
    //   mutation: UPDATE_POST,
    //   variables: {
    //     input,
    //   },
    // });
  }

  public deletePost(id: number): Observable<Apollo.MutateResult<unknown>> {
    const input = { id };
    return this.removePost.mutate({ variables: { input: id } });
    // return this.apollo.mutate({
    //   mutation: DELETE_POST,
    //   variables: {
    //     input,
    //   },
    // });
  }
}
