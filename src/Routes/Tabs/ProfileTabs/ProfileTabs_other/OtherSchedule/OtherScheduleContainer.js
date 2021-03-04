import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Loader from '../../../../../Components/Loader';
import OtherSchedulePresenter from './OtherSchedulePresenter';
import useInput from '../../../../../Hooks/useInput';
import { useQuery } from '@apollo/react-hooks';
import { USER_SCHEDULE, USER_SUBJECT } from './OtherScheduleQueries';
import useKey_oneUp from '../../../../../Hooks/useKey_oneUp';

const LoaderWrapper = styled.div`
  margin: 100px 0px;
`;

export default ({ userData }) => {
  const start_range = (value) => value >= 0 && value <= 23 && value % 1 === 0;
  const end_range = (value) => value >= 1 && value <= 24 && value % 1 === 0;

  const cal = useRef(null);

  const [infoView, setInfoView] = useState(false);
  const [infoSche, setInfoSche] = useState({});
  const [startRange, setStartRange] = useState('');
  const [endRange, setEndRange] = useState('');
  const overhours =
    userData.studyDefaultSet.scheduleEnd -
    userData.studyDefaultSet.scheduleStart;
  const [scheHeight, setScheHeight] = useState(
    overhours < 11 ? '605px' : 605 + (overhours - 10) * 52 + 'px',
  );

  const scheduleStart = useInput(
    userData.studyDefaultSet.scheduleStart,
    start_range,
    undefined,
    true,
  );
  const scheduleEnd = useInput(
    userData.studyDefaultSet.scheduleEnd,
    end_range,
    undefined,
    true,
  );

  // ESC누르면 Popup 꺼지게
  useKey_oneUp('Escape', [infoView], [setInfoView]);
  // useKey_oneUp('Escape', [setInfoView]);

  const { data: scheduleData, networkStatus: schedulenetwork } = useQuery(
    USER_SCHEDULE,
    {
      variables: { userId: userData.id },
      notifyOnNetworkStatusChange: true,
    },
  );
  const { data: subjectData, networkStatus: subjectnetwork } = useQuery(
    USER_SUBJECT,
    {
      variables: { userId: userData.id },
      notifyOnNetworkStatusChange: true,
    },
  );

  if (
    (schedulenetwork === 4 || schedulenetwork === 7) &&
    (subjectnetwork === 4 || subjectnetwork === 7)
  ) {
    return (
      <OtherSchedulePresenter
        cal={cal}
        startRange={startRange}
        setStartRange={setStartRange}
        endRange={endRange}
        setEndRange={setEndRange}
        scheduleList={scheduleData.userSchedule}
        schedulenetwork={schedulenetwork}
        subjectList={subjectData.userSubject}
        subjectnetwork={subjectnetwork}
        scheduleStart={scheduleStart}
        scheduleEnd={scheduleEnd}
        scheHeight={scheHeight}
        setScheHeight={setScheHeight}
        infoView={infoView}
        setInfoView={setInfoView}
        infoSche={infoSche}
        setInfoSche={setInfoSche}
      />
    );
  } else {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  }
};
