import React from 'react';
import { DELETE_ACADEMY, EDIT_ACADEMY } from './AcademyQueries';
import { useMutation } from 'react-apollo-hooks';
import { toast } from 'react-toastify';
import AcademyPresenter from './AcademyPresenter';

export default ({
  academy,
  academyRefetch,
  academyName,
  academyZipCode,
  academyKind,
  academyAddress1,
  academyAddress2,
  academyDetailAddress,
  openSearchURL,
  clearAcademy,
}) => {
  const deleteAcademyMutation = useMutation(DELETE_ACADEMY, {
    variables: { zipCode: academy.zipCode },
  });
  const editAcademyMutation = useMutation(EDIT_ACADEMY, {
    variables: {
      name: academyName.value,
      zipCode: academyZipCode.value,
      address1: academyAddress1.option,
      address2: academyAddress2.option,
      detailAddress: academyDetailAddress.value,
      kind: academyKind.option,
    },
  });

  const onSubmit = async () => {
    toast.info('정보 수정중...');
    const {
      data: { editAcademy },
    } = await editAcademyMutation();
    if (!editAcademy) {
      toast.error('정보를 수정할 수 없습니다.');
    } else {
      await academyRefetch();
      await clearAcademy();
      toast.success('정보가 수정되었습니다.');
      return true;
    }
  };

  const loadValue = () => {
    academyName.setValue(`${academy.name}`);
    academyZipCode.setValue(`${academy.zipCode}`);
    academyAddress1.setOption(`${academy.address1}`);
    academyAddress2.setOption(`${academy.address2}`);
    academyDetailAddress.setValue(`${academy.detailAddress}`);
    academyKind.setOption(`${academy.kind}`);
  };

  return (
    <AcademyPresenter
      academy={academy}
      academyRefetch={academyRefetch}
      academyName={academyName}
      academyZipCode={academyZipCode}
      academyKind={academyKind}
      academyAddress1={academyAddress1}
      academyAddress2={academyAddress2}
      academyDetailAddress={academyDetailAddress}
      openSearchURL={openSearchURL}
      clearAcademy={clearAcademy}
      deleteAcademyMutation={deleteAcademyMutation}
      onSubmit={onSubmit}
      loadValue={loadValue}
    />
  );
};
