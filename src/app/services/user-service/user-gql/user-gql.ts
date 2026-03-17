import { gql } from 'apollo-angular';

export const COLLECTIONS_OF_OWNER = gql`
  query CollectionsOfOwner {
    collectionsOfOwner {
      collections {
        id
        heading
        title
        urlTitle
        headerImageString
        timestamp
      }
    }
  }
`;
export const COLLECTIONS_OWNER_TITLES_ONLY = gql`
  query CollectionsOfOwnerTitle {
    collectionsOfOwner {
      collections {
        id
        title
        urlTitle
      }
    }
  }
`;
