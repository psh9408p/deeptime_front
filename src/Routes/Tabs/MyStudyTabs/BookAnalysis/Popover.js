import React, { forwardRef } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import PopupClose from '../../../../Components/Buttons/PopupClose';
import Input_100 from '../../../../Components/Input_100';
import Select from '../../../../Components/Select';

const Image = styled.div`
  /* background-image: url(${(props) => props.image}); */
  background-size: cover;
  width: 100px;
  position: relative;
  height: 120px;
  margin: 1em 1em;
  box-shadow: 0 30px 60px -12px rgba(50, 50, 93, 0.25),
    0 18px 36px -18px rgba(0, 0, 0, 0.3), 0 -12px 36px -8px rgba(0, 0, 0, 0.025);
`;

const ImageWrap = styled.div`
  width: 40%;
`;
const BookInfo = styled.div`
  width: 60%;
`;

const PopWrap = styled.div`
  display: flex;
  width: 100%;
`;

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
  font-size: 12px;
  cursor: pointer;
  width: 90px;
  height: auto;
`;

const InputWrap = styled.div`
  display: flex;
  margin-bottom: 10px;
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
  margin-bottom: 10px;
`;

const CustomInput = forwardRef(({ value, onClick }, ref) => {
  return (
    <DatePickButton ref={ref} onClick={onClick}>
      {value}
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
      <PopWrap>
        <ImageWrap>
          <Image></Image>
        </ImageWrap>
        <BookInfo>
          <div style={{ marginBottom: '10px' }}>제목 저자</div>
          <div style={{ marginBottom: '10px' }}>페이지정보</div>
          <div style={{ marginBottom: '10px' }}>
            과목:{' '}
            <Select width={'80px'} {...mySubjectList} id={'subject_makeBook'} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <div style={{ marginBottom: '10px' }}>평균1독시간</div>
            <div>
              <div>
                <div>
                  <span> 시작 페이지</span>
                  <span style={{ marginLeft: '60px' }}> 끝 페이지</span>
                </div>
                <InputWrap>
                  <Input_100 type={'number'} height={'35px'} {...startPage} />
                  <Input_100
                    type={'number'}
                    height={'35px'}
                    margin={'0 0 0 15px'}
                    {...endPage}
                  />
                </InputWrap>
                <div>
                  <span> 1독 시작</span>
                  <span style={{ marginLeft: '70px' }}> 1독 끝</span>
                </div>
                <DateWrap>
                  <DatePickDiv style={{ marginRight: '30px' }}>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      customInput={<CustomInput />}
                    />
                  </DatePickDiv>
                  <DatePickDiv>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      customInput={<CustomInput />}
                    />
                  </DatePickDiv>
                </DateWrap>
              </div>
              <div>
                {' '}
                <CircleBtn onClick={() => onCreateUserBook(book, close)}>
                  책 입력
                </CircleBtn>
              </div>
            </div>
          </div>
        </BookInfo>
      </PopWrap>
    </PBody>
  );
};

export default Popover;
