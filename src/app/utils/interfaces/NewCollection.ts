import { Post } from './NewPost';

export interface NewCollection {
  title: string;
  heading: string;
  authorId: number;
}

export interface Collection extends NewCollection {
  id: number;
  timestamp: Date;
  posts: Post[];
}
