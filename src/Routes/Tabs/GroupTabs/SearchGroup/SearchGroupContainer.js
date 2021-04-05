import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useInput from '../../../../Hooks/useInput';
import useSelect from '../../../../Hooks/useSelect';
import SearchGroupPresenter from './SearchGroupPresenter';
import { studyOption_group } from '../../../../Components/LongArray';
import { CREATE_GROUP, SEE_GROUP } from './SearchGroupQueries';
import { useMutation, useQuery } from '@apollo/react-hooks';
import Loader from '../../../../Components/Loader';
import { MY_GROUP } from '../MyGroup/MyGroupQueries';
import axios from 'axios';

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

// const filterArray = [
//   '높은 학습 시간순',
//   '낮은 학습 시간순',
//   '높은 출석률순',
//   '낮은 출석률순',
// ];
const getAll = studyOption_group.slice();
getAll.unshift('전체');
export const feedTerm = 1;

export default ({ myTabs }) => {
  const groupCategory = useSelect(studyOption_group, studyOption_group);
  const categroyFilter = useSelect(getAll, getAll, '전체');
  // const orderFilter = useSelect(filterArray, filterArray, '높은 학습 시간순');

  const preventFloat = (value) => value % 1 === 0;

  const [first, setFirst] = useState(feedTerm);
  const [publicBool, setPublicBool] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [viewTabs, setViewTabs] = useState(0);
  const [makeLoad, setMakeLoad] = useState(false);
  const [selectFile, setSelectFile] = useState(null);
  const [dayBool, setDayBool] = useState(new Array(7).fill(true));
  const [variables, setVariables] = useState({
    category: '전체',
    publicBool,
    empty,
    first,
  });
  const maxMember = useInput(2, preventFloat, undefined, true);
  const targetTime = useInput(1, preventFloat, undefined, true);
  const name = useInput('');
  const password = useInput('');
  const bio = useInput('');

  const {
    data: groupData,
    refetch: groupRefetch,
    networkStatus: groupNetwork,
  } = useQuery(SEE_GROUP, {
    variables,
    notifyOnNetworkStatusChange: true,
  });

  const [createGroupMutation] = useMutation(CREATE_GROUP, {
    refetchQueries: [{ query: MY_GROUP }],
  });

  const publicBoolHandler = () => {
    setPublicBool(!publicBool);
  };

  const emptyHandler = () => {
    setEmpty(!empty);
  };

  const reFeed = () => {
    setVariables({
      category: categroyFilter.option,
      publicBool,
      empty,
      first: variables.first,
    });
  };

  const groupClear = () => {
    name.setValue('');
    maxMember.setValue(2);
    groupCategory.setOption('중학생');
    targetTime.setValue(1);
    password.setValue('');
    bio.setValue('');
    setSelectFile(null);
  };

  const onCreateGroup = async (e) => {
    e.preventDefault();

    if (maxMember.value < 2 || maxMember.value > 30) {
      alert('수용인원을 30명 이내로 설정하세요.');
      return;
    } else if (targetTime.value < 1 || targetTime.value > 18) {
      alert('최소 학습 시간을 1~18시간 이내로 설정하세요.');
      return;
    } else if (dayBool.every((a) => a === false)) {
      alert('활동 요일을 하루 이상 설정하세요.');
      return;
    }

    setMakeLoad(true);
    let upResult = null;
    try {
      if (selectFile) {
        const formData = new FormData();
        formData.append('file', selectFile);
        upResult = await axios.post(
          process.env.REACT_APP_BACKEND_URI + '/api/upload/group',
          formData,
          {
            headers: {
              'content-type': 'multipart/form-data',
            },
          },
        );
      }

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
          imgUrl: selectFile ? upResult.data.location : '',
          imgKey: selectFile ? upResult.data.key : '',
          activeDay: dayBool,
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

  useEffect(() => {
    setVariables({
      category: categroyFilter.option,
      publicBool,
      empty,
      first: feedTerm,
    });
    // 피드 개수 초기화
    setFirst(feedTerm);
  }, [categroyFilter.option, publicBool, empty]);

  // 더보기 할때만 개수 늘어나게 따로
  useEffect(() => {
    setVariables({
      category: categroyFilter.option,
      publicBool,
      empty,
      first,
    });
  }, [first]);

  useEffect(() => {
    groupRefetch(variables);
  }, [variables]);

  return (
    <Wrapper>
      {groupNetwork === 1 ? (
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
            setSelectFile={setSelectFile}
            dayBool={dayBool}
            setDayBool={setDayBool}
            categroyFilter={categroyFilter}
            groupNetwork={groupNetwork}
            publicBoolHandler={publicBoolHandler}
            emptyHandler={emptyHandler}
            reFeed={reFeed}
            publicBool={publicBool}
            empty={empty}
            first={first}
            setFirst={setFirst}
            feedTerm={feedTerm}
            variables={variables}
          />
        </>
      )}
    </Wrapper>
  );
};
