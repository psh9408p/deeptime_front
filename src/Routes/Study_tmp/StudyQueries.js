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

export const PULL_SCHEDULE = gql`
  mutation pullSchedule_study(
    $scheduleId: String!
    $start: String!
    $end: String!
  ) {
    pullSchedule_study(scheduleId: $scheduleId, start: $start, end: $end)
  }
`;

export const CUT_SCHEDULE = gql`
  mutation cutSchedule_study(
    $scheduleId: String!
    $end: String!
    $deleteBool: Boolean!
  ) {
    cutSchedule_study(
      scheduleId: $scheduleId
      end: $end
      deleteBool: $deleteBool
    )
  }
`;

export const EXTENSION_SCHEDULE = gql`
  mutation extensionSchedule_study(
    $scheduleId: String!
    $end: String!
    $cutId: String!
    $deleteArray: [schedule_delete!]!
  ) {
    extensionSchedule_study(
      scheduleId: $scheduleId
      end: $end
      cutId: $cutId
      deleteArray: $deleteArray
    )
  }
`;

export const EDIT_STUDYSET = gql`
  mutation editStudySet(
    $nonScheduleRecord: Boolean!
    $autoRefresh: Boolean!
    $autoRefreshTerm: Int!
    $startScheduleTerm: Int!
    $cutExtenTerm: Int!
  ) {
    editStudySet(
      nonScheduleRecord: $nonScheduleRecord
      autoRefresh: $autoRefresh
      autoRefreshTerm: $autoRefreshTerm
      startScheduleTerm: $startScheduleTerm
      cutExtenTerm: $cutExtenTerm
    )
  }
`;
