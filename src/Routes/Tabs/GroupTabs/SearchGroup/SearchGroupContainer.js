import React, { useState } from 'react';
import styled from 'styled-components';
import useInput from '../../../../Hooks/useInput';
import useSelect from '../../../../Hooks/useSelect';
import SearchGroupPresenter from './SearchGroupPresenter';
import { studyOption_group } from '../../../../Components/LongArray';
import { CREATE_GROUP, SEE_GROUP } from './SearchGroupQueries';
import { useMutation, useQuery } from '@apollo/react-hooks';
import Loader from '../../../../Components/Loader';
import { MY_GROUP } from '../MyGroup/MyGroupQueries';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
  width: 100%;
`;

const LoaderWrapper = styled.div`
  min-height: 100vh;
  padding: 100px 0;
`;

export default ({ myTabs }) => {
  const preventFloat = (value) => value % 1 === 0;

  const [viewTabs, setViewTabs] = useState(0);
  const [makeLoad, setMakeLoad] = useState(false);
  const maxMember = useInput(2, preventFloat, undefined, true);
  const targetTime = useInput(1, preventFloat, undefined, true);
  const name = useInput('');
  const password = useInput('');
  const bio = useInput('');
  const groupCategory = useSelect(studyOption_group, studyOption_group);

  const {
    data: groupData,
    loading: groupLoading,
    refetch: groupRefetch,
  } = useQuery(SEE_GROUP);

  const [createGroupMutation] = useMutation(CREATE_GROUP, {
    refetchQueries: [{ query: MY_GROUP }],
  });

  const groupClear = () => {
    name.setValue('');
    maxMember.setValue(2);
    groupCategory.setOption('중학생');
    targetTime.setValue(1);
    password.setValue('');
    bio.setValue('');
  };

  const onCreateGroup = async (e) => {
    e.preventDefault();

    if (maxMember.value < 2 || maxMember.value > 50) {
      alert('수용인원을 2~50명 이내로 설정하세요.');
      return;
    } else if (targetTime.value < 1 || targetTime.value > 18) {
      alert('최소 학습 시간을 1~18시간 이내로 설정하세요.');
      return;
    }

    setMakeLoad(true);
    try {
      const {
        data: { createGroup },
      } = await createGroupMutation({
        variables: {
          name: name.value,
          maxMember: maxMember.value,
          category: groupCategory.option,
          targetTime: targetTime.value,
          password: password.value,
          bio: bio.value,
        },
      });
      if (!createGroup) {
        alert('그룹을 생성할 수 없습니다.');
      } else {
        await groupRefetch();
        groupClear();
        setViewTabs(0);
        myTabs.changeItem(0);
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    } finally {
      setMakeLoad(false);
    }
  };

  return (
    <Wrapper>
      {groupLoading ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : (
        <>
          <SearchGroupPresenter
            viewTabs={viewTabs}
            setViewTabs={setViewTabs}
            maxMember={maxMember}
            groupCategory={groupCategory}
            targetTime={targetTime}
            password={password}
            bio={bio}
            name={name}
            onCreateGroup={onCreateGroup}
            groupClear={groupClear}
            groupData={groupData.seeGroup}
            makeLoad={makeLoad}
          />
        </>
      )}
    </Wrapper>
  );
};
