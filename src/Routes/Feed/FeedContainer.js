import React, { useState } from 'react';
import { Helmet } from 'rl-react-helmet';
import styled from 'styled-components';
import { FEED_ALL_QUERY, CREATE_POST, EDIT_POST } from './FeedQueries';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Loader from '../../Components/Loader';
import useInput from '../../Hooks/useInput';
import FeedPresenter from './FeedPresenter';
import axios from 'axios';
import { toast } from 'react-toastify';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
`;

const LoaderWrapper = styled.div`
  min-height: 100vh;
  padding: 100px 0;
`;

export default () => {
  // 새로고침을 통해 로그인 시 seeFeed 에러 고치는 법
  // const count = localStorage.getItem("refresh_count") + 1
  // localStorage.setItem("refresh_count", count)
  // if (count === "01") {
  //   window.location.reload()
  // }
  const [myTabs, setMyTabs] = useState(0);
  const [editPostId, setEditPostId] = useState('');
  const location = useInput('');
  const caption = useInput('');

  const [createPostMutation] = useMutation(CREATE_POST);
  const [editPostMutation] = useMutation(EDIT_POST);
  const { data: feedData, loading, refetch } = useQuery(FEED_ALL_QUERY);

  const [files, setFiles] = useState([]);

  const allClear = () => {
    setEditPostId('');
    location.setValue('');
    caption.setValue('');
    setFiles([]);
  };

  const onSubmit = async () => {
    if (files.length === 0) {
      alert('이미지 파일을 최소 1개 이상 등록해주세요.');
      return;
    } else if (caption.value === '') {
      alert('게시물 내용을 작성하세요.');
      return;
    }

    try {
      toast.info('게시물 추가 중...');
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i].file);
      }

      const { data } = await axios.post(
        process.env.REACT_APP_BACKEND_URI + '/api/upload/feed',
        formData,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
        },
      );
      const fileUrl = data.map((file) => file.location);
      const fileKey = data.map((file) => file.key);

      const {
        data: { createPost },
      } = await createPostMutation({
        variables: {
          location: location.value,
          caption: caption.value,
          fileUrl,
          fileKey,
        },
      });
      if (!createPost) {
        alert('게시물을 추가할 수 없습니다.');
      } else {
        await refetch();
        allClear();
        setMyTabs(0);
        toast.success('게시물이 추가 되었습니다.');
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  const onEdit = async () => {
    try {
      toast.info('게시물 수정 중...');
      const {
        data: { editPost },
      } = await editPostMutation({
        variables: {
          postId: editPostId,
          location: location.value,
          caption: caption.value,
        },
      });
      if (!editPost) {
        alert('게시물을 수정할 수 없습니다.');
      } else {
        await refetch();
        allClear();
        setMyTabs(0);
        toast.success('게시물이 수정 되었습니다.');
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  return (
    <Wrapper>
      <Helmet>
        <title>Feed | Prismagram</title>
      </Helmet>
      {loading && (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      )}
      {!loading && feedData && feedData.seeAllFeed && (
        <FeedPresenter
          feedData={feedData.seeAllFeed}
          myTabs={myTabs}
          setMyTabs={setMyTabs}
          location={location}
          caption={caption}
          files={files}
          setFiles={setFiles}
          onSubmit={onSubmit}
          allClear={allClear}
          setEditPostId={setEditPostId}
          onEdit={onEdit}
        />
      )}
    </Wrapper>
  );
};
