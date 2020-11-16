import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'rl-react-helmet';
import Avatar from '../../Components/Avatar';
import FatText from '../../Components/FatText';
import FollowButton from '../../Components/FollowButton';
import Button from '../../Components/Buttons/Button';
import ProfileTabs from '../Tabs/ProfileTabs';
import { Link } from 'react-router-dom';
import { Button_setting } from '../../Components/Buttons/Button_click';
import Popup from 'reactjs-popup';
import PopupButton_triple from '../../Components/Buttons/PopupButton_triple';
import PopupButton_solo from '../../Components/Buttons/PopupButton_solo';
import Button_custom from '../../Components/Buttons/Button_custom';
import Input from '../../Components/Input';
import { FixedSizeList as ListApi } from 'react-window';

const Wrapper = styled.div`
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  margin: 40px auto;
`;

const HeaderColumn = styled.div`
  &:first-child {
    cursor: pointer;
    margin-right: 80px;
  }
`;

const UsernameRow = styled.div`
  display: flex;
  align-items: center;
  min-width: 400px;
`;

const Username = styled.span`
  font-size: 26px;
  display: block;
  margin-right: 25px;
`;

const SettingLink = styled(Link)`
  cursor: pointer;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  margin-left: 10px;
`;

const Counts = styled.ul`
  display: flex;
  margin: 15px 0px;
`;

const Count = styled.li`
  font-size: 16px;
  &:not(:last-child) {
    margin-right: 10px;
  }
  &:not(:first-child) {
    font-weight: 600;
    color: #7f8c8d;
  }
`;

const SubInfoDiv = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

const FatBox = styled(FatText)`
  margin-right: 30px;
  font-size: 16px;
  :nth-child(2n) {
    color: #7f8c8d;
  }
`;

const SubText = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-right: 30px;
  :not(:first-child) {
    cursor: pointer;
  }
  span {
    margin-left: 10px;
    color: #7f8c8d;
  }
`;

const Bio = styled.p`
  margin: 10px 0px;
`;

const Tabs = styled.div`
  border-top: 1px solid #e6e6e6;
  display: flex;
  justify-content: center;
`;
const ProfileButton = styled.button`
  width: 100px;
  border: 0;
  outline-color: black;
  border-radius: ${(props) => props.theme.borderRadius};
  font-weight: 600;
  text-align: center;
  padding: 7px 0px;
  font-size: 14px;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 60px;
  }
`;

const ProfileButton_Blue = styled.button`
  width: 100px;
  border: 0;
  color: white;
  outline-color: black;
  background-color: ${(props) => props.theme.classicBlue};
  border-radius: ${(props) => props.theme.borderRadius};
  font-weight: 600;
  text-align: center;
  padding: 7px 0px;
  font-size: 14px;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 60px;
  }
`;

const ButtonWrap = styled.div`
  width: 150px;
`;

const SettingWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PopupCustom = styled(Popup)`
  &-content {
    width: 600px !important;
    height: 320px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${(props) => props.theme.borderRadius};
  }
`;

const PopupCustom2 = styled(PopupCustom)`
  &-content {
    width: 550px !important;
    height: 500px !important;
  }
`;

const PopupCustom3 = styled(PopupCustom)`
  &-content {
    width: 420px !important;
    height: 500px !important;
  }
`;

const PBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  padding: 20px 20px;
`;

const PBody2 = styled(PBody)`
  width: 400px;
`;

const PTitle = styled(FatText)`
  font-size: 18px;
  text-align: center;
  margin-bottom: 30px;
`;

const SmallDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const PreviewImg = styled.canvas`
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-position: center center;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  margin-right: 30px;
`;

const NewFollowDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 40px;
  margin-bottom: 20px;
`;

const InputWrapper = styled.div`
  width: 270px;
