import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import Loader from '../../../../Components/Loader';
import WeekRange from '../../../../Components/Date/WeekRange';
import OtherSchedulePresenter from './OtherSchedulePresenter';
import useInput from '../../../../Hooks/useInput';
import { useQuery } from '@apollo/react-hooks';
import { MY_SCHEDULE, MY_SUBJECT } from './OtherScheduleQueries';
import useSelect from '../../../../Hooks/useSelect';
import useKey_oneUp from '../../../../Hooks/useKey_oneUp';

const LoaderWrapper = styled.div`
  margin: 100px 0px;
`;

const dayList = ['일', '월', '화', '수', '목', '금', '토'];
const fivemin = 1000 * 60 * 5;
const stateBox = ['자습', '강의'];

export default ({ defaultSet }) => {
  const start_range = (value) => value >= 0 && value <= 23 && value % 1 === 0;
  const end_range = (value) => value >= 1 && value <= 24 && value % 1 === 0;

  const cal = useRef(null);

  const [scheLoading, setScheLoading] = useState(false);
  const [infoView, setInfoView] = useState(false);
  const [infoSche, setInfoSche] = useState({});
  const [startRange, setStartRange] = useState('');
  const [endRange, setEndRange] = useState('');
  const [lastStart, setLastStart] = useState(defaultSet.scheduleStart);
  const [lastEnd, setLastEnd] = useState(defaultSet.scheduleEnd);
  const overhours = defaultSet.scheduleEnd - defaultSet.scheduleStart;
  const [scheHeight, setScheHeight] = useState(
    overhours < 11 ? '605px' : 605 + (overhours - 10) * 52 + 'px',
  );

  const scheduleStart = useInput(
    defaultSet.scheduleStart,
    start_range,
    undefined,
    true,
  );
  const scheduleEnd = useInput(
    defaultSet.scheduleEnd,
    end_range,
    undefined,
    true,
  );

  // ESC누르면 Popup 꺼지게
  useKey_oneUp('Escape', [infoView], [setInfoView]);
  // useKey_oneUp('Escape', [setInfoView]);

  const {
    data: scheduleData,
    refetch: scheduleRefetch,
    loading: scheduleLoading,
    networkStatus: schedulenetwork,
  } = useQuery(MY_SCHEDULE, { notifyOnNetworkStatusChange: true });
  const {
    data: subjectData,
    refetch: subjectRefetch,
    loading: subjectLoading,
    networkStatus: subjectnetwork,
  } = useQuery(MY_SUBJECT, { notifyOnNetworkStatusChange: true });

  if (
    (schedulenetwork === 4 || schedulenetwork === 7) &&
    (subjectnetwork === 4 || subjectnetwork === 7) &&
    !todolistLoading
  ) {
    return (
      <OtherSchedulePresenter
        cal={cal}
        startRange={startRange}
        setStartRange={setStartRange}
        endRange={endRange}
        setEndRange={setEndRange}
        scheduleList={scheduleData.mySchedule}
        schedulenetwork={schedulenetwork}
        subjectList={subjectData.mySubject}
        subjectnetwork={subjectnetwork}
        scheduleStart={scheduleStart}
        scheduleEnd={scheduleEnd}
        scheHeight={scheHeight}
        lastStart={lastStart}
        lastEnd={lastEnd}
        infoView={infoView}
        setInfoView={setInfoView}
        infoSche={infoSche}
        setInfoSche={setInfoSche}
        scheLoading={scheLoading}
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
