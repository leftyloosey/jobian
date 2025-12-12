import { Post } from './NewPost';

export interface NewMinistry {
  title: string;
  heading: string;
  authorId: number;
}

export interface Ministry extends NewMinistry {
  id: number;
  timestamp: Date;
  posts: Post[];
}
