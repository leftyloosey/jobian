import { Op } from 'quill';
export interface NewPost {
  title: string;
  content: Op[];
  collectionId: number;
  heading: string;
  headerImageString: string;
}
export interface Post extends NewPost {
  timestamp: Date;
}
