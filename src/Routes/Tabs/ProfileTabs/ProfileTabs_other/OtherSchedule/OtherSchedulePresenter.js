import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Popup from 'reactjs-popup';
import TUICalendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import PopupClose from '../../../../../Components/Buttons/PopupClose';
import FatText from '../../../../../Components/FatText';
import { Button_setting } from '../../../../../Components/Buttons/Button_click';
import Input_100 from '../../../../../Components/Input_100';
import PopupButton_solo from '../../../../../Components/Buttons/PopupButton_solo';

const Wrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  position: relative;
`;

const ControlButton = styled.button`
  border: ${(props) => props.theme.boxBorder};
  height: 30px;
  width: 80px;
  border-radius: 15px;
  font-weight: 600;
  text-align: center;
  padding: 5px 0px;
  font-size: 15px;

  background-color: white;
  cursor: pointer;
  :focus {
    outline: none;
    box-shadow: 0 0 0 1px black;
  }
  &:not(:first-child) {
    margin-left: 5px;
  }
  &:nth-child(2) {
    width: 30px;
    background: url('https://slog-iam.s3.ap-northeast-2.amazonaws.com/icon/Previous_icon.png')
      no-repeat;
    background-color: white;
    background-position: center center;
    background-size: 15px;
  }
  &:nth-child(3) {
    width: 30px;
    background: url('https://slog-iam.s3.ap-northeast-2.amazonaws.com/icon/Next_icon.png')
      no-repeat;
    background-color: white;
    background-position: center center;
    background-size: 15px;
    margin-right: 10px;
  }
`;

const PanelWrap = styled.div`
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 15px 0px 5px 0px;
`;

const DateRangeWrap = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const SelectDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  height: 100%;
  min-width: 200px;
  margin-left: auto;
`;

const SaveButtonDiv = styled.div`
  width: 40px;
`;

const SubjectButtonDiv = styled.div`
  width: 100px;
  height: 35px;
  margin-right: 10px;
`;

const PopupCustom = styled(Popup)`
  &-content {
    width: 440px !important;
    height: 480px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${(props) => props.theme.borderRadius};
  }
`;

const PopupCustom5 = styled(PopupCustom)`
  &-content {
    width: 400px !important;
  }
`;

const PopupCustom2 = styled(PopupCustom)`
  &-content {
    width: 400px !important;
    height: 530px !important;
  }
`;

const PopupCustom3 = styled(PopupCustom)`
  &-content {
    width: 260px !important;
    height: 180px !important;
  }
`;

const PopupCustom4 = styled(PopupCustom)`
  &-content {
    width: 480px !important;
    height: 130px !important;
  }
`;

const PopupCustom6 = styled(PopupCustom)``;

const PopupCustom7 = styled(PopupCustom)`
  &-content {
    width: 300px !important;
    height: 200px !important;
  }
`;

const PopupCustom8 = styled(PopupCustom)`
  &-content {
    width: 460px !important;
    height: 180px !important;
  }
`;

const PopupCustom9 = styled(PopupCustom)`
  &-content {
    width: 360px !important;
    height: 110px !important;
  }
`;

const PopupCustom10 = styled(PopupCustom)`
  &-content {
    width: 410px !important;
    height: 170px !important;
  }
`;

const PBody2 = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
`;

const PBody = styled(PBody2)``;

const PTitle = styled(FatText)`
  font-size: 18px;
  text-align: center;
  margin-bottom: 30px;
`;

const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const InputWrapper = styled.div`
  width: 320px;
  margin-bottom: 20px;
`;

const InputWrapper2 = styled.div`
  margin-left: 10px;
  width: 225px;
`;

const ColorWrapper = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SubTitle = styled(FatText)`
  font-size: 14px;
  text-align: center;
  margin-bottom: 10px;
`;

const SelectWrapDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SelectWrapDiv2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const SelectWrapper = styled.div`
  width: 200px;
  height: 35px;
  margin-bottom: 30px;
`;

const SelectWrapper2 = styled(SelectWrapper)`
  margin-bottom: 10px;
`;

const SelectWrapper3 = styled.div`
  width: 123px;
  height: 35px;
`;

const ThreeButtonWrap = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const RedButtonWrap = styled.div`
  width: 68px;
  margin: 0px 0px 10px 10px;
`;

const SpaceDiv = styled.div`
  width: 10px;
`;

const ListWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;

const IndiviList = styled.div`
  display: flex;
  align-items: center;
  padding-left: 15px;
  font-size: 14px;
  height: 100%;
  background-color: ${(props) => (props.isOdd ? '#FAFAFA' : '#c7c7c7')};
