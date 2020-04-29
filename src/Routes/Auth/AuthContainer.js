import React, { useState } from 'react';
import AuthPresenter from './AuthPresenter';
import useInput from '../../Hooks/useInput';
import useSelect from '../../Hooks/useSelect';
import { useMutation } from 'react-apollo-hooks';
import {
  LOG_IN,
  CREATE_ACCOUNT,
  CONFIRM_SECRET,
  LOCAL_LOG_IN,
  S_PHONE_VERIFICATION,
  C_PHONE_VERIFICATION,
} from './AuthQueries';
import { toast } from 'react-toastify';

export default () => {
  const maxLen = (value) => value.length <= 10;
  // const maxLen_nonHyphen = (value) =>
  //   value.length <= 11 && !value.includes('-');

  const [action, setAction] = useState('logIn');
  const loginPosition = useSelect(
    ['[일반]학생', '[학교]관리자', '[학원]관리자', '[독서실]관리자'],
    ['student', 'manager_school', 'manager_academy', 'manager_readingRoom'],
  );
  const username = useInput('', maxLen);
  const firstName = useInput('');
  const lastName = useInput('');
  const secret = useInput('');
  const email = useInput('');
  const phoneNumber = useInput('');
  const phoneKey = useInput(``);
  const requestSecretMutation = useMutation(LOG_IN, {
    variables: { email: email.value },
  });
  const createAccountMutation = useMutation(CREATE_ACCOUNT, {
    variables: {
      loginPosition: loginPosition.option,
      email: email.value,
      phoneNumber: phoneNumber.value,
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value,
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

  const cPhoneOnClick = async (e) => {
    e.preventDefault();
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
      if (
        email.value !== '' &&
        username.value !== '' &&
        firstName.value !== '' &&
        lastName.value !== ''
      ) {
        try {
          const {
            data: { createAccount },
          } = await createAccountMutation();
          if (!createAccount) {
            toast.error('계정을 만들 수 없습니다.');
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
          toast.error(realText[1]);
        }
      } else {
        toast.error('모든 항목을 입력하세요.');
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
      loginPosition={loginPosition}
      username={username}
      firstName={firstName}
      lastName={lastName}
      email={email}
      phoneNumber={phoneNumber}
      phoneKey={phoneKey}
      secret={secret}
      onSubmit={onSubmit}
      sPhoneOnClick={sPhoneOnClick}
      cPhoneOnClick={cPhoneOnClick}
    />
  );
};
