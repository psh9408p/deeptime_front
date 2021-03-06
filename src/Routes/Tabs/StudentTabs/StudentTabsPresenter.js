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
          alert('????????? ?????? ??? ?????? ????????? ????????? ??? ????????????.');
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
              trigger={<PopButton text={'?????? ??????'} />}
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
                    <PTitle text={'?????? ??????'} />
                    <InputWrapper>
                      <SmallInput
                        placeholder={'?????? Email (???: deeptime@google.com)'}
                        {...studentEmail}
                        type="email"
                      />
                      <PopButton
                        type={'button'}
                        onClick={confirmStudent}
                        text={'????????? ??????'}
                      />
                    </InputWrapper>
                    <SelectDiv>
                      <span>?????????</span>
                      <Select {...myClassList} id={'modifyClass'} />
                    </SelectDiv>
                    <ButtonDiv>
                      <PopupButton text={'??????'} />
                      <PopupButton
                        type="button"
                        onClick={() => {
                          close();
                          clearStudent();
                          localStorage.setItem('email_confirm', 'None');
                        }}
                        text={'??????'}
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
    return '?????????';
    // <>
    //   <SeatRegistBody>
    //     <form onSubmit={onSubmitConSeat}>
    //       <InputWrapper>
    //         <SmallInput
    //           placeholder={'Email (???: deeptime@google.com)'}
    //           {...studentEmail_seat}
    //           type="email"
    //         />
    //       </InputWrapper>
    //       <InputWrapper>
    //         <SmallInput
    //           placeholder={'?????? ???????????? (???: ck7zyxuxa01la07989elhkghf)'}
    //           {...seatId}
    //         />
    //       </InputWrapper>
    //       <ButtonDiv>
    //         <PopupButton text={'?????? ??????'} />
    //         <PopupButton
    //           type="button"
    //           onClick={() => {
    //             clearSeatForm();
    //           }}
    //           text={'?????????'}
    //         />
    //       </ButtonDiv>
    //     </form>
    //   </SeatRegistBody>
    //   <CopyToClipboard
    //     text="ck7zyxuxa01la07989elhkghf"
    //     onCopy={() => toast.success('?????? ??????????????? ??????????????????.')}
    //   >
    //     <SeatBox text={'1??? 1???'} />
    //   </CopyToClipboard>
    //   <SelectSeatTab />
    // </>
  }
};