`;

const BookMarkTitle = styled.div`
  border: ${(props) => props.theme.boxBorder};
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 372px;
  height: 25px;
  color: white;
  background-color: ${(props) => props.theme.classicBlue};
  border-top-right-radius: ${(props) => props.theme.borderRadius};
  border-top-left-radius: ${(props) => props.theme.borderRadius};
`;

const TodolistTitle = styled(BookMarkTitle)`
  width: 452px;
`;

const TodolistTitle2 = styled(BookMarkTitle)`
  width: 492px;
`;

const BookLeft = styled.div`
  display: flex;
  align-items: center;
  width: 133px;
  height: 100%;
  font-weight: 600;
  font-size: 14px;
  padding-left: 15px;
  border-right: 2px solid white;
`;

const BookRight = styled.div`
  display: flex;
  align-items: center;
  width: 220px;
  height: 100%;
  padding-left: 10px;
  font-weight: 600;
  font-size: 14px;
  border-right: 2px solid white;
`;

const FinishDateDiv = styled.div`
  display: flex;
  align-items: center;
  width: 80px;
  height: 100%;
  padding-left: 10px;
  font-weight: 600;
  font-size: 14px;
  border-right: 2px solid white;
`;

const BookLeft2 = styled(BookLeft)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 57px;
  padding: 0;
`;

const BookRight2 = styled(BookRight)`
  width: 315px;
`;

const BookRight3 = styled(BookRight)`
  width: 220px;
  height: 100%;
  border-right: 2px solid white;
`;

const ColorBox = styled.div`
  height: ${(props) => props.size};
  width: ${(props) => props.size};
  background-color: ${(props) => props.bgColor};
  margin-right: 10px;
  border-radius: ${(props) => props.radius};
`;

const ColorBox2 = styled(ColorBox)`
  margin-left: 10px;
`;

const CheckBoxWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  border-right: 2px solid #e6e6e6;
  border-color: ${(props) => (props.isOdd ? '#c7c7c7' : '#FAFAFA')};
`;

const TaskNameDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 255px;
  height: 100%;
`;

const NewTodoDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 450px;
  height: 40px;
  margin-bottom: 20px;
`;

const TaskName_todo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  width: 90px;
  padding-right: 10px;
  border-right: 2px solid #e6e6e6;
  border-color: ${(props) => (props.isOdd ? '#c7c7c7' : '#FAFAFA')};
`;

const TodoNameDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 220px;
  height: 100%;
  padding: 0 10px;
  border-right: 2px solid #e6e6e6;
  border-color: ${(props) => (props.isOdd ? '#c7c7c7' : '#FAFAFA')};
`;

const TodoIconDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
`;

const TodoIconDiv2 = styled(TodoIconDiv)`
  &:last-child {
    justify-content: flex-start;
  }
`;

const TodoFinishDiv = styled.div`
  display: flex;
  align-items: center;
  width: 80px;
  height: 100%;
  padding-left: 10px;
  font-size: 16px;
  border-right: 2px solid #e6e6e6;
  border-color: ${(props) => (props.isOdd ? '#c7c7c7' : '#FAFAFA')};
`;

const SetContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const SetContentBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const RefreshInputWrap = styled.div`
  width: 70px;
  height: 30px;
`;

const WeekWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

const DateIndi = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
`;

const NextWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32.5px;
  width: 20%;
`;

const DatePickButton = styled.button`
  border: 0;
  outline-color: black;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.classicGray};
  margin: ${(props) => props.margin};
  font-weight: 600;
  color: black;
  text-align: center;
  padding: 7px 10px;
  font-size: 12px;
  width: ${(props) => props.width};
  cursor: pointer;
`;

const DayWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

const DayIndiWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const SelectInL = styled.div`
  width: 143px;
  height: 28px;
  margin-right: 17px;
`;

const SelectInR = styled.div`
  width: 50px;
  height: 28px;
`;

const NewScheContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 210px;
  height: 25px;
  margin-bottom: 5px;
  font-weight: 600;
  margin-top: 10px;
`;

const DateTotalDiv = styled(NewScheContent)`
  height: auto;
`;

const DateWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
`;

const DateContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DateContent2 = styled(DateContent)`
  justify-content: flex-end;
`;

const SelectWrap = styled(NewScheContent)`
  margin-top: 20px;
`;

const BlackBack = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
`;

const CustomPopup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 310px;
  height: 410px;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: white;
`;

const CustomPopup2 = styled(CustomPopup)`
  border-top: 4px solid ${(props) => props.color};
  height: auto;
  width: 390px;
  padding: 20px;
`;

