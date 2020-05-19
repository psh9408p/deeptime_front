import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import ObjectUnassign from '../../../../Components/ObjectUnassign';
import Popup from 'reactjs-popup';
import TUICalendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import Select from '../../../../Components/Select';
import Button_blue from '../../../../Components/Buttons/Button_blue';
import Button_gray from '../../../../Components/Buttons/Button_gray';
import Button_red from '../../../../Components/Buttons/Button_red';
import PopupButton from '../../../../Components/Buttons/PopupButton';
import PopButton_100 from '../../../../Components/Buttons/PopButton_100';
import FatText from '../../../../Components/FatText';
import { toast } from 'react-toastify';

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
    background: url('https://slog-iam.s3.ap-northeast-2.amazonaws.com/Previous_icon.png')
      no-repeat;
    background-color: white;
    background-position: center center;
    background-size: 15px;
  }
  &:nth-child(3) {
    width: 30px;
    background: url('https://slog-iam.s3.ap-northeast-2.amazonaws.com/Next_icon.png')
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
  width: 80px;
  margin-right: 10px;
`;

const SubjectButtonDiv = styled.div`
  width: 160px;
  margin-right: 10px;
`;

const PopupCustom = styled(Popup)`
  &-content {
    width: 600px !important;
    height: 300px !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const PBody = styled.div`
  form {
    display: flex;
    flex-direction: column;
    width: 500px;
    padding: 20px 20px;
  }
`;

const PTitle = styled(FatText)`
  font-size: 18px;
  text-align: center;
  margin-bottom: 30px;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const InputWrapper = styled.div`
  margin-bottom: 10px;
`;

let newScheduleArray = [];
let schedules = [];

export default ({
  cal,
  startRange,
  setStartRange,
  endRange,
  setEndRange,
  myClassList,
  classRoom,
  saveScheduleMutation,
  classRefetch,
}) => {
  const calendars = [classRoom[myClassList.option].subjects];
  //  [
  //   {
  //     id: classRoom[myClassList.option].id,
  //     name: classRoom[myClassList.option].name,
  //     color: 'white',
  //     bgColor: '#0F4C82',
  //     dragBgColor: '#0F4C82',
  //     borderColor: '#0F4C82',
  //   },
  // ];

  schedules = classRoom[myClassList.option].schedules.map((List) => {
    let category = 'time';
    if (List.isAllDay === true) {
      category = 'allday';
    }

    const schedule_tmp = {
      calendarId: classRoom[myClassList.option].id,
      isAllDay: List.isAllDay,
      category,
      location: List.location,
      isVisible: true,
      title: List.title,
      id: List.id,
      start: new Date(List.start),
      end: new Date(List.end),
    };
    return schedule_tmp;
  });

  const handleClickNextButton = () => {
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
    // console.log(e)
  }, []);

  const onClickScheduleSave = async () => {
    try {
      toast.info('스케줄 변경사항 저장 중...');
      const {
        data: { saveSchedule },
      } = await saveScheduleMutation({
        variables: {
          scheduleArray: newScheduleArray,
        },
      });
      if (!saveSchedule) {
        alert('스케줄을 변경할 수 없습니다.');
      } else {
        await classRefetch();
        newScheduleArray = [];
        toast.success(
          `"${
            myClassList.optionList[myClassList.optionIndex]
          }"의 변경된 스케줄이 저장되었습니다.`,
        );
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  const onBeforeCreateSchedule = useCallback(
    (scheduleData) => {
      const generateId =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

      const schedule = {
        id: generateId,
        title: scheduleData.title,
        isAllDay: scheduleData.isAllDay,
        start: scheduleData.start,
        end: scheduleData.end,
        category: scheduleData.isAllDay ? 'allday' : 'time',
        dueDateClass: '',
        location: scheduleData.location,
        raw: {
          class: scheduleData.raw['class'],
        },
        state: scheduleData.state,
        calendarId: classRoom[myClassList.option].id,
      };

      const schedule_tmp = {
        id: generateId,
        isAllDay: scheduleData.isAllDay,
        title: scheduleData.title,
        location: scheduleData.location,
        state: scheduleData.state,
        start: scheduleData.start._date,
        end: scheduleData.end._date,
        classId: classRoom[myClassList.option].id,
        option: 'create',
      };

      newScheduleArray.push(schedule_tmp);
      cal.current.calendarInst.createSchedules([schedule]);
    },
    [myClassList.option],
  );

  const onBeforeDeleteSchedule = useCallback(async (res) => {
    // console.log('c', res.schedule);

    const schedule_tmp = {
      id: res.schedule.id,
      isAllDay: res.schedule.isAllDay,
      title: res.schedule.title,
      location: res.schedule.location,
      state: res.schedule.state,
      start: res.schedule.start._date,
      end: res.schedule.end._date,
      classId: classRoom[myClassList.option].id,
      option: 'delete',
    };

    const checkExist = (a) => a.id === res.schedule.id;
    const checkIndex = newScheduleArray.findIndex(checkExist);
    if (checkIndex === -1) {
      newScheduleArray.push(schedule_tmp);
    } else {
      newScheduleArray.splice(checkIndex, 1);
    }

    cal.current.calendarInst.deleteSchedule(
      res.schedule.id,
      classRoom[myClassList.option].id,
    );
  }, []);

  const onBeforeUpdateSchedule = useCallback(async (res) => {
    // console.log(res.changes);

    if (res.changes.start !== undefined && res.changes.end !== undefined) {
      const dateSumVar = {
        start: res.changes.start._date,
        end: res.changes.end._date,
      };
      const dateRmVar = { start: '', end: '' };
      ObjectUnassign(res.changes, dateRmVar);
      Object.assign(res.changes, dateSumVar);
    } else if (res.changes.start !== undefined) {
      const dateSumVar = { start: res.changes.start._date };
      const dateRmVar = { start: '' };
      ObjectUnassign(res.changes, dateRmVar);
      Object.assign(res.changes, dateSumVar);
    } else if (res.changes.end !== undefined) {
      const dateSumVar = { end: res.changes.end._date };
      const dateRmVar = { end: '' };
      ObjectUnassign(res.changes, dateRmVar);
      Object.assign(res.changes, dateSumVar);
    }

    const schedule_tmp = {
      id: res.schedule.id,
      isAllDay: res.schedule.isAllDay,
      title: res.schedule.title,
      location: res.schedule.location,
      state: res.schedule.state,
      start: res.schedule.start._date,
      end: res.schedule.end._date,
      classId: classRoom[myClassList.option].id,
      option: 'update',
    };
    Object.assign(schedule_tmp, res.changes);

    const checkExist = (a) => a.id === res.schedule.id;
    const checkIndex = newScheduleArray.findIndex(checkExist);
    if (checkIndex === -1) {
      newScheduleArray.push(schedule_tmp);
    } else {
      newScheduleArray.splice(checkIndex, 1);
      newScheduleArray.push(schedule_tmp);
    }

    const { schedule, changes } = res;
    cal.current.calendarInst.updateSchedule(
      schedule.id,
      schedule.calendarId,
      changes,
    );
  }, []);

  function _getFormattedTime(time) {
    const date = new Date(time);
    const h = date.getHours();
    const m = date.getMinutes();

    return `${h}:${m}`;
  }

  function _getTimeTemplate(schedule, isAllDay) {
    var html = [];

    if (!isAllDay) {
      html.push('<strong>' + _getFormattedTime(schedule.start) + '</strong> ');
    }
    if (schedule.isPrivate) {
      html.push('<span class="calendar-font-icon ic-lock-b"></span>');
      html.push(' Private');
    } else {
      if (schedule.isReadOnly) {
        html.push('<span class="calendar-font-icon ic-readonly-b"></span>');
      } else if (schedule.recurrenceRule) {
        html.push('<span class="calendar-font-icon ic-repeat-b"></span>');
      } else if (schedule.attendees.length) {
        html.push('<span class="calendar-font-icon ic-user-b"></span>');
      } else if (schedule.location) {
        html.push('<span class="calendar-font-icon ic-location-b"></span>');
      }
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
      return '자습';
    },
    popupStateBusy: function () {
      return '강의';
    },
  };

  useEffect(() => {
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
          <SubjectButtonDiv>
            <PopupCustom
              trigger={<PopButton_100 text={'과목 추가'} />}
              closeOnDocumentClick={false}
              modal
            >
              {(close) => (
                <PBody>
                  <form
                    onSubmit={async () => {
                      // const fucResult = await onSubmit();
                      // if (fucResult) {
                      //   close();
                      // }
                    }}
                  >
                    <PTitle text={'클래스 정보'} />
                    <InputWrapper></InputWrapper>
                    <ButtonDiv>
                      <PopupButton text={'수정'} />
                      <PopupButton
                        type="button"
                        onClick={() => {
                          close();
                          // clearClass();
                        }}
                        text={'닫기'}
                      />
                    </ButtonDiv>
                  </form>
                </PBody>
              )}
            </PopupCustom>
          </SubjectButtonDiv>
          <SubjectButtonDiv>
            <PopButton_100 text={'과목 제거'} />
          </SubjectButtonDiv>
          <SaveButtonDiv>
            <Button_blue text={'저장'} onClick={onClickScheduleSave} />
          </SaveButtonDiv>
          <Select {...myClassList} id={'myClassList_id_schedule'} />
        </SelectDiv>
      </PanelWrap>
      <TUICalendar
        ref={cal}
        height="1000px"
        useCreationPopup={true}
        useDetailPopup={true}
        template={templates}
        calendars={calendars}
        schedules={schedules}
        taskView={false}
        scheduleView={['allday', 'time']}
        usageStatistics={true}
        onClickSchedule={onClickSchedule}
        onBeforeCreateSchedule={onBeforeCreateSchedule}
        onBeforeDeleteSchedule={onBeforeDeleteSchedule}
        onBeforeUpdateSchedule={onBeforeUpdateSchedule}
      />
    </Wrapper>
  );
};
