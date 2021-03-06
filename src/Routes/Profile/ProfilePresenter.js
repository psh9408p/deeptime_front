import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Helmet } from 'rl-react-helmet';
import Avatar from '../../Components/Avatar';
import FatText from '../../Components/FatText';
import FollowButton from '../../Components/FollowButton';
import PopupClose from '../../Components/Buttons/PopupClose';
import ProfileTabs_me from '../Tabs/ProfileTabs/ProfileTabs_me';
import ProfileTabs_other from '../Tabs/ProfileTabs/ProfileTabs_other';
import { Link } from 'react-router-dom';
import {
  Button_setting,
  Button_timelapse,
} from '../../Components/Buttons/Button_click';
import Popup from 'reactjs-popup';
import PopupButton from '../../Components/Buttons/PopupButton';
import Button_custom from '../../Components/Buttons/Button_custom';
import Input from '../../Components/Input';
import { FixedSizeList as ListApi } from 'react-window';
import Tab from '../../Components/Tab';
import Footer from '../../Components/Footer';

const Wrapper = styled.div`
  /* min-height: 100vh; */
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
    width: 510px !important;
    height: 310px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${(props) => props.theme.borderRadius};
  }
`;

const PopupCustom2 = styled(PopupCustom)`
  &-content {
    width: 420px !important;
    height: 410px !important;
  }
`;

const PopupCustom3 = styled(PopupCustom)`
  &-content {
    width: 420px !important;
    height: ${(props) => (props.isSelf ? '470px' : '410px')} !important;
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

const TimeTitle = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin: 15px 0 5px 0;
`;

const FullTime = styled.div`
  text-align: center;
  font-size: 26px;
  font-weight: bold;
  color: ${(props) => props.theme.classicBlue};
`;

