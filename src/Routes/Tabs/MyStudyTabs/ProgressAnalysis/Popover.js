import React, { useState, forwardRef } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';

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

const Wrap = styled.div`
  height: 150px;
  width: 400px;
  box-shadow: 1px 2px 2px 4px #dee1e7;
  background-color: #fff;
  position: absolute;
  left: 0;
  bottom: 50;
  /* transform: translate(-50%, -50%) translate3d(0, 0, 0) !important; */
  margin: 0 !important;
  padding: 45px;
  display: block;
  /* z-index: 10011; */
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
  pointer-events: ${(props) => (props.isVisible ? 'auto' : 'none')};
`;

const InputWrap = styled.div`
  display: flex;
`;
const NumInput = styled.input`
  /* width: 100px;
  height: auto;
  border-radius: 200px;
  padding: 0.8em 0.5em;
  border: 1px solid #999;
  outline-style: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none; */
  width: 80px;
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
  &:nth-child(1) {
    margin-right: 10px;
  }
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

const TestNum = 3;
const CustomInput = forwardRef(({ value, onClick }, ref) => {
  return (
    <DatePickButton ref={ref} onClick={onClick}>
      {value} 날짜(클릭)
    </DatePickButton>
  );
});

const Popover = ({ isVisible, onSetIsVisible, selectDate, setSelectDate }) => {
  return (
    <div>
      <Wrap isVisible={isVisible}>
        <div style={{ marginBottom: '30px' }}>
          {' '}
          <DatePickDiv>
            <DatePicker
              selected={selectDate}
              onChange={(date) => setSelectDate(date)}
              customInput={<CustomInput />}
            />
          </DatePickDiv>
        </div>
        <InputWrap>
          <NumInput placeholder={TestNum}></NumInput>
          {/* <span style={{ fontSize: '20px', marginRight: '10px' }}>~</span> */}
          <NumInput placeholder={0}></NumInput>
          <CircleBtn>OK</CircleBtn>
        </InputWrap>
      </Wrap>
    </div>
  );
};

export default Popover;
