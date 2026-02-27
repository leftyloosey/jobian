import { gql } from 'apollo-angular';

export const FIND_ALL_MEMBERS = gql`
  query AllNavMembers {
    navMembers {
      id
      title
      content
    }
  }
`;

export const FIND_ONE_NAV = gql`
  query findOneNav($id: Int!) {
    navMember(id: $id) {
      title
      content
      collectionId
    }
  }
`;
export const MEMBERS_BY_HEADING = gql`
  query NavMembersByHeading($collectionId: Int!) {
    navMembersInHeading(collectionId: $collectionId) {
      title
      content
      id
    }
  }
`;

export const CREATE_NAV_MEMBER = gql`
  mutation CreateNavMember($input: CreateNavMemberInput!) {
    createNavMember(createNavMemberInput: $input) {
      id
      collectionId
      title
      content
    }
  }
`;
export const UPDATE_NAV_MEMBER = gql`
  mutation UpdateNavMember($input: UpdateNavMemberInput!) {
    updateNavMember(updateNavMemberInput: $input) {
      id
      title
      content
    }
  }
`;
export const DELETE_NAV_MEMBER = gql`
  mutation RemoveNavMember($id: Int!) {
    removeNavMember(id: $id) {
      id
      title
      content
    }
  }
`;
