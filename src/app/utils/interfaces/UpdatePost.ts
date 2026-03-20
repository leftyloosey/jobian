import { Op } from 'quill';
import { Post } from '../../../graphql/generated';
export interface UpdatePost {
  title: string;
  content: Op[];
  id: number;
  collectionId: number;
  heading?: string;
  headerImageString?: string;
}
export interface ExtendPostDialog extends Post {
  postType: boolean;
}
