import { Delta } from 'quill';
export interface UpdatePost {
  title: string;
  content: Delta;
  id: number;
}
