import { Delta, Op } from 'quill';
export interface NewPost {
  title: string;
  content: Op[];
  collectionId: number;
}
export interface Post extends NewPost {
  timestamp: Date;
}
