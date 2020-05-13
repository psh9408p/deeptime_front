import { gql } from 'apollo-boost';

export const STUDENT_OF_CLASS = gql`
  query studentOfClass($classId: String!) {
    studentOfClass(classId: $classId) {
      fullName
      avatar
      existToggle
      todayTime {
        attendanceStatus
        absenceReason
      }
      times {
        existTime
        targetTime
        time_24
        createdAt
      }
    }
  }
`;

export const SCHEDULE_OF_CLASS = gql`
  query scheduleOfClass($classId: String!) {
    scheduleOfClass(classId: $classId) {
      title
      start
      end
    }
  }
`;
