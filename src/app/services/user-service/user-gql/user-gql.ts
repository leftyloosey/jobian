import { gql } from 'apollo-angular';

export const COLLECTIONS_OF_OWNER = gql`
  query CollectionsOfOwner {
    collectionsOfOwner {
      collections {
        id
        heading
        title
        headerImageString
      }
    }
  }
`;
