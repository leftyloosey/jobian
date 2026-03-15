import { DeepPartial } from '@apollo/client/utilities';

export type navHeadingArrayReturn =
  | ({
      __typename?: 'NavHeading' | undefined;
      id: number;
      blogTitle: string;
      authorId: number;
    } | null)[]
  | (
      | DeepPartial<{
          __typename?: 'NavHeading';
          id: number;
          blogTitle: string;
          authorId: number;
        }>
      | null
      | undefined
    )[]
  | null
  | undefined;

export type navMemberArrayReturn =
  | ({
      __typename?: 'NavMember' | undefined;
      title: string;
      content: any;
      id: number;
    } | null)[]
  | (
      | DeepPartial<{
          __typename?: 'NavMember';
          title: string;
          content: any;
          id: number;
        }>
      | null
      | undefined
    )[]
  | null
  | undefined;
