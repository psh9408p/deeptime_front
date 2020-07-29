import React, { useState, useEffect, useRef } from 'react';
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
import { EDIT_ACCOUNT } from './AccountTabsQueries';
import { toast } from 'react-toastify';
import SelectChange from '../../../Components/SelectChange';

export default ({ pageIndex, meData, meRefetch }) => {
  const maxLen_10 = (value) => value.length <= 10;

  const firstName = useInput(meData.firstName);
  const lastName = useInput(meData.lastName);
  const username = useInput(meData.username, maxLen_10);
  const email = useInput(meData.email);
  const emailKey = useInput('');
  const phoneNumber = useInput(meData.phoneNumber);
  const phoneKey = useInput('');
  const [marketing, setMarketing] = useState(meData.termsOfMarketing);

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

  const selectInitSet = async () => {
    await studyGroup.setOption(meData.studyGroup);
    await studyGroup.optionIndexSet(
      studyGroup.valueList.indexOf(meData.studyGroup),
    );
    await console.log(studyGroup.option);
    await studyGroup2.setOption(meData.studyGroup2);
    await console.log(studyGroup2.option);
    await studyGroup3.setOption(meData.studyGroup3);
    await myAddress1.setOption(meData.address1);
    await console.log(myAddress1.option);
    await myAddress2.setOption(meData.address2);
  };

  const selectValueSet = () => {
    SelectChange(
      'studyGroup_id',
      studyGroup.valueList.indexOf(meData.studyGroup),
    );
    SelectChange(
      'studyGroup2_id',
      studyGroup2.valueList.indexOf(meData.studyGroup2),
    );
    SelectChange(
      'studyGroup3_id',
      studyGroup3.valueList.indexOf(meData.studyGroup3),
    );
    SelectChange(
      'myAddress1_id',
      myAddress1.valueList.indexOf(meData.address1),
    );
    SelectChange(
      'myAddress2_id',
      myAddress2.valueList.indexOf(meData.address2),
    );
  };

  // const isFirstRun = useRef(true);
  // useEffect(() => {
  //   if (isFirstRun.current) {
  //     isFirstRun.current = false;
  //     console.log('a');
  //     selectInitSet();
  //     // selectValueSet();
  //     return;
  //   }
  //   console.log('b');
  //   if (pageIndex === 0) {
  //     selectValueSet();
  //   }
  // }, [pageIndex]);

  console.log(meData);
  // console.log(studyGroup.option, studyGroup2.option, studyGroup3.option);
  // console.log(myAddress1.option, myAddress2.option);

  return (
    <AccountTabsPresenter
      pageIndex={pageIndex}
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
    />
  );
};
