import React from 'react';
import styled from 'styled-components';
import EditButton from '../../../../Components/Buttons/EditButton';
import { useMutation } from '@apollo/react-hooks';
import FatText from '../../../../Components/FatText';
import { toast } from 'react-toastify';
import Popup from 'reactjs-popup';
import Input from '../../../../Components/Input';
import Select from '../../../../Components/Select';
import PopupButton from '../../../../Components/Buttons/PopupButton';
import Avatar from '../../../../Components/Avatar';
import { DELETE_STUDENT, DISCON_SEAT, EDIT_STUDENT } from './StudentTabQueries';
import selectChange from '../../../../Components/SelectChange';

const StudentRow = styled.div`
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

const Info = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const DetailInfo = styled.li`
  font-size: 16px;
  &:not(:last-child) {
    margin-bottom: 12px;
  }
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
  student,
  studentRefetch,
  pageIndexChange,
  studentEmail,
  myClassList,
  clearStudent,
  classList,
}) => {
  if (student.classesOfAcademy[0] === undefined) {
    return null;
  }

  const [deleteStudentMutation] = useMutation(DELETE_STUDENT, {
    variables: {
      email: student.email,
      academyId: student.academies[0].id,
      classId: student.classesOfAcademy[0].id,
    },
  });
  // const [disconSeatMutation] = useMutation(DISCON_SEAT, {
  //   variables: { email: student.email },
  // });
  const [editStudentMutation] = useMutation(EDIT_STUDENT);

  const onSubmit = async () => {
    try {
      toast.info('정보 수정중...');
      const {
        data: { editStudent },
      } = await editStudentMutation({
        variables: {
          email: studentEmail.value,
          academyId: classList[myClassList.optionIndex].academy.id,
          classId: myClassList.option,
        },
      });
      if (!editStudent) {
        alert('정보를 수정할 수 없습니다.');
      } else {
        await studentRefetch();
        await clearStudent();
        toast.success('정보가 수정되었습니다.');
        return true;
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
      return false;
    }
  };

  const loadValue = async () => {
    studentEmail.setValue(`${student.email}`);
    myClassList.setOption(`${student.classesOfAcademy[0].id}`);
  };
  return (
    <StudentRow>
      <HeaderColumn>
        <Avatar size="lg" url={student.avatar} />
      </HeaderColumn>
      <HeaderColumn>
        <NameRow>
          <Name>{student.fullName}</Name>
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
                  <PTitle text={'학생 정보'} />
                  <InputWrapper>
                    <SmallInput
                      placeholder={'학생 Email (예: deeptime@google.com)'}
                      {...studentEmail}
                      type="email"
                    />
                    <LoadButton type="button" onClick={loadValue}>
                      기존정보 불러오기
                    </LoadButton>
                  </InputWrapper>
                  <SelectDiv>
                    <span>클래스</span>
                    <Select {...myClassList} id={'modifyClass'} />
                  </SelectDiv>
                  <ButtonDiv>
                    <PopupButton text={'수정'} />
                    <PopupButton
                      type="button"
                      onClick={() => {
                        close();
                        clearStudent();
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
              toast.info(
                `'${student.fullName}'(을)를 관리 목록에서 삭제 중...`,
              );
              await deleteStudentMutation();
              // await disconSeatMutation();
              await studentRefetch();
              toast.success(
                `'${student.fullName}'(이)가 관리 목록에서 삭제되었습니다.`,
              );
            }}
            text="삭제"
          />
          {/* <EditButton
            type="button"
            onClick={async () => {
              toast.info(`좌석 배정 화면으로 이동합니다.`);
              await pageIndexChange(1);
              await studentEmail_seat.setValue(student.email);
            }}
            text="좌석 배정"
          /> */}
          {/* <EditButton
            type="button"
            onClick={async () => {
              toast.info(`'${student.fullName}'의 좌석을 초기화 중...`);
              await disconSeatMutation();
              await studentRefetch();
              toast.success(`'${student.fullName}'의 좌석이 초기화되었습니다.`);
            }}
            text="좌석 초기화"
          /> */}
        </NameRow>
        <Info>
          <DetailInfo>
            <FatText text="학교: " />
            {student.schools[0] && student.schools[0].name}
          </DetailInfo>
          <DetailInfo>
            <FatText text="학원(클래스): " />
            {student.academies[0] && student.academies[0].name}(
            {student.classesOfAcademy[0].name})
          </DetailInfo>
          <DetailInfo>
            <FatText text="사용 목적: " />
            {student.studyGroup}
          </DetailInfo>
          <DetailInfo>
            <FatText text="주소: " />
            {student.address1} {student.address2}
          </DetailInfo>
        </Info>
      </HeaderColumn>
    </StudentRow>
  );
};
