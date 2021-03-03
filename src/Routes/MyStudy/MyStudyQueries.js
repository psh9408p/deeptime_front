import { gql } from 'apollo-boost';

export const MY_STUDYDEFAULTSET = gql`
  query myStudyDefaultSet {
    myStudyDefaultSet {
      id
      timelapseRecord
      nonScheduleRecord
      autoRefresh
      autoRefreshTerm
      startScheduleTerm
      cutExtenTerm
      scheduleStart
      scheduleEnd
      dDayOn
      dDateName
      dDate
    }
  }
`;
