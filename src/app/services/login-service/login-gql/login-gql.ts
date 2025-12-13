import { gql } from 'apollo-angular';

export const GET_LOGIN_TOKEN = gql`
  mutation CreateAuthInput($input: CreateAuthInput!) {
    createAuth(createAuthInput: $input) {
      token
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUserInput($input: CreateUserInput!) {
    createUser(createUserInput: $input) {
      name
      email
      password
    }
  }
`;
