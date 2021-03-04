import { gql } from 'apollo-boost';

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