export default ({
  userData,
  logOut,
  tabs_me,
  tabs_other,
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

  // ???????????? ??? ?????? ???????????? ????????? createdAt ????????????(seeUser??? ?????? ????????? ?????????)
  for (let i = 0; i < userData.followDates.length; i++) {
    const findUser = (a) => a.id === userData.followDates[i].followId;
    const tmpIndex = userData.following.findIndex(findUser);
    const createdDate = new Date(userData.followDates[i].createdAt);
    userData.following[tmpIndex].followingTime = createdDate.getTime();
  }
  // ???????????? ?????? ????????? ?????? ????????? ??????
  userData.following.sort(function (a, b) {
    return b.followingTime - a.followingTime;
  });

  // ????????? ??? ?????? ???????????? ????????? createdAt ????????????(??? ???????????? seeUser??? ?????? ????????? ?????????)
  for (let i = 0; i < userData.followers.length; i++) {
    const findSeeUser = (a) => a.followId === userData.id;
    const tmpIndex = userData.followers[i].followDates.findIndex(findSeeUser);
    const createdDate = new Date(
      userData.followers[i].followDates[tmpIndex].createdAt,
    );
    userData.followers[i].followerTime = createdDate.getTime();
  }
  // ???????????? seeUser??? ???????????? ?????? ????????? ?????? ????????? ??????
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
        alert('???????????? ????????? ??? ????????????.');
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
    if (window.confirm('????????? ???????????? ?????????????????????????') === false) {
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
        alert('???????????? ????????? ??? ????????????.');
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
            text={indiUser.isFollowing ? '?????????' : '?????????'}
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
            text={indiUser.isFollowing ? '?????????' : '?????????'}
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
    times,
  } = userData;

  let existTime_sec = 0;
  times.forEach((time) => {
    existTime_sec += time.existTime;
  });
  let existTime_min = existTime_sec / 60;
  const total_hour = String(Math.floor(existTime_min / 60));
  existTime_min = existTime_min - total_hour * 60;
  const total_min = String(Math.floor(existTime_min));

  return (
    <Wrapper>
      <Helmet>
        <title>{username} | DEEPTIME</title>
      </Helmet>
      <Header>
        {!isSelf ? (
          <HeaderColumn>
            <Avatar size="lg" url={avatar} />
            <TimeTitle>??? ?????? ??????</TimeTitle>
            <FullTime>
              {total_hour.length === 1 ? '0' + total_hour : total_hour} :{' '}
              {total_min.length === 1 ? '0' + total_min : total_min}
            </FullTime>
          </HeaderColumn>
        ) : (
          <PopupCustom
            trigger={
              <HeaderColumn>
                <Avatar size="lg" url={avatar} cursor={'pointer'} />
                <TimeTitle>??? ?????? ??????</TimeTitle>
                <FullTime>
                  {total_hour.length === 1 ? '0' + total_hour : total_hour} :{' '}
                  {total_min.length === 1 ? '0' + total_min : total_min}
                </FullTime>
              </HeaderColumn>
            }
            closeOnDocumentClick={false}
            modal
          >
            {(close) => (
              <PBody>
                <PopupClose
                  onClick={() => {
                    close();
                    setSelectFile(null);
                  }}
                />
                <PTitle text={'????????? ????????? ??????'} />
                <SmallDiv>
                  <PreviewImg id="preview-img" url={avatar}></PreviewImg>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileInput(e)}
                  />
                </SmallDiv>
                <ButtonDiv>
                  <PopupButton
                    type="button"
                    text={'??????'}
                    onClick={async () => {
                      const fucResult = await onAvatar();
                      if (fucResult) {
                        close();
                      }
                    }}
                  />
                  <PopupButton
                    type="button"
                    bgColor={'#DB4437'}
                    color={'black'}
                    onClick={async () => {
                      const fucResult = await deleteAvatar();
                      if (fucResult) {
                        close();
                      }
                    }}
                    text={'?????????'}
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
                    text={'????????????'}
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
              <FatText text={'?????? ??????:'} />
            </Count>
            {studyGroup !== '?????? ??????' && (
              <>
                <BlankDiv />
                <Count>{studyGroup}</Count>
              </>
            )}
            {studyGroup2 !== '?????? ??????' && (
              <>
                ,<BlankDiv />
                <Count>{studyGroup2}</Count>
              </>
            )}
            {studyGroup3 !== '?????? ??????' && (
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
              ?????????<span>{userData.postsCount}</span>
            </SubText>
            <PopupCustom2
              trigger={
                <SubText>
                  ?????????<span>{userData.followersCount}</span>
                </SubText>
              }
              closeOnDocumentClick={false}
              modal
            >
              {(close) => (
                <PBody2>
                  <PopupClose onClick={() => close()} />
                  <PTitle text={'?????????'} />
                  {userData.followers.length === 0 ? (
                    <NonFollow>??????????????? ????????? ????????????</NonFollow>
                  ) : (
                    <ListApi
                      height={300}
                      itemCount={userData.followers.length}
                      itemSize={54}
                      width={360}
                      itemData={close}
                    >
                      {followerList}
                    </ListApi>
                  )}
                </PBody2>
              )}
            </PopupCustom2>
            <PopupCustom3
              isSelf={userData.isSelf}
              trigger={
                <SubText>
                  ?????????<span>{userData.followingCount}</span>
                </SubText>
              }
              closeOnDocumentClick={false}
              modal
            >
              {(close) => (
                <PBody2>
                  <PopupClose onClick={() => close()} />
                  <PTitle text={'?????????'} />
                  {userData.isSelf && (
                    <NewFollowDiv>
                      <InputWrapper>
                        <Input
                          placeholder={'Email ?????? ?????????'}
                          {...followInput}
                        />
                      </InputWrapper>
                      <Button_custom
                        text={'?????????'}
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
                    <NonFollow>??????????????? ????????? ????????????</NonFollow>
                  ) : (
                    <ListApi
                      height={300}
                      itemCount={userData.following.length}
                      itemSize={54}
                      width={360}
                      itemData={close}
                    >
                      {followingList}
                    </ListApi>
                  )}
                </PBody2>
              )}
            </PopupCustom3>
          </SubInfoDiv>
          {isSelf && bio === '' ? (
            <Button_custom
              text={'???????????? ??????'}
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
      {isSelf ? (
        <>
          <Tab tabs={tabs_me} border={true} />
          <ProfileTabs_me
            pageIndex={tabs_me.currentIndex}
            User={userData}
            userRefetch={userRefetch}
          />
        </>
      ) : (
        <>
          <Tab tabs={tabs_other} border={true} />
          <ProfileTabs_other
            pageIndex={tabs_other.currentIndex}
            User={userData}
          />
        </>
      )}
      <Footer />
    </Wrapper>
  );
};
