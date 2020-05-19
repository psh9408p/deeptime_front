import { gql } from 'apollo-boost';

export const SAVE_SCHEDULE = gql`
  mutation saveSchedule($scheduleArray: [ScheduleArray!]!) {
    saveSchedule(scheduleArray: $scheduleArray)
  }
`;

export const ADD_SUBJECT = gql`
  mutation addSubject($name: String!, $bgColor: String!, $classId: String!) {
    addSubject(name: $name, bgColor: $bgColor, classId: $classId)
  }
`;

export const DELETE_SUBJECT = gql`
  mutation deleteSubject($subjectId: String!) {
    deleteSubject(subjectId: $subjectId)
  }
`;
