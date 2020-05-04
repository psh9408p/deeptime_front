import React, { useState } from 'react';
import AuthPresenter from './AuthPresenter';
import useInput from '../../Hooks/useInput';
import useSelect from '../../Hooks/useSelect';
import useSelect_dynamic from '../../Hooks/useSelect_dynamic';
import { useMutation } from 'react-apollo-hooks';
import {
  LOG_IN,
  CREATE_ACCOUNT,
  CONFIRM_SECRET,
  LOCAL_LOG_IN,
  S_PHONE_VERIFICATION,
  C_PHONE_VERIFICATION,
  S_EMAIL_VERIFICATION,
  C_EMAIL_VERIFICATION,
} from './AuthQueries';
import { toast } from 'react-toastify';
import {
  studyOption,
  address1,
  address2_total,
} from '../../Components/LongArray';

export default () => {
  const maxLen_10 = (value) => value.length <= 10;
  const minLen_6 = (value) => value.length < 6 && value.length > 0;
  // const maxLen_nonHyphen = (value) =>
  //   value.length <= 11 && !value.includes('-');

  const [action, setAction] = useState('logIn');
  const [allTerm, setAllTerm] = useState(false);
  const [tos, setTos] = useState(false);
  const [top, setTop] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const studyGroup = useSelect(studyOption, studyOption);
  const myAddress1 = useSelect(address1, address1);
  const myAddress2 = useSelect_dynamic(
    address2_total,
    address2_total,
    myAddress1.optionList,
    myAddress1.option,
  );
  const username = useInput('', maxLen_10);
  const password = useInput('', '', minLen_6);
  const passChk = (value) => value !== password.value;
  const password2 = useInput('', '', passChk);
  const firstName = useInput('');
  const lastName = useInput('');
  const secret = useInput('');
  const email = useInput('');
  const emailKey = useInput('');
  const phoneNumber = useInput('');
  const phoneKey = useInput('');
  const requestSecretMutation = useMutation(LOG_IN, {
    variables: { email: email.value },
  });
  const createAccountMutation = useMutation(CREATE_ACCOUNT, {
    variables: {
      username: username.value,
      email: email.value,
      phoneNumber: phoneNumber.value,
      firstName: firstName.value,
      lastName: lastName.value,
      password: password.value,
      address1: myAddress1.option,
      address2: myAddress2.option,
      termsOfMarketing: marketing,
      studyGroup: studyGroup.option,
    },
  });
  const confirmSecretMutation = useMutation(CONFIRM_SECRET, {
    variables: {
      email: email.value,
      secret: secret.value,
    },
  });
  const localLogInMutation = useMutation(LOCAL_LOG_IN);
  const sPhoneVerificationMutation = useMutation(S_PHONE_VERIFICATION, {
    variables: {
      phoneNumber: phoneNumber.value,
    },
  });
  const cPhoneVerificationMutation = useMutation(C_PHONE_VERIFICATION, {
    variables: {
      phoneNumber: phoneNumber.value,
      key: phoneKey.value,
    },
  });
  const sEmailVerificationMutation = useMutation(S_EMAIL_VERIFICATION, {
    variables: {
      emailAdress: email.value,
    },
  });
  const cEmailVerificationMutation = useMutation(C_EMAIL_VERIFICATION, {
    variables: {
      emailAdress: email.value,
      key: emailKey.value,
    },
  });

  const onChangeAllTerm = (e) => {
    setAllTerm(e.target.checked);
    setTos(e.target.checked);
    setTop(e.target.checked);
    setMarketing(e.target.checked);
  };

  const onChangeTos = (e) => {
    setTos(e.target.checked);
  };

  const onChangeTop = (e) => {
    setTop(e.target.checked);
  };

  const onChangeMarketing = (e) => {
    setMarketing(e.target.checked);
  };

  const sPhoneOnClick = async () => {
    try {
      toast.info('인증번호 요청 중...');
      const {
        data: { startPhoneVerification },
      } = await sPhoneVerificationMutation();
      if (!startPhoneVerification) {
        toast.error('인증번호를 요청할 수 없습니다.');
      } else {
        toast.success('해당 번호로 인증번호를 발송했습니다.');
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      toast.error(realText[1]);
    }
  };

  const cPhoneOnClick = async () => {
    try {
      toast.info('인증번호 확인 중...');
      await cPhoneVerificationMutation();
      phoneKey.setValue('');
      toast.success('휴대폰 인증이 완료됐습니다.');
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      toast.error(realText[1]);
    }
  };

  const sEmailOnClick = async () => {
    try {
      toast.info('인증번호 요청 중...');
      const {
        data: { startEmailVerification },
      } = await sEmailVerificationMutation();
      if (!startEmailVerification) {
        toast.error('인증번호를 요청할 수 없습니다.');
      } else {
        toast.success('해당 Email로 인증번호를 발송했습니다.');
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      toast.error(realText[1]);
    }
  };

  const cEmailOnClick = async () => {
    try {
      toast.info('인증번호 확인 중...');
      await cEmailVerificationMutation();
      emailKey.setValue('');
      toast.success('Email 인증이 완료됐습니다.');
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      toast.error(realText[1]);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (action === 'logIn') {
      if (email.value !== '') {
        try {
          const {
            data: { requestSecret },
          } = await requestSecretMutation();
          if (!requestSecret) {
            toast.error(
              <div>
                해당 계정이 없습니다.
                <br />
                계정을 만드세요.
              </div>,
            );
            setTimeout(() => setAction('signUp'), 3000);
          } else {
            toast.success('이메일로 비밀번호가 전송됐습니다.');
            setAction('confirm');
          }
        } catch (e) {
          toast.error(
            <div>
              비밀번호를 요청할 수 없습니다.
              <br />
              다시 시도하세요.
            </div>,
          );
        }
      } else {
        toast.error('이메일을 입력하세요.');
      }
    } else if (action === 'signUp') {
      if (tos === true && top === true) {
        if (password.errorChk === false && password2.errorChk === false) {
          try {
            toast.info('새로운 계정 등록 중...');
            const {
              data: { createAccount },
            } = await createAccountMutation();
            if (!createAccount) {
              alert('계정을 만들 수 없습니다.');
            } else {
              toast.success(
                <div>
                  계정이 만들어졌습니다.
                  <br />
                  로그인을 시도하세요.
                </div>,
              );
              setTimeout(() => setAction('logIn'), 3000);
            }
          } catch (e) {
            const realText = e.message.split('GraphQL error: ');
            alert(realText[1]);
          }
        } else {
          alert('비밀번호를 다시 확인하세요.');
        }
      } else {
        alert('필수 약관에 동의하세요.');
      }
    } else if (action === 'confirm') {
      if (secret.value !== '') {
        try {
          const {
            data: { confirmSecret: token },
          } = await confirmSecretMutation();
          if (token !== '' && token !== undefined) {
            localLogInMutation({ variables: { token } });
          } else {
            throw Error();
          }
        } catch (e) {
          toast.error(
            <div>
              비밀번호를 확인할 수 없습니다.
              <br />
              다시 시도하세요.
            </div>,
          );
        }
      }
    }
  };

  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      studyGroup={studyGroup}
      username={username}
      firstName={firstName}
      lastName={lastName}
      email={email}
      emailKey={emailKey}
      phoneNumber={phoneNumber}
      phoneKey={phoneKey}
      secret={secret}
      password={password}
      password2={password2}
      onSubmit={onSubmit}
      sPhoneOnClick={sPhoneOnClick}
      cPhoneOnClick={cPhoneOnClick}
      sEmailOnClick={sEmailOnClick}
      cEmailOnClick={cEmailOnClick}
      myAddress1={myAddress1}
      myAddress2={myAddress2}
      allTerm={allTerm}
      tos={tos}
      top={top}
      marketing={marketing}
      onChangeAllTerm={onChangeAllTerm}
      onChangeTop={onChangeTop}
      onChangeTos={onChangeTos}
      onChangeMarketing={onChangeMarketing}
    />
  );
};
