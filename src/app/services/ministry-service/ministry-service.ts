import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { NewMinistry } from '../../utils/interfaces/NewMinistry';
import { UpdateMinistry } from '../../utils/interfaces/UpdateMinistry';
import {
  CREATE_MINISTRY,
  DELETE_MINISTRY,
  MINISTRIES_WITH_POSTS,
} from './ministry-gql/ministry-gql';
import { UPDATE_MINISTRY } from './ministry-gql/ministry-gql';
import { Observable } from 'rxjs';
import { OperationVariables } from '@apollo/client';

@Injectable({
  providedIn: 'root',
})
export class MinistryService {
  constructor(private readonly apollo: Apollo) {}

  public getMinistries(
    loading: boolean,
    error: any
  ): QueryRef<unknown, OperationVariables> {
    return this.apollo.watchQuery({
      query: MINISTRIES_WITH_POSTS,
    });
  }

  public newMinistry(
    title: string,
    heading: string,
    authorId: number
  ): Observable<Apollo.MutateResult<unknown>> {
    const input: NewMinistry = { title, authorId, heading };
    return this.apollo.mutate({
      mutation: CREATE_MINISTRY,
      variables: {
        input,
      },
      refetchQueries: [
        {
          query: MINISTRIES_WITH_POSTS,
        },
      ],
    });
  }

  public updateMinistry(
    title: string,
    heading: string,
    id: number
  ): Observable<Apollo.MutateResult<unknown>> {
    const input: UpdateMinistry = { title, id, heading };
    return this.apollo.mutate({
      mutation: UPDATE_MINISTRY,
      variables: {
        input,
      },
      refetchQueries: [
        {
          query: MINISTRIES_WITH_POSTS,
        },
      ],
    });
  }

  public deleteMinistry(
    ministryId: number
  ): Observable<Apollo.MutateResult<unknown>> {
    const id = ministryId;
    return this.apollo.mutate({
      mutation: DELETE_MINISTRY,
      variables: {
        id,
      },
      refetchQueries: [
        {
          query: MINISTRIES_WITH_POSTS,
        },
      ],
    });
  }
}
