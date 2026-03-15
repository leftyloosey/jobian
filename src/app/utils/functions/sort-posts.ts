import { PostsReturn } from '../types/post-types';

export function sortPostsByDate(posts: PostsReturn): PostsReturn {
  let here: PostsReturn = [];
  if (posts) {
    const arrayForSort = [...posts];
    let sorted = arrayForSort.sort((a, b) => a?.timestamp - b?.timestamp);
    here = sorted;
  }
  return here;
}
