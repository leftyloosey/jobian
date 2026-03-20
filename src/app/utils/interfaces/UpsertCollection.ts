import { Collection } from '../../../graphql/generated';

export interface UpsertCollection {
  authorId: number;
  headerImageString: string;
  title: string;
  urlTitle: string;
  heading: string;
  id: number;
}

export interface ExtendCollectionDialog extends Collection {
  postType: boolean;
}