`;

export default ({
  userData,
  logOut,
  profileTabs,
  userRefetch,
  handleFileInput,
  onAvatar,
  deleteAvatar,
  setSelectFile,
}) => {
  const followList = ({ index, style }) => (
    // <IndiviList key={index} style={style} isOdd={Boolean(index % 2)}>
    //   <ColorBox
    //     size={'18px'}
    //     radius={'9px'}
    //     bgColor={todolistData_new[index].subject.bgColor}
    //   />
    //   <TaskName_todo isOdd={Boolean(index % 2)}>
    //     {todolistData_new[index].subject.name}
    //   </TaskName_todo>
    //   <TodoNameDiv isOdd={Boolean(index % 2)}>
    //     {todolistData_new[index].name}
    //   </TodoNameDiv>
    //   <TodoIconDiv2>
    //     <Flag
    //       onClick={() => {
    //         onTodolistFinish(todolistData_new[index].id);
    //       }}
    //     />
    //   </TodoIconDiv2>
    //   <TodoIconDiv2>
    //     <Delete
    //       onClick={() => {
    //         onTodolistDelete(todolistData_new[index].id);
    //       }}
    //     />
    //   </TodoIconDiv2>
    // </IndiviList>
    <div>dd</div>
  );

  const {
    id,
    avatar,
    username,
    fullName,
    isFollowing,
    isSelf,
    bio,
    email,
    studyPurpose,
    studyGroup,
    studyGroup2,
    studyGroup3,
  } = userData;
  return (
    <Wrapper>
      <Helmet>
        <title>{username} | SLOG-IAM</title>
      </Helmet>
      <Header>
        <PopupCustom
          trigger={
            <HeaderColumn>
              <Avatar size="lg" url={avatar} />
            </HeaderColumn>
          }
          closeOnDocumentClick={false}
          modal
        >
          {(close) => (
            <PBody>
              <PTitle text={'프로필 이미지 설정'} />
              <SmallDiv>
                <PreviewImg
                  id="preview-img"
                  url="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/1024px-Missing_avatar.svg.png"
                ></PreviewImg>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileInput(e)}
                />
              </SmallDiv>
              <ButtonDiv>
                <PopupButton_triple
                  type="button"
                  text={'변경'}
                  onClick={async () => {
                    const fucResult = await onAvatar();
                    if (fucResult) {
                      close();
                    }
                  }}
                />
                <PopupButton_triple
                  type="button"
                  onClick={async () => {
                    const fucResult = await deleteAvatar();
                    if (fucResult) {
                      close();
                    }
                  }}
                  text={'기본값'}
                />
                <PopupButton_triple
                  type="button"
                  onClick={() => {
                    close();
                    setSelectFile(null);
                  }}
                  text={'닫기'}
                />
              </ButtonDiv>
            </PBody>
          )}
        </PopupCustom>
        <HeaderColumn>
          <UsernameRow>
            <Username>{username}</Username>
            <ButtonWrap>
              {isSelf ? (
                <SettingWrap>
                  <Button onClick={logOut} text="로그아웃" />
                  <SettingLink to="/account" replace>
                    <Button_setting />
                  </SettingLink>
                </SettingWrap>
              ) : (
                <FollowButton isFollowing={isFollowing} id={id} />
              )}
            </ButtonWrap>
          </UsernameRow>
          <Counts>
            <Count>
              <FatText text={'사용 범주:'} />
            </Count>
            <Count>{studyGroup},</Count>
            {studyGroup !== '해당 없음' && (
              <>
                <Count>{studyGroup2},</Count>
                <Count>{studyGroup3}</Count>
              </>
            )}
          </Counts>
          <SubInfoDiv>
            <FatBox text={fullName} />
            <FatBox text={email} />
          </SubInfoDiv>
          <SubInfoDiv>
            <SubText>
              게시물<span>3</span>
            </SubText>
            <PopupCustom2
              trigger={
                <SubText>
                  팔로워<span>3</span>
                </SubText>
              }
              closeOnDocumentClick={false}
              modal
            >
              {(close) => (
                <PBody>
                  <PTitle text={'팔로워'} />
                  <SmallDiv>ddd</SmallDiv>
                  <ButtonDiv>
                    <PopupButton_solo
                      type="button"
                      onClick={() => {
                        close();
                      }}
                      text={'닫기'}
                    />
                  </ButtonDiv>
                </PBody>
              )}
            </PopupCustom2>
            <PopupCustom3
              trigger={
                <SubText>
                  팔로우<span>3</span>
                </SubText>
              }
              closeOnDocumentClick={false}
              modal
            >
              {(close) => (
                <PBody2>
                  <PTitle text={'팔로우'} />
                  <NewFollowDiv>
                    <InputWrapper>
                      <Input
                        placeholder={'Email 또는 닉네임'}
                        // {...todolistName}
                      />
                    </InputWrapper>
                    <Button_custom
                      text={'팔로우'}
                      width={'70px'}
                      height={'35px'}
                      bgColor={'#0F4C82'}
                      color={'white'}
                      onClick={() => {
                        // onTodolistAdd();
                      }}
                    />
                  </NewFollowDiv>
                  <ListApi
                    height={300}
                    itemCount={10}
                    itemSize={40}
                    width={360}
                    style={{ marginBottom: '20px' }}
                  >
                    {followList}
                  </ListApi>
                  <ButtonDiv>
                    <PopupButton_solo
                      type="button"
                      onClick={() => {
                        close();
                      }}
                      text={'닫기'}
                    />
                  </ButtonDiv>
                </PBody2>
              )}
            </PopupCustom3>
          </SubInfoDiv>
          <Bio>{bio}</Bio>
        </HeaderColumn>
      </Header>
      <Tabs>
        {profileTabs.content.map((section, index) => {
          if (index === profileTabs.currentIndex) {
            return (
              <ProfileButton_Blue
                key={index}
                onClick={() => profileTabs.changeItem(index)}
              >
                {section}
              </ProfileButton_Blue>
            );
          } else {
            return (
              <ProfileButton
                key={index}
                onClick={() => profileTabs.changeItem(index)}
              >
                {section}
              </ProfileButton>
            );
          }
        })}
      </Tabs>
      <ProfileTabs
        pageIndex={profileTabs.currentIndex}
        User={userData}
        userRefetch={userRefetch}
      />
    </Wrapper>
  );
};

// const Posts = styled.div`
//   display: grid;
//   grid-template-columns: repeat(4, 200px);
//   grid-template-rows: 200px;
//   grid-auto-rows: 200px;
// `

/* <Posts>
        {posts &&
          posts.map(post => (
            <SquarePost
              key={post.id}
              likeCount={post.likeCount}
              commentCount={post.commentCount}
              file={post.files[0]}
            />
          ))}
      </Posts> */
