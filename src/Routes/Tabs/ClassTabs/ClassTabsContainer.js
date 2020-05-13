import React from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from 'react-apollo-hooks';
import ClassTabsPresenter from './ClassTabsPresenter';
import { MY_CLASS, ADD_CLASS } from './ClassTabsQueries';
import Loader from '../../../Components/Loader';
import useInput from '../../../Hooks/useInput';
import { toast } from 'react-toastify';
import useSelect from '../../../Hooks/useSelect';
import selectChange from '../../../Components/SelectChange';

const LoaderWrapper = styled.div`
  margin: 100px 0px;
`;

const ClassTabsContainer = ({
  pageIndex,
  pageIndexChange,
  loginPosition,
  academyList,
}) => {
  const maxLen = (value) => value.length <= 40;

  const className = useInput('');
  const classBio = useInput('', maxLen);
  const myAcademyList = useSelect(
    academyList.map((List) => List.name),
    academyList.map((List) => List.id),
  );

  const {
    data: classData,
    loading: classLoading,
    refetch: classRefetch,
  } = useQuery(MY_CLASS);
  const addClassMutation = useMutation(ADD_CLASS);

  let academyValue = '';
  if (myAcademyList.valueList[0]) {
    academyValue = myAcademyList.valueList[0];
  }

  const clearClass = () => {
    className.setValue('');
    classBio.setValue('');
    myAcademyList.setOption(academyValue);
    selectChange('modifyAcademy', 0);
  };

  const onSubmitClass = async (e) => {
    e.preventDefault();
    let academyMuValue =
      myAcademyList.option !== undefined ? myAcademyList.option : '';

    try {
      toast.info('새로운 클래스를 등록 중...');
      const {
        data: { addClass },
      } = await addClassMutation({
        variables: {
          name: className.value,
          bio: classBio.value,
          academyId: academyMuValue,
        },
      });
      if (!addClass) {
        toast.error('클래스를 등록할 수 없습니다.');
      } else {
        clearClass();
        await classRefetch();
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

export default ClassTabsContainer;
