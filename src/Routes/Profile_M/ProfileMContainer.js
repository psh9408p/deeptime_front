import React, { useEffect } from 'react';
import { gql } from 'apollo-boost';
import { withRouter } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import ProfileMPresenter from './ProfileMPresenter';
import useTabs from '../../Hooks/useTabs';

const GET_USER = gql`
  query seeUser($username: String!) {
    seeUser(username: $username) {
      id
      avatar
      username
      fullName
      isSelf
      email
      organization {
        id
        name
        seatRatio
        secretCode
        hubs {
          id
          serialNumber
          raspberries {
            id
            seatNumber
            serialNumber
            category
            user {
              id
              fullName
              phoneNumber
            }
          }
        }
      }
      payments {
        id
        name
        paid_at
        pay_method
        amount
        receipt_url
      }
      paymentSet {
        id
        membershipDate
      }
    }
  }
`;

export const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;

let trap = true;

export default withRouter(
  ({
    match: {
      params: { username },
    },
  }) => {
    const profileTabContents = ['기본 정보', '결제 내역', '기기관리'];
    const profileTabs = useTabs(0, profileTabContents);

    const { data, loading, refetch } = useQuery(GET_USER, {
      variables: { username },
    });
    const [logOut] = useMutation(LOG_OUT);

    useEffect(() => {
      if (trap) {
        trap = false;
        return;
      }
      refetch();
    }, []);

    return (
      <ProfileMPresenter
        loading={loading}
        logOut={logOut}
        data={data}
        profileTabs={profileTabs}
        userRefetch={refetch}
      />
    );
  },
);
