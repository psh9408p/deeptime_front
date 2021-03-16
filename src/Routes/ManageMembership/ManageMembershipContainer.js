import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import Loader from '../../Components/Loader';
import { MY_PAYMENTSET } from './ManageSubscriptionQueries';
import ManageMembershipPresenter from './ManageMembershipPresenter';

const LoaderWrapper = styled.div`
  margin: 100px 0px;
`;

export default () => {
  const { data: paymentSetData, loading: paymentSetLoading } = useQuery(
    MY_PAYMENTSET,
  );

  if (!paymentSetLoading && paymentSetData && paymentSetData.myPaymentSet) {
    return (
      <ManageMembershipPresenter paymentSetData={paymentSetData.myPaymentSet} />
    );
  } else {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  }
};
