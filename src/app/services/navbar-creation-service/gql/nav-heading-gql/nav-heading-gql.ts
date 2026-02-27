import { gql } from 'apollo-angular';

export const FIND_ALL_HEADING = gql`
  query AllNavHeadings {
    navHeadings {
      id
      blogTitle
      authorId
    }
  }
`;

export const CREATE_NAV_HEADING = gql`
  mutation CreateNavHeading($input: CreateNavHeadingInput!) {
    createNavHeading(createNavHeadingInput: $input) {
      blogTitle
      authorId
      id
    }
  }
`;

export const UPSERT_NAV_HEADING = gql`
  mutation UpsertNavHeading($input: UpdateNavHeadingInput!) {
    upsertNavHeading(updateNavHeadingInput: $input) {
      blogTitle
      authorId
      id
    }
  }
`;

export const UPDATE_NAV_HEADING = gql`
  mutation UpdateNavHeading($input: UpdateNavHeadingInput!) {
    updateNavHeading(updateNavHeadingInput: $input) {
      blogTitle
      id
    }
  }
`;
export const DELETE_NAV_HEADING = gql`
  mutation RemoveNavHeading($id: Int!) {
    removeNavHeading(id: $id) {
      id
      blogTitle
    }
  }
`;
