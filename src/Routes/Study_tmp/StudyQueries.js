import { gql } from 'apollo-boost';

export const START_SCHEDULE = gql`
  mutation startSchedule_study(
    $title: String!
    $start: String!
    $end: String!
    $totalTime: Int!
    $calendarId: String!
    $state: String!
    $existTodo: Boolean!
  ) {
    startSchedule_study(
      title: $title
      start: $start
      end: $end
      totalTime: $totalTime
      calendarId: $calendarId
      state: $state
      existTodo: $existTodo
    )
  }
`;

export const STOP_SCHEDULE = gql`
  mutation stopSchedule_study(
    $scheduleId: String!
    $end: String!
    $deleteBool: Boolean!
  ) {
    stopSchedule_study(
      scheduleId: $scheduleId
      end: $end
      deleteBool: $deleteBool
    )
  }
`;
