import { Injectable } from '@angular/core';
import { Apollo, Query } from 'apollo-angular';
import { UpdateCollection } from '../../utils/interfaces/UpdateCollection';
import { COLLECTIONS_BY_USER } from './collection-gql/collection-gql';
import { UPDATE_COLLECTION } from './collection-gql/collection-gql';
import { map, Observable, tap } from 'rxjs';
import { NameService } from '../name-service/name-service';
import {
  CreateCollectionInput,
  CreateCollectionInputGQL,
  CollectionByUserDocument,
  RemoveCollectionGQL,
  RemoveCollectionMutation,
  CreateCollectionInputMutation,
  CollectionByUserGQL,
  FindOneWithPostsGQL,
  Exact,
  FindOneWithPostsQuery,
  Scalars,
  FindOneWithPostsQueryVariables,
  UpdateCollectionInputGQL,
  UpdateCollectionInput,
  UpdateCollectionInputMutation,
} from '../../../graphql/generated';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  constructor(
    private readonly apollo: Apollo,
    private name: NameService,
    private getCollections: CollectionByUserGQL,
    private findOne: FindOneWithPostsGQL,
    private updateOne: UpdateCollectionInputGQL,
    private newCollection: CreateCollectionInputGQL,
    private removeCollection: RemoveCollectionGQL
  ) {}

  public watchCollections() {
    return this.getCollections
      .watch({ variables: { authorId: this.name.getUser() } })
      .valueChanges.pipe(
        map((result) => {
          return result;
        })
      );
  }

  public findOneWithPosts(
    id: Query.FetchOptions<
      FindOneWithPostsQueryVariables,
      Exact<{ id: Scalars['Int']['input'] }>
    >
  ): Observable<Apollo.QueryResult<FindOneWithPostsQuery>> {
    return this.findOne.fetch(id);
  }

  public watchOneWithPosts(id: number) {
    const hoo = { variables: { id } };
    return this.findOne.watch(hoo);
  }

  public createCollection(
    title: string,
    heading: string
  ): Observable<Apollo.MutateResult<CreateCollectionInputMutation>> {
    const input: CreateCollectionInput = {
      authorId: this.name.getUser(),
      title,
      heading,
    };
    return this.newCollection.mutate({
      variables: { input },
      refetchQueries: [
        {
          query: CollectionByUserDocument,
          variables: { authorId: this.name.getUser() },
        },
      ],
    });
  }

  public updateCollection(
    input: UpdateCollectionInput
  ): Observable<Apollo.MutateResult<unknown>> {
    // public updateCollection(
    //   title: string,
    //   heading: string,
    //   id: number
    // ): Observable<Apollo.MutateResult<unknown>> {
    // const input: UpdateCollection = { title, id, heading };

    return this.updateOne.mutate({ variables: { input } });

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
    collectionId: number
  ): Observable<Apollo.MutateResult<RemoveCollectionMutation>> {
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
