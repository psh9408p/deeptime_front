import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import OtherStaPresenter from './OtherStaPresenter';
import useTabs from '../../../../../Hooks/useTabs';
import { useQuery } from '@apollo/react-hooks';
import { GET_USER } from './OtherStaQueries';
import Loader from '../../../../../Components/Loader';

const LoaderWrapper = styled.div`
  min-height: 100vh;
  padding: 100px 0;
`;

export default ({ userData }) => {
  const StaTabContents = ['Today', 'Week', 'Month'];
  const StaTabs = useTabs(0, StaTabContents);
  const [selectDate, setSelectDate] = useState(new Date());
  const [selectPercent, setSelectPercent] = useState(false);
  const [selectPercent2, setSelectPercent2] = useState(false);
  const oneDayHours_tmp = Array.from(Array(24).keys());
  const oneDayHours = oneDayHours_tmp.map(String);
  const todayCalLoading = useRef(true);
  const weekCalLoading = useRef(true);
  const monthCalLoading = useRef(true);

  // 임시 쿼리
  const { data: userInfoData, networkStatus } = useQuery(GET_USER, {
    variables: { username: userData.username },
    notifyOnNetworkStatusChange: true,
  });

  if (networkStatus === 1) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  } else {
    return (
      <OtherStaPresenter
        StaTabs={StaTabs}
        selectDate={selectDate}
        setSelectDate={setSelectDate}
        myInfoData={userInfoData.seeUser}
        networkStatus={networkStatus}
        oneDayHours={oneDayHours}
        todayCalLoading={todayCalLoading}
        weekCalLoading={weekCalLoading}
        monthCalLoading={monthCalLoading}
        selectPercent={selectPercent}
        setSelectPercent={setSelectPercent}
        selectPercent2={selectPercent2}
        setSelectPercent2={setSelectPercent2}
      />
    );
  }
};
