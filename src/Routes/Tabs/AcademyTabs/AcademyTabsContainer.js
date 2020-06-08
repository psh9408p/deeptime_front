import React from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/react-hooks';
import AcademyTabsPresenter from './AcademyTabsPresenter';
import { MY_ACADEMY, ADD_ACADEMY } from './AcademyTabsQueries';
import Loader from '../../../Components/Loader';
import { address1, address2_total } from '../../../Components/LongArray';
import useSelect from '../../../Hooks/useSelect';
import useSelect_dynamic from '../../../Hooks/useSelect_dynamic';
import useInput from '../../../Hooks/useInput';
import { toast } from 'react-toastify';

const LoaderWrapper = styled.div`
  margin: 100px 0px;
`;

export default ({ pageIndex, pageIndexChange }) => {
  const maxLen_nonHyphen_nonSpace = (value) =>
    value.length <= 5 && !value.includes('-') && !value.includes(' ');

  const academyName = useInput('');
  const kindArray = ['과외', '기타'];
  const academyKind = useSelect(kindArray, kindArray);
  const academyZipCode = useInput('', maxLen_nonHyphen_nonSpace);
  const academyAddress1 = useSelect(address1, address1);
  const academyAddress2 = useSelect_dynamic(
    address2_total,
    address2_total,
    academyAddress1.optionList,
    academyAddress1.option,
  );
  const academyDetailAddress = useInput('');

  const addAcademyMutation = useMutation(ADD_ACADEMY, {
    variables: {
      name: academyName.value,
      zipCode: academyZipCode.value,
      address1: academyAddress1.option,
      address2: academyAddress2.option,
      detailAddress: academyDetailAddress.value,
      kind: academyKind.option,
    },
  });
  const {
    data: academyData,
    loading: academyLoading,
    refetch: academyRefetch,
  } = useQuery(MY_ACADEMY);

  const clearAcademy = () => {
    academyName.setValue('');
    academyZipCode.setValue('');
    academyAddress1.setOption(address1[0]);
    academyAddress2.setOption(address2_total[0][0]);
    academyDetailAddress.setValue('');
    academyKind.setOption(kindArray[0]);
  };

  const onSubmitAcademy = async () => {
    try {
      toast.info('새로운 학원을 등록 중...');
      const {
        data: { addAcademy },
      } = await addAcademyMutation();
      if (!addAcademy) {
        alert('학원을 등록할 수 없습니다.');
      } else {
        await academyRefetch();
        await clearAcademy();
        toast.success('새로운 학원이 등록되었습니다.');
        return true;
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
      return false;
    }
  };

  if (academyLoading === true) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  } else if (!academyLoading && academyData && academyData.myAcademy) {
    return (
      <AcademyTabsPresenter
        pageIndex={pageIndex}
        pageIndexChange={pageIndexChange}
        academyName={academyName}
        academyZipCode={academyZipCode}
        academyAddress1={academyAddress1}
        academyAddress2={academyAddress2}
        academyDetailAddress={academyDetailAddress}
        academyKind={academyKind}
        academyData={academyData.myAcademy}
        academyRefetch={academyRefetch}
        onSubmitAcademy={onSubmitAcademy}
        clearAcademy={clearAcademy}
      />
    );
  }
};
