import { DeepPartial } from '@apollo/client/utilities';

export type PostsReturn =
  | ({
      __typename?: 'Post' | undefined;
      id: number;
      title?: string | null | undefined;
      content?: any;
    } | null)[]
  | (
      | DeepPartial<{
          __typename?: 'Post' | undefined;
          id: number;
          title?: string | null | undefined;
          content?: any;
        }>
      | null
      | undefined
    )[]
  | null
  | undefined;
