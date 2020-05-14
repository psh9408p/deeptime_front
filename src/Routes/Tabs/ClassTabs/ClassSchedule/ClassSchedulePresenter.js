import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Loader from '../../../../Components/Loader';
import ObjectUnassign from '../../../../Components/ObjectUnassign';

import TUICalendar from '@toast-ui/react-calendar';
import { ISchedule, ICalendarInfo } from 'tui-calendar';

import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import Select from '../../../../Components/Select';
import { toast } from 'react-toastify';

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 1;
  top: 0;
  height: 70%;
  width: 100%;
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
    background: white
      url('https://slog-iam.s3.ap-northeast-2.amazonaws.com/Previous_icon.png')
      no-repeat;
    background-position: center center;
    background-size: 15px;
  }
  &:nth-child(3) {
    width: 30px;
    background: white
      url('https://slog-iam.s3.ap-northeast-2.amazonaws.com/Next_icon.png')
      no-repeat;
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
  margin: 15px 0px;
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
let updateVar = { scheduleId: '' };

export default ({
  cal,
  startRange,
  setStartRange,
  endRange,
  setEndRange,
  myClassList,
  classRoom,
  addScheduleMutation,
  updateScheduleMutation,
  deleteScheduleMutation,
  scheduleList,
  scheduleLoading,
  scheduleRefetch,
}) => {
  let schedules: ISchedule[] = [1, 2, 3];
  const calendars: ICalendarInfo[] = [
    {
      id: classRoom[myClassList.option].id,
      name: classRoom[myClassList.option].name,
      color: '#ffffff',
      bgColor: '#0F4C82',
      dragBgColor: '#0F4C82',
      borderColor: '#0F4C82',
    },
  ];

  if (scheduleLoading === false) {
    // console.log(scheduleList)
    schedules = scheduleList.map((List) => {
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
  }

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

  const onBeforeCreateSchedule = useCallback(
    async (scheduleData) => {
      // console.log(scheduleData)
      toast.info('스케줄 추가 중...');
      try {
        const {
          data: { addSchedule },
        } = await addScheduleMutation({
          variables: {
            isAllDay: scheduleData.isAllDay,
            title: scheduleData.title,
            location: scheduleData.location,
            state: scheduleData.state,
            start: scheduleData.start._date,
            end: scheduleData.end._date,
            classId: classRoom[myClassList.option].id,
          },
        });
        if (!addSchedule) {
          toast.error('스케줄을 추가할 수 없습니다.');
        } else {
          await scheduleRefetch();
          toast.success('스케줄이 추가되었습니다.');
        }
      } catch (e) {
        const realText = e.message.split('GraphQL error: ');
        toast.error(realText[1]);
      }

      // const schedule = {
      //   id: newScheduleId,
      //   title: scheduleData.title,
      //   isAllDay: scheduleData.isAllDay,
      //   start: scheduleData.start,
      //   end: scheduleData.end,
      //   category: scheduleData.isAllDay ? "allday" : "time",
      //   dueDateClass: "",
      //   location: scheduleData.location,
      //   raw: {
      //     class: scheduleData.raw["class"],
      //   },
      //   state: scheduleData.state,
      //   calendarId: classRoom[myClassList.option].id,
      // }

      // cal.current.calendarInst.createSchedules([schedule])
    },
    [myClassList.option],
  );

  const onBeforeDeleteSchedule = useCallback(async (res) => {
    // console.log("c", res)

    toast.info('스케줄 삭제 중...');
    try {
      const {
        data: { deleteSchedule },
      } = await deleteScheduleMutation({
        variables: {
          scheduleId: res.schedule.id,
        },
      });
      if (!deleteSchedule) {
        toast.error('스케줄을 삭제할 수 없습니다.');
      } else {
        await scheduleRefetch();
        toast.success('스케줄이 삭제되었습니다.');
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      toast.error(realText[1]);
    }

    // const { id, calendarId } = res.schedule
    // cal.current.calendarInst.deleteSchedule(id, calendarId)
  }, []);

  const onBeforeUpdateSchedule = useCallback(async (e) => {
    // console.log(e.changes)

    updateVar.scheduleId = e.schedule.id;
    if (e.changes.start !== undefined && e.changes.end !== undefined) {
      const dateSumVar = {
        start: e.changes.start._date,
        end: e.changes.end._date,
      };
      const dateRmVar = { start: '', end: '' };
      ObjectUnassign(e.changes, dateRmVar);
      Object.assign(e.changes, dateSumVar);
    } else if (e.changes.start !== undefined) {
      const dateSumVar = { start: e.changes.start._date };
      const dateRmVar = { start: '' };
      ObjectUnassign(e.changes, dateRmVar);
      Object.assign(e.changes, dateSumVar);
    } else if (e.changes.end !== undefined) {
      const dateSumVar = { end: e.changes.end._date };
      const dateRmVar = { end: '' };
      ObjectUnassign(e.changes, dateRmVar);
      Object.assign(e.changes, dateSumVar);
    }

    Object.assign(updateVar, e.changes);

    toast.info('스케줄 수정 중...');
    try {
      const {
        data: { updateSchedule },
      } = await updateScheduleMutation({
        variables: updateVar,
      });
      if (!updateSchedule) {
        toast.error('스케줄을 수정할 수 없습니다.');
      } else {
        await scheduleRefetch();
        toast.success('스케줄이 수정되었습니다.');
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      toast.error(realText[1]);
    }
    updateVar = { scheduleId: '' }; // 초기화

    // const { schedule, changes } = e
    // cal.current.calendarInst.updateSchedule(schedule.id, schedule.calendarId, changes)
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
      {scheduleLoading === true && (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      )}
    </Wrapper>
  );
};
