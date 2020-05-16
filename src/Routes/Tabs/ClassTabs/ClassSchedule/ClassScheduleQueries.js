import { gql } from 'apollo-boost';

export const SAVE_SCHEDULE = gql`
  mutation saveSchedule($scheduleArray: [ScheduleArray!]!) {
    saveSchedule(scheduleArray: $scheduleArray)
  }
`;

export const SCHEDULE_OF_CLASS = gql`
  query scheduleOfClass($classId: String!) {
    scheduleOfClass(classId: $classId) {
      id
      isAllDay
      title
      location
      state
      start
      end
    }
  }
`;
