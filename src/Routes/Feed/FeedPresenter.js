import React, { useState } from 'react';
import styled from 'styled-components';
import Post from '../../Components/Post';
import { Add } from '../../Components/Icons';
import Popup from 'reactjs-popup';
import PopupButton from '../../Components/Buttons/PopupButton';
import FatText from '../../Components/FatText';
// 이미지 업로드 관련
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  max-width: 600px;
  height: 50px;
  padding: 10px;
  border: ${(props) => props.theme.boxBorder};
  background-color: white;
  position: fixed !important;
  z-index: 10;
`;

const PostWrap = styled.div`
  margin-top: 60px;
`;

const ContentBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  padding: 20px 20px;
`;

const ContentTitle = styled(FatText)`
  font-size: 18px;
  text-align: center;
  margin-bottom: 30px;
`;

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;

const PreviewImg = styled.canvas`
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-position: center center;
  width: 200px;
  height: 260px;
  margin-right: 30px;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const ImgDrop = styled(FilePond)`
  width: 376px;
  /* height: 100px; */
`;

const SubTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

export default ({ feedData, myTabs, setMyTabs }) => {
  const [files, setFiles] = useState([]);

  const processFile = async (error, file) => {
    console.log(error, file);
  };

  return (
    <>
      {myTabs !== 0 ? (
        <>
          <HeaderDiv>
            <Add
              fill={'#0F4C82'}
              onClick={() => {
                setMyTabs(1);
              }}
            />
          </HeaderDiv>
          <PostWrap>
            {feedData.map((post) => (
              <Post
                key={post.id}
                id={post.id}
                location={post.location}
                caption={post.caption}
                user={post.user}
                files={post.files}
                likeCount={post.likeCount}
                isLiked={post.isLiked}
                comments={post.comments}
                createdAt={post.createdAt}
              />
            ))}
          </PostWrap>
        </>
      ) : (
        <ContentBody>
          <ContentTitle text={'게시물 작성'} />
          <SubTitle>파일은 최대 3개 까지 업로드 가능</SubTitle>
          <ContentDiv>
            <ImgDrop
              files={files}
              allowReorder={true}
              allowMultiple={true}
              onupdatefiles={setFiles}
              instantUpload={false}
              allowProcess={false}
              onprocessfile={processFile}
              maxFiles={3}
              name="file"
              server={{
                process: {
                  url: process.env.REACT_APP_BACKEND_URI + '/api/upload/avatar',
                  onload: processFile,
                },
              }}
              labelIdle='이미지 파일 드래그 또는 <span class="filepond--label-action">(클릭)</span>'
            />
          </ContentDiv>
          <ButtonDiv>
            <PopupButton
              type="button"
              text={'게시'}
              onClick={() => {
                console.log('a', files);
              }}
            />
            <PopupButton
              type="button"
              onClick={() => {
                setMyTabs(0);
              }}
              text={'돌아가기'}
            />
          </ButtonDiv>
        </ContentBody>
      )}
    </>
  );
};
