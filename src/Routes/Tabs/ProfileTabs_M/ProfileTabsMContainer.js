import React from 'react';
import ProfileTabsPresenter from './ProfileTabsMPresenter';
import { useMutation } from '@apollo/react-hooks';
import useInput from '../../../Hooks/useInput';
import { RASPBERRY_REGIST, RASPBERRY_UNREGIST } from './ProfileTabsMQueries';
import { toast } from 'react-toastify';

export default ({ pageIndex, data, userRefetch }) => {
  const seatNumber = useInput('');
  const raspberryId = useInput('');

  const RaspberryClear = () => {
    raspberryId.setValue('');
    seatNumber.setValue('');
  };

  const RaspberryLoad = (value1, value2) => {
    seatNumber.setValue(value1);
    raspberryId.setValue(value2);
  };

  const [raspberryRegistMutation] = useMutation(RASPBERRY_REGIST);
  const [raspberryUnRegistMutation] = useMutation(RASPBERRY_UNREGIST);

  const onRegist = async (index) => {
    try {
      toast.info('기기 등록/수정 중...');
      const {
        data: { raspberryRegist },
      } = await raspberryRegistMutation({
        variables: {
          raspberryId: raspberryId.value,
          seatNumber: Number(seatNumber.value),
          organizationId: data.seeUser.organization.id,
          registNumber: index,
        },
      });
      if (!raspberryRegist) {
        alert('기기를 등록/수정할 수 없습니다.');
      } else {
        await userRefetch();
        await RaspberryClear();
        toast.success('기기 등록/수정이 완료되었습니다.');
        return true;
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
      return false;
    }
  };

  const onUnRegist = async (raspIndex) => {
    if (raspIndex === -1) {
      alert('해당 위치에 등록된 기기가 없습니다.');
      return;
    }
    try {
      toast.info('기기 등록 해제 중...');
      const {
        data: { raspberryUnRegist },
      } = await raspberryUnRegistMutation({
        variables: {
          raspberryId: data.seeUser.organization.raspberries[raspIndex].id,
        },
      });
      if (!raspberryUnRegist) {
        alert('기기 등록 해제를 할 수 없습니다.');
      } else {
        await userRefetch();
        toast.success('기기 등록 해제가 완료되었습니다.');
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  return (
    <ProfileTabsPresenter
      pageIndex={pageIndex}
      data={data}
      raspberryId={raspberryId}
      seatNumber={seatNumber}
      RaspberryClear={RaspberryClear}
      RaspberryLoad={RaspberryLoad}
      onRegist={onRegist}
      onUnRegist={onUnRegist}
    />
  );
};
