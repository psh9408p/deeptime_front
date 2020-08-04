import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import ProfilePresenter from './ProfilePresenter';
import useTabs from '../../Hooks/useTabs';
import {
  GET_USER,
  LOG_OUT,
  EDIT_AVATAR,
  DELETE_AVATAR,
} from './ProfileQueries';
import axios from 'axios';
import { toast } from 'react-toastify';
import imageResize from '../../Components/imageResize';

export default withRouter(
  ({
    match: {
      params: { username },
    },
  }) => {
    const profileTabContents = ['구독 / 결제', '개인'];
    const profileTabs = useTabs(0, profileTabContents);
    const [selectFile, setSelectFile] = useState(null);

    const { data, loading, refetch } = useQuery(GET_USER, {
      variables: { username },
    });
    const [logOut] = useMutation(LOG_OUT);
    const [editAvatarMuation] = useMutation(EDIT_AVATAR);
    const [deleteAvatarMuation] = useMutation(DELETE_AVATAR);

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

    return (
      <ProfilePresenter
        loading={loading}
        logOut={logOut}
        data={data}
        profileTabs={profileTabs}
        userRefetch={refetch}
        handleFileInput={handleFileInput}
        onAvatar={onAvatar}
        deleteAvatar={deleteAvatar}
        setSelectFile={setSelectFile}
      />
    );
  },
);
