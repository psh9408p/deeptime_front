import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'rl-react-helmet';
import Loader from '../../Components/Loader';
import Avatar from '../../Components/Avatar';
import FatText from '../../Components/FatText';
import FollowButton from '../../Components/FollowButton';
import Button from '../../Components/Buttons/Button';
import ProfileTabs_M from '../Tabs/ProfileTabs_M';

const Wrapper = styled.div`
  min-height: 100vh;
`;

const LoaderWrapper = styled.div`
  min-height: 100vh;
  padding: 100px 0;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  margin: 40px auto;
`;

const HeaderColumn = styled.div``;

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

const Counts = styled.ul`
  display: flex;
  margin: 15px 0px;
`;

const Count = styled.li`
  font-size: 16px;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const SubInfoDiv = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

const FatBox = styled(FatText)`
  margin-right: 20px;
  font-size: 16px;
  &:last-child {
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

const ButtonWrap = styled.div`
  width: 150px;
`;

export default ({ loading, data, logOut, profileTabs, userRefetch }) => {
  if (loading === true) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  } else if (!loading && data && data.seeUser) {
    const {
      seeUser: {
        id,
        avatar,
        username,
        fullName,
        isFollowing,
        isSelf,
        bio,
        email,
        organization,
      },
    } = data;
    return (
      <Wrapper>
        <Helmet>
          <title>{username} | SLOG-IAM</title>
        </Helmet>
        <Header>
          <HeaderColumn>
            <Avatar size="lg" url={avatar} />
          </HeaderColumn>
          <HeaderColumn>
            <UsernameRow>
              <Username>{username}</Username>{' '}
              <ButtonWrap>
                {isSelf ? (
                  <Button onClick={logOut} text="로그아웃" />
                ) : (
                  <FollowButton isFollowing={isFollowing} id={id} />
                )}
              </ButtonWrap>
            </UsernameRow>
            <Counts>
              <Count>
                <FatText text={organization.name} />
              </Count>
              <Count>{organization.address}</Count>
            </Counts>
            <SubInfoDiv>
              <FatBox text={fullName} />
              <FatBox text={email} />
            </SubInfoDiv>
            <Bio>{bio}</Bio>
          </HeaderColumn>
        </Header>
        <Tabs>
          {profileTabs.content.map((section, index) => (
            <ProfileButton
              key={index}
              onClick={() => profileTabs.changeItem(index)}
            >
              {section}
            </ProfileButton>
          ))}
        </Tabs>
        <ProfileTabs_M
          pageIndex={profileTabs.currentIndex}
          data={data}
          userRefetch={userRefetch}
        />
      </Wrapper>
    );
  }
  return null;
};