import { CollectionsOfOwnerReturn } from '../types/collection-types';
import { navListOnlyReturn } from '../types/nav-types';
import { PostsReturn } from '../types/post-types';

export type DifferentReturns =
  | PostsReturn
  | navListOnlyReturn
  | CollectionsOfOwnerReturn;

// export function sortPostsByDate(posts: PostsReturn): PostsReturn {
//   let here: PostsReturn = [];
//   if (posts) {
//     const arrayForSort = [...posts];
//     let sorted = arrayForSort.sort((a, b) => a?.timestamp - b?.timestamp);
//     here = sorted;
//   }
//   return here;
// }
// export function sortNavByDate(posts: navListOnlyReturn): navListOnlyReturn {
//   let here: navListOnlyReturn = [];
//   if (posts) {
//     const arrayForSort = [...posts];
//     let sorted = arrayForSort.sort((a, b) => a?.timestamp - b?.timestamp);
//     here = sorted;
//   }
//   return here;
// }
// export function sortCollectionByDate(
//   posts: CollectionsOfOwnerReturn,
// ): CollectionsOfOwnerReturn {
//   let here: CollectionsOfOwnerReturn = [];
//   if (posts) {
//     const arrayForSort = [...posts];
//     let sorted = arrayForSort.sort((a, b) => a?.timestamp - b?.timestamp);
//     here = sorted;
//   }
//   return here;
// }
export function sortByDate<T extends DifferentReturns>(posts: T): T {
  if (posts) {
    const arrayForSort = [...posts];

    let sorted = arrayForSort.sort((a, b) => a?.timestamp - b?.timestamp);
    return sorted as T;
  }
  return posts;
}
