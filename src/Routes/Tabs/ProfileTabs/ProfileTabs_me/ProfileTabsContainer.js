import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import ProfileTabsPresenter from './ProfileTabsPresenter';
import { DISCONNECT_STUDENT, CONNECT_STUDENT } from './ProfileTabsQueries';
import { toast } from 'react-toastify';
import useInput from '../../../../Hooks/useInput';

export default ({ pageIndex, User, userRefetch }) => {
  const raspberrySerial = useInput('');
  const secretCode = useInput('');

  const [disconnectStudentMutation] = useMutation(DISCONNECT_STUDENT);
  const [connectStudentMutation] = useMutation(CONNECT_STUDENT);

  const onUnRegist = async (organizationNonExist) => {
    if (organizationNonExist) {
      alert('등록된 독서실(좌석)이 없습니다.');
    } else {
      if (
        window.confirm(
          '독서실을 통한 IAM 서비스가 중단됩니다.\n그래도 좌석을 해제하시겠습니까?',
        ) === true
      ) {
        try {
          toast.info('좌석을 해제 중...');
          const {
            data: { disconnectStudent },
          } = await disconnectStudentMutation();
          if (!disconnectStudent) {
            alert('좌석을 해제할 수 없습니다.');
          } else {
            await userRefetch();
            toast.success('좌석 해제가 완료되었습니다.');
          }
        } catch (e) {
          const realText = e.message.split('GraphQL error: ');
          alert(realText[1]);
        }
      }
    }
  };

  const clearOnRegist = () => {
    raspberrySerial.setValue('');
    secretCode.setValue('');
  };

  const onRegist = async () => {
    try {
      toast.info('좌석을 연결 중...');
      const {
        data: { connectStudent },
      } = await connectStudentMutation({
        variables: {
          secretCode: secretCode.value,
          raspberrySerial: raspberrySerial.value,
        },
      });
      if (!connectStudent) {
        alert('좌석을 연결할 수 없습니다.');
      } else {
        await userRefetch();
        await clearOnRegist();
        toast.success('좌석 연결이 완료되었습니다.');
        return true;
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
      return false;
    }
  };

  return (
    <ProfileTabsPresenter
      pageIndex={pageIndex}
      User={User}
      onUnRegist={onUnRegist}
      raspberrySerial={raspberrySerial}
      secretCode={secretCode}
      clearOnRegist={clearOnRegist}
      onRegist={onRegist}
    />
  );
};
