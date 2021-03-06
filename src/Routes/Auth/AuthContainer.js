import React, { useState } from 'react';
import AuthPresenter from './AuthPresenter';
import useInput from '../../Hooks/useInput';
import useSelect from '../../Hooks/useSelect';
import useSelect_dynamic from '../../Hooks/useSelect_dynamic';
import useSelect_dynamic2 from '../../Hooks/useSelect_dynamic2';
import { useMutation } from '@apollo/react-hooks';
import {
  REQUEST_LOGIN,
  CREATE_ACCOUNT,
  LOCAL_LOG_IN,
  S_PHONE_VERIFICATION,
  C_PHONE_VERIFICATION,
  S_EMAIL_VERIFICATION,
  C_EMAIL_VERIFICATION,
  S_PHONE_FINDEMAIL,
  C_PHONE_FINDEMAIL,
  S_EMAIL_FINDPASSWORD,
  C_EMAIL_FINDPASSWORD,
  VERIFY_ACCOUNT,
} from './AuthQueries';
import { toast } from 'react-toastify';
import {
  studyOption_group,
  studyOption_group2,
  studyOption_group3,
  address1,
  address2_total,
} from '../../Components/LongArray';

export default () => {
  const maxLen_10 = (value) => value.length <= 10;
  const minLen_6 = (value) => value.length < 6 && value.length > 0;
  // const maxLen_nonHyphen = (value) =>
  //   value.length <= 11 && !value.includes('-');

  // const [action, setAction] = useState('logIn');
  const [action, setAction] = useState('logIn');
  const [tos, setTos] = useState(false);
  const [top, setTop] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const studyGroup = useSelect(studyOption_group, studyOption_group);
  const studyGroup2 = useSelect_dynamic(
    studyOption_group2,
    studyOption_group2,
    studyGroup.optionList,
    studyGroup.option,
  );
  const studyGroup3 = useSelect_dynamic2(
    studyOption_group3,
    studyOption_group3,
    studyGroup.optionList,
    studyGroup.option,
    studyGroup2.optionList,
    studyGroup2.option,
  );
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
  const email = useInput('');
  const emailKey = useInput('');
  const phoneNumber = useInput('');
  const phoneKey = useInput('');

  const [requestLoginMutation] = useMutation(REQUEST_LOGIN, {
    variables: { email: email.value, password: password.value },
  });
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
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
      studyPurpose: '??????',
      studyGroup: studyGroup.option,
      studyGroup2: studyGroup2.option,
      studyGroup3: studyGroup3.option,
    },
  });

  const [verifyAccountMutation] = useMutation(VERIFY_ACCOUNT, {
    variables: {
      username: username.value,
      email: email.value,
      phoneNumber: phoneNumber.value,
    },
  });

  const [localLogInMutation] = useMutation(LOCAL_LOG_IN);
  const [sPhoneVerificationMutation] = useMutation(S_PHONE_VERIFICATION, {
    variables: {
      phoneNumber: phoneNumber.value,
    },
  });
  const [cPhoneVerificationMutation] = useMutation(C_PHONE_VERIFICATION, {
    variables: {
      phoneNumber: phoneNumber.value,
      key: phoneKey.value,
    },
  });
  const [sEmailVerificationMutation] = useMutation(S_EMAIL_VERIFICATION, {
    variables: {
      emailAdress: email.value,
    },
  });
  const [cEmailVerificationMutation] = useMutation(C_EMAIL_VERIFICATION, {
    variables: {
      emailAdress: email.value,
      key: emailKey.value,
    },
  });
  const [sPhoneFindEmailMutation] = useMutation(S_PHONE_FINDEMAIL, {
    variables: {
      phoneNumber: phoneNumber.value,
    },
  });
  const [cPhoneFindEmailMutation] = useMutation(C_PHONE_FINDEMAIL, {
    variables: {
      phoneNumber: phoneNumber.value,
      key: phoneKey.value,
    },
  });
  const [sEmailFindPasswordMutation] = useMutation(S_EMAIL_FINDPASSWORD, {
    variables: {
      emailAdress: email.value,
    },
  });
  const [cEmailFindPasswordMutation] = useMutation(C_EMAIL_FINDPASSWORD, {
    variables: {
      emailAdress: email.value,
      key: emailKey.value,
    },
  });

  const onChangeAllTerm = () => {
    if (tos && top && marketing) {
      setTos(false);
      setTop(false);
      setMarketing(false);
    } else {
      setTos(true);
      setTop(true);
      setMarketing(true);
    }
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

  const allClear = () => {
    firstName.setValue('');
    lastName.setValue('');
    username.setValue('');
    email.setValue('');
    phoneNumber.setValue('');
    myAddress1.setOption(address1[0]);
    myAddress2.setOption(address2_total[0][0]);
    password.setValue('');
    password2.setValue('');
    emailKey.setValue('');
    phoneKey.setValue('');
  };

  const sPhoneOnClick = async () => {
    try {
      toast.info('???????????? ?????? ???...');
      const {
        data: { startPhoneVerification },
      } = await sPhoneVerificationMutation();
      if (!startPhoneVerification) {
        alert('??????????????? ????????? ??? ????????????.');
      } else {
        toast.success('?????? ????????? ??????????????? ??????????????????.');
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  const cPhoneOnClick = async () => {
    try {
      toast.info('???????????? ?????? ???...');
      await cPhoneVerificationMutation();
      phoneKey.setValue('');
      toast.success('????????? ????????? ??????????????????.');
      return true;
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
      return false;
    }
  };

  const sEmailOnClick = async () => {
    try {
      toast.info('???????????? ?????? ???...');
      const {
        data: { startEmailVerification },
      } = await sEmailVerificationMutation();
      if (!startEmailVerification) {
        alert('??????????????? ????????? ??? ????????????.');
      } else {
        toast.success('?????? Email??? ??????????????? ??????????????????.');
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  const cEmailOnClick = async () => {
    try {
      toast.info('???????????? ?????? ???...');
      await cEmailVerificationMutation();
      emailKey.setValue('');
      toast.success('Email ????????? ??????????????????.');
      return true;
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
      return false;
    }
  };

  const sPhoneOnClick_findEmail = async () => {
    try {
      toast.info('???????????? ?????? ???...');
      const {
        data: { startPhoneFindEmail },
      } = await sPhoneFindEmailMutation();
      if (!startPhoneFindEmail) {
        alert('??????????????? ????????? ??? ????????????.');
      } else {
        toast.success('?????? ????????? ??????????????? ??????????????????.');
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  const sEmailOnClick_findPassword = async () => {
    try {
      toast.info('???????????? ?????? ???...');
      const {
        data: { startEmailFindPassword },
      } = await sEmailFindPasswordMutation();
      if (!startEmailFindPassword) {
        alert('??????????????? ????????? ??? ????????????.');
      } else {
        toast.success('?????? Email??? ??????????????? ??????????????????.');
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (action === 'logIn') {
      try {
        toast.info('????????? ???...');
        const {
          data: { requestLogin: token },
        } = await requestLoginMutation();
        if (token !== '' && token !== undefined) {
          localLogInMutation({ variables: { token } });
        } else {
          throw Error('????????? ???????????? ????????? ????????????.');
        }
      } catch (e) {
        if (e.message.includes('GraphQL error')) {
          const realText = e.message.split('GraphQL error: ');
          alert(realText[1]);
        } else {
          alert(e.message);
        }
      }
    } else if (action === 'signUp') {
      if (tos === true && top === true) {
        if (password.errorChk === false && password2.errorChk === false) {
          try {
            toast.info('???????????? ?????? ?????? ???...');
            const {
              data: { verifyAccount },
            } = await verifyAccountMutation();
            if (!verifyAccount) {
              alert('????????? ?????? ??? ????????????.');
            } else {
              toast.success(
                <div>
                  ???????????? ?????? ??????.
                  <br />
                  ?????? ????????? ???????????????.
                </div>,
              );
              setAction('signUp2');
            }
          } catch (e) {
            const realText = e.message.split('GraphQL error: ');
            alert(realText[1]);
          }
        } else {
          alert('??????????????? ?????? ???????????????.');
        }
      } else {
        alert('?????? ????????? ???????????????.');
      }
    } else if (action === 'signUp2') {
      try {
        toast.info('????????? ?????? ?????? ???...');
        const {
          data: { createAccount },
        } = await createAccountMutation();
        if (!createAccount) {
          alert('????????? ?????? ??? ????????????.');
        } else {
          toast.success(
            <div>
              ????????? ?????????????????????.
              <br />
              ???????????? ???????????????.
            </div>,
          );
          password.setValue('');
          setAction('logIn');
        }
      } catch (e) {
        const realText = e.message.split('GraphQL error: ');
        alert(realText[1]);
      }
    } else if (action === 'findEmail') {
      try {
        toast.info('???????????? ?????? ???...');
        const {
          data: { completePhoneFindEmail: userEmail },
        } = await cPhoneFindEmailMutation();
        email.setValue(userEmail);
        phoneNumber.setValue('');
        phoneKey.setValue('');
        setAction('logIn');
        alert('????????? ????????? ??????????????????.\n???????????? ???????????????.');
      } catch (e) {
        const realText = e.message.split('GraphQL error: ');
        alert(realText[1]);
      }
    } else if (action === 'findPassword') {
      try {
        toast.info('???????????? ?????? ???...');
        await cEmailFindPasswordMutation();
        emailKey.setValue('');
        setAction('logIn');
        alert(
          '?????? Email??? ?????? ??????????????? ??????????????????.\n???????????? ?????? ??? ???????????? ???????????????.',
        );
      } catch (e) {
        const realText = e.message.split('GraphQL error: ');
        alert(realText[1]);
      }
    }
  };

  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      studyGroup={studyGroup}
      studyGroup2={studyGroup2}
      studyGroup3={studyGroup3}
      username={username}
      firstName={firstName}
      lastName={lastName}
      email={email}
      emailKey={emailKey}
      phoneNumber={phoneNumber}
      phoneKey={phoneKey}
      password={password}
      password2={password2}
      onSubmit={onSubmit}
      sPhoneOnClick={sPhoneOnClick}
      cPhoneOnClick={cPhoneOnClick}
      sEmailOnClick={sEmailOnClick}
      cEmailOnClick={cEmailOnClick}
      myAddress1={myAddress1}
      myAddress2={myAddress2}
      tos={tos}
      top={top}
      marketing={marketing}
      onChangeAllTerm={onChangeAllTerm}
      onChangeTop={onChangeTop}
      onChangeTos={onChangeTos}
      onChangeMarketing={onChangeMarketing}
      sPhoneOnClick_findEmail={sPhoneOnClick_findEmail}
      allClear={allClear}
      sEmailOnClick_findPassword={sEmailOnClick_findPassword}
    />
  );
};
