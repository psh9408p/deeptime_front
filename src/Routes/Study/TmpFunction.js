// 24시간 도넛 차트 보관
<>
  <DonutWrap>
    <DonutChart_today
      data={isAm ? donutData_am : donutData_pm}
      color={isAm ? rgbBox_am : rgbBox_pm}
      title={'Today           Time Log'}
      // labels={[
      //   'Deep Time',
      //   '부재 시간' + '　' + '　' + '　' + '　',
      //   '나머지 시간',
      // ]}
    />
  </DonutWrap>
  <TotalTimeWrap>
    <TotalNumber>
      <p style={{ marginBottom: '5px' }}>학습 시간</p>
      <span>
        {total_hour.length === 1 ? '0' + total_hour : total_hour} :{' '}
        {total_min.length === 1 ? '0' + total_min : total_min}
      </span>
    </TotalNumber>
    <TotalNumber>
      /{target_hour.length === 1 ? '0' + target_hour : target_hour} :{' '}
      {target_min.length === 1 ? '0' + target_min : target_min}
    </TotalNumber>
    <DonutLabel>
      <span style={{ color: '#0F4C82' }}>■</span> 학습 시간
    </DonutLabel>
    <DonutLabel>
      <span style={{ color: 'rgba(233, 236, 244, 1)' }}>■</span>부재 시간
    </DonutLabel>
    <DonutLabel>
      <span style={{ color: '#EAD6D4' }}>■</span> 나머지 시간
    </DonutLabel>
  </TotalTimeWrap>
  <ClockBox>
    <Clock24 />
  </ClockBox>
  <TimeButton
    onClick={() => {
      setIsAm(!isAm);
    }}
  >
    {isAm ? 'AM' : 'PM'}
  </TimeButton>
  <TodayPercent>{donutPercent}%</TodayPercent>
</>;


  // Today 도넛 차트 am pm 자동 전환
  // useEffect(() => {
  //   const nowDate = new Date();
  //   const { startDate, endDate } = todayDateRange(nowDate);
  //   if (isAm) {
  //     //43200000 12시간
  //     const restTime = startDate.getTime() + 43200000 - nowDate.getTime();
  //     const setTime = isFirstRun.current ? restTime : 43200000;
  //     setTimeout(() => {
  //       setIsAm(false);
  //     }, setTime);
  //   } else {
  //     const restTime = endDate.getTime() - nowDate.getTime();
  //     const setTime = isFirstRun.current ? restTime : 43200000;
  //     setTimeout(() => {
  //       setIsAm(true);
  //     }, setTime);
  //   }
  // }, [isAm]);