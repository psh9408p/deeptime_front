import React, { forwardRef } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import PopupClose from '../../../../Components/Buttons/PopupClose';
import Input_100 from '../../../../Components/Input_100';
import Select from '../../../../Components/Select';

const DatePickDiv = styled.div`
  width: 50%;
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
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 3px;
  box-shadow: 2px 2px 2px 2px #dee1e7;
  background-color: #fff;
  outline: none;
  border: red;
  margin-left: 10px;
`;

const PBody = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
`;

const DateWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CustomInput = forwardRef(({ value, onClick }, ref) => {
  return (
    <DatePickButton ref={ref} onClick={onClick}>
      {value} 날짜(클릭)
    </DatePickButton>
  );
});

const Popover = ({
  close,
  mySubjectList,
  onCreateUserBook,
  book,
  startPage,
  endPage,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  return (
    // <PBody onSubmit={(e) => onCreateUserBook(e, book, close)}>
    <PBody>
      <PopupClose onClick={() => close()} />
      <InputWrap>
        시작 페이지 :
        <Input_100 type={'number'} height={'35px'} {...startPage} />
        끝 페이지 :
        <Input_100
          type={'number'}
          height={'35px'}
          margin={'0 0 0 15px'}
          {...endPage}
        />
      </InputWrap>
      과목: <Select {...mySubjectList} id={'subject_makeBook'} />
      <DateWrap style={{ marginBottom: '30px' }}>
        1독 시작 :
        <DatePickDiv>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            customInput={<CustomInput />}
          />
        </DatePickDiv>
        1독 끝 :
        <DatePickDiv>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            customInput={<CustomInput />}
          />
        </DatePickDiv>
        <CircleBtn onClick={() => onCreateUserBook(book, close)}>OK</CircleBtn>
      </DateWrap>
    </PBody>
  );
};

export default Popover;
