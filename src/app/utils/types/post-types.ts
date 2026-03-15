import { ObservableQuery } from '@apollo/client';
import { DeepPartial, Observable } from '@apollo/client/utilities';
import { FindOneQuery } from '../../../graphql/generated';

export type PostsReturn =
  | ({
      __typename?: 'Post' | undefined;
      id: number;
      title?: string | null | undefined;
      content?: any;
      timestamp?: any;
    } | null)[]
  | (
      | DeepPartial<{
          __typename?: 'Post';
          id: number;
          title?: string | null;
          content?: any | null;
          timestamp?: any | null;
        }>
      | null
      | undefined
    )[]
  | null
  | undefined;

export type ObservableFindOne = Observable<
  ObservableQuery.Result<
    FindOneQuery,
    'empty' | 'complete' | 'streaming' | 'partial'
  >
>;
