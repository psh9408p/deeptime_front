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
        time_24
        createdAt
      }
    }
  }
`;
