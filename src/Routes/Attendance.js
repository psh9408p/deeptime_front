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
      toast.info('?????? ?????? ???...');
      const {
        data: { endAttendance },
      } = await endAttendanceMutation();
      if (!endAttendance) {
        toast.error('?????? ????????? ??????????????????.');
      } else {
        await MyRefetch();
        toast.success('????????? ?????????????????????.');
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      toast.error(realText[1]);
    }
  };

  const func_reAttendance = async () => {
    try {
      toast.info('???????????? ?????? ?????? ?????? ?????? ???...');
      const {
        data: { reAttendance },
      } = await reAttendanceMutation();
      if (!reAttendance) {
        toast.error('?????? ?????? ????????? ??????????????????.');
      } else {
        await MyRefetch();
        toast.success(
          <div>
            ?????? ?????? ????????? ?????????????????????.
            <br />
            ?????? ????????? ???????????????.
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
      toast.info('?????? ?????? ???...');
      const {
        data: { checkAbsence },
      } = await checkAbsenceMutation();
      if (!checkAbsence) {
        toast.error('?????? ????????? ??????????????????.');
      } else {
        await MyRefetch();
        toast.success('?????? ????????? ?????????????????????.');
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
            ????????? ?????? ??????:{' '}
            <span>{Mydata.me.todayTime.attendanceStatus}</span>
          </MyStatus>
          <ButtonWrap>
            <Button_blue text={'?????? ????????????~!'} onClick={func_reAttendance} />
          </ButtonWrap>
          <ButtonWrap>
            <Button_red
              type={'button'}
              text={'?????? ?????? ???~!'}
              onClick={func_endAttendance}
            />
          </ButtonWrap>
        </AttendanceBox>
        <AbsenceBox onSubmit={func_absence}>
          <EtcButtonWrap>
            <ButtonWrap>
              <Button_red type="submit" text={'????????????'} />
            </ButtonWrap>
          </EtcButtonWrap>
          <ReasonText placeholder={'?????? ??????'} {...StatusReason} />
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
