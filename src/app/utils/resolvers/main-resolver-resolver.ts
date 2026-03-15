import { inject } from '@angular/core';
import type {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs';
import {
  CollectionByUserGQL,
  CollectionByUserQuery,
  CollectionsOfOwnerTitleGQL,
  CollectionsOfOwnerTitleQuery,
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

export const collectionTitleResolver: ResolveFn<
  Apollo.QueryResult<CollectionsOfOwnerTitleQuery>
> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const collections = inject(CollectionsOfOwnerTitleGQL);

  return collections.fetch().pipe(map((collections) => collections));
};

export const postResolver: ResolveFn<
  Apollo.QueryResult<PostsByCollectionTitleQuery>
> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const urlTitle: string = route.params['title'];
  const collectionTitle = urlTitle;

  const posts = inject(PostsByCollectionTitleGQL);
  return posts
    .fetch({ variables: { collectionTitle } })
    .pipe(map((stuff) => stuff));
};
