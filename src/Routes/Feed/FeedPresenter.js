import React from 'react';
import styled from 'styled-components';
import Post from '../../Components/Post';
import { Add } from '../../Components/Icons';
import PopupButton from '../../Components/Buttons/PopupButton';
import Button_custom from '../../Components/Buttons/Button_custom';
import FatText from '../../Components/FatText';
import Input_100 from '../../Components/Input_100';
import Textarea from '../../Components/Textarea';
import { FEED_ALL_QUERY } from './FeedQueries';

// 이미지 업로드 관련
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginFileValidateSize,
  FilePondPluginImagePreview,
);

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
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: white;
  position: fixed !important;
  z-index: 10;
`;

const PostWrap = styled.div`
  margin-top: 60px;
  width: 100%;
  max-width: 600px;
`;

const ContentBody = styled.form`
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

const CaptionText = styled(Textarea)`
  width: 376px;
  height: 100px;
  display: inline-block;
`;

const MoreDiv = styled.div`
  width: 100%;
  max-width: 600px;
`;

export default ({
  feedData,
  myTabs,
  setMyTabs,
  location,
  caption,
  files,
  setFiles,
  onSubmit,
  allClear,
  setEditPostId,
  onEdit,
  variables,
  setVariables,
  feedTerm,
  networkStatus,
}) => {
  return (
    <>
      {myTabs === 0 ? (
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
              <div style={{ marginBottom: '25px' }}>
                <Post
                  key={post.id}
                  id={post.id}
                  location={post.location}
                  caption={post.caption}
                  user={post.user}
                  files={post.files}
                  likeCount={post.likeCount}
                  isLiked={post.isLiked}
                  isSelf={post.isSelf}
                  comments={post.comments}
                  createdAt={post.createdAt}
                  fileKey={post.files.map((file) => file.key)}
                  setMyTabs={setMyTabs}
                  setEditPostId={setEditPostId}
                  locationInput={location}
                  captionInput={caption}
                  refetchQuerie={FEED_ALL_QUERY}
                  variables={variables}
                />
              </div>
            ))}
          </PostWrap>
          <MoreDiv>
            <Button_custom
              margin={'0'}
              width={'100%'}
              text={'게시물 20개 더보기'}
              loading={networkStatus === 4 ? true : false}
              onClick={() => {
                setVariables({ first: variables.first + feedTerm });
              }}
            />
          </MoreDiv>
        </>
      ) : myTabs === 1 ? (
        <ContentBody onSubmit={onSubmit}>
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
              maxFiles={3}
              name="file"
              server={{
                process: {
                  url: process.env.REACT_APP_BACKEND_URI + '/api/upload/avatar',
                  // onload: processFile,
                },
              }}
              labelIdle='이미지 파일 드래그 또는 <span class="filepond--label-action">(클릭)</span>'
              allowImageValidateSize={true}
              maxFileSize={'1MB'}
              labelMaxFileSizeExceeded={'파일 용량(1MB) 초과'}
            />
            <Input_100
              placeholder={'(선택 항목) 위치'}
              width={'376px'}
              height={'35px'}
              margin={'20px 0 10px 0'}
              bgColor={'#f1f0ef'}
              {...location}
              required={false}
            />
            <CaptionText
              placeholder={'(필수 항목) 내용'}
              bgColor={'#f1f0ef'}
              {...caption}
            />
          </ContentDiv>
          <ButtonDiv>
            <PopupButton text={'게시'} />
            <PopupButton
              type="button"
              onClick={() => {
                setMyTabs(0);
                allClear();
              }}
              text={'돌아가기'}
            />
          </ButtonDiv>
        </ContentBody>
      ) : (
        <ContentBody onSubmit={onEdit}>
          <ContentTitle text={'게시물 수정'} />
          <ContentDiv>
            <Input_100
              placeholder={'(선택 항목) 위치'}
              width={'376px'}
              height={'35px'}
              margin={'20px 0 10px 0'}
              bgColor={'#f1f0ef'}
              {...location}
              required={false}
            />
            <CaptionText
              placeholder={'(필수 항목) 내용'}
              bgColor={'#f1f0ef'}
              {...caption}
            />
          </ContentDiv>
          <ButtonDiv>
            <PopupButton text={'수정'} />
            <PopupButton
              type="button"
              onClick={() => {
                setMyTabs(0);
                allClear();
              }}
              text={'돌아가기'}
            />
          </ButtonDiv>
        </ContentBody>
      )}
    </>
  );
};
