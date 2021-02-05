import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Popup from 'reactjs-popup';
import FatText from '../../../Components/FatText';
import PopupButton from '../../../Components/Buttons/PopupButton';
import phoneNumberNormalize from '../../../Components/phoneNumberNormalize';
import Input from '../../../Components/Input';
import SquarePost from '../../../Components/SquarePost';
import MyStatistics from '../../../Routes/Tabs/MyStudyTabs/MyStatistics';
import MySchedule from '../../../Routes/Tabs/MyStudyTabs/MySchedule';

const Regist = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 320px;
  margin: 0 auto;
  padding: 25px 0;
`;

const ContentLink = styled(Link)`
  cursor: pointer;
  width: 320px;
  height: 45px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: black;
  font-weight: 700;
`;

const ContentButton = styled.button`
  cursor: pointer;
  width: 320px;
  height: 45px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: black;
  font-weight: 700;
  background: none;
  border: 0;
  outline: none;
`;

const ContentDiv = styled.div`
  cursor: pointer;
  width: 320px;
  height: 45px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: black;
  font-weight: 700;
`;

const PopupCustom = styled(Popup)`
  &-content {
    width: 500px !important;
    height: 230px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${(props) => props.theme.borderRadius};
  }
`;

const PBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  padding: 20px 20px;
`;

const PTitle = styled(FatText)`
  font-size: 18px;
  text-align: center;
  margin-bottom: 30px;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const ReadingContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  padding-left: 80px;
  margin-bottom: 15px;
  &:nth-child(4) {
    margin-bottom: 25px;
  }
`;

const LeftDiv = styled.div``;
const RightDiv = styled.div`
  color: ${(props) => props.theme.darkGreyColor};
`;

const InputUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputWrapper = styled.div`
  width: 300px;
  margin-bottom: 20px;
`;

const Posts = styled.div`
  margin-top: 20px;
  display: grid;
  justify-content: center;
  grid-gap: 20px;
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
`;

const ContentWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export default ({ pageIndex, User, networkStatus }) => {
  if (pageIndex === 0) {
    return (
      <Posts>
        {User.posts &&
          User.posts.map((post) => (
            <SquarePost
              key={post.id}
              postId={post.id}
              likeCount={post.likeCount}
              commentCount={post.commentCount}
              file={post.files[0]}
            />
          ))}
      </Posts>
    );
  } else if (pageIndex === 1) {
    return (
      <ContentWrap>
        <MyStatistics
          myInfoData={User}
          networkStatus={networkStatus}
          isSelf={false}
        />
      </ContentWrap>
    );
  } else if (pageIndex === 2) {
    return (
      <div>
        <MySchedule
          myInfoData={User}
          networkStatus={networkStatus}
          isSelf={false}
        />
      </div>
    );
  }
};
