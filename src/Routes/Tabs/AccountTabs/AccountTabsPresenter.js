import React from 'react';
import styled from 'styled-components';
import Input from '../../../Components/Input';
import Popup from 'reactjs-popup';
import PopButton_auth from '../../../Components/Buttons/PopButton_auth';
import PopupButton_solo from '../../../Components/Buttons/PopupButton_solo';
import PopupClose from '../../../Components/Buttons/PopupClose';
import FatText from '../../../Components/FatText';
import Select from '../../../Components/Select';
import Button from '../../../Components/Buttons/Button';
import PhoneInput from 'react-phone-input-2';
import PopButton from '../../../Components/Buttons/PopButton';
import CheckBox from '../../../Components/CheckBox';
import Textarea from '../../../Components/Textarea';

const Wrapper = styled.div`
  margin-top: 30px;
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

const NameInputDiv = styled.div`
  display: flex;
  input {
    &:not(:first-child) {
      margin-left: 10px;
    }
  }
`;

const VerficationInputDiv = styled.div`
  width: 100%;
  display: flex;
`;

const PopupCustom = styled(Popup)`
  &-content {
    width: 440px !important;
    height: 220px !important;
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

const PBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 20px;
`;

const PTitle = styled(FatText)`
  font-size: 18px;
  text-align: center;
  margin-bottom: 30px;
`;

const EmailInputDiv = styled.div`
  display: flex;
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

const AllCheckDiv = styled.div`
  display: flex;
`;

const CheckLabel = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-weight: 600;
  width: 100%;
`;

const TermButton = styled.button`
  border: none;
  background: none;
  color: ${(props) => props.theme.classicBlue};
  font-weight: 600;
  padding: 0;
`;

const JoinButtonDiv = styled.div`
  margin-top: 10px;
`;

const VerifiInputDiv = styled.div`
  display: flex;
  margin-bottom: 7px;
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

const BioArea = styled(Textarea)`
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
`;

export default ({
  pageIndex,
  meData,
  firstName,
  lastName,
  username,
  bio,
  email,
  emailKey,
  phoneNumber,
  phoneKey,
  studyGroup,
  studyGroup2,
  studyGroup3,
  myAddress1,
  myAddress2,
  organizationName,
  detailAddress,
  marketing,
  onChangeMarketing,
  onEditAccount,
  onEditPassword,
  sPhoneOnClick,
  cPhoneOnClick,
  sEmailOnClick,
  cEmailOnClick,
  password_pre,
  password,
  password2,
  pubOfFeed,
  pubOfStatistic,
  pubOfSchedule,
  onChangeAllTerm,
  onChangeFeed,
  onChangeSta,
  onChangesche,
}) => {
  if (pageIndex === 0) {
    return (
      <Wrapper>
        <Form>
          <form onSubmit={onEditAccount}>
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
              />
              <PopupCustom
                trigger={<PopButton_auth text={'Email ??????'} type={'button'} />}
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
                        onClick={() => {
                          if (meData.email === email.value) {
                            alert('?????? Email ????????? ???????????????.');
                          } else {
                            sEmailOnClick();
                          }
                        }}
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
                        onClick={() => {
                          if (meData.phoneNumber === phoneNumber.value) {
                            alert('?????? ????????? ????????? ???????????????.');
                          } else {
                            sPhoneOnClick();
                          }
                        }}
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
            {meData.loginPosition === 'manager' && (
              <Input
                placeholder={'?????? ?????? (???: IAM?????????)'}
                {...organizationName}
              />
            )}
            {meData.loginPosition === 'student' && (
              <>
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
                <BioArea
                  {...bio}
                  placeholder={'???????????? (150??? ??????)'}
                  required={false}
                />
              </>
            )}
            {meData.loginPosition === 'manager' && (
              <>
                <SelectDiv>
                  <span>
                    ??????
                    <br />
                    ??????
                  </span>
                  <Select {...myAddress1} id={'myAddress1_id'} />
                  <Select {...myAddress2} id={'myAddress2_id'} />
                </SelectDiv>
                <Input
                  placeholder={'?????? ???????????? (???: ?????????85??? 42)'}
                  {...detailAddress}
                />
              </>
            )}
            <AllCheckDiv>
              <CheckBox
                id="marketingChk"
                checked={marketing}
                onChange={onChangeMarketing}
                boxSize={'35px'}
                margin={'0 10px 0 0'}
              />
              <CheckLabel htmlFor="marketingChk">
                <FatText text={'????????? ?????? ?????? ??????'} />
              </CheckLabel>
            </AllCheckDiv>
            <AllCheckDiv>
              <CheckBox
                id="publickChk"
                checked={pubOfFeed && pubOfStatistic && pubOfSchedule}
                onChange={onChangeAllTerm}
                boxSize={'35px'}
                margin={'0 10px 0 0'}
              />
              <CheckLabel htmlFor="publickChk">
                <FatText text={'?????? ????????? ?????? ??????'} />
                <PopupCustom2
                  trigger={
                    <TermButton type="button">
                      &nbsp;&nbsp;(?????? ?????? ??????)
                    </TermButton>
                  }
                  closeOnDocumentClick={false}
                  modal
                >
                  {(close) => (
                    <PBody>
                      <PopupClose onClick={() => close()} />
                      <PTitle text={'?????? ????????? ?????? ?????? ??????'} />
                      <AllCheckDiv>
                        <CheckBox
                          id="feedChk"
                          checked={pubOfFeed}
                          onChange={onChangeFeed}
                          boxSize={'35px'}
                          margin={'0 10px 0 0'}
                        />
                        <CheckLabel htmlFor="feedChk">????????? ??????</CheckLabel>
                      </AllCheckDiv>
                      <AllCheckDiv>
                        <CheckBox
                          id="statisticChk"
                          checked={pubOfStatistic}
                          onChange={onChangeSta}
                          boxSize={'35px'}
                          margin={'0 10px 0 0'}
                        />
                        <CheckLabel htmlFor="statisticChk">
                          ?????? ??????
                        </CheckLabel>
                      </AllCheckDiv>
                      <AllCheckDiv>
                        <CheckBox
                          id="scheduleChk"
                          checked={pubOfSchedule}
                          onChange={onChangesche}
                          boxSize={'35px'}
                          margin={'0 10px 0 0'}
                        />
                        <CheckLabel htmlFor="scheduleChk">
                          ????????? ??????
                        </CheckLabel>
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
        </Form>
      </Wrapper>
    );
  } else if (pageIndex === 1) {
    return (
      <Wrapper>
        <Form>
          <form onSubmit={onEditPassword}>
            <Input
              placeholder={'?????? ???????????? (???: ABCD1234)'}
              type="password"
              {...password_pre}
            />
            <Input
              placeholder={'??? ???????????? (???: ABCD1234)'}
              type="password"
              {...password}
            />
            {password.errorChk && (
              <div style={{ color: 'red', marginBottom: '7px' }}>
                ??????????????? 6?????? ??????????????? ?????????
              </div>
            )}
            <Input
              placeholder={'??? ???????????? ?????? (???: ABCD1234)'}
              type="password"
              {...password2}
            />
            {password2.errorChk && (
              <div style={{ color: 'red', marginBottom: '7px' }}>
                ??????????????? ???????????? ????????????
              </div>
            )}
            <JoinButtonDiv>
              <Button text={'??????'} />
            </JoinButtonDiv>
          </form>
        </Form>
      </Wrapper>
    );
  }
};
