import React from "react"
import styled from "styled-components"
import { Link, withRouter } from "react-router-dom"
import { Logo, Shutter, User } from "./Icons"
import Avatar from "./Avatar"
import { useQuery } from "react-apollo-hooks"
import { ME } from "../SharedQueries"

const Header = styled.header`
  width: 100%;
  border: 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  border-bottom: ${(props) => props.theme.boxBorder};
  border-radius: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0px;
  z-index: 2;
`

const HeaderWrapper = styled.div`
  width: 100%;
  padding: 0px 40px;
  display: flex;
  justify-content: center;
`

const HeaderColumn = styled.div`
  width: 33%;
  text-align: center;
  &:first-child {
    margin-right: auto;
    text-align: left;
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
  }
  &:last-child {
    margin-left: auto;
    justify-content: flex-end;
    display: inline-flex;
  }
`

const AiBox = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 10px 15px;
  height: 100%;
  border: 1px solid ${(props) => props.theme.classicBlue};
  border-radius: 3px;
`

const HeaderLink = styled(Link)`
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 30px;
  }
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  font-size: 16px;
  color: ${(props) => props.theme.classicBlue};
  font-weight: 600;
`

const AiHeaderLink = styled(HeaderLink)`
  color: ${(props) => props.theme.classicBlue};
  &:nth-child(2) {
    margin-left: 15px;
  }
`

export default withRouter(() => {
  const { data } = useQuery(ME)
  return (
    <Header>
      <HeaderWrapper>
        <HeaderColumn>
          <Link to="/" replace>
            <Logo />
          </Link>
        </HeaderColumn>
        <HeaderColumn>
          {data.me && data.me.loginPosition === "student" && (
            <AiBox>
              <Shutter />
              <AiHeaderLink to="/study" replace>
                학습
              </AiHeaderLink>
              <AiHeaderLink to="/" replace>
                출석
              </AiHeaderLink>
            </AiBox>
          )}
          {data.me && data.me.loginPosition.includes("manager") && (
            <AiBox>
              <Shutter />
              <AiHeaderLink to="/attendance" replace>
                출석
              </AiHeaderLink>
              <AiHeaderLink to="/supervision" replace>
                감독
              </AiHeaderLink>
              <AiHeaderLink to="/marking" replace>
                채점
              </AiHeaderLink>
            </AiBox>
          )}
        </HeaderColumn>
        {data.me && data.me.loginPosition.includes("manager") && (
          <HeaderColumn>
            {data.me && data.me.loginPosition === "manager_school" && (
              <HeaderLink to="/" replace>
                학교
              </HeaderLink>
            )}
            {data.me && data.me.loginPosition === "manager_academy" && (
              <HeaderLink to="/" replace>
                학원
              </HeaderLink>
            )}
            {data.me && data.me.loginPosition === "manager_readingRoom" && (
              <HeaderLink to="/" replace>
                독서실
              </HeaderLink>
            )}
            <HeaderLink to="/class" replace>
              클래스
            </HeaderLink>
            <HeaderLink to="/student" replace>
              학생
            </HeaderLink>
            {!data.me ? (
              <HeaderLink to="/#">
                <User />
              </HeaderLink>
            ) : (
              <HeaderLink to={data.me.username} replace>
                <Avatar size="sm" url={data.me.avatar} />
              </HeaderLink>
            )}
          </HeaderColumn>
        )}
        {data.me && data.me.loginPosition === "student" && (
          <HeaderColumn>
            {!data.me ? (
              <HeaderLink to="/#">
                <User />
              </HeaderLink>
            ) : (
              <HeaderLink to={data.me.username} replace>
                <Avatar size="sm" url={data.me.avatar} />
              </HeaderLink>
            )}
          </HeaderColumn>
        )}
      </HeaderWrapper>
    </Header>
  )
})
