import { gql } from 'apollo-boost';

export const SEARCH_BOOK = gql`
  mutation searchBook($word: String!, $display: Int!) {
    searchBook(word: $word, display: $display) {
      title
      link
      image
      author
      publisher
      isbn
    }
  }
`;
