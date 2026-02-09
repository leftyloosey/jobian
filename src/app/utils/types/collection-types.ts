import { ObservableQuery } from '@apollo/client';
import { DeepPartial, Observable } from '@apollo/client/utilities';
import { Collection, FindOneWithPostsQuery } from '../../../graphql/generated';

export type CollectionWithPartial =
  | {
      __typename?: 'Collection' | undefined;
      title: string;
      heading?: string | null | undefined;
      id: number;
      posts?:
        | ({
            __typename?: 'Post' | undefined;
            id: number;
            title?: string | null | undefined;
            content?: any;
          } | null)[]
        | null
        | undefined;
    }
  | DeepPartial<{
      __typename?: 'Collection';
      title: string;
      heading?: string | null;
      id: number;
      posts?: Array<{
        __typename?: 'Post';
        id: number;
        title?: string | null;
        content?: any | null;
      } | null> | null;
    }>
  | null
  | undefined;

export type CollectionsWithPartial =
  | ({
      __typename?: 'Collection' | undefined;
      title: string;
      heading: string;
      headerImageString: string;
      id: number;
      posts?:
        | ({
            __typename?: 'Post' | undefined;
            id: number;
            title?: string | null | undefined;
            content?: any;
          } | null)[]
        | null
        | undefined;
    } | null)[]
  | (
      | DeepPartial<{
          __typename?: 'Collection';
          title: string;
          heading: string;
          headerImageString: string;
          id: number;
          posts?: Array<{
            __typename?: 'Post';
            id: number;
            title?: string | null;
            content?: any | null;
          } | null> | null;
        }>
      | null
      | undefined
    )[]
  | undefined;

export type MaybeCollection =
  | Collection
  | DeepPartial<Collection>
  | null
  | undefined;

export type CollectionWithPosts = Observable<
  ObservableQuery.Result<
    FindOneWithPostsQuery,
    'empty' | 'complete' | 'streaming' | 'partial'
  >
>;
