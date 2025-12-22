import { inject } from '@angular/core';
import type {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { CollectionService } from '../../services/collection-service/collection-service';
import { firstValueFrom, map, tap } from 'rxjs';
import {
  CollectionByUserGQL,
  CollectionByUserQuery,
  PostsByCollectionTitleGQL,
  PostsByCollectionTitleQuery,
} from '../../../graphql/generated';
import { NameService } from '../../services/name-service/name-service';

export const collectionsResolver: ResolveFn<
  Apollo.QueryResult<CollectionByUserQuery>
> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const collection = inject(CollectionByUserGQL);
  const name = inject(NameService);
  return collection
    .fetch({ variables: { authorId: name.getUser() } })
    .pipe(map((stuff) => stuff));
};

export const postResolver: ResolveFn<
  Apollo.QueryResult<PostsByCollectionTitleQuery>
> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const collectionTitle: string = route.params['title'];
  const posts = inject(PostsByCollectionTitleGQL);
  return posts
    .fetch({ variables: { collectionTitle } })
    .pipe(map((stuff) => stuff));
};
