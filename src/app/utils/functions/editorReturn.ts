import { ObservableQuery } from '@apollo/client';
import {
  AllNavMembersQuery,
  FindOneNavQuery,
  FindOneQuery,
  NavMembersByHeadingQuery,
  PostsInCollectionQuery,
} from '../../../graphql/generated';
import { DeepPartial } from '@apollo/client/utilities';

export interface editReturnable {
  __typename: string;
  content: [];
  title: string;
  collectionId: number;
}
export interface editRetornable {
  __typename: string;
  content: [];
  title: string;
  id: number;
}
// export type editRetornable = {
//   __typename: string;
//   content: [];
//   title: string;
//   id: number;
// } | null;

export type NavOrPost = FindOneQuery extends FindOneNavQuery
  ? FindOneQuery
  : FindOneNavQuery;

// export type slavOrPost<T, K> = T extends K ? T : K;
// type slavOrPost<T, K> = NonNullable<T> | NonNullable<K>;
type slavOrPost<T, K> = NonNullable<T> | NonNullable<DeepPartial<T>> | K;

export function returnEditQuery(
  post: ObservableQuery.Result<any, any>,
): editReturnable | null {
  {
    const data: NavOrPost = post.data;
    let t: keyof NavOrPost;

    for (t in data) {
      if (data) {
        return data[t] as editReturnable;
      }
    }
    return null;
  }
}
// export function returnEditQuery(
//   post: ObservableQuery.Result<any, any>,
//   // post: ObservableQuery.Result<any, any>,
// ): editReturnable | null {
//   {
//     const data: NavOrPost = post.data;
//     let t: keyof NavOrPost;

//     for (t in data) {
//       if (data) {
//         return data[t] as editReturnable;
//       }
//     }
//     return null;
//   }
// }

export type AllQuery = NavMembersByHeadingQuery | PostsInCollectionQuery;

export function returnspEditQuery<T, K>(post: T | DeepPartial<T> | undefined) {
  type extractedQuery = Extract<K, T>;

  if (post) {
    const data: slavOrPost<T, extractedQuery> = post;
    let t: keyof typeof data;

    for (t in data) {
      return data[t] as [editRetornable];
    }
  }
  return null;
}
// export function returnspEditQuery<T>(post: T | DeepPartial<T> | undefined) {
//   type AllQuery = NavMembersByHeadingQuery | PostsInCollectionQuery;
//   type extractedQuery = Extract<AllQuery, T>;

//   if (post) {
//     const data: slavOrPost<T, extractedQuery> = post;
//     let t: keyof typeof data;

//     for (t in data) {
//       return data[t] as [editRetornable];
//     }
//   }
//   return null;
// }
