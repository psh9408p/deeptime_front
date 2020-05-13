import React from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from 'react-apollo-hooks';
import ClassTabsPresenter from './ClassTabsPresenter';
import { MY_CLASS, ADD_CLASS } from './ClassTabsQueries';
import Loader from '../../../Components/Loader';
import useInput from '../../../Hooks/useInput';
import { toast } from 'react-toastify';
import useSelect from '../../../Hooks/useSelect';

const LoaderWrapper = styled.div`
  margin: 100px 0px;
`;

export default ({ pageIndex, pageIndexChange, loginPosition, academyList }) => {
  const maxLen = (value) => value.length <= 40;

  const className = useInput('');
  const classBio = useInput('', maxLen);
  const myAcademyList = useSelect(
    academyList.map((List) => List.name),
    academyList.map((List) => List.id),
  );

  console.log('a', className.value, classBio.value);
  const {
    data: classData,
    loading: classLoading,
    refetch: classRefetch,
  } = useQuery(MY_CLASS);
  const addClassMutation = useMutation(ADD_CLASS);

  const clearClass = async () => {
    className.setValue('');
    classBio.setValue('');
    myAcademyList.setOption(myAcademyList.valueList[0]);
  };

  const onSubmitClass = async (e) => {
    e.preventDefault();
    try {
      toast.info('새로운 클래스를 등록 중...');
      const {
        data: { addClass },
      } = await addClassMutation({
        variables: {
          name: className.value,
          bio: classBio.value,
          academyId: myAcademyList.option,
        },
      });
      if (!addClass) {
        toast.error('클래스를 등록할 수 없습니다.');
      } else {
        await classRefetch();
        await clearClass();
        toast.success('새로운 클래스가 등록되었습니다.');
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      toast.error(realText[1]);
    }
  };

  if (classLoading === true) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  } else if (!classLoading && classData && classData.myClass) {
    return (
      <ClassTabsPresenter
        pageIndex={pageIndex}
        pageIndexChange={pageIndexChange}
        loginPosition={loginPosition}
        className={className}
        classBio={classBio}
        classData={classData}
        myAcademyList={myAcademyList}
        onSubmitClass={onSubmitClass}
        clearClass={clearClass}
        classRefetch={classRefetch}
      />
    );
  }
};
