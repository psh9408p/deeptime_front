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
import PopupButton_solo from '../../Components/Buttons/PopupButton_solo';
import PopupClose from '../../Components/Buttons/PopupClose';
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

const JoinButtonDiv2 = styled.div`
  margin-top: 10px;
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

const SelectDiv_P = styled(SelectDiv)`
  width: 105%;
  span {
    width: 114px;
  }
`;

const SelectWrap_P = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

const VerficationInputDiv = styled.div`
  width: 100%;
  display: flex;
`;

const PopupCustom = styled(Popup)`
  &-content {
    width: 450px !important;
    height: 230px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${(props) => props.theme.borderRadius};
  }
`;

const PopupCustom2 = styled(PopupCustom)`
  &-content {
    width: 420px !important;
    height: 200px !important;
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
  padding: 20px 20px;
`;

const PTitle = styled(FatText)`
  font-size: 18px;
  text-align: center;
  margin-bottom: 30px;
`;

const SmallInput = styled(Input)`
  width: 200px;
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

const CheckLabel2 = styled(CheckLabel)`
  flex-direction: row;
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

const PurposeContent = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 20px;
  span {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const SignupText = styled.div`
  text-align: center;
  font-size: 40px;
  font-weight: 600;
  :not(:last-child) {
    margin-bottom: 10px;
  }
`;

const MainTitle = styled.div`
  margin-bottom: 30px;
`;

export default ({
  setAction,
  action,
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
}) => {
  const responseGoogle = async (response) => {
    const {
      email: G_email,
      givenName: G_firstName,
      familyName: G_lastName,
    } = await response.profileObj;
    email.setValue(G_email ? G_email : '');
    firstName.setValue(G_firstName ? G_firstName : '');
    lastName.setValue(G_lastName ? G_lastName : '');
    if (G_email) {
      const [G_username] = G_email.split('@');
      username.setValue(G_username);
    }
  };
  const responseFacebook = async (response) => {
    const {
      email: F_email,
      first_name: F_firstName,
      last_name: F_lastName,
    } = await response;
    email.setValue(F_email ? F_email : '');
    firstName.setValue(F_firstName ? F_firstName : '');
    lastName.setValue(F_lastName ? F_lastName : '');
    if (F_email) {
      const [F_username] = F_email.split('@');
      username.setValue(F_username);
    }
  };

  return (
    <Wrapper>
      {action === 'signUp2' && (
        <MainTitle>
          <SignupText>????????? ?????? ????????? ????????????????</SignupText>
          <SignupText>????????? ?????? ????????? ??????????????????!</SignupText>
        </MainTitle>
      )}
      <Form>
        {action === 'logIn' && (
          <>
            <LogoBox>
              <Logo />
            </LogoBox>
            <Helmet>
              <title>????????? | DEEPTIME</title>
            </Helmet>
            <form onSubmit={onSubmit}>
              <Input
                placeholder={'Email (???: deeptime@google.com)'}
                {...email}
                autoComplete={'on'}
                type="email"
              />
              <Input
                placeholder={'???????????? (???: ABCD1234)'}
                {...password}
                autoComplete={'on'}
                type="password"
              />
              <LoginButtonDiv>
                <Button text={'?????????'} />
              </LoginButtonDiv>
            </form>
          </>
        )}
        {action === 'signUp' && (
          <>
            <Helmet>
              <title>???????????? | DEEPTIME</title>
            </Helmet>
            <form onSubmit={onSubmit}>
              <NameInputDiv>
                <Input placeholder={'??? (???: ???)'} {...lastName} />
                <Input placeholder={'?????? (???: ??????)'} {...firstName} />
              </NameInputDiv>
              <Input placeholder={'????????? (10?????? ??????)'} {...username} />
              <VerficationInputDiv>
                <Input
                  placeholder={'Email [?????? ?????? ?????? ???]'}
                  value={email.value}
                  onChange={() => {}}
                  type="email"
                />
                <PopupCustom
                  trigger={
                    <PopButton_auth text={'Email ??????'} type={'button'} />
                  }
                  closeOnDocumentClick={false}
                  modal
                >
                  {(close) => (
                    <PBody>
                      <PopupClose
                        onClick={() => {
                          close();
                          emailKey.setValue(``);
                        }}
                      />
                      <PTitle text={'Email ??????'} />
                      <EmailInputDiv>
                        <Input
                          placeholder={'Email (deeptime@google.com)'}
                          {...email}
                          type="email"
                        />
                        <PopButton_auth
                          type={'button'}
                          onClick={sEmailOnClick}
                          text={'???????????? ??????'}
                        />
                      </EmailInputDiv>
                      <SmallInput placeholder={'???????????? ??????'} {...emailKey} />
                      <ButtonDiv>
                        <PopupButton_solo
                          type="button"
                          text={'??????'}
                          onClick={async () => {
                            const fucResult = await cEmailOnClick();
                            if (fucResult) {
                              close();
                            }
                          }}
                        />
                      </ButtonDiv>
                    </PBody>
                  )}
                </PopupCustom>
              </VerficationInputDiv>
              <VerficationInputDiv>
                <Input
                  placeholder={'????????? ?????? [?????? ?????? ?????? ???]'}
                  value={phoneNumber.value}
                  onChange={() => {}}
                />
                <PopupCustom
                  trigger={
                    <PopButton_auth text={'????????? ??????'} type={'button'} />
                  }
                  closeOnDocumentClick={false}
                  modal
                >
                  {(close) => (
                    <PBody>
                      <PopupClose
                        onClick={() => {
                          close();
                          phoneKey.setValue(``);
                        }}
                      />
                      <PTitle text={'????????? ??????'} />
                      <VerifiInputDiv>
                        <PhoneInput
                          country={'kr'}
                          value={phoneNumber.value}
                          onChange={(phone) => phoneNumber.setValue(phone)}
                        />
                        <PopButton
                          type={'button'}
                          onClick={sPhoneOnClick}
                          text={'???????????? ??????'}
                        />
                      </VerifiInputDiv>
                      <SmallInput placeholder={'???????????? ??????'} {...phoneKey} />
                      <ButtonDiv>
                        <PopupButton_solo
                          type="button"
                          text={'??????'}
                          onClick={async () => {
                            const fucResult = await cPhoneOnClick();
                            if (fucResult) {
                              close();
                            }
                          }}
                        />
                      </ButtonDiv>
                    </PBody>
                  )}
                </PopupCustom>
              </VerficationInputDiv>
              <Input
                placeholder={'???????????? (???: ABCD1234)'}
                type="password"
                {...password}
              />
              {password.errorChk && (
                <div style={{ color: 'red', marginBottom: '7px' }}>
                  ??????????????? 6?????? ??????????????? ?????????
                </div>
              )}
              <Input
                placeholder={'???????????? ?????? (???: ABCD1234)'}
                type="password"
                {...password2}
              />
              {password2.errorChk && (
                <div style={{ color: 'red', marginBottom: '7px' }}>
                  ??????????????? ???????????? ????????????
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
                  <FatText text={'??? 14??? ????????????, ????????? ?????? ???????????????'} />
                  <PopupCustom2
                    trigger={
                      <TermButton type="button">
                        (?????? ??? ???????????? ??????)
                      </TermButton>
                    }
                    closeOnDocumentClick={false}
                    modal
                  >
                    {(close) => (
                      <PBody>
                        <PopupClose onClick={() => close()} />
                        <PTitle text={'?????? ??? ???????????? ??????'} />
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
                              ????????? ????????????
                            </Link>
                            &nbsp;??????
                            <span style={{ color: 'red' }}>&nbsp;(??????)</span>
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
                              ???????????? ????????????
                            </Link>
                            &nbsp;??????
                            <span style={{ color: 'red' }}>&nbsp;(??????)</span>
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
                              ????????? ?????? ?????? ??????
                            </Link>
                            <span style={{ color: 'gray' }}>&nbsp;(??????)</span>
                          </CheckLabel2>
                        </AllCheckDiv>
                      </PBody>
                    )}
                  </PopupCustom2>
                </CheckLabel>
              </AllCheckDiv>
              <JoinButtonDiv>
                <Button text={'??????'} />
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
                    Google?????? ??? ?????? ????????????
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
                    Facebook?????? ??? ?????? ????????????
                  </span>
                </FacebookLoginButton>
              )}
            />
          </>
        )}
        {action === 'signUp2' && (
          <>
            <Helmet>
              <title>???????????? | DEEPTIME</title>
            </Helmet>
            <form onSubmit={onSubmit}>
              <SelectDiv>
                <span>?????? ?????? 1</span>
                <Select {...studyGroup} id={'studyGroup_id'} />
              </SelectDiv>
              <SelectDiv>
                <span>?????? ?????? 2</span>
                <Select {...studyGroup2} id={'studyGroup2_id'} />
              </SelectDiv>
              <SelectDiv>
                <span>?????? ?????? 3</span>
                <Select {...studyGroup3} id={'studyGroup3_id'} />
              </SelectDiv>
              {/* <SelectDiv>
                <span>??????</span>
                <Select {...myAddress1} id={'myAddress1_id'} />
                <Select {...myAddress2} id={'myAddress2_id'} />
              </SelectDiv> */}
              <JoinButtonDiv2>
                <Button text={'??????'} />
              </JoinButtonDiv2>
            </form>
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
                text={'??????????????? ???????????? (???)??????'}
              />
              <GapDiv />
              <SmallInput placeholder={'???????????? ??????'} {...phoneKey} />
              <ButtonDiv>
                <Button text={'?????? (Email ??????)'} />
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
                  placeholder={'Email (deeptime@google.com)'}
                  {...email}
                  type="email"
                />
              </VerifiInputDiv>
              <Button_gray
                onClick={sEmailOnClick_findPassword}
                text={'Email??? ???????????? (???)??????'}
              />
              <GapDiv />
              <SmallInput placeholder={'???????????? ??????'} {...emailKey} />
              <ButtonDiv>
                <Button text={'?????? (???????????? ??????)'} />
              </ButtonDiv>
            </form>
          </>
        )}
      </Form>
      <StateChanger>
        {action === 'logIn' ? (
          <>
            <BottomDiv>
              ?????? ????????? ????????????????&nbsp;
              <SignLink
                onClick={() => {
                  setAction('signUp');
                  allClear();
                }}
              >
                ????????????
              </SignLink>
            </BottomDiv>
            <BottomDiv>
              Email??? ???????????? ?????????????&nbsp;
              <SignLink
                onClick={() => {
                  setAction('findEmail');
                  allClear();
                }}
              >
                Email ??????
              </SignLink>
            </BottomDiv>
            <BottomDiv>
              ??????????????? ???????????? ?????????????&nbsp;
              <SignLink
                onClick={() => {
                  setAction('findPassword');
                  allClear();
                }}
              >
                ???????????? ??????
              </SignLink>
            </BottomDiv>
          </>
        ) : (
          <>
            ?????? ????????? ????????????????{' '}
            <SignLink
              onClick={() => {
                setAction('logIn');
                allClear();
              }}
            >
              ?????????
            </SignLink>
          </>
        )}
      </StateChanger>
    </Wrapper>
  );
};

{
  /* <PopupSign
                trigger={<SignLink>????????????</SignLink>}
                closeOnDocumentClick={false}
                modal
              >
                {(close) => (
                  <PBody>
                    {action2 === 'select' ? (
                      <>
                        <PTitle text={'????????????'} />
                        <SignTypeWrap>
                          <SignItem
                            onClick={() => {
                              setAction('signUp');
                              allClear();
                            }}
                          >
                            <ItemName>????????????</ItemName>
                            <ItemSub>(??? 14??? ????????? ??????)</ItemSub>
                          </SignItem>
                          <SignItem
                            onClick={() => {
                              setAction2('secret');
                            }}
                          >
                            <ItemName>???????????????</ItemName>
                            <ItemSub>(????????? ?????????)</ItemSub>
                          </SignItem>
                        </SignTypeWrap>
                        <ButtonDiv>
                          <PopupButton_solo
                            type="button"
                            onClick={() => {
                              close();
                            }}
                            text={'??????'}
                          />
                        </ButtonDiv>
                      </>
                    ) : (
                      <>
                        <PTitle text={'????????? ??????'} />
                        <InputUpWrapper>
                          <InputWrapper>
                            <Input
                              placeholder={'????????????'}
                              {...managerSecret}
                            />
                          </InputWrapper>
                        </InputUpWrapper>
                        <ButtonDiv>
                          <PopupButton
                            type="button"
                            text={'??????'}
                            onClick={() => {
                              if (managerSecret.value === '????????????') {
                                managerSecret.setValue('');
                                setAction2('select');
                                setAction('signUp_manager');
                                allClear();
                              } else {
                                alert('??????????????? ??????????????????.');
                              }
                            }}
                          />
                          <PopupButton
                            type="button"
                            onClick={() => {
                              managerSecret.setValue('');
                              setAction2('select');
                            }}
                            text={'??????'}
                          />
                        </ButtonDiv>
                      </>
                    )}
                  </PBody>
                )}
              </PopupSign> */
}
