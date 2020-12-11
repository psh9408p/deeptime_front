import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Popup from 'reactjs-popup';
import PopButton from '../../../Components/Buttons/PopButton';
import StudentTab from './StudentTab';
import Input from '../../../Components/Input';
import FatText from '../../../Components/FatText';
import Select from '../../../Components/Select';
import PopupButton from '../../../Components/Buttons/PopupButton';

const Regist = styled.div`
  width: 100%;
`;

const PopupDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 15px 30px;
`;

const PopupCustom = styled(Popup)`
  &-content {
    width: 600px !important;
    height: 300px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${(props) => props.theme.borderRadius};
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

const SelectDiv = styled.div`
  display: inline-flex;
  border: 0;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.bgColor};
  height: 35px;
  font-size: 12px;
  max-width: 250px;
  margin-bottom: 15px;
  span {
    display: inline-flex;
    width: 70px;
    align-items: center;
    justify-content: left;
    font-weight: 600;
    padding-left: 15px;
  }
`;

const SmallInput = styled(Input)`
  width: 300px;
  margin-bottom: 7px;
  margin-right: 15px;
`;

const PTitle = styled(FatText)`
  font-size: 18px;
  text-align: center;
  margin-bottom: 30px;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const InputWrapper = styled.div`
  margin-bottom: 10px;
`;

const SeatRegistBody = styled.div`
  width: 60%;
  display: inline-flex;
  justify-content: center;
  background-color: #bdc3c7;
  height: 200px;
  border: 0;
  padding: 35px 30px 15px 30px;
  border-radius: ${(props) => props.theme.borderRadius};
  margin: 10px 0px;
`;

const StudentRowWrap = styled.div`
  width: 100%;
  padding: 0px 30px;
`;

export default ({
  pageIndex,
  pageIndexChange,
  studentData,
  studentRefetch,
  studentEmail,
  confirmStudent,
  myClassList,
  clearStudent,
  onSubmitStudent,
  classList,
}) => {
  studentRefetch();
  if (pageIndex === 0) {
    if (classList[0] === undefined) {
      const isFirstRun = useRef(true);
      useEffect(() => {
        if (isFirstRun.current) {
          alert('클래스 등록 후 학생 기능을 사용할 수 있습니다.');
          isFirstRun.current = false;
          return;
        }
      }, []);
      return <></>;
    } else {
      return (
        <Regist>
          <PopupDiv>
            <PopupCustom
              trigger={<PopButton text={'학생 추가'} />}
              closeOnDocumentClick={false}
              modal
            >
              {(close) => (
                <PBody>
                  <form
                    onSubmit={async () => {
                      const fucResult = await onSubmitStudent();
                      if (fucResult) {
                        close();
                      }
                    }}
                  >
                    <PTitle text={'학생 정보'} />
                    <InputWrapper>
                      <SmallInput
                        placeholder={'학생 Email (예: deeptime@google.com)'}
                        {...studentEmail}
                        type="email"
                      />
                      <PopButton
                        type={'button'}
                        onClick={confirmStudent}
                        text={'유효성 확인'}
                      />
                    </InputWrapper>
                    <SelectDiv>
                      <span>클래스</span>
                      <Select {...myClassList} id={'modifyClass'} />
                    </SelectDiv>
                    <ButtonDiv>
                      <PopupButton text={'등록'} />
                      <PopupButton
                        type="button"
                        onClick={() => {
                          close();
                          clearStudent();
                          localStorage.setItem('email_confirm', 'None');
                        }}
                        text={'닫기'}
                      />
                    </ButtonDiv>
                  </form>
                </PBody>
              )}
            </PopupCustom>
          </PopupDiv>
          <StudentRowWrap>
            {studentData.myStudent.map((student, index) => (
              <StudentTab
                key={index}
                student={student}
                studentRefetch={studentRefetch}
                pageIndexChange={pageIndexChange}
                studentEmail={studentEmail}
                myClassList={myClassList}
                clearStudent={clearStudent}
                classList={classList}
              />
            ))}
          </StudentRowWrap>
          )
        </Regist>
      );
    }
  } else if (pageIndex === 1) {
    return '준비중';
    // <>
    //   <SeatRegistBody>
    //     <form onSubmit={onSubmitConSeat}>
    //       <InputWrapper>
    //         <SmallInput
    //           placeholder={'Email (예: deeptime@google.com)'}
    //           {...studentEmail_seat}
    //           type="email"
    //         />
    //       </InputWrapper>
    //       <InputWrapper>
    //         <SmallInput
    //           placeholder={'좌석 고유번호 (예: ck7zyxuxa01la07989elhkghf)'}
    //           {...seatId}
    //         />
    //       </InputWrapper>
    //       <ButtonDiv>
    //         <PopupButton text={'좌석 배정'} />
    //         <PopupButton
    //           type="button"
    //           onClick={() => {
    //             clearSeatForm();
    //           }}
    //           text={'지우기'}
    //         />
    //       </ButtonDiv>
    //     </form>
    //   </SeatRegistBody>
    //   <CopyToClipboard
    //     text="ck7zyxuxa01la07989elhkghf"
    //     onCopy={() => toast.success('좌석 고유번호가 복사됐습니다.')}
    //   >
    //     <SeatBox text={'1행 1열'} />
    //   </CopyToClipboard>
    //   <SelectSeatTab />
    // </>
  }
};
