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

export const EDIT_SUBJECT = gql`
  mutation editSubject($subjectId: String!, $name: String!, $bgColor: String!) {
    editSubject(subjectId: $subjectId, name: $name, bgColor: $bgColor)
  }
`;

export const DELETE_SUBJECT = gql`
  mutation deleteSubject($subjectId: String!) {
    deleteSubject(subjectId: $subjectId)
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
    }
  }
`;
