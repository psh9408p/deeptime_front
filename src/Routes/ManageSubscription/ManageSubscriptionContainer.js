import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Loader from '../../Components/Loader';
import { toast } from 'react-toastify';
import {
  MY_PAYMENTSET,
  PAY_RESUB,
  PAY_CANCEL,
  PAY_CHANGEBILL,
} from './ManageSubscriptionQueries';
import ManageSubscriptionPresenter from './ManageSubscriptionPresenter';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';

const LoaderWrapper = styled.div`
  margin: 100px 0px;
`;

let trap = true;

export default () => {
  let history = useHistory();

  const {
    data: paymentSetData,
    loading: paymentSetLoading,
    refetch: paymentSetRefetch,
  } = useQuery(MY_PAYMENTSET);

  const [payCancelMutation] = useMutation(PAY_CANCEL);
  const [payReSubMutation] = useMutation(PAY_RESUB);
  const [payChangeBillMutation] = useMutation(PAY_CHANGEBILL);

  const SubCancel = async () => {
    try {
      const date = new Date(paymentSetData.myPaymentSet.membershipDate);
      toast.info('구독 해지 예약 중...');
      const {
        data: { payment_bill_cancel },
      } = await payCancelMutation();
      if (!payment_bill_cancel) {
        alert('서버 오류로 구독 해지 예약을 할 수 없습니다.');
      } else {
        await paymentSetRefetch();
        alert(
          `구독 해지가 예약되었습니다.\n${date.getFullYear()}.${
            date.getMonth() + 1
          }.${date.getDate() - 1}까지 이용할 수 있습니다.`,
        );
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  const ReSub = async () => {
    const date = new Date(paymentSetData.myPaymentSet.membershipDate);
    try {
      toast.info('구독 해지 예약 취소 중...');
      const {
        data: { payment_rebill },
      } = await payReSubMutation({ variables: { membershipDate: date } });
      if (!payment_rebill) {
        alert('서버 오류로 구독 해지 예약 취소를 할 수 없습니다.');
      } else {
        await paymentSetRefetch();
        alert('구독 해지 예약이 취소되었습니다.');
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  const billingChange = () => {
    const { IMP } = window;
    IMP.init(process.env.REACT_APP_IMPORT_CODE);
    const {
      id,
      membershipDate,
      amountBooking,
      billingKey,
      user,
    } = paymentSetData.myPaymentSet;
    const memberDate = new Date(membershipDate);
    const userId = user.id;
    const billingKey_new = userId.substring(0, 5) + '_' + new Date().getTime();

    IMP.request_pay(
      {
        // param
        pg: 'danal',
        pay_method: 'card', // "card"만 지원됩니다
        merchant_uid: 'merchant_' + new Date().getTime(),
        customer_uid: billingKey_new, //customer_uid 파라메터가 있어야 빌링키 발급을 시도합니다.
        name: '정기결제 카드 변경 등록',
        amount: 0, // 0 으로 설정하여 빌링키 발급만 진행합니다.
        buyer_email: user.email,
        buyer_name: user.fullName,
        buyer_tel: user.phoneNumber,
      },
      async function (response) {
        // callback
        if (response.success) {
          try {
            await payChangeBillMutation({
              variables: {
                paymentSet_id: id,
                amountBooking,
                membershipDate: memberDate,
                billingKey_new,
                billingKey_old: billingKey,
                card_name: response.card_name,
              },
            });
          } catch (e) {
            response.success = false;
            const realText = e.message.split('GraphQL error: ');
            response.error_msg = realText[1];
          }
        }
        localStorage.setItem('billingBack', '/manage-subscription');
        const query = queryString.stringify(response);
        history.push(`/payment/result?${query}`);
      },
    );
  };

  useEffect(() => {
    if (trap) {
      trap = false;
      return;
    }
    paymentSetRefetch();
  }, []);

  if (!paymentSetLoading && paymentSetData && paymentSetData.myPaymentSet) {
    return (
      <ManageSubscriptionPresenter
        paymentSetData={paymentSetData.myPaymentSet}
        SubCancel={SubCancel}
        ReSub={ReSub}
        billingChange={billingChange}
      />
    );
  } else {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  }
};
