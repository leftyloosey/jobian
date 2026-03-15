import { Injectable } from '@angular/core';
import { PostServiceBaseClass } from '../../utils/interfaces/PostServiceBase';
import {
  CollectionByUserDocument,
  CreatePostInputGQL,
  Exact,
  FindOneDocument,
  FindOneGQL,
  FindOneQuery,
  FindOneWithPostsDocument,
  PostsInCollectionGQL,
  PostsInCollectionQuery,
  RemovePostGQL,
  Scalars,
  UpdatePostInputGQL,
} from '../../../graphql/generated';
import { Apollo, QueryRef } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { NameService } from '../name-service/name-service';
import { DeepPartial } from '@apollo/client/utilities';
import { NewPost } from '../../utils/interfaces/NewPost';
import { UpdatePost } from '../../utils/interfaces/UpdatePost';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostService extends PostServiceBaseClass<
  PostsInCollectionQuery,
  PostsInCollectionGQL,
  FindOneQuery,
  FindOneGQL,
  CreatePostInputGQL,
  UpdatePostInputGQL,
  RemovePostGQL
> {
  override posts: typeof this.postsGql;
  override findOne: typeof this.findOneGql;
  override createPost: typeof this.createGql;
  override updatePost: typeof this.updateGql;
  override removePost: typeof this.removeGql;

  constructor(
    private nam1: NameService,
    private router1: Router,
    private postsGql: PostsInCollectionGQL,
    private findOneGql: FindOneGQL,
    private createGql: CreatePostInputGQL,
    private updateGql: UpdatePostInputGQL,
    private removeGql: RemovePostGQL,
  ) {
    super();
    this.name = nam1;
    this.router = router1;
    this.posts = postsGql;
    this.findOne = findOneGql;
    this.createPost = createGql;
    this.updatePost = updateGql;
    this.removePost = removeGql;
  }
  override name: NameService;
  override router: Router;
  override collectionId: number = 0;
  override postId: number = 0;
  override updateMode: boolean = false;

  override postsInCollection(
    collectionId: number,
  ): Observable<
    PostsInCollectionQuery | DeepPartial<PostsInCollectionQuery> | undefined
  > {
    this.collectionId = collectionId;
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

  override watchOnePost(
    id: number,
  ): QueryRef<FindOneQuery, Exact<{ id: Scalars['Int']['input'] }>> {
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
        // {
        //   query: FindOneWithPostsDocument,
        //   variables: { id: input2.collectionId },
        // },
        {
          query: FindOneDocument,
          variables: { id },
        },
        // {
        //   query: PostsInCollectionDocument,
        //   variables: { id: input2.collectionId },
        // },
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
  public backToMenu(): void {
    this.router.navigate(['/admin/collection-edit', this.collectionId]);
  }
}
