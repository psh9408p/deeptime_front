import React from 'react';
import styled from 'styled-components';
import Popup from 'reactjs-popup';
import PopButton from '../../../Components/Buttons/PopButton';
import ClassTab from './ClassTab';
import Input from '../../../Components/Input';
import FatText from '../../../Components/FatText';
import Select from '../../../Components/Select';
import PopupButton from '../../../Components/Buttons/PopupButton';
import ClassStatistics from './ClassStatistics';
import ClassSchedule from './ClassSchedule';

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

const LargeInput = styled(Input)`
  width: 500px;
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

const ClassRowWrap = styled.div`
  width: 100%;
  padding: 0px 30px;
`;

export default ({
  pageIndex,
  pageIndexChange,
  className,
  classBio,
  classData,
  myAcademyList,
  clearClass,
  onSubmitClass,
  classRefetch,
}) => {
  if (pageIndex === 0) {
    if (classData.myClass[0] === undefined) {
      alert(
        '????????? ?????? ??? ?????? ????????? ??? ??? ????????????.\n?????? ???????????? ???????????????.',
      );
      pageIndexChange(1);
      return <></>;
    } else {
      classRefetch();
      return (
        <ClassStatistics
          classList={classData.myClass}
          classRefetch={classRefetch}
        />
      );
    }
  } else if (pageIndex === 1) {
    classRefetch();
    return (
      <Regist>
        <PopupDiv>
          <PopupCustom
            trigger={<PopButton text={'????????? ??????'} />}
            closeOnDocumentClick={false}
            modal
          >
            {(close) => {
              if (myAcademyList.optionList[0] === undefined) {
                alert('?????? ????????? ????????? ?????? ??????????????????.');
                close();
                return;
              } else {
                return (
                  <PBody>
                    <form
                      onSubmit={async () => {
                        const fucResult = await onSubmitClass();
                        if (fucResult) {
                          close();
                        }
                      }}
                    >
                      <PTitle text={'????????? ??????'} />
                      <InputWrapper>
                        <SmallInput
                          placeholder={'????????? ?????? (???: 1?????? 1??? or 101???)'}
                          {...className}
                        />
                        <LargeInput
                          placeholder={'????????? ?????? (40??? ??????)'}
                          {...classBio}
                        />
                      </InputWrapper>
                      <SelectDiv>
                        <span>??????</span>
                        <Select {...myAcademyList} id={'modifyAcademy_id'} />
                      </SelectDiv>
                      <ButtonDiv>
                        <PopupButton text={'??????'} />
                        <PopupButton
                          type="button"
                          onClick={() => {
                            close();
                            clearClass();
                          }}
                          text={'??????'}
                        />
                      </ButtonDiv>
                    </form>
                  </PBody>
                );
              }
            }}
          </PopupCustom>
        </PopupDiv>
        <ClassRowWrap>
          {classData.myClass.map((classRoom, index) => (
            <ClassTab
              key={index}
              classRoom={classRoom}
              classRefetch={classRefetch}
              myAcademyList={myAcademyList}
              clearClass={clearClass}
              className={className}
              classBio={classBio}
            />
          ))}
        </ClassRowWrap>
      </Regist>
    );
  } else if (pageIndex === 2) {
    if (classData.myClass[0] === undefined) {
      alert(
        '????????? ?????? ??? ????????? ????????? ????????? ??? ????????????.\n?????? ???????????? ???????????????.',
      );
      pageIndexChange(1);
      return <></>;
    } else {
      classRefetch();
      return (
        <ClassSchedule
          classRoom={classData.myClass}
          classRefetch={classRefetch}
          pageIndex={pageIndex}
        />
      );
    }
  }
};
