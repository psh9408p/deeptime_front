import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Loader from '../../../Components/Loader';
import MyStatistics from './MyStatistics';
import MySchedule from './MySchedule';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import Countdown from 'react-countdown';

const LoaderWrapper = styled.div`
  margin: 100px 0px;
  font-size: 16px;
  font-weight: 600;
`;

const MassageDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 0 10px 0;
`;

const CountDownDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 0 10px 0;
`;

const RedDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
`;

export default ({
  pageIndex,
  myInfoData,
  myInfoRefetch,
  networkStatus,
  refreshTerm,
  startPolling,
  stopPolling,
  createDefaultSubjectMutation,
  loadingToggle,
  setLoadingToggle,
  setPageIndex,
}) => {
  let history = useHistory();

  const createFunc = async () => {
    try {
      const {
        data: { createDefaultSubject },
      } = await createDefaultSubjectMutation();
      if (!createDefaultSubject) {
        history.push(`/${myInfoData.me.username}`);
        alert(
          '기본 과목 세팅이 불가능해,\n나의 학습 이용이 불가합니다.\n고객센터로 문의하세요.',
        );
      } else {
        await myInfoRefetch();
        setLoadingToggle(false);
        toast.success('기본 과목 세팅이 완료되었습니다.');
      }
    } catch (e) {
      history.push(`/${myInfoData.me.username}`);
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      if (!myInfoData.me.setDefaultSubject) {
        createFunc();
      } else {
        setLoadingToggle(false);
      }
      isFirstRun.current = false;
      return;
    }
    myInfoRefetch();
  }, []);

  if (loadingToggle) {
    return (
      <LoaderWrapper>
        <Loader />
        <MassageDiv>[약 1~2분 소요] 기본 과목 세팅 중...</MassageDiv>
        <CountDownDiv>
          <Countdown date={Date.now() + 120000} />
        </CountDownDiv>
        <RedDiv>인터넷 창을 끄지 말아주세요!</RedDiv>
      </LoaderWrapper>
    );
  } else {
    if (pageIndex === 0) {
      startPolling(Number(refreshTerm.value) * 1000);
      return (
        <MyStatistics
          myInfoData={myInfoData}
          networkStatus={networkStatus}
          refreshTerm={refreshTerm}
        />
      );
    } else if (pageIndex === 1) {
      stopPolling();
      return (
        <MySchedule
          pageIndex={pageIndex}
          myInfoData={myInfoData}
          myInfoRefetch={myInfoRefetch}
          networkStatus={networkStatus}
        />
      );
    }
  }
};
