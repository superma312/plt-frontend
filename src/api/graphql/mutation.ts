import { gql } from '@apollo/client';

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($createProductInput: CreateProductInput!, $createUserInput: CreateUserInput!) {
    createProduct(createProductInput: $createProductInput, createUserInput: $createUserInput) {
      name
      price
    }
  }
`;
