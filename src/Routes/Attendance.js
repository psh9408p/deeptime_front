import React from 'react';
import styled from 'styled-components';
import Button_blue from '../Components/Buttons/Button_inputVer';
import Button_red from '../Components/Buttons/Button_red';
import useInput from '../Hooks/useInput';
import Textarea from '../Components/Textarea';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import { ME } from '../SharedQueries';
import Loader from '../Components/Loader';

const LoaderWrapper = styled.div`
  margin: 100px 0px;
`;

const END_ATTENDANCE = gql`
  mutation endAttendance($email: String!) {
    endAttendance(email: $email)
  }
`;

const RE_ATTENDANCE = gql`
  mutation reAttendance($email: String!) {
    reAttendance(email: $email)
  }
`;

const CHECK_ABSENCE = gql`
  mutation checkAbsence($email: String!, $absenceReason: String!) {
    checkAbsence(email: $email, absenceReason: $absenceReason)
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonWrap = styled.div`
  width: 130px;
  height: 33px;
  &:not(:first-child) {
    margin-left: 20px;
  }
`;

const AbsenceBox = styled.form`
  width: 590px;
  height: 200px;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
`;

const AttendanceBox = styled.div`
  width: 590px;
  height: 80px;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

const MyStatus = styled.div`
  width: 240px;
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.classicBlue};
  span {
    color: black;
  }
`;

const EtcButtonWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 24px;
  margin-top: 24px;
`;

const ReasonText = styled(Textarea)`
  width: 542px;
  height: 100px;
  margin-top: 15px;
  display: inline-block;
  margin-bottom: 15px;
`;

export default () => {
  const { data: Mydata, loading, refetch: MyRefetch } = useQuery(ME);

  const StatusReason = useInput(Mydata?.me?.todayTime?.absenceReason);

  const [endAttendanceMutation] = useMutation(END_ATTENDANCE, {
    variables: {
      email: Mydata?.me?.email,
    },
  });

  const [reAttendanceMutation] = useMutation(RE_ATTENDANCE, {
    variables: {
      email: Mydata?.me?.email,
    },
  });

  const [checkAbsenceMutation] = useMutation(CHECK_ABSENCE, {
    variables: {
      email: Mydata?.me?.email,
      absenceReason: StatusReason.value,
    },
  });

  const func_endAttendance = async () => {
    try {
      toast.info('학습 종료 중...');
      const {
        data: { endAttendance },
      } = await endAttendanceMutation();
      if (!endAttendance) {
        toast.error('학습 종료가 불가능합니다.');
      } else {
        await MyRefetch();
        toast.success('학습이 종료되었습니다.');
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      toast.error(realText[1]);
    }
  };

  const func_reAttendance = async () => {
    try {
      toast.info('재학습을 위해 출석 상태 변경 중...');
      const {
        data: { reAttendance },
      } = await reAttendanceMutation();
      if (!reAttendance) {
        toast.error('출석 상태 변경이 불가능합니다.');
      } else {
        await MyRefetch();
        toast.success(
          <div>
            출석 상태 변경이 완료되었습니다.
            <br />
            다시 학습이 가능합니다.
          </div>,
        );
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      toast.error(realText[1]);
    }
  };

  const func_absence = async (e) => {
    e.preventDefault();
    try {
      toast.info('조퇴 처리 중...');
      const {
        data: { checkAbsence },
      } = await checkAbsenceMutation();
      if (!checkAbsence) {
        toast.error('조퇴 처리가 불가능합니다.');
      } else {
        await MyRefetch();
        toast.success('조퇴 처리가 완료되었습니다.');
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      toast.error(realText[1]);
    }
  };

  if (!loading && Mydata && Mydata.me) {
    return (
      <Wrapper>
        <AttendanceBox>
          <MyStatus>
            오늘의 출석 상태:{' '}
            <span>{Mydata.me.todayTime.attendanceStatus}</span>
          </MyStatus>
          <ButtonWrap>
            <Button_red
              type={'button'}
              text={'오늘 학습 끝~!'}
              onClick={func_endAttendance}
            />
          </ButtonWrap>
        </AttendanceBox>
        <AbsenceBox onSubmit={func_absence}>
          <EtcButtonWrap>
            <ButtonWrap>
              <Button_blue
                text={'다시 공부하기~!'}
                onClick={func_reAttendance}
              />
            </ButtonWrap>
            <ButtonWrap>
              <Button_red type="submit" text={'조퇴하기'} />
            </ButtonWrap>
          </EtcButtonWrap>
          <ReasonText placeholder={'조퇴 사유'} {...StatusReason} />
        </AbsenceBox>
      </Wrapper>
    );
  } else {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  }
};
