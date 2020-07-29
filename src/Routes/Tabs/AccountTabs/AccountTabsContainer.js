import React, { useState } from 'react';
import useInput from '../../../Hooks/useInput';
import useSelect from '../../../Hooks/useSelect';
import useSelect_dynamic from '../../../Hooks/useSelect_dynamic';
import useSelect_dynamic2 from '../../../Hooks/useSelect_dynamic2';
import {
  studyOption_group,
  studyOption_group2,
  studyOption_group3,
  address1,
  address2_total,
} from '../../../Components/LongArray';
import { useMutation } from '@apollo/react-hooks';
import AccountTabsPresenter from './AccountTabsPresenter';
import {
  EDIT_ACCOUNT,
  EDIT_PASSWORD,
  S_PHONE_VERIFICATION,
  S_EMAIL_VERIFICATION,
  C_EMAIL_VERIFICATION,
  C_PHONE_VERIFICATION,
} from './AccountTabsQueries';
import { toast } from 'react-toastify';

export default ({ pageIndex, meData, meRefetch }) => {
  const maxLen_10 = (value) => value.length <= 10;
  const minLen_6 = (value) => value.length < 6 && value.length > 0;

  const firstName = useInput(meData.firstName);
  const lastName = useInput(meData.lastName);
  const username = useInput(meData.username, maxLen_10);
  const email = useInput(meData.email);
  const emailKey = useInput('');
  const phoneNumber = useInput(meData.phoneNumber);
  const phoneKey = useInput('');
  const [marketing, setMarketing] = useState(meData.termsOfMarketing);
  const password_pre = useInput('');
  const password = useInput('', '', minLen_6);
  const passChk = (value) => value !== password.value;
  const password2 = useInput('', '', passChk);

  const studyGroup = useSelect(
    studyOption_group,
    studyOption_group,
    meData.studyGroup,
  );
  const studyGroup2 = useSelect_dynamic(
    studyOption_group2,
    studyOption_group2,
    studyGroup.optionList,
    studyGroup.option,
    meData.studyGroup2,
  );
  const studyGroup3 = useSelect_dynamic2(
    studyOption_group3,
    studyOption_group3,
    studyGroup.optionList,
    studyGroup.option,
    studyGroup2.optionList,
    studyGroup2.option,
    meData.studyGroup3,
  );
  const myAddress1 = useSelect(address1, address1, meData.address1);
  const myAddress2 = useSelect_dynamic(
    address2_total,
    address2_total,
    myAddress1.optionList,
    myAddress1.option,
    meData.address2,
  );

  const onChangeMarketing = (e) => {
    setMarketing(e.target.checked);
  };

  const [editAccountMutation] = useMutation(EDIT_ACCOUNT);
  const [editPasswordMutation] = useMutation(EDIT_PASSWORD);
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

  const onEditAccount = async () => {
    try {
      toast.info('프로필 수정 중...');
      const {
        data: { editAccount },
      } = await editAccountMutation({
        variables: {
          firstName: firstName.value,
          lastName: lastName.value,
          username: username.value,
          email: email.value,
          phoneNumber: phoneNumber.value,
          studyGroup: studyGroup.option,
          studyGroup2: studyGroup2.option,
          studyGroup3: studyGroup3.option,
          address1: myAddress1.option,
          address2: myAddress2.option,
          termsOfMarketing: marketing,
        },
      });
      if (!editAccount) {
        alert('프로필을 수정할 수 없습니다.');
      } else {
        await meRefetch();
        toast.success('프로필 수정이 완료되었습니다.');
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  const onEditPassword = async () => {
    try {
      toast.info('비밀번호 수정 중...');
      const {
        data: { editPassword },
      } = await editPasswordMutation({
        variables: {
          password_pre: password_pre.value,
          password: password.value,
        },
      });
      if (!editPassword) {
        alert('비밀번호를 수정할 수 없습니다.');
      } else {
        password_pre.setValue('');
        password.setValue('');
        password2.setValue('');
        toast.success('비밀번호 수정이 완료되었습니다.');
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  const sEmailOnClick = async () => {
    try {
      toast.info('인증번호 요청 중...');
      const {
        data: { startEmailVerification },
      } = await sEmailVerificationMutation();
      if (!startEmailVerification) {
        alert('인증번호를 요청할 수 없습니다.');
      } else {
        toast.success('해당 Email로 인증번호를 발송했습니다.');
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  const sPhoneOnClick = async () => {
    try {
      toast.info('인증번호 요청 중...');
      const {
        data: { startPhoneVerification },
      } = await sPhoneVerificationMutation();
      if (!startPhoneVerification) {
        alert('인증번호를 요청할 수 없습니다.');
      } else {
        toast.success('해당 번호로 인증번호를 발송했습니다.');
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  const cEmailOnClick = async () => {
    try {
      toast.info('인증번호 확인 중...');
      await cEmailVerificationMutation();
      emailKey.setValue('');
      toast.success('Email 인증이 완료됐습니다.');
      return true;
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
      return false;
    }
  };

  const cPhoneOnClick = async () => {
    try {
      toast.info('인증번호 확인 중...');
      await cPhoneVerificationMutation();
      phoneKey.setValue('');
      toast.success('휴대폰 인증이 완료됐습니다.');
      return true;
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
      return false;
    }
  };

  return (
    <AccountTabsPresenter
      pageIndex={pageIndex}
      meData={meData}
      firstName={firstName}
      lastName={lastName}
      username={username}
      email={email}
      emailKey={emailKey}
      phoneNumber={phoneNumber}
      phoneKey={phoneKey}
      studyGroup={studyGroup}
      studyGroup2={studyGroup2}
      studyGroup3={studyGroup3}
      myAddress1={myAddress1}
      myAddress2={myAddress2}
      marketing={marketing}
      onChangeMarketing={onChangeMarketing}
      onEditAccount={onEditAccount}
      onEditPassword={onEditPassword}
      sPhoneOnClick={sPhoneOnClick}
      cPhoneOnClick={cPhoneOnClick}
      sEmailOnClick={sEmailOnClick}
      cEmailOnClick={cEmailOnClick}
      password_pre={password_pre}
      password={password}
      password2={password2}
    />
  );
};
