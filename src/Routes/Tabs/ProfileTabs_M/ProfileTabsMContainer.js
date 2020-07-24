import React from 'react';
import ProfileTabsPresenter from './ProfileTabsMPresenter';
import { useMutation } from '@apollo/react-hooks';
import useInput from '../../../Hooks/useInput';
import {
  RASPBERRYSEAT_REGIST,
  RASPBERRYSEAT_UNREGIST,
  DISCONNECT_STUDENT,
} from './ProfileTabsMQueries';
import { toast } from 'react-toastify';

export default ({ pageIndex, data, userRefetch }) => {
  const seatNumber = useInput();

  const RaspberryClear = () => {
    seatNumber.setValue('');
  };

  const [raspberrySeatRegistMutation] = useMutation(RASPBERRYSEAT_REGIST);
  const [raspberrySeatUnRegistMutation] = useMutation(RASPBERRYSEAT_UNREGIST);
  const [disconnectStudentMutation] = useMutation(DISCONNECT_STUDENT);

  const onRegist = async (index1, index2) => {
    try {
      toast.info('좌석을 등록/수정 중...');
      const {
        data: { raspberrySeatRegist },
      } = await raspberrySeatRegistMutation({
        variables: {
          organizationId: data.seeUser.organization.id,
          raspberryId:
            data.seeUser.organization.hubs[index1].raspberries[index2].id,
          seatNumber: Number(seatNumber.value),
        },
      });
      if (!raspberrySeatRegist) {
        alert('좌석을 등록/수정할 수 없습니다.');
      } else {
        await userRefetch();
        await RaspberryClear();
        toast.success('좌석 등록/수정이 완료되었습니다.');
        return true;
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
      return false;
    }
  };

  const onUnRegist = async (index1, index2) => {
    try {
      toast.info('좌석을 해제 중...');
      const {
        data: { raspberrySeatUnRegist },
      } = await raspberrySeatUnRegistMutation({
        variables: {
          raspberryId:
            data.seeUser.organization.hubs[index1].raspberries[index2].id,
        },
      });
      if (!raspberrySeatUnRegist) {
        alert('좌석을 해제 할 수 없습니다.');
      } else {
        await userRefetch();
        toast.success('좌석 해제가 완료되었습니다.');
        return true;
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
      return false;
    }
  };

  const onUnMountStudent = async (studentId) => {
    if (
      window.confirm(
        '해당 학생의 독서실 IAM 서비스 사용이 중단됩니다.\n그래도 해제하시겠습니까?',
      ) === true
    ) {
      try {
        toast.info('해당 캠(좌석)에서 학생을 해제 중...');
        const {
          data: { disconnectStudent_M },
        } = await disconnectStudentMutation({
          variables: {
            studentId,
          },
        });
        if (!disconnectStudent_M) {
          alert('학생을 해제 할 수 없습니다.');
        } else {
          await userRefetch();
          toast.success('해당 캠(좌석)에서 학생이 해제되었습니다.');
        }
      } catch (e) {
        const realText = e.message.split('GraphQL error: ');
        alert(realText[1]);
      }
    }
  };

  return (
    <ProfileTabsPresenter
      pageIndex={pageIndex}
      data={data}
      seatNumber={seatNumber}
      RaspberryClear={RaspberryClear}
      onRegist={onRegist}
      onUnRegist={onUnRegist}
      onUnMountStudent={onUnMountStudent}
    />
  );
};