const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;

  p {
    &:first-child {
      font-size: 18px;
      font-weight: bold;
      color: ${(props) => props.color};
      margin-bottom: 5px;
    }
    &:nth-child(2) {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    &:nth-child(3) {
      font-size: 15px;
      margin-bottom: 5px;
    }
    &:last-child {
      color: ${(props) => props.theme.darkGreyColor};
    }
  }
`;

let schedules = [];
let calendars = [];

let isFirstRun = true;
let isRefectRun = false;
let isRefectRun2 = false;

export default ({
  cal,
  startRange,
  setStartRange,
  endRange,
  setEndRange,
  scheduleList,
  schedulenetwork,
  subjectList,
  subjectnetwork,
  scheHeight,
  setScheHeight,
  scheduleStart,
  scheduleEnd,
  infoView,
  setInfoView,
  infoSche,
  setInfoSche,
}) => {
  //과목 종류 넣기
  const inputCalendars = () => {
    const calendars_tmp = subjectList.map((subject) => {
      if (subject.bookMark) {
        return subject;
      }
    });
    calendars = calendars_tmp.filter(function (el) {
      return el !== undefined;
    });
  };

  //스케줄 넣기
  const inputSchedules = () => {
    schedules = scheduleList.map((List) => {
      let category = 'time';
      const endDate = new Date(List.end);
      if (List.isAllDay === true) {
        category = 'allday';
        endDate.setTime(endDate.getTime() - 1000);
      }
      const schedule_tmp = {
        calendarId: List.subject ? List.subject.id : '',
        isAllDay: List.isAllDay,
        isPrivate: List.isPrivate,
        category,
        location: List.location,
        isVisible: true,
        title: List.title,
        state: List.state,
        id: List.id,
        start: new Date(List.start),
        end: endDate,
        totalTime: new Date(List.totalTime),
      };
      return schedule_tmp;
    });
  };

  const handleClickNextButton = () => {
    // 캘린더 데이터 변경
    const calendarInstance = cal.current.getInstance();
    calendarInstance.next();
    setStartRange(
      moment(calendarInstance.getDateRangeStart()._date).format('YYYY.MM.DD'),
    );
    setEndRange(
      moment(calendarInstance.getDateRangeEnd()._date).format('YYYY.MM.DD'),
    );
  };
  const handleClickPrevButton = () => {
    // 캘린더 데이터 변경
    const calendarInstance = cal.current.getInstance();
    calendarInstance.prev();
    setStartRange(
      moment(calendarInstance.getDateRangeStart()._date).format('YYYY.MM.DD'),
    );
    setEndRange(
      moment(calendarInstance.getDateRangeEnd()._date).format('YYYY.MM.DD'),
    );
  };
  const handleClickTodayButton = () => {
    const calendarInstance = cal.current.getInstance();

    calendarInstance.today();
  };

  const onClickSchedule = useCallback((e) => {
    const subjectInfo = calendars.find(
      (cal) => cal.id === e.schedule.calendarId,
    );
    if (subjectInfo) {
      e.schedule.calendarName = subjectInfo.name;
    }
    setInfoView(true);
    setInfoSche(e.schedule);
  }, []);

  function _getFormattedTime(time) {
    const date = new Date(time);
    const h = date.getHours();
    const m = date.getMinutes();

    return `${h}:${m}`;
  }

  function _getTimeTemplate(schedule, isAllDay) {
    var html = [];
    // console.log(schedule);
    if (!isAllDay) {
      html.push('<strong>' + _getFormattedTime(schedule.start) + '</strong> ');
    }
    // if (schedule.isPrivate) {
    //   html.push('<span class="calendar-font-icon ic-lock-b"></span>');
    //   html.push('🔒 Private');
    // } else {
    if (schedule.isPrivate) {
      html.push('🔒 ');
    }

    if (schedule.isReadOnly) {
      html.push('<span class="calendar-font-icon ic-readonly-b"></span>');
    } else if (schedule.recurrenceRule) {
      html.push('<span class="calendar-font-icon ic-repeat-b"></span>');
    } else if (schedule.attendees.length) {
      html.push('<span class="calendar-font-icon ic-user-b"></span>');
    } else if (schedule.location) {
      html.push('<span class="calendar-font-icon ic-location-b"></span>');
    }
    const subjectIdList = subjectList.map((subject) => {
      return subject.id;
    });
    const subjectIndex = subjectIdList.indexOf(schedule.calendarId);
    if (subjectIndex > -1) {
      html.push(
        ' ' + '[' + subjectList[subjectIndex].name + ']' + ' ' + schedule.title,
      );
    } else {
      html.push(' ' + schedule.title);
    }
    return html.join('');
  }

  const templates = {
    time: function (schedule) {
      // console.log(schedule)
      return _getTimeTemplate(schedule, false);
    },
    popupStateFree: function () {
      return '강의';
    },
    popupStateBusy: function () {
      return '자습';
    },
    popupSave: function () {
      return '입력';
    },
    popupUpdate: function () {
      return '수정';
    },
    popupEdit: function () {
      return '수정';
    },
    popupDelete: function () {
      return '삭제';
    },
    titlePlaceholder: function () {
      return '(필수) 제목';
    },
    locationPlaceholder: function () {
      return '(선택) 위치';
    },
  };

  // 맨처음 스케줄, 과목 넣기
  if (isFirstRun) {
    isFirstRun = false;
    inputCalendars();
    inputSchedules();
  }
  // 과목의 리페치가 완료되야지만 새로운 과목&스케줄 넣기
  if (subjectnetwork === 4) {
    isRefectRun2 = true;
  }
  if (isRefectRun2 && subjectnetwork === 7) {
    inputCalendars();
  }
  // 스케줄의 리페치가 완료되야지만 새로운 스케줄 넣기
  if (schedulenetwork === 4) {
    isRefectRun = true;
  }
  if (isRefectRun && schedulenetwork === 7) {
    isRefectRun = false;
    inputSchedules();
  }

  const TimeRangeDiv = (close) => {
    return (
      <PBody2>
        <PopupClose onClick={() => close()} />
        <PTitle text={'기본값 세팅'} />
        <SetContentWrap>
          <SetContentBox>
            스케줄러 시작 :　
            <RefreshInputWrap>
              <Input_100
                placeholder={''}
                {...scheduleStart}
                type={'number'}
                step={1}
              />
            </RefreshInputWrap>
            시　/　끝 :　
            <RefreshInputWrap>
              <Input_100
                placeholder={''}
                {...scheduleEnd}
                type={'number'}
                step={1}
              />
            </RefreshInputWrap>
            시
          </SetContentBox>
        </SetContentWrap>
        <ButtonDiv style={{ marginTop: '20px' }}>
          <PopupButton_solo
            type="button"
            onClick={() => {
              const diffHours = scheduleEnd.value - scheduleStart.value;
              setScheHeight(
                diffHours < 11 ? '605px' : 605 + (diffHours - 10) * 52 + 'px',
              );
              close();
            }}
            text={'적용'}
          />
        </ButtonDiv>
      </PBody2>
    );
  };

  // useEffect 관련
  useEffect(() => {
    //날짜 범위 세팅
    setStartRange(
      moment(cal.current.calendarInst._renderRange.start._date).format(
        'YYYY.MM.DD',
      ),
    );
    setEndRange(
      moment(cal.current.calendarInst._renderRange.end._date).format(
        'YYYY.MM.DD',
      ),
    );
  }, []);

  return (
    <Wrapper>
      <PanelWrap>
        <ControlButton onClick={handleClickTodayButton}>Today</ControlButton>
        <ControlButton onClick={handleClickPrevButton} />
        <ControlButton onClick={handleClickNextButton} />
        <DateRangeWrap>
          {startRange}~{endRange}
        </DateRangeWrap>
        <SelectDiv>
          <PopupCustom8
            trigger={<Button_setting />}
            closeOnDocumentClick={false}
            modal
          >
            {(close) => TimeRangeDiv(close)}
          </PopupCustom8>
        </SelectDiv>
      </PanelWrap>
      <TUICalendar
        ref={cal}
        isReadOnly={true}
        height={scheHeight}
        useCreationPopup={false}
        useDetailPopup={false}
        template={templates}
        calendars={calendars}
        schedules={schedules}
        taskView={false}
        scheduleView={['time']}
        usageStatistics={true}
        week={{ hourStart: scheduleStart.value, hourEnd: scheduleEnd.value }}
        onClickSchedule={onClickSchedule}
      />
      {infoView && infoSche.title && (
        <BlackBack>
          <CustomPopup2 color={infoSche.bgColor}>
            <PopupClose onClick={() => setInfoView(false)} custom={true} />
            <InfoWrap color={infoSche.bgColor}>
              <p>{infoSche.calendarName ? `[${infoSche.calendarName}]` : ''}</p>
              <p>{infoSche.title}</p>
              <p>
                {moment(infoSche.start._date).format('YYYY.MM.DD h:mm a -')}
                {moment(infoSche.end._date).format(' h:mm a')}
              </p>
              <p>{infoSche.state}</p>
            </InfoWrap>
          </CustomPopup2>
        </BlackBack>
      )}
    </Wrapper>
  );
};
