import React, { forwardRef } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import PopupClose from '../../../../Components/Buttons/PopupClose';
import Input_100 from '../../../../Components/Input_100';
import Select from '../../../../Components/Select';
import { SmallBotArrow } from '../../../../Components/Icons';
const Ing = styled.span`
  padding-left: 8px;
  padding-right: 8px;
  font-size: 16px;
  padding-top: 8px;
`;

const Image = styled.div`
  background-image: url(${(props) => props.image});
  background-size: cover;
  width: 120px;
  position: relative;
  height: 160px;
  margin: 1em 1em;
  box-shadow: 0 30px 60px -12px rgba(50, 50, 93, 0.25),
    0 18px 36px -18px rgba(0, 0, 0, 0.3), 0 -12px 36px -8px rgba(0, 0, 0, 0.025);
`;
const LeftInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const LBookTitle = styled.div`
  padding: 10px 14px;
  font-size: 12px;
  margin-right: 20px;
`;

const ImageWrap = styled.div`
  width: 40%;
`;
const BookInfo = styled.div`
  width: 60%;
`;

const PageInfo = styled.div`
  display: flex;
  margin-bottom: 10px;
  justify-content: space-between;
  width: 100%;
`;

const PageSpanWrap = styled.span`
  font-size: 12px;
`;

const DeepBtn = styled.span`
  cursor: pointer;
  margin-right: 2px;
  font-size: 2px;
  color: #028dfd;
`;

const PageInput = styled.input`
  color: #028dfd;
  border: 1px solid #028dfd;
  border-radius: ${(props) => props.theme.borderRadius};
  height: 35px;
  width: 112px;
  text-align: right;
  padding-right: 10px;
`;

const ReadingT = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const PopWrap = styled.div`
  display: flex;
  width: 100%;
`;
const DateWrap = styled.div`
  display: flex;
  /* flex-direction: row;
  align-items: center; */
  margin-bottom: 10px;
`;

const DatePickDiv = styled.div`
  width: 120%;
  display: flex;
  /* flex-direction: row;
  justify-content: center;
  align-items: center; */
`;

const DatePickButton = styled.button`
  border: 0;
  outline-color: #028dfd;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: white;
  font-weight: 600;
  color: #028dfd;
  text-align: center;
  border: 1px solid #028dfd;
  padding: 7px 10px;
  font-size: 12px;
  cursor: pointer;
  width: 112px;
  height: auto;
`;

const MyPlan = styled.span`
  color: #028dfd;
  font-weight: bold;
  font-size: 12px;
`;

const ImportantText = styled.span`
  color: #028dfd;
  font-weight: bold;
  font-size: 14px;
`;
const InputWrap = styled.div`
  display: flex;
  margin-bottom: 10px;
  border-bottom: 1px solid black;
  padding-bottom: 5px;
`;

const CircleBtn = styled.button`
  border: 0;
  outline-color: black;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: #028dfd;
  font-weight: 600;
  color: white;
  text-align: center;
  padding: 7px 10px;
  font-size: 14px;
  cursor: pointer;
  width: 45%;
  height: auto;
  margin-left: 138px;
`;

const PBody = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 10px;
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
  BookTitle,
}) => {
  return (
    // <PBody onSubmit={(e) => onCreateUserBook(e, book, close)}>
    <PBody>
      <PopupClose onClick={() => close()} />
      <PopWrap>
        <LeftInfo>
          {' '}
          <ImageWrap>
            <Image image={book.image}></Image>
          </ImageWrap>
          <LBookTitle>{BookTitle}</LBookTitle>
        </LeftInfo>
        <BookInfo>
          <div
            style={{
              marginBottom: '10px',
              borderBottom: '1px solid black',
              paddingBottom: '5px',
            }}
          >
            과목:{' '}
            <Select
              width={'215px'}
              {...mySubjectList}
              id={'subject_makeBook'}
            />
          </div>
          <PageInfo>
            <PageSpanWrap>
              <span style={{ marginRight: '5px' }}>페이지 정보</span>
              <DeepBtn>
                자세히
                <SmallBotArrow color={'blue'} />
              </DeepBtn>
            </PageSpanWrap>
            <ImportantText>총 290P</ImportantText>
          </PageInfo>
          <div style={{ marginBottom: '10px' }}>
            <div>
              <div>
                <div style={{ marginBottom: '4px' }}>
                  <span style={{ fontSize: '12px' }}>페이지 입력</span>
                </div>
                <InputWrap>
                  {/* <Input_100
                    type={'number'}
                    height={'35px'}
                    {...startPage}
                    bgColor={'white'}
                    color={'#028dfd'}
                    fontWeight={'600'}
                    borderColor={'#028dfd'}
                  /> */}
                  <PageInput {...startPage}></PageInput>
                  <Ing>~</Ing>
                  <PageInput {...endPage}></PageInput>
                </InputWrap>
                <ReadingT>
                  <span style={{ fontSize: '12px' }}>
                    평균 1독 소요 시간 / 주{' '}
                  </span>
                  <ImportantText>80시간 / 6주</ImportantText>
                </ReadingT>
                <div style={{ marginBottom: '4px' }}>
                  <MyPlan>나의 1독목표</MyPlan>
                </div>
                <DateWrap>
                  <DatePickDiv>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      customInput={<CustomInput />}
                    />
                  </DatePickDiv>
                  <Ing>~</Ing>
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
