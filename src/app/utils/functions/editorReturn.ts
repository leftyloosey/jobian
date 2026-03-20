import { ObservableQuery } from '@apollo/client';
import {
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
  heading: string;
}
export interface editRetornable {
  __typename: string;
  content: [];
  title: string;
  id: number;
}

export type NavOrPost = FindOneQuery extends FindOneNavQuery
  ? FindOneQuery
  : FindOneNavQuery;

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

type hoshy<T, K> = NonNullable<T> | NonNullable<DeepPartial<T>> | K;

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
export function genericTestor<T, K>(
  post: T | DeepPartial<T> | undefined,
): typeof post {
  type extractedQuery = Extract<K, T>;
  if (post) {
    const data: hoshy<T, extractedQuery> = post;
    let t: keyof typeof data;

    for (t in data) {
      console.log('datat', data[t]);

      return data[t] as hoshy<T, extractedQuery>;
    }
  }
  return post as extractedQuery;
}

export function extractArray<T>(post: T | DeepPartial<T> | undefined) {
  type hoshy<T> = NonNullable<T> | NonNullable<DeepPartial<T>>;

  let gorm;
  if (post) {
    const data: typeof post = post;
    gorm = goDown<hoshy<T>>(data);
  }

  return gorm;
}

function goDown<T>(data: T) {
  if (data) {
    let t: keyof typeof data;

    for (t in data) {
      if (Array.isArray(data[t])) {
        return data[t];
      } else {
        if (typeof data[t] === 'object') {
          const horb = data[t];
          if (horb) {
            let shlo: keyof typeof horb;
            for (shlo in horb) {
              if (Array.isArray(horb[shlo])) {
                return horb[shlo];
              }
            }
          }
        }
      }
    }
  }
  return data;
}
