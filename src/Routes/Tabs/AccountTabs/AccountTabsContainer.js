import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
  let history = useHistory();

  const maxLen_10 = (value) => value.length <= 10;
  const minLen_6 = (value) => value.length < 6 && value.length > 0;
  const minLen_150 = (value) => value.length < 151;

  const firstName = useInput(meData.firstName);
  const lastName = useInput(meData.lastName);
  const username = useInput(meData.username, maxLen_10);
  const bio = useInput(meData.bio, minLen_150);
  const email = useInput(meData.email);
  const emailKey = useInput('');
  const phoneNumber = useInput(meData.phoneNumber);
  const phoneKey = useInput('');
  const organizationName = useInput(meData.organization?.name);
  const detailAddress = useInput(meData.organization?.detailAddress);
  const [marketing, setMarketing] = useState(meData.termsOfMarketing);
  const [pubOfFeed, setPubOfFeed] = useState(meData.pubOfFeed);
  const [pubOfStatistic, setPubOfStatistic] = useState(meData.pubOfStatistic);
  const [pubOfSchedule, setPubOfSchedule] = useState(meData.pubOfSchedule);
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
  const myAddress1 = useSelect(
    address1,
    address1,
    meData.loginPosition === 'student'
      ? meData.address1
      : meData.organization.address1,
  );
  const myAddress2 = useSelect_dynamic(
    address2_total,
    address2_total,
    myAddress1.optionList,
    myAddress1.option,
    meData.loginPosition === 'student'
      ? meData.address2
      : meData.organization.address2,
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

  const onChangeAllTerm = () => {
    if (pubOfFeed && pubOfStatistic && pubOfSchedule) {
      setPubOfFeed(false);
      setPubOfStatistic(false);
      setPubOfSchedule(false);
    } else {
      setPubOfFeed(true);
      setPubOfStatistic(true);
      setPubOfSchedule(true);
    }
  };

  const onChangeFeed = (e) => {
    setPubOfFeed(e.target.checked);
  };

  const onChangeSta = (e) => {
    setPubOfStatistic(e.target.checked);
  };

  const onChangesche = (e) => {
    setPubOfSchedule(e.target.checked);
  };

  const onEditAccount = async (e) => {
    e.preventDefault();
    if (meData.loginPosition === 'student') {
      try {
        toast.info('????????? ?????? ???...');
        const {
          data: { editAccount },
        } = await editAccountMutation({
          variables: {
            firstName: firstName.value,
            lastName: lastName.value,
            username: username.value,
            bio: bio.value,
            email: email.value,
            phoneNumber: phoneNumber.value,
            studyPurpose: '??????',
            studyGroup: studyGroup.option,
            studyGroup2: studyGroup2.option,
            studyGroup3: studyGroup3.option,
            address1: myAddress1.option,
            address2: myAddress2.option,
            termsOfMarketing: marketing,
            pubOfFeed,
            pubOfStatistic,
            pubOfSchedule,
          },
        });
        if (!editAccount) {
          alert('???????????? ????????? ??? ????????????.');
        } else {
          await meRefetch();
          history.push(`${username.value}`);
          toast.success('????????? ????????? ?????????????????????.');
        }
      } catch (e) {
        const realText = e.message.split('GraphQL error: ');
        alert(realText[1]);
      }
    }
  };

  const onEditPassword = async (e) => {
    e.preventDefault();
    if (password_pre.value === password.value) {
      alert('?????? ??????????????? ??? ??????????????? ???????????????.');
    } else if (password.errorChk || password2.errorChk) {
      alert('??? ??????????????? ?????? ???????????????.');
    } else {
      try {
        toast.info('???????????? ?????? ???...');
        const {
          data: { editPassword },
        } = await editPasswordMutation({
          variables: {
            password_pre: password_pre.value,
            password: password.value,
          },
        });
        if (!editPassword) {
          alert('??????????????? ????????? ??? ????????????.');
        } else {
          await meRefetch();
          password_pre.setValue('');
          password.setValue('');
          password2.setValue('');
          history.push(`${meData.username}`);
          toast.success('???????????? ????????? ?????????????????????.');
        }
      } catch (e) {
        const realText = e.message.split('GraphQL error: ');
        // alert(realText[1]);
        alert(e.message);
      }
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

  return (
    <AccountTabsPresenter
      pageIndex={pageIndex}
      meData={meData}
      firstName={firstName}
      lastName={lastName}
      username={username}
      bio={bio}
      email={email}
      emailKey={emailKey}
      phoneNumber={phoneNumber}
      phoneKey={phoneKey}
      studyGroup={studyGroup}
      studyGroup2={studyGroup2}
      studyGroup3={studyGroup3}
      myAddress1={myAddress1}
      myAddress2={myAddress2}
      organizationName={organizationName}
      detailAddress={detailAddress}
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
      pubOfFeed={pubOfFeed}
      pubOfStatistic={pubOfStatistic}
      pubOfSchedule={pubOfSchedule}
      onChangeAllTerm={onChangeAllTerm}
      onChangeFeed={onChangeFeed}
      onChangeSta={onChangeSta}
      onChangesche={onChangesche}
    />
  );
};
