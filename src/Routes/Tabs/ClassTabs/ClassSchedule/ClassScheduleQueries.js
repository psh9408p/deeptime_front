import { gql } from "apollo-boost"

export const ADD_SCHEDULE = gql`
  mutation addSchedule(
    $isAllDay: Boolean!
    $title: String!
    $location: String
    $state: String
    $start: String!
    $end: String!
    $classId: String!
  ) {
    addSchedule(
      isAllDay: $isAllDay
      title: $title
      location: $location
      state: $state
      start: $start
      end: $end
      classId: $classId
    )
  }
`

export const UPDATE_SCHEDULE = gql`
  mutation updateSchedule(
    $scheduleId: String!
    $isAllDay: Boolean
    $title: String
    $location: String
    $state: String
    $start: String
    $end: String
  ) {
    updateSchedule(
      scheduleId: $scheduleId
      isAllDay: $isAllDay
      title: $title
      location: $location
      state: $state
      start: $start
      end: $end
    )
  }
`

export const DELETE_SCHEDULE = gql`
  mutation deleteSchedule($scheduleId: String!) {
    deleteSchedule(scheduleId: $scheduleId)
  }
`

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
`
