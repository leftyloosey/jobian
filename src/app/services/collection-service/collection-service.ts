import { Injectable } from '@angular/core';
import { Apollo, Query } from 'apollo-angular';
import { UpsertCollection } from '../../utils/interfaces/UpsertCollection';
import { map, Observable } from 'rxjs';
import { NameService } from '../name-service/name-service';
import {
  CreateCollectionInput,
  CreateCollectionInputGQL,
  CollectionByUserDocument,
  RemoveCollectionGQL,
  RemoveCollectionMutation,
  CreateCollectionInputMutation,
  FindOneWithPostsGQL,
  Exact,
  FindOneWithPostsQuery,
  Scalars,
  FindOneWithPostsQueryVariables,
  UpdateCollectionInputGQL,
  UpdateCollectionInput,
  UpsertCollectionInputGQL,
  UpsertCollectionInputMutation,
  CollectionByUserGQL,
  CollectionsOfOwnerDocument,
  FindOneDocument,
} from '../../../graphql/generated';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  constructor(
    private name: NameService,
    private getCollections: CollectionByUserGQL,
    // private getCollectionsTitle: CollectionsOfOwnerTitleGQL,
    private findOne: FindOneWithPostsGQL,
    private updateOne: UpdateCollectionInputGQL,
    private newCollection: CreateCollectionInputGQL,
    private upsertColl: UpsertCollectionInputGQL,
    private removeCollection: RemoveCollectionGQL,
  ) {}

  public watchCollections() {
    return this.getCollections
      .watch({
        variables: { authorId: this.name.getUser() },
      })
      .valueChanges.pipe(
        map((result) => {
          console.log(result);
          return result;
        }),
      );
  }

  public findOneWithPosts(
    id: Query.FetchOptions<
      FindOneWithPostsQueryVariables,
      Exact<{ id: Scalars['Int']['input'] }>
    >,
  ): Observable<Apollo.QueryResult<FindOneWithPostsQuery>> {
    return this.findOne.fetch(id);
  }

  public watchOneWithPosts(id: number) {
    const collection = { variables: { id } };
    return this.findOne.watch(collection);
  }

  public createCollection(
    title: string,
    urlTitle: string,
    heading: string,
    headerImageString: string,
  ): Observable<Apollo.MutateResult<CreateCollectionInputMutation>> {
    const input: CreateCollectionInput = {
      authorId: this.name.getUser(),
      urlTitle,
      title,
      heading,
      headerImageString,
    };
    return this.newCollection.mutate({
      variables: { input },
      refetchQueries: [
        {
          query: CollectionByUserDocument,
          variables: { authorId: this.name.getUser() },
        },
        {
          query: CollectionsOfOwnerDocument,
        },
      ],
    });
  }
  public upsertCollection(
    input: UpsertCollection,
  ): Observable<Apollo.MutateResult<UpsertCollectionInputMutation>> {
    input.authorId = this.name.getUser();
    return this.upsertColl.mutate({
      variables: { input },
      refetchQueries: [
        {
          query: CollectionsOfOwnerDocument,
        },
        {
          query: CollectionByUserDocument,
          variables: { authorId: this.name.getUser() },
        },
      ],
    });
  }

  public updateCollection(
    input: UpdateCollectionInput,
  ): Observable<Apollo.MutateResult<unknown>> {
    return this.updateOne.mutate({
      variables: { input },
      refetchQueries: [
        {
          query: CollectionByUserDocument,
          variables: { authorId: this.name.getUser() },
        },
      ],
    });

    // return this.apollo.mutate({
    //   mutation: UPDATE_COLLECTION,
    //   variables: {
    //     input,
    //   },
    //   refetchQueries: [
    //     {
    //       query: COLLECTIONS_BY_USER,
    //       variables: { authorId: this.name.getUser() },
    //     },
    //   ],
    // });
  }

  public deleteCollection(
    collectionId: number,
  ): Observable<Apollo.MutateResult<RemoveCollectionMutation>> {
    console.log(collectionId);
    return this.removeCollection.mutate({
      variables: { id: collectionId },
      refetchQueries: [
        {
          query: CollectionByUserDocument,
          variables: { authorId: this.name.getUser() },
        },
      ],
    });
  }
}
