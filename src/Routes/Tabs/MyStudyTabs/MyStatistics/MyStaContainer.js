import React, { useState } from 'react';
import ClassStaPresenter from './MyStaPresenter';
import useTabs from '../../../../Hooks/useTabs';
import { useQuery } from 'react-apollo-hooks';
import { ME } from './MyStaQueries';
import useInput from '../../../../Hooks/useInput';

export default ({ myData }) => {
  const StaTabContents = ['Today', 'Week', 'Month'];
  const StaTabs = useTabs(0, StaTabContents);
  const minValue_10 = (value) => value >= 10;
  const refreshTerm = useInput(10, minValue_10);
  const [selectDate, setSelectDate] = useState(new Date());
  const oneDayHours = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8 ',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
  ];

  const {
    data: myInfoData,
    loading: myInfoLoading,
    refetch: myInfoRefetch,
    networkStatus,
  } = useQuery(ME, {
    pollInterval: Number(refreshTerm.value) * 1000,
    notifyOnNetworkStatusChange: true,
  });

  return (
    <ClassStaPresenter
      StaTabs={StaTabs}
      selectDate={selectDate}
      setSelectDate={setSelectDate}
      scheduleList={myData.schedules}
      myInfoData={myInfoData.me}
      myInfoLoading={myInfoLoading}
      myInfoRefetch={myInfoRefetch}
      networkStatus={networkStatus}
      refreshTerm={refreshTerm}
      oneDayHours={oneDayHours}
    />
  );
};
