import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import Loader from '../../../../Components/Loader';
import MyGroupPresenter from './MyGroupPresenter';
import { BOOKMARK_GROUP, MY_GROUP } from './MyGroupQueries';
import { toast } from 'react-toastify';

const LoaderWrapper = styled.div`
  min-height: 100vh;
  padding: 100px 0;
`;

export default ({ myTabs }) => {
  const {
    data: groupData,
    loading: groupLoading,
    refetch: groupRefetch,
  } = useQuery(MY_GROUP);

  const [bookmarkGroupMutation] = useMutation(BOOKMARK_GROUP);

  const onBookmark = async (groupId, orderBool) => {
    try {
      toast.info('그룹 북마크 중...');
      const {
        data: { bookmarkGroup },
      } = await bookmarkGroupMutation({
        variables: {
          groupId,
          orderBool,
        },
      });
      if (!bookmarkGroup) {
        alert('그룹을 북마크할 수 없습니다.');
      } else {
        await groupRefetch();
        toast.success('그룹 북마크를 완료하였습니다.');
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  return (
    <>
      {groupLoading ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : (
        <MyGroupPresenter
          groupData={groupData.myGroup}
          onBookmark={onBookmark}
          myTabs={myTabs}
        />
      )}
    </>
  );
};
