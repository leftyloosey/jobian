import { Injectable } from '@angular/core';
import { PostServiceBaseClass } from '../../utils/interfaces/PostServiceBase';
import { map, Observable } from 'rxjs';
import { NewPost } from '../../utils/interfaces/NewPost';
import { UpdatePost } from '../../utils/interfaces/UpdatePost';
import {
  CollectionByUserDocument,
  FindOneWithPostsDocument,
  CreateNavMemberGQL,
  UpdateNavMemberGQL,
  RemoveNavMemberGQL,
  NavMembersByHeadingGQL,
  FindOneNavGQL,
  FindOneNavQuery,
  Exact,
  Scalars,
  FindOneNavDocument,
  NavMembersByHeadingDocument,
} from '../../../graphql/generated';
import { NameService } from '../name-service/name-service';
import { QueryRef } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class FostService extends PostServiceBaseClass {
  override collectionId: number = 0;
  override postId: number = 0;
  override updateMode: boolean = false;
  constructor(
    override name: NameService,
    override posts: NavMembersByHeadingGQL,
    override findOne: FindOneNavGQL,
    override createPost: CreateNavMemberGQL,
    override updatePost: UpdateNavMemberGQL,
    override removePost: RemoveNavMemberGQL,
  ) {
    super();
  }
  override postsInCollection(collectionId: number) {
    return this.posts
      .watch({
        variables: {
          collectionId,
        },
      })
      .valueChanges.pipe(
        map((result) => {
          console.log('fost top', result.data);
          return result.data;
        }),
      );
  }

  override watchOnePost(id: number): QueryRef<
    FindOneNavQuery,
    Exact<{
      id: Scalars['Int']['input'];
    }>
  > {
    return this.findOne.watch({ variables: { id } });
  }

  override newPost(input: NewPost) {
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
  override updateOne(input2: UpdatePost) {
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
          query: FindOneNavDocument,
          variables: { id },
        },
      ],
    });
  }

  override deletePost(postId: number, collectionId: number): Observable<any> {
    const id = postId;

    return this.removePost.mutate({
      variables: { id: postId },
      refetchQueries: [
        {
          query: FindOneNavDocument,
          variables: { id },
        },
        {
          query: NavMembersByHeadingDocument,
          variables: { collectionId: collectionId },
        },
      ],
    });
  }
}
