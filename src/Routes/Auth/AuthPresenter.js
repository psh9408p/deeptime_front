import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Input from '../../Components/Input';
import CheckBox from '../../Components/CheckBox';
import Button from '../../Components/Buttons/Button';
import Button_gray from '../../Components/Buttons/Button_gray';
import PopButton_auth from '../../Components/Buttons/PopButton_auth';
import PopButton from '../../Components/Buttons/PopButton';
import PopupButton from '../../Components/Buttons/PopupButton';
import PopupButton_solo from '../../Components/Buttons/PopupButton_solo';
import FatText from '../../Components/FatText';
import Select from '../../Components/Select';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {
  GoogleLoginButton,
  FacebookLoginButton,
} from 'react-social-login-buttons';
import { Logo } from '../../Components/Icons';
import Popup from 'reactjs-popup';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Box = styled.div`
  ${(props) => props.theme.whiteBox}
  border-radius:0px;
  width: 100%;
  max-width: 400px;
`;

const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
`;

const SignLink = styled.span`
  color: ${(props) => props.theme.blueColor};
  cursor: pointer;
`;

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
  }
`;

const LoginButtonDiv = styled.div`
  margin-top: 10px;
`;

const JoinButtonDiv = styled.div`
  margin-top: 10px;
  margin-bottom: 30px;
`;

const LogoBox = styled.div`
  max-width: 100%;
  padding: 0px 85px 30px;
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

const VerficationInputDiv = styled.div`
  width: 100%;
  display: flex;
`;

const PopupCustom = styled(Popup)`
  &-content {
    width: 500px !important;
    height: 250px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${(props) => props.theme.borderRadius};
  }
`;

const PopupSign = styled(Popup)`
  &-content {
    width: 450px !important;
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
  padding: 20px 50px;
`;

const PTitle = styled(FatText)`
  font-size: 18px;
  text-align: center;
  margin-bottom: 30px;
`;

const SmallInput = styled(Input)`
  width: 80%;
  margin-bottom: 7px;
  margin-right: 15px;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const VerifiInputDiv = styled.div`
  display: flex;
  margin-bottom: 7px;
`;

const EmailInputDiv = styled.div`
  display: flex;
`;

const NameInputDiv = styled.div`
  display: flex;
  input {
    &:not(:first-child) {
      margin-left: 10px;
    }
  }
`;

const AllCheckDiv = styled.div`
  display: flex;
`;

const CheckLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const CheckLabel2 = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const TermButton = styled.button`
  border: none;
  background: none;
  color: ${(props) => props.theme.classicBlue};
  font-weight: 600;
  padding: 0;
`;

const BottomDiv = styled.div`
  &:not(:last-child) {
    margin-bottom: 7px;
  }
`;

const GapDiv = styled.div`
  height: 7px;
`;

const SignTypeWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignItem = styled.div`
  border: ${(props) => props.theme.boxBorder};
  background-color: #e6e6e6;
  border-radius: 6px;
  width: 160px;
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:first-child {
    margin-right: 40px;
  }
`;

const ItemName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.blueColor};
  margin-bottom: 10px;
