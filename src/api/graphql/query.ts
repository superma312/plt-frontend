import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers {
    users {
      name
      email
      age
      orders {
        name
        price
      }
    }
  }
`;

export const FIND_USER_BY_EMAIL = gql`
  query FindUserByEmail($email: String!) {
    findOneUserByEmail(email: $email) {
      name
      email
      age
      orders {
        name
        price
      }
    }
  }
`;
