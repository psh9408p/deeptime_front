import React from 'react';
import StackChart from '../../../../Components/Charts/StackChart';
import WeekRange from '../../../../Components/Date/WeekRange';

export default ({ userbook }) => {
  // 이번주에 날짜인지 검증
  const isthisWeekCal = (inputDate) => {
    const refDate = new Date(inputDate);
    const { real_weekStart, real_weekEnd } = WeekRange(new Date()); // 해당 주의 시작과 끝
    return refDate >= real_weekStart && refDate < real_weekEnd;
  };

  let inputData = []; // 그래프에 넣을 최종 데이터
  const records = userbook.clearRecords;

  // 해당 교제의 시작 페이지가 혹시 1보다 크면 앞에 부분은 빈공간으로 채워줌
  if (userbook.startPage_target > 1) {
    inputData.push({
      backgroundColor: 'white',
      data: [userbook.startPage_target - 1],
    });
  }

  let nextIndex = 0; // 작업해야할 record 인덱스
  let nextStartPage = userbook.startPage_target; // 작업할 다음 시작 페이지
  const emptyArray = []; // 빈공간 데이터 인덱스 모음
  while (true) {
    // 작업(추가)할 record가 남았는지?
    if (records.length > nextIndex) {
      //남은 시작페이지가 다음 record에 포함안되면 앞에 공백 채워줘야됨
      if (nextStartPage !== records[nextIndex].startPage) {
        // 다음 기록 시작 전까지 공백 넣어주기
        emptyArray.push(inputData.length); // 공백 넣을 인덱스 기록
        inputData.push({
          backgroundColor: 'white',
          data: [records[nextIndex].startPage - nextStartPage],
          clearDate: new Date('December 17, 1995 03:24:00'), // 공백이니까 옛날 임의 데이터넣기
        });
        nextStartPage += records[nextIndex].startPage - nextStartPage;
      }
      // 기록 넣어주기
      const amount = records[nextIndex].totalPage;
      const isThisWeek = isthisWeekCal(records[nextIndex].clearDate); //이번주 기록인지
      inputData.push({
        backgroundColor: isThisWeek ? '#7AC6FC' : '#008EFC',
        data: [amount],
        clearDate: new Date(records[nextIndex].clearDate),
      });
      nextIndex += 1;
      nextStartPage += amount;
    } else {
      // 다음 시작 지점이 책 끝을 넘는지 (넘으면 빈공간이 없는거)
      if (nextStartPage > userbook.endPage_target) {
        break;
      } else {
        //마지막 부분까지 공백 넣기
        emptyArray.push(inputData.length); // 공백 넣을 인덱스 기록
        inputData.push({
          backgroundColor: 'white',
          data: [userbook.endPage_target - nextStartPage + 1],
          clearDate: new Date('December 17, 1995 03:24:00'), // 공백이니까 옛날 임의 데이터넣기
        });
        break;
      }
    }
  }

  // 이번주 남은 목표양 계산
  // 빈공간이 없으면 이번주 남은 목표를 계산할 필요가 없음
  if (emptyArray.length !== 0) {
    let thisWeekPage = 0; // 이번주 할당 총페이지
    if (isthisWeekCal(userbook.startDate_target)) {
      // 교재학습 시작이 이번주에 걸치는지
      const startDate = new Date(userbook.startDate_target);
      const studyDay = 7 - startDate.getDay(); // 이번주에 몇일 공부해야하는지
      thisWeekPage = studyDay * userbook.pageOfDay;
    } else if (isthisWeekCal(userbook.endDate_target)) {
      // 교재학습 끝이 이번주에 걸치는지
      const endDate = new Date(userbook.endDate_target);
      const studyDay = 7 - endDate.getDay(); // 이번주에 몇일 공부해야하는지
      thisWeekPage = studyDay * userbook.pageOfDay;
    } else {
      const studyDay = 7; // 이번주에 몇일 공부해야하는지
      thisWeekPage = studyDay * userbook.pageOfDay;
    }
    thisWeekPage = Math.ceil(thisWeekPage); // 소숫점 올림

    // 이번주에 이미 학습한 페이지 수를 알기위해 이번주 기록 추출
    const thisWeekRecords = inputData.filter(
      (a) => a.backgroundColor === '#7AC6FC',
    );
    let clearPage = 0; // 이번주 완료한 페이지
    thisWeekRecords.map((record) => {
      clearPage += record.data[0];
    });
    let remainPage = thisWeekPage - clearPage; //이번주에 남은 할당량 페이지
    // 이번주 남은 할당량이 없으면 목표치 기록 필요 없음
    if (remainPage > 1) {
      // 가장 최근에 학습한 기록 찾기
      const lastDate = Math.max(...inputData.map((data) => data.clearDate));
      // inputData에서 최근 학습 기록 인덱스 찾기
      const lastIndex = inputData.findIndex(
        (data) => data.clearDate.getTime() === lastDate,
      );
      // 빈공간 인덱스 저장 배열을 최신 학습 기록 뒤로 부터 순서대로 재정렬
      const firstIndex = emptyArray.findIndex((a) => a > lastIndex);
      let emptyArray2 = [];
      if (firstIndex > 0) {
        emptyArray2 = emptyArray.slice(firstIndex);
        emptyArray2.push(...emptyArray.slice(0, firstIndex));
      } else {
        // 최신 바로 뒤에오는 빈데이터가 맨 앞이거나 없으면 재배열 필요x
        emptyArray2 = emptyArray;
      }
      // 빈공간 개수만큼 탐색해서 남은 목표 채워나가기
      for (var j = 0; j < emptyArray2.length; j++) {
        const nowData = inputData[emptyArray2[j]];
        // 해당 빈공간 빼고 앞뒤로 자르기
        const frontData = inputData.slice(0, emptyArray2[j]);
        const backData = inputData.slice(emptyArray2[j] + 1);
        if (nowData.data[0] > remainPage) {
          const midData = [
            {
              backgroundColor: '#D6EEFF',
              data: [remainPage],
            },
            {
              backgroundColor: 'white',
              data: [nowData.data[0] - remainPage],
            },
          ];
          inputData = [...frontData, ...midData, ...backData];
          break;
        } else {
          const midData = [
            {
              backgroundColor: '#D6EEFF',
              data: [nowData.data[0]],
            },
          ];
          inputData = [...frontData, ...midData, ...backData];
          // 빈공간 크기와 목표가 완전 똑같으면 또 for loop 돌필요가 없음
          if (nowData.data[0] === remainPage) {
            break;
          }
          remainPage = remainPage - nowData.data[0];
        }
      }
    }
  }

  return (
    <StackChart
      inputData={inputData}
      start={userbook.startPage_target}
      end={userbook.endPage_target}
    />
  );
};
