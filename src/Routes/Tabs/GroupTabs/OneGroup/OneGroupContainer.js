import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@apollo/react-hooks';
import Loader from '../../../../Components/Loader';
import OneGroupPresenter from './OneGroupPresenter';
import useTabs from '../../../../Hooks/useTabs';
import {
  DELETE_GROUP,
  JOIN_GROUP,
  OUT_GROUP,
  SEEONE_GROUP,
  EDIT_GROUP,
  OUT_MEMBER,
} from './OneGroupQueries';
import { SEE_GROUP } from '../SearchGroup/SearchGroupQueries';
import { MY_GROUP } from '../MyGroup/MyGroupQueries';
import { studyOption_group } from '../../../../Components/LongArray';
import useInput from '../../../../Hooks/useInput';
import useSelect from '../../../../Hooks/useSelect';
import WeekRange from '../../../../Components/Date/WeekRange';
import axios from 'axios';
import { feedTerm } from '../SearchGroup/SearchGroupContainer';

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
`;

export default ({
  close,
  groupInfo,
  selectId,
  isSearch = false,
  variables = {
    category: '전체',
    orderBy: 'createdAt_DESC',
    publicBool: false,
    empty: false,
    first: feedTerm,
  },
}) => {
  const preventFloat = (value) => value % 1 === 0;

  const [selectDate, setSelectDate] = useState(new Date());
  const [viewTabs, setViewTabs] = useState(0);
  const [updateLoad, setUpdateLoad] = useState(false);
  const [attendDate, setAttendDate] = useState(new Date());
  const [selectFile, setSelectFile] = useState(null);
  const [passView, setPassView] = useState(false);
  const [dayBool, setDayBool] = useState(new Array(7).fill(true));

  const maxMember = useInput(2, preventFloat, undefined, true);
  const targetTime = useInput(1, preventFloat, undefined, true);
  const name = useInput('');
  const password = useInput('');
  const joinPassword = useInput('');
  const bio = useInput('');
  const groupCategory = useSelect(studyOption_group, studyOption_group);

  const DateTabContents = ['Today', 'Week', 'Month'];
  const DateTabs = useTabs(0, DateTabContents);

  const { data: groupData, refetch: groupRefetch, networkStatus } = useQuery(
    SEEONE_GROUP,
    {
      variables: { groupId: groupInfo.id },
      notifyOnNetworkStatusChange: true,
    },
  );

  const [joinGroupMutation] = useMutation(JOIN_GROUP, {
    refetchQueries: [{ query: SEE_GROUP, variables }, { query: MY_GROUP }],
  });
  const [deleteGroupMutation] = useMutation(DELETE_GROUP, {
    refetchQueries: [{ query: SEE_GROUP, variables }, { query: MY_GROUP }],
  });
  const [outGroupMutation] = useMutation(OUT_GROUP, {
    refetchQueries: [{ query: SEE_GROUP, variables }, { query: MY_GROUP }],
  });
  const [editGroupMutation] = useMutation(EDIT_GROUP, {
    refetchQueries: [{ query: SEE_GROUP, variables }, { query: MY_GROUP }],
  });
  const [outMemberMutation] = useMutation(OUT_MEMBER, {
    refetchQueries: [{ query: SEE_GROUP, variables }, { query: MY_GROUP }],
  });

  const groupClear = () => {
    name.setValue('');
    maxMember.setValue(2);
    groupCategory.setOption('중학생');
    targetTime.setValue(1);
    password.setValue('');
    bio.setValue('');
    setSelectFile(null);
  };

  const groupPush = () => {
    name.setValue(groupData.seeOneGroup.name);
    maxMember.setValue(groupData.seeOneGroup.maxMember);
    groupCategory.setOption(groupData.seeOneGroup.category);
    targetTime.setValue(groupData.seeOneGroup.targetTime);
    password.setValue(groupData.seeOneGroup.password);
    bio.setValue(groupData.seeOneGroup.bio);
    setDayBool(groupData.seeOneGroup.activeDay);
  };

  const onJoin = async (groupId) => {
    try {
      toast.info('그룹 가입 중...');
      const {
        data: { joinGroup },
      } = await joinGroupMutation({
        variables: {
          groupId,
        },
      });
      if (!joinGroup) {
        alert('그룹을 가입할 수 없습니다.');
      } else {
        await groupRefetch();
        toast.success('새로운 그룹에 가입하였습니다.');
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  const onDelete = async (groupId) => {
    if (window.confirm('정말로 그룹을 삭제하시겠습니까?') === false) {
      return;
    }

    try {
      toast.info('그룹 삭제 중...');
      const {
        data: { deleteGroup },
      } = await deleteGroupMutation({
        variables: {
          groupId,
        },
      });
      if (!deleteGroup) {
        alert('그룹을 삭제할 수 없습니다.');
      } else {
        close();
        toast.success('그룹을 삭제하였습니다.');
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  const onOut = async (groupId) => {
    if (window.confirm('정말로 그룹을 떠나시겠습니까?') === false) {
      return;
    }

    try {
      toast.info('그룹 떠나는 중...');
      const {
        data: { outGroup },
      } = await outGroupMutation({
        variables: {
          groupId,
        },
      });
      if (!outGroup) {
        alert('그룹을 떠날 수 없습니다.');
      } else {
        close();
        toast.success('그룹을 떠났습니다.');
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  const onEditGroup = async (e) => {
    e.preventDefault();

    if (maxMember.value < 2 || maxMember.value > 30) {
      alert('수용인원을 2~30명 이내로 설정하세요.');
      return;
    } else if (groupData.seeOneGroup.memberCount > maxMember.value) {
      alert('현재 참여 인원 이상의 수용인원을 설정하세요.');
      return;
    } else if (targetTime.value < 1 || targetTime.value > 18) {
      alert('최소 학습 시간을 1~18시간 이내로 설정하세요.');
      return;
    } else if (dayBool.every((a) => a === false)) {
      alert('활동 요일을 하루 이상 설정하세요.');
      return;
    }

    setUpdateLoad(true);
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
        data: { editGroup },
      } = await editGroupMutation({
        variables: {
          groupId: groupInfo.id,
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
      if (!editGroup) {
        alert('그룹을 수정할 수 없습니다.');
      } else {
        groupClear();
        setViewTabs(0);
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    } finally {
      setUpdateLoad(false);
    }
  };

  const onOutMember = async (groupId, memberId, inClose) => {
    if (window.confirm('정말로 그룹원을 추방하시겠습니까?') === false) {
      return;
    }

    try {
      toast.info('그룹원 추방 중...');
      const {
        data: { outMember },
      } = await outMemberMutation({
        variables: {
          groupId,
          memberId,
        },
      });
      if (!outMember) {
        alert('그룹원을 추방할 수 없습니다.');
      } else {
        await groupRefetch();
        // inClose();
        toast.success('그룹원을 추방하였습니다.');
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  // 수정 화면에서 다른 그룹을 선택하면 원래 정보 화면으로 돌리기 위함
  useEffect(() => {
    setViewTabs(0);
  }, [selectId]);

  if (networkStatus === 1) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  } else {
    return (
      <OneGroupPresenter
        selectDate={selectDate}
        setSelectDate={setSelectDate}
        DateTabs={DateTabs}
        close={close}
        isSearch={isSearch}
        groupData={groupData.seeOneGroup}
        groupRefetch={groupRefetch}
        networkStatus={networkStatus}
        onJoin={onJoin}
        onDelete={onDelete}
        onOut={onOut}
        viewTabs={viewTabs}
        setViewTabs={setViewTabs}
        maxMember={maxMember}
        groupCategory={groupCategory}
        targetTime={targetTime}
        password={password}
        bio={bio}
        name={name}
        onEditGroup={onEditGroup}
        groupClear={groupClear}
        updateLoad={updateLoad}
        groupPush={groupPush}
        onOutMember={onOutMember}
        attendDate={attendDate}
        setAttendDate={setAttendDate}
        setSelectFile={setSelectFile}
        passView={passView}
        setPassView={setPassView}
        joinPassword={joinPassword}
        dayBool={dayBool}
        setDayBool={setDayBool}
      />
    );
  }
};
