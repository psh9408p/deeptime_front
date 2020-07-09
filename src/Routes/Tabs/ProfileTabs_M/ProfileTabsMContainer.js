import React, { useState } from 'react';
import ProfileTabsPresenter from './ProfileTabsMPresenter';
import { useMutation } from '@apollo/react-hooks';
import useInput from '../../../Hooks/useInput';

// const LoaderWrapper = styled.div`
//   margin: 100px 0px;
// `;

export default ({ pageIndex, data }) => {
  const seatNumber = useInput('');
  const raspberryId = useInput('');

  const RaspberryClear = () => {
    raspberryId.setValue('');
    seatNumber.setValue('');
  };

  const RaspberryLoad = (value1, value2) => {
    seatNumber.setValue(value1);
    raspberryId.setValue(value2);
  };

  //   if (academyLoading === true) {
  //   return (
  //     <LoaderWrapper>
  //       <Loader />
  //     </LoaderWrapper>
  //   );
  // } else if (!academyLoading && academyData && academyData.myAcademy) {
  return (
    <ProfileTabsPresenter
      pageIndex={pageIndex}
      data={data}
      raspberryId={raspberryId}
      seatNumber={seatNumber}
      RaspberryClear={RaspberryClear}
      RaspberryLoad={RaspberryLoad}
    />
  );
  // }
};
