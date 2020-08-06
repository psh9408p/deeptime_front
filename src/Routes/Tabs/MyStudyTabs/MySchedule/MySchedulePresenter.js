import React, { useCallback, useEffect, useState } from 'react';
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
import Button_red from '../../../../Components/Buttons/Button_red';
import Input from '../../../../Components/Input';
import PopupButton from '../../../../Components/Buttons/PopupButton';
import PopupButton_solo from '../../../../Components/Buttons/PopupButton_solo';
import PopButton_100 from '../../../../Components/Buttons/PopButton_100';
import FatText from '../../../../Components/FatText';
import { toast } from 'react-toastify';
import { SwatchesPicker } from 'react-color';
import useSelect from '../../../../Hooks/useSelect';
import { FixedSizeList as BookmarkList } from 'react-window';
import CheckBox from '../../../../Components/CheckBox';

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
  width: 120px;
  height: 35px;
  margin-right: 10px;
`;

const SubjectButtonDiv2 = styled.div`
  width: 100px;
  margin-right: 10px;
`;

const PopupCustom = styled(Popup)`
  &-content {
    width: 600px !important;
    height: 500px !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const PopupCustom2 = styled(Popup)`
  &-content {
    width: 600px !important;
    height: 550px !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const PopupCustom3 = styled(Popup)`
  &-content {
    width: 500px !important;
    height: 250px !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const PopupCustom4 = styled(Popup)`
  &-content {
    width: 500px !important;
    height: 200px !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const PopupCustom5 = styled(Popup)`
  &-content {
    width: 500px !important;
    height: 500px !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const FrontDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  padding: 20px 20px;
`;

const PBody = styled.div``;

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
  margin-bottom: 20px;
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

const SelectWrapper = styled.div`
  width: 50%;
  height: 35px;
  margin-bottom: 30px;
`;

const SelectWrapper2 = styled.div`
  width: 50%;
  height: 35px;
  margin-bottom: 10px;
`;

const ThreeButtonWrap = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const RedButtonWrap = styled.div`
  width: 120px;
  margin: 0px 0px 10px 10px;
`;

const SpaceDiv = styled.div`
  width: 10px;
`;

const SubjectForm = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 500px;
  padding: 20px 20px;
`;

const SubjectForm2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  padding: 20px 20px;
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
  padding-left: 20px;
  font-size: 14px;
  height: 100%;
  background-color: ${(props) => (props.isOdd ? '#FAFAFA' : '#c7c7c7')};
`;

const BookMarkTitle = styled.div`
  border: ${(props) => props.theme.boxBorder};
  display: flex;
  flex-direction: row;
  width: 300px;
  height: 25px;
`;
const BookLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 65px;
  height: 100%;
  font-weight: 600;
  font-size: 14px;
`;

const BookRight = styled.div`
  display: flex;
  align-items: center;
  width: 235px;
  height: 100%;
  font-weight: 600;
  font-size: 14px;
`;

let newScheduleArray = [];
let schedules = [];

export default ({
  cal,
  startRange,
  setStartRange,
  endRange,
  setEndRange,
  myData,
  saveScheduleMutation,
  myRefetch,
  subjectList,
  subjectName,
  subjectColor,
  setSubjectColor,
  handleChangeComplete,
  addSubjectMutation,
  editColorSubjectMutation,
  deleteSubjectMutation,
  bookMarkSubjectMutation,
  subjectRefetch,
  pageIndex,
  networkStatus,
}) => {
  const originSubject = useSelect(
    subjectList.map((List) => `${List.name}`),
    subjectList.map((List) => `${List.id}`),
  );
  const indiSubject_tmp = subjectList.map((subject) => {
    if (subject.modifyRight) {
      return { id: subject.id, name: subject.name, bgColor: subject.bgColor };
    }
  });
  const indiSubject = indiSubject_tmp.filter(function (el) {
    return el != undefined;
  });
  const mySubjectList = useSelect(
    indiSubject.map((List) => `${List.name}`),
    indiSubject.map((List) => `${List.id}`),
  );
  const subjectClear = () => {
    subjectName.setValue('');
    setSubjectColor(`#0F4C82`);
    originSubject.setOption(originSubject.valueList[0]);
    mySubjectList.setOption(mySubjectList.valueList[0]);
  };

  const subjectLoad = () => {
    setSubjectColor(subjectList[originSubject.optionIndex].bgColor);
  };

  const onSubmitAdd = async () => {
    try {
      toast.info('새로운 과목을 추가 중...');
      const {
        data: { addSubject },
      } = await addSubjectMutation({
        variables: {
          name: subjectName.value,
          bgColor: subjectColor,
        },
      });
      if (!addSubject) {
        alert('과목을 추가할 수 없습니다.');
      } else {
        await subjectRefetch();
        await subjectClear();
        toast.success('새로운 과목이 추가되었습니다.');
        return true;
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
      return false;
    }
  };

  const onSubmitEdit = async () => {
    if (
      window.confirm(
        '수정 내용이 기존 스케줄에도 반영됩니다.\n그래도 수정하시겠습니까?',
      ) === true
    ) {
      try {
        toast.info('과목 색상을 수정 중...');
        const {
          data: { editColorSubject },
        } = await editColorSubjectMutation({
          variables: {
            subjectId: originSubject.option,
            bgColor: subjectColor,
          },
        });
        if (!editColorSubject) {
          alert('과목 색상을 수정할 수 없습니다.');
        } else {
          await subjectRefetch();
          await subjectClear();
          toast.success('과목 색상이 수정되었습니다.');
          return true;
        }
      } catch (e) {
        const realText = e.message.split('GraphQL error: ');
        alert(realText[1]);
        return false;
      }
    }
  };

  const onSubmitDelete = async () => {
    if (
      window.confirm(
        '해당 과목이 기존 스케줄에서 삭제됩니다.\n그래도 삭제하시겠습니까?',
      ) === true
    ) {
      try {
        toast.info('해당 과목을 제거 중...');
        const {
          data: { deleteSubject },
        } = await deleteSubjectMutation({
          variables: {
            subjectId: mySubjectList.option,
          },
        });
        if (!deleteSubject) {
          alert('해당 과목을 제거할 수 없습니다.');
        } else {
          await subjectRefetch();
          await myRefetch();
          await subjectClear();
          toast.success('해당 과목이 제거되었습니다.');
          return true;
        }
      } catch (e) {
        const realText = e.message.split('GraphQL error: ');
        alert(realText[1]);
        return false;
      }
    }
  };

  //과목 종류 넣기
  const calendars_tmp = subjectList.map((subject) => {
    if (subject.bookMark) {
      return subject;
    }
  });
  const calendars = calendars_tmp.filter(function (el) {
    return el != undefined;
  });
  //스케줄 넣기
  if (networkStatus !== 4) {
    schedules = myData.schedules.map((List) => {
      let category = 'time';
      if (List.isAllDay === true) {
        category = 'allday';
      }

      const schedule_tmp = {
        calendarId: List.subjectId,
        isAllDay: List.isAllDay,
        isPrivate: List.isPrivate,
        category,
        location: List.location,
        isVisible: true,
        title: List.title,
        id: List.id,
        start: new Date(List.start),
        end: new Date(List.end),
        totalTime: new Date(List.totalTime),
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

  const onClickScheduleSave = async () => {
    try {
      toast.info('스케줄 변경사항 저장 중...');
      const {
        data: { saveSchedule_my },
      } = await saveScheduleMutation({
        variables: {
          scheduleArray: newScheduleArray,
        },
      });
      if (!saveSchedule_my) {
        alert('스케줄을 변경할 수 없습니다.');
      } else {
        await myRefetch();
        newScheduleArray = [];
        toast.success('변경된 스케줄이 저장되었습니다.');
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  const onBeforeCreateSchedule = useCallback((scheduleData) => {
    // console.log(myClassList.option);
    const generateId =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    const schedule = {
      id: generateId,
      title: scheduleData.title,
      isAllDay: scheduleData.isAllDay,
      isPrivate: scheduleData.raw.class === 'private' ? true : false,
      start: scheduleData.start,
      end: scheduleData.end,
      category: scheduleData.isAllDay ? 'allday' : 'time',
      dueDateClass: '',
      location: scheduleData.location,
      raw: {
        class: scheduleData.raw.class === 'private' ? 'private' : 'public',
      },
      state: scheduleData.state,
      calendarId: scheduleData.calendarId,
    };

    const schedule_tmp = {
      id: generateId,
      isAllDay: scheduleData.isAllDay,
      isPrivate: scheduleData.raw.class === 'private' ? true : false,
      title: scheduleData.title,
      location: scheduleData.location,
      state: scheduleData.state,
      start: scheduleData.start._date,
      end: scheduleData.end._date,
      totalTime:
        scheduleData.end._date.getTime() - scheduleData.start._date.getTime(),
      calendarId: scheduleData.calendarId,
      option: 'create',
    };

    newScheduleArray.push(schedule_tmp);
    // console.log(newScheduleArray);
    cal.current.calendarInst.createSchedules([schedule]);
  }, []);

  const onBeforeDeleteSchedule = useCallback(async (res) => {
    // console.log('c', res.schedule);

    const schedule_tmp = {
      id: res.schedule.id,
      isAllDay: res.schedule.isAllDay,
      isPrivate: res.schedule.isPrivate,
      title: res.schedule.title,
      location: res.schedule.location,
      state: res.schedule.state,
      start: res.schedule.start._date,
      end: res.schedule.end._date,
      totalTime:
        res.schedule.end._date.getTime() - res.schedule.start._date.getTime(),
      calendarId: res.schedule.calendarId,
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
      res.schedule.calendarId,
    );
  }, []);

  const onBeforeUpdateSchedule = useCallback(async (res) => {
    // console.log('a', res);
    if (res.changes !== null) {
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

      let totalTime_tmp = 0;
      if (res.changes.start !== undefined && res.changes.end !== undefined) {
        totalTime_tmp = res.changes.end.getTime() - res.changes.start.getTime();
      } else if (res.changes.start !== undefined) {
        totalTime_tmp =
          res.schedule.end._date.getTime() - res.changes.start.getTime();
      } else if (res.changes.end !== undefined) {
        totalTime_tmp =
          res.changes.end.getTime() - res.schedule.start._date.getTime();
      } else {
        totalTime_tmp =
          res.schedule.end._date.getTime() - res.schedule.start._date.getTime();
      }

      const schedule_tmp = {
        id: res.schedule.id,
        isAllDay: res.schedule.isAllDay,
        isPrivate: res.schedule.isPrivate,
        title:
          res.changes.title !== undefined
            ? res.changes.title
            : res.schedule.title,
        location:
          res.changes.location !== undefined
            ? res.changes.location
            : res.schedule.location,
        state:
          res.changes.state !== undefined
            ? res.changes.state
            : res.schedule.state,
        start:
          res.changes.start !== undefined
            ? res.changes.start
            : res.schedule.start._date,
        end:
          res.changes.end !== undefined
            ? res.changes.end
            : res.schedule.end._date,
        totalTime: totalTime_tmp,
        calendarId:
          res.changes.calendarId !== undefined
            ? res.changes.calendarId
            : res.schedule.calendarId,
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
    }
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
    if (schedule.isPrivate) {
      html.push('<span class="calendar-font-icon ic-lock-b"></span>');
      html.push('🔒 Private');
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
      const subjectIdList = subjectList.map((subject) => {
        return subject.id;
      });
      const subjectIndex = subjectIdList.indexOf(schedule.calendarId);
      if (subjectIndex > -1) {
        html.push(
          ' ' +
            '[' +
            subjectList[subjectIndex].name +
            ']' +
            ' ' +
            schedule.title,
        );
      } else {
        html.push(' ' + schedule.title);
      }
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
  };

  // 과목 즐겨찾기 관련
  const [bookMarkCh, setBookMarkCh] = useState(
    subjectList.map((_, index) => {
      return subjectList[index].bookMark;
    }),
  );
  const onChangeCheck = (index) => (e) => {
    let newArr = [...bookMarkCh];
    newArr[index] = e.target.checked;
    setBookMarkCh(newArr);
  };
  const subjectRow = ({ index, style }) => (
    <IndiviList key={index} style={style} isOdd={Boolean(index % 2)}>
      <CheckBox
        checked={bookMarkCh[index] !== undefined ? bookMarkCh[index] : true}
        onChange={onChangeCheck(index)}
        boxSize={'25px'}
        margin={'0 20px 0 0'}
      />
      [{subjectList[index].largeCategory}] {subjectList[index].name}
    </IndiviList>
  );

  const onClickBookMark = async () => {
    try {
      toast.info('북마크 변경사항 저장 중...');
      const {
        data: { bookMarkSubject },
      } = await bookMarkSubjectMutation({
        variables: {
          subjectId: subjectList.map((_, index) => {
            return subjectList[index].id;
          }),
          bookMark: bookMarkCh,
        },
      });
      if (!bookMarkSubject) {
        alert('북마크를 변경할 수 없습니다.');
      } else {
        await subjectRefetch();
        toast.success('변경된 북마크가 저장되었습니다.');
        return true;
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
      return false;
    }
  };

  // useEffect 관련
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

  useEffect(() => {
    // 변경내용 저장 초기화
    newScheduleArray = [];
  }, [pageIndex]);

  console.log(schedules, newScheduleArray);
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
          <SubjectButtonDiv2>
            <PopupCustom4
              trigger={<PopButton_100 text={'과목 관리'} />}
              closeOnDocumentClick={false}
              modal
            >
              {(close) => (
                <PBody>
                  <FrontDiv>
                    <PTitle text={'과목 관리'} />
                    <ThreeButtonWrap>
                      <SpaceDiv />
                      <SubjectButtonDiv>
                        <PopupCustom5
                          trigger={<PopButton_100 text={'과목 북마크'} />}
                          closeOnDocumentClick={false}
                          modal
                        >
                          {(close) => (
                            <PBody>
                              <SubjectForm>
                                <PTitle text={'과목 북마크'} />
                                <BookMarkTitle>
                                  <BookLeft>체크</BookLeft>
                                  <BookRight>[대분류] 과목 이름</BookRight>
                                </BookMarkTitle>
                                <ListWrap>
                                  <BookmarkList
                                    height={300}
                                    itemCount={subjectList.length}
                                    itemSize={25}
                                    width={300}
                                  >
                                    {subjectRow}
                                  </BookmarkList>
                                </ListWrap>
                                <ButtonDiv>
                                  <PopupButton
                                    type="button"
                                    text={'저장'}
                                    onClick={async () => {
                                      const fucResult = await onClickBookMark();
                                      if (fucResult) {
                                        close();
                                      }
                                    }}
                                  />
                                  <PopupButton
                                    type="button"
                                    onClick={() => {
                                      close();
                                      setBookMarkCh(
                                        subjectList.map((_, index) => {
                                          return subjectList[index].bookMark;
                                        }),
                                      );
                                    }}
                                    text={'닫기'}
                                  />
                                </ButtonDiv>
                              </SubjectForm>
                            </PBody>
                          )}
                        </PopupCustom5>
                      </SubjectButtonDiv>
                      <SubjectButtonDiv>
                        <PopupCustom
                          trigger={<PopButton_100 text={'과목 추가'} />}
                          closeOnDocumentClick={false}
                          modal
                        >
                          {(close) => (
                            <PBody>
                              <SubjectForm2>
                                <PTitle text={'과목 추가'} />
                                <InputWrapper>
                                  <Input
                                    placeholder={'과목 이름 (예: 수학 or 영어)'}
                                    {...subjectName}
                                  />
                                </InputWrapper>
                                <ColorWrapper>
                                  <SubTitle text={'과목 색상 선택'} />
                                  <SwatchesPicker
                                    color={subjectColor}
                                    onChangeComplete={handleChangeComplete}
                                  />
                                </ColorWrapper>
                                <ButtonDiv>
                                  <PopupButton
                                    type="button"
                                    text={'추가'}
                                    onClick={async () => {
                                      const fucResult = await onSubmitAdd();
                                      if (fucResult) {
                                        close();
                                      }
                                    }}
                                  />
                                  <PopupButton
                                    type="button"
                                    onClick={() => {
                                      close();
                                      subjectClear();
                                    }}
                                    text={'닫기'}
                                  />
                                </ButtonDiv>
                              </SubjectForm2>
                            </PBody>
                          )}
                        </PopupCustom>
                      </SubjectButtonDiv>
                      <SubjectButtonDiv>
                        <PopupCustom2
                          trigger={<PopButton_100 text={'과목 수정'} />}
                          closeOnDocumentClick={false}
                          modal
                        >
                          {(close) => (
                            <PBody>
                              <SubjectForm2>
                                <PTitle text={'색상 수정'} />
                                <SelectWrapDiv>
                                  <SubTitle text={`수정할 과목:　`} />
                                  <SelectWrapper2>
                                    <Select
                                      {...originSubject}
                                      id={'originSubject_id'}
                                    />
                                  </SelectWrapper2>
                                  <RedButtonWrap>
                                    <Button_red
                                      type={'button'}
                                      text={'기존정보 불러오기'}
                                      onClick={subjectLoad}
                                    />
                                  </RedButtonWrap>
                                </SelectWrapDiv>
                                <ColorWrapper>
                                  <SubTitle text={'과목 색상 선택'} />
                                  <SwatchesPicker
                                    color={subjectColor}
                                    onChangeComplete={handleChangeComplete}
                                  />
                                </ColorWrapper>
                                <ButtonDiv>
                                  <PopupButton
                                    type="button"
                                    text={'수정'}
                                    onClick={async () => {
                                      const fucResult = await onSubmitEdit();
                                      if (fucResult) {
                                        close();
                                      }
                                    }}
                                  />
                                  <PopupButton
                                    type="button"
                                    onClick={() => {
                                      subjectClear();
                                      close();
                                    }}
                                    text={'닫기'}
                                  />
                                </ButtonDiv>
                              </SubjectForm2>
                            </PBody>
                          )}
                        </PopupCustom2>
                      </SubjectButtonDiv>
                      <SubjectButtonDiv>
                        <PopupCustom3
                          trigger={<PopButton_100 text={'과목 제거'} />}
                          closeOnDocumentClick={false}
                          modal
                        >
                          {(close) => (
                            <PBody>
                              <SubjectForm2>
                                <PTitle text={'과목 제거'} />
                                <SelectWrapDiv>
                                  <SelectWrapper>
                                    <Select
                                      {...mySubjectList}
                                      id={'mySubject_id'}
                                    />
                                  </SelectWrapper>
                                </SelectWrapDiv>
                                <ButtonDiv>
                                  <PopupButton
                                    type="button"
                                    text={'제거'}
                                    onClick={async () => {
                                      const fucResult = await onSubmitDelete();
                                      if (fucResult) {
                                        close();
                                      }
                                    }}
                                  />
                                  <PopupButton
                                    type="button"
                                    onClick={() => {
                                      close();
                                      subjectClear();
                                    }}
                                    text={'닫기'}
                                  />
                                </ButtonDiv>
                              </SubjectForm2>
                            </PBody>
                          )}
                        </PopupCustom3>
                      </SubjectButtonDiv>
                    </ThreeButtonWrap>
                    <ButtonDiv>
                      <PopupButton_solo
                        type="button"
                        onClick={() => {
                          close();
                        }}
                        text={'닫기'}
                      />
                    </ButtonDiv>
                  </FrontDiv>
                </PBody>
              )}
            </PopupCustom4>
          </SubjectButtonDiv2>
          <SaveButtonDiv>
            <Button_blue
              text={'저장'}
              onClick={() => {
                onClickScheduleSave();
              }}
            />
          </SaveButtonDiv>
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
