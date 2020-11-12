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
