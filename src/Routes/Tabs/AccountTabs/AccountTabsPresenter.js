import React from 'react';
import styled from 'styled-components';
import Input from '../../../Components/Input';
import Popup from 'reactjs-popup';
import PopButton_auth from '../../../Components/Buttons/PopButton_auth';
import PopupButton from '../../../Components/Buttons/PopupButton';
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
  align-items: center;
  width: 100%;
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
}) => {
  if (pageIndex === 0) {
    return (
      <Wrapper>
        <Form>
          <form onSubmit={onEditAccount}>
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
                trigger={<PopButton_auth text={'Email 인증'} type={'button'} />}
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
                    <PTitle text={'Email 인증'} />
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
                            alert('기존 Email 주소와 동일합니다.');
                          } else {
                            sEmailOnClick();
                          }
                        }}
                        text={'인증번호 발송'}
                      />
                    </EmailInputDiv>
                    <SmallInput placeholder={'인증번호 입력'} {...emailKey} />
                    <ButtonDiv>
                      <PopupButton_solo
                        type="button"
                        text={'인증'}
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
                    <PopupClose
                      onClick={() => {
                        close();
                        phoneKey.setValue(``);
                      }}
                    />
                    <PTitle text={'휴대폰 인증'} />
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
                            alert('기존 휴대폰 번호와 동일합니다.');
                          } else {
                            sPhoneOnClick();
                          }
                        }}
                        text={'인증번호 발송'}
                      />
                    </VerifiInputDiv>
                    <SmallInput placeholder={'인증번호 입력'} {...phoneKey} />
                    <ButtonDiv>
                      <PopupButton_solo
                        type="button"
                        text={'인증'}
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
                placeholder={'기관 이름 (예: IAM독서실)'}
                {...organizationName}
              />
            )}
            {meData.loginPosition === 'student' && (
              <>
                <SelectDiv>
                  <span>사용 범주 1</span>
                  <Select {...studyGroup} id={'studyGroup_id'} />
                </SelectDiv>
                <SelectDiv>
                  <span>사용 범주 2</span>
                  <Select {...studyGroup2} id={'studyGroup2_id'} />
                </SelectDiv>
                <SelectDiv>
                  <span>사용 범주 3</span>
                  <Select {...studyGroup3} id={'studyGroup3_id'} />
                </SelectDiv>
                <SelectDiv>
                  <span>주소</span>
                  <Select {...myAddress1} id={'myAddress1_id'} />
                  <Select {...myAddress2} id={'myAddress2_id'} />
                </SelectDiv>
                <BioArea
                  {...bio}
                  placeholder={'자기소개 (150자 이내)'}
                  required={false}
                />
              </>
            )}
            {meData.loginPosition === 'manager' && (
              <>
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
                <FatText text={'마케팅 정보 수신 동의'} />
              </CheckLabel>
            </AllCheckDiv>
            <JoinButtonDiv>
              <Button text={'수정'} />
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
              placeholder={'이전 비밀번호 (예: ABCD1234)'}
              type="password"
              {...password_pre}
            />
            <Input
              placeholder={'새 비밀번호 (예: ABCD1234)'}
              type="password"
              {...password}
            />
            {password.errorChk && (
              <div style={{ color: 'red', marginBottom: '7px' }}>
                비밀번호는 6글자 이상이어야 합니다
              </div>
            )}
            <Input
              placeholder={'새 비밀번호 확인 (예: ABCD1234)'}
              type="password"
              {...password2}
            />
            {password2.errorChk && (
              <div style={{ color: 'red', marginBottom: '7px' }}>
                비밀번호가 일치하지 않습니다
              </div>
            )}
            <JoinButtonDiv>
              <Button text={'수정'} />
            </JoinButtonDiv>
          </form>
        </Form>
      </Wrapper>
    );
  }
};
