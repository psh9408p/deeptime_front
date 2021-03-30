import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import MyStaPresenter from './MyStaPresenter';
import useTabs from '../../../../Hooks/useTabs';
import html2canvas from 'html2canvas';
import moment from 'moment';
import { useQuery } from '@apollo/react-hooks';
import { ME } from './MyStaQueries';
import Loader from '../../../../Components/Loader';

const LoaderWrapper = styled.div`
  min-height: 100vh;
  padding: 100px 0;
`;

export default ({ isSelf = true }) => {
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
  const {
    data: myInfoData,
    refetch: myInfoRefetch,
    networkStatus,
  } = useQuery(ME, { notifyOnNetworkStatusChange: true });

  const onImgSave = () => {
    const saveAs = (uri, filename) => {
      var link = document.createElement('a');
      if (typeof link.download === 'string') {
        link.href = uri;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        window.open(uri);
      }
    };

    const now_Date = new Date();
    const file_tail = moment(now_Date).format('YYMMDD_HHmmss');
    const canvas_top = document.querySelector('#staCapture_top');
    const canvas_bottom = document.querySelector('#staCapture_bottom');
    html2canvas(canvas_top, { width: canvas_top.clientWidth + 20 }).then(
      (canvas) => {
        // document.body.appendChild(canvas);
        saveAs(
          canvas.toDataURL('image/png'),
          'deeptime_stats_' + file_tail + '_1.png',
        );
      },
    );
    // html2canvas(canvas_bottom, { width: canvas_bottom.clientWidth + 20 }).then(
    //   (canvas) => {
    //     // document.body.appendChild(canvas);
    //     saveAs(
    //       canvas.toDataURL('image/png'),
    //       'deeptime_stats_' + file_tail + '_2.png',
    //     );
    //   },
    // );
  };

  if (networkStatus === 1) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  } else {
    return (
      <MyStaPresenter
        StaTabs={StaTabs}
        selectDate={selectDate}
        setSelectDate={setSelectDate}
        myInfoData={myInfoData.me}
        myInfoRefetch={myInfoRefetch}
        networkStatus={networkStatus}
        oneDayHours={oneDayHours}
        todayCalLoading={todayCalLoading}
        weekCalLoading={weekCalLoading}
        monthCalLoading={monthCalLoading}
        selectPercent={selectPercent}
        setSelectPercent={setSelectPercent}
        selectPercent2={selectPercent2}
        setSelectPercent2={setSelectPercent2}
        onImgSave={onImgSave}
        isSelf={isSelf}
      />
    );
  }
};
