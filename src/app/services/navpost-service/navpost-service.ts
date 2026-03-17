import { Injectable } from '@angular/core';
import {
  CreateNavMemberGQL,
  Exact,
  FindOneNavDocument,
  FindOneNavGQL,
  FindOneNavQuery,
  NavMembersByHeadingDocument,
  NavMembersByHeadingGQL,
  NavMembersByHeadingQuery,
  PostsInCollectionQuery,
  RemoveNavMemberGQL,
  Scalars,
  UpdateNavMemberGQL,
} from '../../../graphql/generated';
import { PostServiceBaseClass } from '../../utils/interfaces/PostServiceBase';
import { DeepPartial } from '@apollo/client/utilities';
import { Observable, map } from 'rxjs';
import { NameService } from '../name-service/name-service';
import { Apollo, QueryRef } from 'apollo-angular';
import { NewPost } from '../../utils/interfaces/NewPost';
import { UpdatePost } from '../../utils/interfaces/UpdatePost';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavPostService extends PostServiceBaseClass<
  NavMembersByHeadingQuery,
  NavMembersByHeadingGQL,
  FindOneNavQuery,
  FindOneNavGQL,
  CreateNavMemberGQL,
  UpdateNavMemberGQL,
  RemoveNavMemberGQL
> {
  override posts: typeof this.postsGql;
  override findOne: typeof this.findOneGql;
  override createPost: typeof this.createGql;
  override updatePost: typeof this.updateGql;
  override removePost: typeof this.removeGql;

  constructor(
    private nam1: NameService,
    private router1: Router,
    private postsGql: NavMembersByHeadingGQL,
    private findOneGql: FindOneNavGQL,
    private createGql: CreateNavMemberGQL,
    private updateGql: UpdateNavMemberGQL,
    private removeGql: RemoveNavMemberGQL,
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

  override postsInCollection(collectionId: number): Observable<
    NavMembersByHeadingQuery | DeepPartial<PostsInCollectionQuery> | undefined
    // PostsInCollectionQuery | DeepPartial<PostsInCollectionQuery> | undefined
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

  override watchOnePost(
    id: number,
  ): QueryRef<FindOneNavQuery, Exact<{ id: Scalars['Int']['input'] }>> {
    return this.findOne.watch({ variables: { id } });
  }

  public newPost(input: NewPost): Observable<Apollo.MutateResult<unknown>> {
    return this.createPost.mutate({
      variables: { input },
      refetchQueries: [
        {
          query: FindOneNavDocument,
          variables: { id: input.collectionId },
        },
        // {
        //   query: CollectionByUserDocument,
        //   variables: { authorId: this.name.getUser() },
        // },
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
        //   query: NavMembersByHeadingDocument,
        //   variables: { id: input2.collectionId },
        // },
        {
          query: FindOneNavDocument,
          variables: { id },
        },
        // {
        //   query: PostsInCollectionDocument,
        //   variables: { id: input2.collectionId },
        // },
        // {
        //   query: CollectionByUserDocument,
        //   variables: { authorId: this.name.getUser() },
        // },
      ],
    });
  }

  public deletePost(
    postId: number,
    collectionId: number,
  ): Observable<Apollo.MutateResult<unknown>> {
    return this.removePost.mutate({
      variables: { id: postId },
      // variables: { input: postId },
      refetchQueries: [
        // {
        //   query: FindOneNavDocument,
        //   variables: { id: collectionId },
        // },
        {
          query: NavMembersByHeadingDocument,
          variables: { collectionId },
        },
        // {
        //   query: AllNavMembersDocument,
        // },
      ],
    });
  }
  public backToMenu(): void {
    this.router.navigate(['admin']);
  }
}
