import React from 'react';
import styled from 'styled-components';
import EditButton from '../../../../Components/Buttons/EditButton';
import FatText from '../../../../Components/FatText';
import { toast } from 'react-toastify';
import Popup from 'reactjs-popup';
import Input from '../../../../Components/Input';
import Select from '../../../../Components/Select';
import PopupButton from '../../../../Components/Buttons/PopupButton';
import { ClassRoom } from '../../../../Components/Icons';

const ClassRow = styled.div`
  width: 100%;
  display: inline-flex;
  background-color: white;
  height: 200px;
  border: ${(props) => props.theme.boxBorder};
  padding: 15px 30px;
  border-radius: ${(props) => props.theme.borderRadius};
  margin: 10px 0px;
`;

const HeaderColumn = styled.div`
  height: 170px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &:first-child {
    img {
      width: 120px;
      height: 120px;
      margin: 0px 10px;
    }
  }
  &:last-child {
    align-items: flex-start;
    margin-left: 30px;
  }
`;

const NameRow = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled.span`
  font-size: 26px;
  display: block;
  margin-right: 25px;
`;

const Count = styled.div`
  margin: 15px 0px;
  font-size: 16px;
`;

const Info = styled.ul`
  display: flex;
  flex-direction: column;
`;

const DetailInfo = styled.li`
  font-size: 16px;
  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;

const PopupCustom = styled(Popup)`
  &-content {
    width: 800px !important;
    height: 400px !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const PopButton = styled.button`
  border: 0;
  width: 100px;
  border-radius: ${(props) => props.theme.borderRadius};
  font-weight: 600;
  text-align: center;
  padding: 5px 0px;
  font-size: 12px;
  outline-color: black;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const LoadButton = styled(PopButton)`
  width: 140px;
  background-color: #e74c3c;
`;

const PBody = styled.div`
  form {
    display: flex;
    flex-direction: column;
    width: 500px;
    padding: 20px 20px;
  }
`;

const SmallInput = styled(Input)`
  width: 300px;
  margin-right: 15px;
`;

const LargeInput = styled(Input)`
  width: 500px;
  margin-bottom: 7px;
  margin-right: 15px;
`;

const LoadAddDiv = styled.div`
  display: flex;
  margin-bottom: 7px;
`;

const PTitle = styled(FatText)`
  font-size: 18px;
  text-align: center;
  margin-bottom: 30px;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
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

const InputWrapper = styled.div`
  margin-bottom: 10px;
`;

export default ({
  classRoom,
  classRefetch,
  myAcademyList,
  className,
  classBio,
  clearClass,
  deleteClassMutation,
  onSubmit,
  loadValue,
}) => {
  console.log('e', className.value, classBio.value);
  return (
    <ClassRow>
      <HeaderColumn>
        <ClassRoom />
      </HeaderColumn>
      <HeaderColumn>
        <NameRow>
          <Name>{classRoom.name}</Name>
          <PopupCustom
            trigger={<PopButton>수정</PopButton>}
            closeOnDocumentClick={false}
            modal
          >
            {(close) => (
              <PBody>
                <form
                  onSubmit={async () => {
                    const fucResult = await onSubmit();
                    if (fucResult) {
                      close();
                    }
                  }}
                >
                  <PTitle text={'클래스 정보'} />
                  <InputWrapper>
                    <LoadAddDiv>
                      <SmallInput
                        placeholder={'클래스 이름 (예: 1학년 1반 or 101호)'}
                        {...className}
                      />
                      <LoadButton type="button" onClick={loadValue}>
                        기존정보 불러오기
                      </LoadButton>
                    </LoadAddDiv>
                    <LargeInput
                      placeholder={'클래스 소개 (40자 이내)'}
                      {...classBio}
                    />
                  </InputWrapper>
                  <SelectDiv>
                    <span>학원 :</span>
                    <Select {...myAcademyList} id={'modifyAcademy_id'} />
                  </SelectDiv>
                  <ButtonDiv>
                    <PopupButton text={'수정'} />
                    <PopupButton
                      type="button"
                      onClick={() => {
                        close();
                        clearClass();
                      }}
                      text={'닫기'}
                    />
                  </ButtonDiv>
                </form>
              </PBody>
            )}
          </PopupCustom>
          <EditButton
            type="button"
            onClick={async () => {
              toast.info(`'${classRoom.name}'(을)를 관리 목록에서 삭제 중...`);
              await deleteClassMutation();
              await classRefetch();
              toast.success(
                `'${classRoom.name}'(이)가 관리 목록에서 삭제되었습니다.`,
              );
            }}
            text="삭제"
          />
        </NameRow>
        {classRoom.studentsCount === undefined && (
          <Count>
            <FatText text={'0'} /> 학생
          </Count>
        )}
        {classRoom.studentsCount !== undefined && (
          <Count>
            <FatText text={String(classRoom.studentsCount)} /> 학생
          </Count>
        )}
        <Info>
          <DetailInfo>
            <FatText text="학원: " />
            {classRoom.academy.name}
          </DetailInfo>
          <DetailInfo>
            <FatText text="소개: " />
            {classRoom.bio}
          </DetailInfo>
        </Info>
      </HeaderColumn>
    </ClassRow>
  );
};
