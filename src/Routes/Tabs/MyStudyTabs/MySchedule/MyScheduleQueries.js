import { gql } from 'apollo-boost';

export const SAVE_SCHEDULE = gql`
  mutation saveSchedule_my($scheduleArray: [ScheduleArray_my!]!) {
    saveSchedule_my(scheduleArray: $scheduleArray)
  }
`;

export const DELETE_SCHEDULE = gql`
  mutation deleteSchedule($scheduleId: String!) {
    deleteSchedule(scheduleId: $scheduleId)
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

export const BOOKMARK_SUBJECT = gql`
  mutation bookMarkSubject($subjectId: [String!]!, $bookMark: [Boolean!]!) {
    bookMarkSubject(subjectId: $subjectId, bookMark: $bookMark)
  }
`;

export const ADD_TODOLIST = gql`
  mutation addTodolist($name: String!, $subjectId: String!) {
    addTodolist(name: $name, subjectId: $subjectId)
  }
`;

export const DELETE_TODOLIST = gql`
  mutation deleteTodolist($todolistId: String!) {
    deleteTodolist(todolistId: $todolistId)
  }
`;

export const FINISH_TODOLIST = gql`
  mutation finishTodolist($todolistId: String!) {
    finishTodolist(todolistId: $todolistId)
  }
`;

export const EDIT_TODOLIST = gql`
  mutation editTodolist(
    $todolistId: String!
    $subjectId: String!
    $name: String!
  ) {
    editTodolist(todolistId: $todolistId, subjectId: $subjectId, name: $name)
  }
`;

export const MY_SCHEDULE = gql`
  query mySchedule {
    mySchedule {
      id
      isAllDay
      isPrivate
      title
      location
      state
      start
      end
      totalTime
      subject {
        id
        name
        bgColor
      }
      bookOfUser {
        id
      }
    }
  }
`;

export const MY_SUBJECT = gql`
  query mySubject {
    mySubject {
      id
      name
      color
      bgColor
      dragBgColor
      borderColor
      bookMark
    }
  }
`;

export const MY_TODOLIST = gql`
  query myTodolist {
    myTodolist {
      id
      name
      finish
      finishAt
      subject {
        id
        name
        bgColor
        bookMark
      }
    }
  }
`;

export const EDIT_STUDYSET = gql`
  mutation editStudySet(
    $nonScheduleRecord: Boolean
    $autoRefresh: Boolean
    $autoRefreshTerm: Int
    $startScheduleTerm: Int
    $cutExtenTerm: Int
    $scheduleStart: Int
    $scheduleEnd: Int
  ) {
    editStudySet(
      nonScheduleRecord: $nonScheduleRecord
      autoRefresh: $autoRefresh
      autoRefreshTerm: $autoRefreshTerm
      startScheduleTerm: $startScheduleTerm
      cutExtenTerm: $cutExtenTerm
      scheduleStart: $scheduleStart
      scheduleEnd: $scheduleEnd
    )
  }
`;

export const CREATE_SCHEDULE = gql`
  mutation createSchedule(
    $option: String!
    $scheduleId: String!
    $days: [Boolean!]!
    $calendarId: String!
    $state: String!
    $title: String!
    $location: String!
    $start: String!
    $end: String!
    $userBookId: String!
  ) {
    createSchedule(
      option: $option
      scheduleId: $scheduleId
      days: $days
      calendarId: $calendarId
      state: $state
      title: $title
      location: $location
      start: $start
      end: $end
      userBookId: $userBookId
    )
  }
`;

export const DRAG_SCHEDULE = gql`
  mutation dragSchedule(
    $option: String!
    $scheduleId: String!
    $calendarId: String!
    $state: String!
    $title: String!
    $location: String!
    $start: String!
    $end: String!
    $userBookId: String!
  ) {
    dragSchedule(
      option: $option
      scheduleId: $scheduleId
      calendarId: $calendarId
      state: $state
      title: $title
      location: $location
      start: $start
      end: $end
      userBookId: $userBookId
    )
  }
`;

export const SEE_USERBOOK = gql`
  query seeUserBook {
    seeUserBook {
      id
      title
      subject {
        id
        name
      }
    }
  }
`;
