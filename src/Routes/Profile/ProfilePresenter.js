import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Helmet } from 'rl-react-helmet';
import Avatar from '../../Components/Avatar';
import FatText from '../../Components/FatText';
import FollowButton from '../../Components/FollowButton';
import Button from '../../Components/Buttons/Button';
import ProfileTabs from '../Tabs/ProfileTabs';
import { Link } from 'react-router-dom';
import {
  Button_setting,
  Button_timelapse,
} from '../../Components/Buttons/Button_click';
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
  align-items: flex-start;
  justify-content: center;
  width: 80%;
  margin: 40px auto;
`;

const HeaderColumn = styled.div`
  &:first-child {
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
  font-size: 16px;
  font-weight: 600;
`;

const Count = styled.li`
  &:not(:first-child) {
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
  max-width: 600px;
  white-space: pre-wrap;
  line-height: 20px;
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
  width: 500px;
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
    width: 420px !important;
    height: 440px !important;
  }
`;

const PopupCustom3 = styled(PopupCustom)`
  &-content {
    width: 420px !important;
    height: ${(props) => (props.isSelf ? '500px' : '440px')} !important;
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

const IndiviList = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const IndiviName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 215px;
  font-weight: 600;
  margin-left: 10px;
  span {
    margin-top: 3px;
    font-weight: normal;
    color: #7f8c8d;
  }
`;

const NonFollow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  height: 300px;
  margin-bottom: 20px;
  color: #7f8c8d;
`;

const BlankDiv = styled.div`
  width: 10px;
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
  followInput,
  onAddFollow,
  unFollowMuation,
  followMuation,
}) => {
  let history = useHistory();

  const [followerLoad, setFollowerLoad] = useState(
    new Array(userData.followersCount).fill(false),
  );
  const [followingLoad, setFollowingLoad] = useState(
    new Array(userData.followingCount).fill(false),
  );

  // 팔로우한 각 유저 데이터에 알맞은 createdAt 넣어주기(seeUser가 언제 팔로우 했는지)
  for (let i = 0; i < userData.followDates.length; i++) {
    const findUser = (a) => a.id === userData.followDates[i].followId;
    const tmpIndex = userData.following.findIndex(findUser);
    const createdDate = new Date(userData.followDates[i].createdAt);
    userData.following[tmpIndex].followingTime = createdDate.getTime();
  }
  // 팔로우한 날짜 순으로 정렬 최신이 위로
  userData.following.sort(function (a, b) {
    return b.followingTime - a.followingTime;
  });

  // 팔로워 각 유저 데이터에 알맞은 createdAt 넣어주기(각 팔로워가 seeUser를 언제 팔로우 했는지)
  for (let i = 0; i < userData.followers.length; i++) {
    const findSeeUser = (a) => a.followId === userData.id;
    const tmpIndex = userData.followers[i].followDates.findIndex(findSeeUser);
    const createdDate = new Date(
      userData.followers[i].followDates[tmpIndex].createdAt,
    );
    userData.followers[i].followerTime = createdDate.getTime();
  }
  // 팔로워가 seeUser를 팔로우한 날짜 순으로 정렬 최신이 위로
  userData.followers.sort(function (a, b) {
    return b.followerTime - a.followerTime;
  });

  const onChangeLoad_ers = (index, bool) => {
    let newArr = [...followerLoad];
    newArr[index] = bool;
    setFollowerLoad(newArr);
  };
  const onChangeLoad_ing = (index, bool) => {
    let newArr = [...followingLoad];
    newArr[index] = bool;
    setFollowingLoad(newArr);
  };

  const onFollow = async (index, id, isFollowerBox) => {
    try {
      if (isFollowerBox) {
        onChangeLoad_ers(index, true);
      } else {
        onChangeLoad_ing(index, true);
      }
      const {
        data: { follow },
      } = await followMuation({
        variables: { id },
      });
      if (!follow) {
        alert('팔로우를 추가할 수 없습니다.');
      } else {
        await userRefetch();
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    } finally {
      if (isFollowerBox) {
        onChangeLoad_ers(index, false);
      } else {
        onChangeLoad_ing(index, false);
      }
    }
  };

  const onUnFollow = async (index, id, isFollowerBox) => {
    if (window.confirm('정말로 팔로우를 취소하시겠습니까?') === false) {
      return;
    }

    try {
      if (isFollowerBox) {
        onChangeLoad_ers(index, true);
      } else {
        onChangeLoad_ing(index, true);
      }
      const {
        data: { unfollow },
      } = await unFollowMuation({
        variables: { id },
      });
      if (!unfollow) {
        alert('팔로우를 취소할 수 없습니다.');
      } else {
        await userRefetch();
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    } finally {
      if (isFollowerBox) {
        onChangeLoad_ers(index, false);
      } else {
        onChangeLoad_ing(index, false);
      }
    }
  };

  const followerList = ({ data, index, style }) => {
    const indiUser = userData.followers[index];

    return (
      <IndiviList key={index} style={style}>
        <Avatar
          size="sm"
          url={indiUser.avatar}
          onClick={() => {
            history.push(`${indiUser.username}`);
            data();
          }}
          cursor={'pointer'}
        />
        <IndiviName>
          {indiUser.email}
          <span>{indiUser.username}</span>
        </IndiviName>
        {!indiUser.isSelf && (
          <Button_custom
            text={indiUser.isFollowing ? '팔로잉' : '팔로우'}
            width={'60px'}
            height={'28px'}
            margin={'0 15px'}
            padding={'0'}
            bgColor={indiUser.isFollowing ? '#c7c7c7' : '#7BA9EB'}
            color={indiUser.isFollowing ? 'black' : 'white'}
            loading={followerLoad[index]}
            onClick={() => {
              if (indiUser.isFollowing) {
                onUnFollow(index, indiUser.id, true);
              } else {
                onFollow(index, indiUser.id, true);
              }
            }}
          />
        )}
      </IndiviList>
    );
  };

  const followingList = ({ data, index, style }) => {
    const indiUser = userData.following[index];

    return (
      <IndiviList key={index} style={style}>
        <Avatar
          size="sm"
          url={indiUser.avatar}
          onClick={() => {
            history.push(`${indiUser.username}`);
            data();
          }}
          cursor={'pointer'}
        />
        <IndiviName>
          {indiUser.email}
          <span>{indiUser.username}</span>
        </IndiviName>
        {!indiUser.isSelf && (
          <Button_custom
            text={indiUser.isFollowing ? '팔로잉' : '팔로우'}
            width={'60px'}
            height={'28px'}
            margin={'0 15px'}
            padding={'0'}
            bgColor={indiUser.isFollowing ? '#c7c7c7' : '#7BA9EB'}
            color={indiUser.isFollowing ? 'black' : 'white'}
            loading={followingLoad[index]}
            onClick={() => {
              if (indiUser.isFollowing) {
                onUnFollow(index, indiUser.id, false);
              } else {
                onFollow(index, indiUser.id, false);
              }
            }}
          />
        )}
      </IndiviList>
    );
  };

  const {
    id,
    avatar,
    username,
    fullName,
    isFollowing,
    isSelf,
    bio,
    email,
    studyGroup,
    studyGroup2,
    studyGroup3,
  } = userData;
  return (
    <Wrapper>
      <Helmet>
        <title>{username} | DEEPTIME</title>
      </Helmet>
      <Header>
        {!isSelf ? (
          <HeaderColumn>
            <Avatar size="lg" url={avatar} />
          </HeaderColumn>
        ) : (
          <PopupCustom
            trigger={
              <HeaderColumn>
                <Avatar size="lg" url={avatar} cursor={'pointer'} />
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
        )}
        <HeaderColumn>
          <UsernameRow>
            <Username>{username}</Username>
            <ButtonWrap>
              {isSelf ? (
                <SettingWrap>
                  <Button_custom
                    onClick={logOut}
                    text={'로그아웃'}
                    width={'100px'}
                    bgColor={'#0F4C82'}
                    color={'white'}
                    margin={'0'}
                  />
                  <SettingLink to="/account" replace>
                    <Button_setting margin={'0'} />
                  </SettingLink>
                  <SettingLink to="/timelapse" replace>
                    <Button_timelapse margin={'0'} />
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
            {studyGroup !== '해당 없음' && (
              <>
                <BlankDiv />
                <Count>{studyGroup}</Count>
              </>
            )}
            {studyGroup2 !== '해당 없음' && (
              <>
                ,<BlankDiv />
                <Count>{studyGroup2}</Count>
              </>
            )}
            {studyGroup3 !== '해당 없음' && (
              <>
                ,<BlankDiv />
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
              게시물<span>0</span>
            </SubText>
            <PopupCustom2
              trigger={
                <SubText>
                  팔로워<span>{userData.followersCount}</span>
                </SubText>
              }
              closeOnDocumentClick={false}
              modal
            >
              {(close) => (
                <PBody2>
                  <PTitle text={'팔로워'} />
                  {userData.followers.length === 0 ? (
                    <NonFollow>팔로워하는 회원이 없습니다</NonFollow>
                  ) : (
                    <ListApi
                      height={300}
                      itemCount={userData.followers.length}
                      itemSize={54}
                      width={360}
                      style={{ marginBottom: '20px' }}
                      itemData={close}
                    >
                      {followerList}
                    </ListApi>
                  )}
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
            </PopupCustom2>
            <PopupCustom3
              isSelf={userData.isSelf}
              trigger={
                <SubText>
                  팔로우<span>{userData.followingCount}</span>
                </SubText>
              }
              closeOnDocumentClick={false}
              modal
            >
              {(close) => (
                <PBody2>
                  <PTitle text={'팔로잉'} />
                  {userData.isSelf && (
                    <NewFollowDiv>
                      <InputWrapper>
                        <Input
                          placeholder={'Email 또는 닉네임'}
                          {...followInput}
                        />
                      </InputWrapper>
                      <Button_custom
                        text={'팔로우'}
                        width={'70px'}
                        height={'35px'}
                        bgColor={'#0F4C82'}
                        color={'white'}
                        onClick={() => {
                          onAddFollow();
                        }}
                      />
                    </NewFollowDiv>
                  )}
                  {userData.following.length === 0 ? (
                    <NonFollow>팔로우하는 회원이 없습니다</NonFollow>
                  ) : (
                    <ListApi
                      height={300}
                      itemCount={userData.following.length}
                      itemSize={54}
                      width={360}
                      style={{ marginBottom: '20px' }}
                      itemData={close}
                    >
                      {followingList}
                    </ListApi>
                  )}
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
          {isSelf && bio === '' ? (
            <Button_custom
              text={'자기소개 작성'}
              width={'120px'}
              height={'32px'}
              margin={'0'}
              bgColor={'#efefef'}
              onClick={() => {
                history.push(`account`);
              }}
            />
          ) : (
            <Bio>{bio}</Bio>
          )}
        </HeaderColumn>
      </Header>
      <Tabs>
        {profileTabs.content.map((section, index) => {
          // 다른 사람 프로필에서 안나오는 탭 지정
          if (!isSelf && index === 1) {
            return null;
          }

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
