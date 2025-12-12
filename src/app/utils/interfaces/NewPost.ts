import { Delta } from 'quill';
export interface NewPost {
  title: string;
  content: Delta;
  ministryId: number;
}
export interface Post extends NewPost {
  timestamp: Date;
}
