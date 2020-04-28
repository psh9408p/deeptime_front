import React from "react"
import { Helmet } from "react-helmet"
import styled from "styled-components"
import Input from "../../Components/Input"
import Button from "../../Components/Buttons/Button"
import Select from "../../Components/Select"
import { GoogleLogin } from "react-google-login"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props"
import { GoogleLoginButton, FacebookLoginButton } from "react-social-login-buttons"
import { Logo } from "../../Components/Icons"

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const Box = styled.div`
  ${(props) => props.theme.whiteBox}
  border-radius:0px;
  width: 100%;
  max-width: 350px;
`

const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
`

const Link = styled.span`
  color: ${(props) => props.theme.blueColor};
  cursor: pointer;
`

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  text-align: center;
  form {
    width: 100%;
    padding-left: 5px;
    padding-right: 5px;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 7px;
      }
    }
    button {
      margin-top: 10px;
      margin-bottom: 30px;
    }
  }
`

const LogoBox = styled.div`
  max-width: 100%;
  padding: 0px 85px 30px;
`

const LoginPositionDiv = styled.div`
  display: inline-flex;
  border: 0;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.bgColor};
  height: 35px;
  font-size: 12px;
  width: 100%;
  span {
    display: inline-flex;
    width: 100px;
    align-items: center;
    justify-content: center;
    font-weight: 600;
  }
`

export default ({
  action,
  loginPosition,
  username,
  firstName,
  lastName,
  email,
  phoneNumber,
  setAction,
  onSubmit,
  secret,
}) => {
  const responseGoogle = async (response) => {
    const {
      email: G_email,
      givenName: G_firstName,
      familyName: G_lastName,
    } = await response.profileObj
    email.setValue(G_email)
    firstName.setValue(G_firstName)
    lastName.setValue(G_lastName)
    const [G_username] = G_email.split("@")
    username.setValue(G_username)
  }
  const responseFacebook = async (response) => {
    const { email: F_email, first_name: F_firstName, last_name: F_lastName } = await response
    email.setValue(F_email)
    firstName.setValue(F_firstName)
    lastName.setValue(F_lastName)
    const [F_username] = F_email.split("@")
    username.setValue(F_username)
  }

  return (
    <Wrapper>
      <Form>
        <LogoBox>
          <Logo />
        </LogoBox>
        {action === "logIn" && (
          <>
            <Helmet>
              <title>로그인 | SLOG-IAM</title>
            </Helmet>
            <form onSubmit={onSubmit}>
              <Input placeholder={"Email (예: IAM@google.com)"} {...email} type="email" />
              <Button text={"로그인"} />
            </form>
          </>
        )}
        {action === "signUp" && (
          <>
            <Helmet>
              <title>회원가입 | SLOG-IAM</title>
            </Helmet>
            <form onSubmit={onSubmit}>
              <Input placeholder={"성 (예: 홍)"} {...lastName} />
              <Input placeholder={"이름 (예: 길동)"} {...firstName} />
              <Input placeholder={"Email (예: IAM@google.com)"} {...email} type="email" />
              <Input placeholder={"닉네임 (10글자 이내)"} {...username} />
              <Input
                placeholder={"휴대폰 번호 (-없이 숫자만 입력)"}
                {...phoneNumber}
                type="number"
              />
              <LoginPositionDiv>
                <span>사용 권한</span>
                <Select {...loginPosition} />
              </LoginPositionDiv>
              <Button text={"가입"} />
            </form>
            <GoogleLogin
              clientId="1097644872887-t6iqbst952qs511f0kiu5a3sptiu72qb.apps.googleusercontent.com"
              render={(renderProps) => (
                <GoogleLoginButton onClick={renderProps.onClick} disabled={renderProps.disabled}>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>Google에서 내 정보 불러오기</span>
                </GoogleLoginButton>
              )}
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
            <FacebookLogin
              appId="672262500184302"
              autoLoad={false}
              fields="first_name,last_name,email,picture"
              callback={responseFacebook}
              render={(renderProps) => (
                <FacebookLoginButton onClick={renderProps.onClick}>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>
                    Facebook에서 내 정보 불러오기
                  </span>
                </FacebookLoginButton>
              )}
            />
          </>
        )}
        {action === "confirm" && (
          <>
            <Helmet>
              <title>비밀번호 확인 | SLOG-IAM</title>
            </Helmet>
            <form onSubmit={onSubmit}>
              <Input placeholder="비밀번호" required {...secret} />
              <Button text={"확인"} />
            </form>
          </>
        )}
      </Form>
      {action !== "confirm" && (
        <StateChanger>
          {action === "logIn" ? (
            <>
              아직 계정이 없으신가요? <Link onClick={() => setAction("signUp")}>회원가입</Link>
            </>
          ) : (
            <>
              이미 계정이 있으신가요? <Link onClick={() => setAction("logIn")}>로그인</Link>
            </>
          )}
        </StateChanger>
      )}
    </Wrapper>
  )
}
