import React, { useState } from 'react';
import { CREATE_CLEARRECORD, SEE_USERBOOK } from './ProgressAnalysisQueries';
import ProgressAnalysisPresenter from './ProgressAnalysisPresenter';
import styled from 'styled-components';
import Loader from '../../../../Components/Loader';
import { useMutation, useQuery } from '@apollo/react-hooks';
import useInput from '../../../../Hooks/useInput';
import { toast } from 'react-toastify';
import BookAnalysis from '../BookAnalysis';
import { MY_SUBJECT } from '../MySchedule/MyScheduleQueries';

const LoaderWrapper = styled.div`
  min-height: 100vh;
  padding: 100px 0;
`;

export default () => {
  const positive = (value) => value >= 0;
  const startPage = useInput(1, positive);
  const endPage = useInput(10, positive);

  const [finishDate, setFinishDate] = useState(new Date());
  const [viewForm, setViewForm] = useState('default');

  const {
    data: userbookData,
    refetch: uesrbookRefetch,
    loading: userbookLoading,
  } = useQuery(SEE_USERBOOK);
  const {
    data: subjectData,
    refetch: subjectRefetch,
    loading: subjectLoading,
  } = useQuery(MY_SUBJECT);

  const [createClearRecordMutation] = useMutation(CREATE_CLEARRECORD);

  const onCreateRecord = async (userbook, close) => {
    // e.preventDefault();
    if (
      startPage.value < userbook.startPage_target ||
      endPage.value > userbook.endPage_target
    ) {
      alert(
        `입력한 페이지가 교재 학습 범위인 ${userbook.startPage_target}~${userbook.endPage_target}페이지를 벗어납니다.`,
      );
      return;
    }

    try {
      toast.info('교재 진도 입력 중...');
      const {
        data: { createClearRecord },
      } = await createClearRecordMutation({
        variables: {
          startPage: Number(startPage.value),
          endPage: Number(endPage.value),
          userBookId: userbook.id,
          clearDate: finishDate,
        },
      });
      if (!createClearRecord) {
        alert('교재 진도를 입력할 수 없습니다.');
      } else {
        close();
        uesrbookRefetch();
        toast.success('교재 진도 입력이 완료됐습니다.');
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  if (userbookLoading || subjectLoading) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  } else if (viewForm === 'default') {
    return (
      <ProgressAnalysisPresenter
        userbooks={userbookData.seeUserBook}
        startPage={startPage}
        endPage={endPage}
        finishDate={finishDate}
        setFinishDate={setFinishDate}
        onCreateRecord={onCreateRecord}
        setViewForm={setViewForm}
      />
    );
  } else {
    return (
      <BookAnalysis
        setViewForm={setViewForm}
        subjectList={subjectData.mySubject}
      />
    );
  }
};
