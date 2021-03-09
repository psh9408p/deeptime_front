import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Post from '../../../../Components/Post';
import { Add } from '../../../../Components/Icons';
import PopupButton from '../../../../Components/Buttons/PopupButton';
import Button_custom from '../../../../Components/Buttons/Button_custom';
import FatText from '../../../../Components/FatText';
import Input_100 from '../../../../Components/Input_100';
import Textarea from '../../../../Components/Textarea';
import { FEED_ALL_QUERY } from './SearchGroupQueries';
// import useSelect from '../../../Hooks/useSelect';
import Popup from 'reactjs-popup';

import { studyOption_group } from '../../../../Components/LongArray';
import Select from '../../../../Components/Select';
import useSelect from '../../../../Hooks/useSelect';
import useSelect_dynamic from '../../../../Hooks/useSelect_dynamic';
import useSelect_dynamic2 from '../../../../Hooks/useSelect_dynamic2';
import OneGroup from '../OneGroup/';
import Loader from '../../../../Components/Loader';
import CUGroup from '../CUGroup';

const FilterdSelect = styled.div`
  width: 30%;
  height: 100%;
`;

const SelectDiv = styled.div`
  display: inline-flex;
  border: 0;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.bgColor};
  height: 35px;
  margin-bottom: 7px;
  font-size: 12px;
  width: 100%;
  span {
    display: inline-flex;
    width: 100px;
    align-items: center;
    justify-content: center;
    font-weight: 600;
  }
`;

const LoaderWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  height: 100%;
  width: 100%;
`;

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  max-width: 600px;
  height: 50px;
  padding: 10px;
  margin-top: 10px;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: white;
  /* position: fixed !important;
  z-index: 10; */
`;

const ContentBody = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 500px;
  padding: 20px 20px;
`;

const ContentTitle = styled(FatText)`
  font-size: 18px;
  text-align: center;
  margin: 10px 0 30px 0;
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

const CaptionText = styled(Textarea)`
  width: 376px;
  height: 100px;
  display: inline-block;
`;

const MoreDiv = styled.div`
  width: 100%;
  max-width: 600px;
`;

const InputWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 376px;
  height: 35px;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: #f1f0ef;
  padding-left: 15px;
  font-size: 12px;
  margin-bottom: 10px;
  span {
    margin-right: 5px;
  }
`;

const GroupListWrap = styled.div`
  margin-top: 10px;
  width: 100%;
  max-width: 600px;
`;

const GroupBox = styled.div`
  cursor: pointer;
  display: flex;
  padding: 5px 5px;
  /* flex-direction: column; */
  width: 100%;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: white;
  :hover {
    filter: brightness(80%);
  }
  :not(:last-child) {
    margin-bottom: 10px;
  }
`;
const ImageWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageBox = styled.div`
  width: 50px;
  height: 50px;
  background: dodgerblue;
  border-radius: 50%;
`;
const MemberWrap = styled.div`
  margin-left: 10px;
`;
const MemberDiv = styled.div`
  display: flex;
  margin-top: 8px;
`;

const MemberList = styled.p`
  margin-right: 10px;
`;

const PopupCustom = styled(Popup)`
  &-content {
    width: 650px !important;
    max-height: 820px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${(props) => props.theme.borderRadius};
  }
`;

export default ({
  viewTabs,
  setViewTabs,
  maxMember,
  groupCategory,
  targetTime,
  password,
  bio,
  name,
  onCreateGroup,
  groupClear,
  groupData,
  makeLoad,
}) => {
  return (
    <>
      {viewTabs === 0 ? (
        <>
          <HeaderDiv>
            {/* <FilterdSelect>
              <Select {...group1} id={'testSelect'} />
            </FilterdSelect> */}
            <Add
              fill={'#0F4C82'}
              onClick={() => {
                setViewTabs(1);
              }}
            />
          </HeaderDiv>
          <GroupListWrap>
            {groupData.map((group) => (
              <PopupCustom
                key={group.id}
                trigger={
                  <GroupBox>
                    <ImageWrap>
                      <ImageBox></ImageBox>
                    </ImageWrap>
                    <MemberWrap>
                      <p style={{ fontSize: '16px' }}>{group.name}</p>
                      <p>{group.category}</p>
                      <p>최소 학습 시간: {group.targetTime}시간</p>
                      <MemberDiv>
                        <MemberList>
                          인원: {group.memberCount}/{group.maxMember}
                        </MemberList>
                        <MemberList>방장: {group.manager.username}</MemberList>
                        <MemberList>
                          {group.publicBool ? '공개방' : '비공개방'}
                        </MemberList>
                      </MemberDiv>
                    </MemberWrap>
                  </GroupBox>
                }
                closeOnDocumentClick={false}
                modal
              >
                {(close) => {
                  return (
                    <OneGroup close={close} groupInfo={group} isSearch={true} />
                  );
                }}
              </PopupCustom>
            ))}
          </GroupListWrap>
          {/* <PostWrap>
            {filtering &&
              filterdData.map((post) => (
                <div style={{ marginBottom: '25px' }} key={post.id}>
                  <Post
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
          </PostWrap> */}
          {/* <MoreDiv>
            <Button_custom
              margin={'0'}
              width={'100%'}
              text={'게시물 20개 더보기'}
              loading={networkStatus === 4 ? true : false}
              onClick={() => {
                setVariables({ first: variables.first + feedTerm });
              }}
            />
          </MoreDiv> */}
        </>
      ) : (
        <CUGroup
          CU_check={'create'}
          setViewTabs={setViewTabs}
          maxMember={maxMember}
          groupCategory={groupCategory}
          targetTime={targetTime}
          password={password}
          bio={bio}
          name={name}
          onSubmit={onCreateGroup}
          groupClear={groupClear}
          loading={makeLoad}
        />
      )}
    </>
  );
};
