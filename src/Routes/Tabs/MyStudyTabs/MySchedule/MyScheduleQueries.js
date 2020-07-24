import { gql } from 'apollo-boost';

export const SAVE_SCHEDULE = gql`
  mutation saveSchedule_my($scheduleArray: [ScheduleArray_my!]!) {
    saveSchedule_my(scheduleArray: $scheduleArray)
  }
`;

export const ADD_SUBJECT = gql`
  mutation addSubject($name: String!, $bgColor: String!) {
    addSubject(name: $name, bgColor: $bgColor)
  }
`;

export const EDITCOLOR_SUBJECT = gql`
  mutation editColorSubject($subjectId: String!, $bgColor: String!) {
    editColorSubject(subjectId: $subjectId, bgColor: $bgColor)
  }
`;

export const DELETE_SUBJECT = gql`
  mutation deleteSubject($subjectId: String!) {
    deleteSubject(subjectId: $subjectId)
  }
`;

export const BOOKMARK_SUBJECT = gql`
  mutation bookMarkSubject($subjectId: [String!]!, $bookMark: [Boolean!]!) {
    bookMarkSubject(subjectId: $subjectId, bookMark: $bookMark)
  }
`;

export const MY_SUBJECT = gql`
  query mySubject {
    mySubject {
      id
      largeCategory
      name
      color
      bgColor
      dragBgColor
      borderColor
      bookMark
      modifyRight
    }
  }
`;
