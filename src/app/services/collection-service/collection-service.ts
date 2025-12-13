import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { NewCollection } from '../../utils/interfaces/NewCollection';
import { UpdateCollection } from '../../utils/interfaces/UpdateCollection';
import {
  CREATE_COLLECTION,
  DELETE_COLLECTION,
  COLLECTIONS_WITH_POSTS,
} from './collection-gql/collection-gql';
import { UPDATE_COLLECTION } from './collection-gql/collection-gql';
import { Observable } from 'rxjs';
import { OperationVariables } from '@apollo/client';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  constructor(private readonly apollo: Apollo) {}

  public getCollections(
    loading: boolean,
    error: any
  ): QueryRef<unknown, OperationVariables> {
    return this.apollo.watchQuery({
      query: COLLECTIONS_WITH_POSTS,
    });
  }

  public newCollection(
    title: string,
    heading: string,
    authorId: number
  ): Observable<Apollo.MutateResult<unknown>> {
    const input: NewCollection = { title, authorId, heading };
    return this.apollo.mutate({
      mutation: CREATE_COLLECTION,
      variables: {
        input,
      },
      refetchQueries: [
        {
          query: COLLECTIONS_WITH_POSTS,
        },
      ],
    });
  }

  public updateCollection(
    title: string,
    heading: string,
    id: number
  ): Observable<Apollo.MutateResult<unknown>> {
    const input: UpdateCollection = { title, id, heading };
    return this.apollo.mutate({
      mutation: UPDATE_COLLECTION,
      variables: {
        input,
      },
      refetchQueries: [
        {
          query: COLLECTIONS_WITH_POSTS,
        },
      ],
    });
  }

  public deleteCollection(
    ministryId: number
  ): Observable<Apollo.MutateResult<unknown>> {
    const id = ministryId;
    return this.apollo.mutate({
      mutation: DELETE_COLLECTION,
      variables: {
        id,
      },
      refetchQueries: [
        {
          query: COLLECTIONS_WITH_POSTS,
        },
      ],
    });
  }
}
