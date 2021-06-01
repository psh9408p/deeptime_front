import React, { forwardRef, useEffect } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import PopupClose from '../../../../Components/Buttons/PopupClose';
import Input_100 from '../../../../Components/Input_100';

const DatePickDiv = styled.div`
  /* width: 50%; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const DatePickButton = styled.button`
  border: 0;
  outline-color: black;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.classicBlue};
  font-weight: 600;
  color: white;
  text-align: center;
  padding: 7px 10px;
  font-size: 14px;
  cursor: pointer;
`;

const InputWrap = styled.div`
  display: flex;
`;

const CircleBtn = styled.button`
  border: 0;
  outline-color: black;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.classicBlue};
  font-weight: 600;
  color: white;
  text-align: center;
  padding: 7px 10px;
  font-size: 14px;
  cursor: pointer;
  width: auto;
  height: auto;
  margin-left: 24px;
`;

const PBody = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
`;

const TestNum = 3;
const CustomInput = forwardRef(({ value, onClick }, ref) => {
  return (
    <DatePickButton ref={ref} onClick={onClick}>
      {value} 날짜(클릭)
    </DatePickButton>
  );
});

const Popover = ({
  close,
  startPage,
  endPage,
  finishDate,
  setFinishDate,
  onCreateRecord,
  userbook,
}) => {
  const records = userbook.clearRecords;
  // 가장 최근에 학습한 기록 찾기
  const lastDate = Math.max(...records.map((data) => new Date(data.clearDate)));
  // records에서 최근 학습 기록 인덱스 찾기
  const lastIndex = records.findIndex(
    (data) => new Date(data.clearDate).getTime() === lastDate,
  );

  useEffect(() => {
    startPage.setValue(
      lastIndex === -1 ? userbook.startPage_target : records[lastIndex].endPage,
    );
    endPage.setValue(
      lastIndex === -1 ? userbook.startPage_target : records[lastIndex].endPage,
    );
  }, []);

  return (
    // <PBody onSubmit={(e) => onCreateRecord(e, userbook, close)}>
    <PBody>
      <PopupClose onClick={() => close()} />
      <div style={{ marginBottom: '30px' }}>
        <DatePickDiv>
          <DatePicker
            selected={finishDate}
            onChange={(date) => setFinishDate(date)}
            customInput={<CustomInput />}
          />
        </DatePickDiv>
      </div>
      <InputWrap>
        <Input_100 type={'number'} {...startPage} height={'35px'} />
        <Input_100
          type={'number'}
          {...endPage}
          height={'35px'}
          margin={'0 0 0 15px'}
        />
        <CircleBtn onClick={() => onCreateRecord(userbook, close)}>
          OK
        </CircleBtn>
      </InputWrap>
    </PBody>
  );
};

export default Popover;