`;

const ItemSub = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

export default ({
  setAction,
  action,
  setAction2,
  action2,
  studyGroup,
  studyGroup2,
  studyGroup3,
  username,
  firstName,
  lastName,
  email,
  emailKey,
  phoneNumber,
  phoneKey,
  organizationName,
  detailAddress,
  onSubmit,
  password,
  password2,
  sPhoneOnClick,
  cPhoneOnClick,
  sEmailOnClick,
  cEmailOnClick,
  myAddress1,
  myAddress2,
  tos,
  top,
  marketing,
  onChangeAllTerm,
  onChangeTop,
  onChangeTos,
  onChangeMarketing,
  sPhoneOnClick_findEmail,
  allClear,
  sEmailOnClick_findPassword,
  managerSecret,
}) => {
  const responseGoogle = async (response) => {
    const {
      email: G_email,
      givenName: G_firstName,
      familyName: G_lastName,
    } = await response.profileObj;
    email.setValue(G_email);
    firstName.setValue(G_firstName);
    lastName.setValue(G_lastName);
    const [G_username] = G_email.split('@');
    username.setValue(G_username);
  };
  const responseFacebook = async (response) => {
    const {
      email: F_email,
      first_name: F_firstName,
      last_name: F_lastName,
    } = await response;
    email.setValue(F_email);
    firstName.setValue(F_firstName);
    lastName.setValue(F_lastName);
    const [F_username] = F_email.split('@');
    username.setValue(F_username);
  };

  return (
    <Wrapper>
      <Form>
        {action === 'logIn' && (
          <>
            <LogoBox>
              <Logo />
            </LogoBox>
            <Helmet>
              <title>로그인 | SLOG-IAM</title>
            </Helmet>
            <form onSubmit={onSubmit}>
              <Input
                placeholder={'Email (예: IAM@google.com)'}
                {...email}
                type="email"
              />
              <Input
                placeholder={'비밀번호 (예: ABCD1234)'}
                {...password}
                type="password"
              />
              <LoginButtonDiv>
                <Button text={'로그인'} />
              </LoginButtonDiv>
            </form>
          </>
        )}
        {action === 'signUp' && (
          <>
            <Helmet>
              <title>회원가입 | SLOG-IAM</title>
            </Helmet>
            <form onSubmit={onSubmit}>
              <NameInputDiv>
                <Input placeholder={'성 (예: 홍)'} {...lastName} />
                <Input placeholder={'이름 (예: 길동)'} {...firstName} />
              </NameInputDiv>
              <Input placeholder={'닉네임 (10글자 이내)'} {...username} />
              <VerficationInputDiv>
                <Input
                  placeholder={'Email [인증 버튼 클릭 ▶]'}
                  value={email.value}
                  onChange={() => {}}
                />
                <PopupCustom
                  trigger={
                    <PopButton_auth text={'Email 인증'} type={'button'} />
                  }
                  closeOnDocumentClick={false}
                  modal
                >
                  {(close) => (
                    <PBody>
                      <PTitle text={'Email 인증'} />
                      <EmailInputDiv>
                        <Input
                          placeholder={'Email (iam@google.com)'}
                          {...email}
                          type="email"
                        />
                        <PopButton_auth
                          type={'button'}
                          onClick={sEmailOnClick}
                          text={'인증번호 발송'}
                        />
                      </EmailInputDiv>
                      <SmallInput placeholder={'인증번호 입력'} {...emailKey} />
                      <ButtonDiv>
                        <PopupButton
                          type="button"
                          text={'인증'}
                          onClick={async () => {
                            const fucResult = await cEmailOnClick();
                            if (fucResult) {
                              close();
                            }
                          }}
                        />
                        <PopupButton
                          type="button"
                          onClick={() => {
                            close();
                            emailKey.setValue(``);
                          }}
                          text={'닫기'}
                        />
                      </ButtonDiv>
                    </PBody>
                  )}
                </PopupCustom>
              </VerficationInputDiv>
              <VerficationInputDiv>
                <Input
                  placeholder={'휴대폰 번호 [인증 버튼 클릭 ▶]'}
                  value={phoneNumber.value}
                  onChange={() => {}}
                />
                <PopupCustom
                  trigger={
                    <PopButton_auth text={'휴대폰 인증'} type={'button'} />
                  }
                  closeOnDocumentClick={false}
                  modal
                >
                  {(close) => (
                    <PBody>
                      <PTitle text={'휴대폰 인증'} />
                      <VerifiInputDiv>
                        <PhoneInput
                          country={'kr'}
                          value={phoneNumber.value}
                          onChange={(phone) => phoneNumber.setValue(phone)}
                        />
                        <PopButton
                          type={'button'}
                          onClick={sPhoneOnClick}
                          text={'인증번호 발송'}
                        />
                      </VerifiInputDiv>
                      <SmallInput placeholder={'인증번호 입력'} {...phoneKey} />
                      <ButtonDiv>
                        <PopupButton
                          type="button"
                          text={'인증'}
                          onClick={async () => {
                            const fucResult = await cPhoneOnClick();
                            if (fucResult) {
                              close();
                            }
                          }}
                        />
                        <PopupButton
                          type="button"
                          onClick={() => {
                            close();
                            phoneKey.setValue(``);
                          }}
                          text={'닫기'}
                        />
                      </ButtonDiv>
                    </PBody>
                  )}
                </PopupCustom>
              </VerficationInputDiv>
              <SelectDiv>
                <span>사용 목적 1</span>
                <Select {...studyGroup} id={'studyGroup_id'} />
              </SelectDiv>
              <SelectDiv>
                <span>사용 목적 2</span>
                <Select {...studyGroup2} id={'studyGroup2_id'} />
              </SelectDiv>
              <SelectDiv>
                <span>사용 목적 3</span>
                <Select {...studyGroup3} id={'studyGroup3_id'} />
              </SelectDiv>
              <SelectDiv>
                <span>주소</span>
                <Select {...myAddress1} id={'myAddress1_id'} />
                <Select {...myAddress2} id={'myAddress2_id'} />
              </SelectDiv>
              <Input
                placeholder={'비밀번호 (예: ABCD1234)'}
                type="password"
                {...password}
              />
              {password.errorChk && (
                <div style={{ color: 'red', marginBottom: '7px' }}>
                  비밀번호는 6글자 이상이어야 합니다
                </div>
              )}
              <Input
                placeholder={'비밀번호 확인 (예: ABCD1234)'}
                type="password"
                {...password2}
              />
              {password2.errorChk && (
                <div style={{ color: 'red', marginBottom: '7px' }}>
                  비밀번호가 일치하지 않습니다
                </div>
              )}{' '}
              <AllCheckDiv>
                <CheckBox
                  id="allTermChk"
                  checked={tos && top && marketing}
                  onChange={onChangeAllTerm}
                  boxSize={'35px'}
                  margin={'0 10px 0 0'}
                />
                <CheckLabel htmlFor="allTermChk">
                  <FatText text={'만 14세 이상이며, 약관에 모두 동의합니다'} />
                  <PopupCustom
                    trigger={
                      <TermButton type="button">
                        (약관 및 세부사항 선택)
                      </TermButton>
                    }
                    closeOnDocumentClick={false}
                    modal
                  >
                    {(close) => (
                      <PBody>
                        <PTitle text={'약관 및 세부사항 선택'} />
                        <AllCheckDiv>
                          <CheckBox
                            id="tosChk"
                            checked={tos}
                            onChange={onChangeTos}
                            boxSize={'35px'}
                            margin={'0 10px 0 0'}
                          />
                          <CheckLabel2 htmlFor="tosChk">
                            <Link target="_blank" to="/tos" replace>
                              서비스 이용약관
                            </Link>
                            &nbsp;동의
                            <span style={{ color: 'red' }}>&nbsp;(필수)</span>
                          </CheckLabel2>
                        </AllCheckDiv>
                        <AllCheckDiv>
                          <CheckBox
                            id="topChk"
                            checked={top}
                            onChange={onChangeTop}
                            boxSize={'35px'}
                            margin={'0 10px 0 0'}
                          />
                          <CheckLabel2 htmlFor="topChk">
                            <Link target="_blank" to="/top" replace>
                              개인정보 취급방침
                            </Link>
                            &nbsp;동의
                            <span style={{ color: 'red' }}>&nbsp;(필수)</span>
                          </CheckLabel2>
                        </AllCheckDiv>
                        <AllCheckDiv>
                          <CheckBox
                            id="marketingChk"
                            checked={marketing}
                            onChange={onChangeMarketing}
                            boxSize={'35px'}
                            margin={'0 10px 0 0'}
                          />
                          <CheckLabel2 htmlFor="marketingChk">
                            <Link target="_blank" to="/tom" replace>
                              마케팅 정보 수신 동의
                            </Link>
                            <span style={{ color: 'gray' }}>&nbsp;(선택)</span>
                          </CheckLabel2>
                        </AllCheckDiv>
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
                  </PopupCustom>
                </CheckLabel>
              </AllCheckDiv>
              <JoinButtonDiv>
                <Button text={'가입'} />
              </JoinButtonDiv>
            </form>
            <GoogleLogin
              clientId="1097644872887-t6iqbst952qs511f0kiu5a3sptiu72qb.apps.googleusercontent.com"
              render={(renderProps) => (
                <GoogleLoginButton
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  align="center"
                >
                  <span style={{ fontSize: 16, fontWeight: 600 }}>
                    Google에서 내 정보 불러오기
                  </span>
                </GoogleLoginButton>
              )}
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
            <FacebookLogin
              appId="672262500184302"
              autoLoad={false}
              fields="first_name,last_name,email,picture"
              callback={responseFacebook}
              render={(renderProps) => (
                <FacebookLoginButton
                  onClick={renderProps.onClick}
                  align="center"
                >
                  <span style={{ fontSize: 16, fontWeight: 600 }}>
                    Facebook에서 내 정보 불러오기
                  </span>
                </FacebookLoginButton>
              )}
            />
          </>
        )}
        {action === 'signUp_manager' && (
          <>
            <Helmet>
              <title>회원가입 | SLOG-IAM</title>
            </Helmet>
            <form onSubmit={onSubmit}>
              <NameInputDiv>
                <Input placeholder={'성 (예: 홍)'} {...lastName} />
                <Input placeholder={'이름 (예: 길동)'} {...firstName} />
              </NameInputDiv>
              <Input placeholder={'닉네임 (10글자 이내)'} {...username} />
              <VerficationInputDiv>
                <Input
                  placeholder={'Email [인증 버튼 클릭 ▶]'}
                  value={email.value}
                  onChange={() => {}}
                />
                <PopupCustom
                  trigger={
                    <PopButton_auth text={'Email 인증'} type={'button'} />
                  }
                  closeOnDocumentClick={false}
                  modal
                >
                  {(close) => (
                    <PBody>
                      <PTitle text={'Email 인증'} />
                      <EmailInputDiv>
                        <Input
                          placeholder={'Email (iam@google.com)'}
                          {...email}
                          type="email"
                        />
                        <PopButton_auth
                          type={'button'}
                          onClick={sEmailOnClick}
                          text={'인증번호 발송'}
                        />
                      </EmailInputDiv>
                      <SmallInput placeholder={'인증번호 입력'} {...emailKey} />
                      <ButtonDiv>
                        <PopupButton
                          type="button"
                          text={'인증'}
                          onClick={async () => {
                            const fucResult = await cEmailOnClick();
                            if (fucResult) {
                              close();
                            }
                          }}
                        />
                        <PopupButton
                          type="button"
                          onClick={() => {
                            close();
                            emailKey.setValue(``);
                          }}
                          text={'닫기'}
                        />
                      </ButtonDiv>
                    </PBody>
                  )}
                </PopupCustom>
              </VerficationInputDiv>
              <VerficationInputDiv>
                <Input
                  placeholder={'휴대폰 번호 [인증 버튼 클릭 ▶]'}
                  value={phoneNumber.value}
                  onChange={() => {}}
                />
                <PopupCustom
                  trigger={
                    <PopButton_auth text={'휴대폰 인증'} type={'button'} />
                  }
                  closeOnDocumentClick={false}
                  modal
                >
                  {(close) => (
                    <PBody>
                      <PTitle text={'휴대폰 인증'} />
                      <VerifiInputDiv>
                        <PhoneInput
                          country={'kr'}
                          value={phoneNumber.value}
                          onChange={(phone) => phoneNumber.setValue(phone)}
                        />
                        <PopButton
                          type={'button'}
                          onClick={sPhoneOnClick}
                          text={'인증번호 발송'}
                        />
                      </VerifiInputDiv>
                      <SmallInput placeholder={'인증번호 입력'} {...phoneKey} />
                      <ButtonDiv>
                        <PopupButton
                          type="button"
                          text={'인증'}
                          onClick={async () => {
                            const fucResult = await cPhoneOnClick();
                            if (fucResult) {
                              close();
                            }
                          }}
                        />
                        <PopupButton
                          type="button"
                          onClick={() => {
                            close();
                            phoneKey.setValue(``);
                          }}
                          text={'닫기'}
                        />
                      </ButtonDiv>
                    </PBody>
                  )}
                </PopupCustom>
              </VerficationInputDiv>
              <Input
                placeholder={'기관 이름 (예: IAM독서실)'}
                {...organizationName}
              />
              <SelectDiv>
                <span>
                  기관
                  <br />
                  주소
                </span>
                <Select {...myAddress1} id={'myAddress1_id'} />
                <Select {...myAddress2} id={'myAddress2_id'} />
              </SelectDiv>
              <Input
                placeholder={'기관 상세주소 (예: 삼성로85길 42)'}
                {...detailAddress}
              />
              <Input
                placeholder={'비밀번호 (예: ABCD1234)'}
                type="password"
                {...password}
              />
              {password.errorChk && (
                <div style={{ color: 'red', marginBottom: '7px' }}>
                  비밀번호는 6글자 이상이어야 합니다
                </div>
              )}
              <Input
                placeholder={'비밀번호 확인 (예: ABCD1234)'}
                type="password"
                {...password2}
              />
              {password2.errorChk && (
                <div style={{ color: 'red', marginBottom: '7px' }}>
                  비밀번호가 일치하지 않습니다
                </div>
              )}{' '}
              <AllCheckDiv>
                <CheckBox
                  id="allTermChk"
                  checked={tos && top && marketing}
                  onChange={onChangeAllTerm}
                  boxSize={'35px'}
                  margin={'0 10px 0 0'}
                />
                <CheckLabel htmlFor="allTermChk">
                  <FatText text={'만 14세 이상이며, 약관에 모두 동의합니다'} />
                  <PopupCustom
                    trigger={
                      <TermButton type="button">
                        (약관 및 세부사항 선택)
                      </TermButton>
                    }
                    closeOnDocumentClick={false}
                    modal
                  >
                    {(close) => (
                      <PBody>
                        <PTitle text={'약관 및 세부사항 선택'} />
                        <AllCheckDiv>
                          <CheckBox
                            id="tosChk"
                            checked={tos}
                            onChange={onChangeTos}
                            boxSize={'35px'}
                            margin={'0 10px 0 0'}
                          />
                          <CheckLabel2 htmlFor="tosChk">
                            <Link target="_blank" to="/tosm" replace>
                              서비스 이용약관
                            </Link>
                            &nbsp;동의
                            <span style={{ color: 'red' }}>&nbsp;(필수)</span>
                          </CheckLabel2>
                        </AllCheckDiv>
                        <AllCheckDiv>
                          <CheckBox
                            id="topChk"
                            checked={top}
                            onChange={onChangeTop}
                            boxSize={'35px'}
                            margin={'0 10px 0 0'}
                          />
                          <CheckLabel2 htmlFor="topChk">
                            <Link target="_blank" to="/top" replace>
                              개인정보 취급방침
                            </Link>
                            &nbsp;동의
                            <span style={{ color: 'red' }}>&nbsp;(필수)</span>
                          </CheckLabel2>
                        </AllCheckDiv>
                        <AllCheckDiv>
                          <CheckBox
                            id="marketingChk"
                            checked={marketing}
                            onChange={onChangeMarketing}
                            boxSize={'35px'}
                            margin={'0 10px 0 0'}
                          />
                          <CheckLabel2 htmlFor="marketingChk">
                            <Link target="_blank" to="/tom" replace>
                              마케팅 정보 수신 동의
                            </Link>
                            <span style={{ color: 'gray' }}>&nbsp;(선택)</span>
                          </CheckLabel2>
                        </AllCheckDiv>
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
                  </PopupCustom>
                </CheckLabel>
              </AllCheckDiv>
              <JoinButtonDiv>
                <Button text={'가입'} />
              </JoinButtonDiv>
            </form>
            <GoogleLogin
              clientId="1097644872887-t6iqbst952qs511f0kiu5a3sptiu72qb.apps.googleusercontent.com"
              render={(renderProps) => (
                <GoogleLoginButton
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  align="center"
                >
                  <span style={{ fontSize: 16, fontWeight: 600 }}>
                    Google에서 내 정보 불러오기
                  </span>
                </GoogleLoginButton>
              )}
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
            <FacebookLogin
              appId="672262500184302"
              autoLoad={false}
              fields="first_name,last_name,email,picture"
              callback={responseFacebook}
              render={(renderProps) => (
                <FacebookLoginButton
                  onClick={renderProps.onClick}
                  align="center"
                >
                  <span style={{ fontSize: 16, fontWeight: 600 }}>
                    Facebook에서 내 정보 불러오기
                  </span>
                </FacebookLoginButton>
              )}
            />
          </>
        )}
        {action === 'findEmail' && (
          <>
            <LogoBox>
              <Logo />
            </LogoBox>
            <form onSubmit={onSubmit}>
              <VerifiInputDiv>
                <PhoneInput
                  country={'kr'}
                  value={phoneNumber.value}
                  onChange={(phone) => phoneNumber.setValue(phone)}
                />
              </VerifiInputDiv>
              <Button_gray
                onClick={sPhoneOnClick_findEmail}
                text={'휴대폰으로 인증번호 (재)발송'}
              />
              <GapDiv />
              <SmallInput placeholder={'인증번호 입력'} {...phoneKey} />
              <ButtonDiv>
                <Button text={'인증 (Email 찾기)'} />
              </ButtonDiv>
            </form>
          </>
        )}
        {action === 'findPassword' && (
          <>
            <LogoBox>
              <Logo />
            </LogoBox>
            <form onSubmit={onSubmit}>
              <VerifiInputDiv>
                <Input
                  placeholder={'Email (iam@google.com)'}
                  {...email}
                  type="email"
                />
              </VerifiInputDiv>
              <Button_gray
                onClick={sEmailOnClick_findPassword}
                text={'Email로 인증번호 (재)발송'}
              />
              <GapDiv />
              <SmallInput placeholder={'인증번호 입력'} {...emailKey} />
              <ButtonDiv>
                <Button text={'인증 (비밀번호 찾기)'} />
              </ButtonDiv>
            </form>
          </>
        )}
      </Form>
      <StateChanger>
        {action === 'logIn' ? (
          <>
            <BottomDiv>
              아직 계정이 없으신가요?&nbsp;
              <SignLink
                onClick={() => {
                  setAction('signUp');
                  allClear();
                }}
              >
                회원가입
              </SignLink>
            </BottomDiv>
            <BottomDiv>
              Email이 기억나지 않습니까?&nbsp;
              <SignLink
                onClick={() => {
                  setAction('findEmail');
                  allClear();
                }}
              >
                Email 찾기
              </SignLink>
            </BottomDiv>
            <BottomDiv>
              비밀번호가 기억나지 않습니까?&nbsp;
              <SignLink
                onClick={() => {
                  setAction('findPassword');
                  allClear();
                }}
              >
                비밀번호 찾기
              </SignLink>
            </BottomDiv>
          </>
        ) : (
          <>
            이미 계정이 있으신가요?{' '}
            <SignLink
              onClick={() => {
                setAction('logIn');
                allClear();
              }}
            >
              로그인
            </SignLink>
          </>
        )}
      </StateChanger>
    </Wrapper>
  );
};

{
  /* <PopupSign
                trigger={<SignLink>회원가입</SignLink>}
                closeOnDocumentClick={false}
                modal
              >
                {(close) => (
                  <PBody>
                    {action2 === 'select' ? (
                      <>
                        <PTitle text={'회원가입'} />
                        <SignTypeWrap>
                          <SignItem
                            onClick={() => {
                              setAction('signUp');
                              allClear();
                            }}
                          >
                            <ItemName>학생회원</ItemName>
                            <ItemSub>(만 14세 이상의 학생)</ItemSub>
                          </SignItem>
                          <SignItem
                            onClick={() => {
                              setAction2('secret');
                            }}
                          >
                            <ItemName>관리자회원</ItemName>
                            <ItemSub>(독서실 관리자)</ItemSub>
                          </SignItem>
                        </SignTypeWrap>
                        <ButtonDiv>
                          <PopupButton_solo
                            type="button"
                            onClick={() => {
                              close();
                            }}
                            text={'닫기'}
                          />
                        </ButtonDiv>
                      </>
                    ) : (
                      <>
                        <PTitle text={'관리자 인증'} />
                        <InputUpWrapper>
                          <InputWrapper>
                            <Input
                              placeholder={'인증코드'}
                              {...managerSecret}
                            />
                          </InputWrapper>
                        </InputUpWrapper>
                        <ButtonDiv>
                          <PopupButton
                            type="button"
                            text={'인증'}
                            onClick={() => {
                              if (managerSecret.value === '코람데오') {
                                managerSecret.setValue('');
                                setAction2('select');
                                setAction('signUp_manager');
                                allClear();
                              } else {
                                alert('인증코드가 불일치합니다.');
                              }
                            }}
                          />
                          <PopupButton
                            type="button"
                            onClick={() => {
                              managerSecret.setValue('');
                              setAction2('select');
                            }}
                            text={'닫기'}
                          />
                        </ButtonDiv>
                      </>
                    )}
                  </PBody>
                )}
              </PopupSign> */
}
