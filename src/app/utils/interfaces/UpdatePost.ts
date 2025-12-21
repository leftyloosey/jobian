import { Delta, Op } from 'quill';
export interface UpdatePost {
  title: string;
  content: Op[];
  id: number;
}
