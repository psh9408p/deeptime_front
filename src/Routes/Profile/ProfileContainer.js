import React, { useState } from 'react';
import styled from 'styled-components';
import Loader from '../../Components/Loader';
import { withRouter } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import ProfilePresenter from './ProfilePresenter';
import useTabs from '../../Hooks/useTabs';
import {
  GET_USER,
  LOG_OUT,
  EDIT_AVATAR,
  DELETE_AVATAR,
  ADD_FOLLOW,
  UN_FOLLOW,
  FOLLOW,
} from './ProfileQueries';
import axios from 'axios';
import { toast } from 'react-toastify';
import imageResize from '../../Components/imageResize';
import useInput from '../../Hooks/useInput';

const LoaderWrapper = styled.div`
  min-height: 100vh;
  padding: 100px 0;
`;

export default withRouter(
  ({
    match: {
      params: { username },
    },
  }) => {
    // const profileTabContents = ['게시물', '구독 / 결제'];
    const profileTabContents = ['게시물', '챌린지'];
    const profileTabs = useTabs(0, profileTabContents);
    const [selectFile, setSelectFile] = useState(null);
    const followInput = useInput('');

    const { data, loading, refetch } = useQuery(GET_USER, {
      variables: { username },
    });
    const [logOut] = useMutation(LOG_OUT);
    const [editAvatarMuation] = useMutation(EDIT_AVATAR);
    const [deleteAvatarMuation] = useMutation(DELETE_AVATAR);
    const [addFollowMuation] = useMutation(ADD_FOLLOW);
    const [unFollowMuation] = useMutation(UN_FOLLOW);
    const [followMuation] = useMutation(FOLLOW);

    const handleFileInput = (e) => {
      imageResize(e.target.files, 'preview-img', 640, setSelectFile);
    };

    const onAvatar = async () => {
      const formData = new FormData();
      formData.append('file', selectFile);
      try {
        toast.info('프로필 이미지 변경 중...');
        const { data } = await axios.post(
          process.env.REACT_APP_BACKEND_URI + '/api/upload/avatar',
          formData,
          {
            headers: {
              'content-type': 'multipart/form-data',
            },
          },
        );

        const {
          data: { editAvatar },
        } = await editAvatarMuation({
          variables: { location: data.location, key: data.key },
        });
        if (!editAvatar) {
          alert('프로필 이미지를 변경할 수 없습니다.');
        } else {
          setSelectFile(null);
          await refetch();
          toast.success('프로필 이미지가 변경 되었습니다.');
          return true;
        }
      } catch (e) {
        const realText = e.message.split('GraphQL error: ');
        alert(realText[1]);
        return false;
      }
    };

    const deleteAvatar = async () => {
      try {
        toast.info('프로필 이미지를 변경 중...');
        const {
          data: { deleteAvatar },
        } = await deleteAvatarMuation();
        if (!deleteAvatar) {
          alert('프로필 이미지를 변경할 수 없습니다.');
        } else {
          setSelectFile(null);
          await refetch();
          toast.success('프로필 이미지가 변경 되었습니다.');
          return true;
        }
      } catch (e) {
        const realText = e.message.split('GraphQL error: ');
        alert(realText[1]);
        return false;
      }
    };

    const onAddFollow = async () => {
      try {
        toast.info('새로운 팔로우 추가 중...');
        const {
          data: { addFollow },
        } = await addFollowMuation({
          variables: { inputStr: followInput.value },
        });
        if (!addFollow) {
          alert('팔로우를 추가할 수 없습니다.');
        } else {
          followInput.setValue('');
          await refetch();
          toast.success('새로운 팔로우가 추가 되었습니다.');
        }
      } catch (e) {
        const realText = e.message.split('GraphQL error: ');
        alert(realText[1]);
      }
    };

    if (loading === true) {
      return (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      );
    } else if (!loading && data && data.seeUser) {
      return (
        <ProfilePresenter
          logOut={logOut}
          userData={data.seeUser}
          profileTabs={profileTabs}
          userRefetch={refetch}
          handleFileInput={handleFileInput}
          onAvatar={onAvatar}
          deleteAvatar={deleteAvatar}
          setSelectFile={setSelectFile}
          followInput={followInput}
          onAddFollow={onAddFollow}
          unFollowMuation={unFollowMuation}
          followMuation={followMuation}
        />
      );
    }
  },
);
