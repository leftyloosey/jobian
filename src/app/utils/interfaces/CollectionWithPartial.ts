import { DeepPartial } from '@apollo/client/utilities';
import { Collection } from '../../../graphql/generated';

// export type CollectionWithPartial =
//   | ({
//       __typename?: 'Collection' | undefined;
//       title: string;
//       heading: string;
//       headerImageString: string;
//       id: number;
//       posts?:
//         | ({
//             __typename?: 'Post' | undefined;
//             id: number;
//             title?: string | null | undefined;
//             content?: any;
//           } | null)[]
//         | null
//         | undefined;
//     } | null)[]
//   | (
//       | DeepPartial<{
//           __typename?: 'Collection';
//           title: string;
//           heading: string;
//           headerImageString: string;
//           id: number;
//           posts?: Array<{
//             __typename?: 'Post';
//             id: number;
//             title?: string | null;
//             content?: any | null;
//           } | null> | null;
//         }>
//       | null
//       | undefined
//     )[]
//   | undefined;

// export type MaybeCollection =
//   | Collection
//   | DeepPartial<Collection>
//   | null
//   | undefined;
