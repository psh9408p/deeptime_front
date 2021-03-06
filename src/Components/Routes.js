import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import Auth from '../Routes/Auth';
import Attendance from '../Routes/Attendance';
import Marking from '../Routes/Marking';
import Class from '../Routes/Class';
import Student from '../Routes/Student';
import Profile from '../Routes/Profile';
import Study from '../Routes/Study';
import { ME } from '../SharedQueries';
import { useQuery } from '@apollo/react-hooks';
import Loader from './Loader';
import Review from '../Routes/Review';
import Introduce from '../Routes/Introduce';
import Shopping from '../Routes/Shopping';
import Support from '../Routes/Support';
import TermsOfService from '../Routes/TermsOfService';
import TermsOfService_M from '../Routes/TermsOfService_M';
import TermsOfPrivacy from '../Routes/TermsOfPrivacy';
import TermsOfMarketing from '../Routes/TermsOfMarketing';
import MyStudy from '../Routes/MyStudy';
import ClassStudy from '../Routes/ClassStudy';
import PaymentResult from '../Routes/PaymentResult';
import ManageMembership from '../Routes/ManageMembership';
import OrderHistory from '../Routes/OrderHistory';
import Voucher from '../Routes/Voucher';
import Introduce_M from '../Routes/Introduce_M';
import Account from '../Routes/Account';
import Upload_tmp from '../Routes/Upload_tmp';
import Experience from '../Routes/Experience';
import UserGuide from '../Routes/UserGuide';
import Timelapse from '../Routes/Timelapse';
import { gql } from 'apollo-boost';
import ChannelService from './ChannelService';
import Feed from '../Routes/Feed';
import Group from '../Routes/Group/GroupContainer';
import Test from '../Routes/testRoute';
import Shop from '../Routes/Shop';
import Refund from '../Routes/Refund';
import Notice from '../Routes/Notice';
import Chat from '../Routes/Chat';
import TestGuide from '../Routes/TestGuide';
export const MEPOSITION = gql`
  query me {
    me {
      id
      fullName
      email
      phoneNumber
      loginPosition
      studyGroup
      studyGroup2
      studyGroup3
      address1
      address2
    }
  }
`;

const LoaderWrapper = styled.div`
  margin: ${(props) => props.margin};
`;

export let userEmail = '';

const LoggedInRoutes = () => {
  const location = useLocation();
  const pageName = location.pathname.split('/')[1];
  const { data: Mydata, loading, refetch: MyRefetch } = useQuery(MEPOSITION);
  if (!loading) {
    userEmail = Mydata.me.email;
    if (Mydata.me.loginPosition === 'student') {
      // ????????? ????????? ??????????????? ????????? ??????
      if (pageName !== 'study') {
        ChannelService.boot({
          pluginKey: process.env.REACT_APP_CHANNEL_PLUGIN, //please fill with your plugin key
          profile: {
            name: Mydata.me.fullName, //fill with user name
            username: Mydata.me.username,
            email: Mydata.me.email,
            mobileNumber: Mydata.me.phoneNumber,
            studyGroup:
              Mydata.me.studyGroup +
              '/' +
              Mydata.me.studyGroup2 +
              '/' +
              Mydata.me.studyGroup3,
            address: Mydata.me.address1 + '/' + Mydata.me.address2,
          },
        });
      }
      return (
        <Switch>
          <Route path="/study" component={Study} />
          <Route path="/group" component={Group} />
          <Route path="/feed" component={Feed} />
          <Route path="/userguide" component={UserGuide} />
          <Route path="/timelapse" component={Timelapse} />
          {/* <Route path="/attendance" component={Attendance} /> */}
          <Route exact path="/" component={MyStudy} />
          <Route path="/classstudy" component={ClassStudy} />
          <Route path="/shop" component={Shop} />
          <Route path="/payment/result" component={PaymentResult} />
          <Route path="/manage-membership" component={ManageMembership} />
          <Route path="/order-history" component={OrderHistory} />
          <Route path="/voucher" component={Voucher} />
          <Route path="/account" component={Account} />
          <Route path="/auth" component={MyStudy} />
          <Route path="/refund" component={Refund} />
          <Route path="/:username" component={Profile} />
          <Redirect from="*" to="/" />
        </Switch>
      );
    } else {
      return (
        <Switch>
          <Route exact path="/" component={Introduce_M} />
          <Route path="/payment/result" component={PaymentResult} />
          <Route path="/account" component={Account} />
          <Redirect from="*" to="/" />
        </Switch>
      );
    }
  } else {
    return (
      <LoaderWrapper margin={pageName === 'study' ? '250px 0' : '100px 0'}>
        <Loader />
      </LoaderWrapper>
    );
  }
};

const LoggedOutRoutes = () => {
  const location = useLocation();
  const pageName = location.pathname.split('/')[1];
  if (pageName !== 'experience') {
    ChannelService.boot({
      pluginKey: process.env.REACT_APP_CHANNEL_PLUGIN,
    });
  }
  return (
    <Switch>
      <Route exact path="/" component={Introduce} />
      {/* <Route path="/testguide" component={TestGuide} /> */}
      <Route path="/userguide" component={UserGuide} />
      <Route path="/shopping" component={Shopping} />
      <Route path="/support" component={Support} />
      <Route path="/auth" component={Auth} />
      <Route path="/experience" component={Experience} />
      <Route path="/tos" component={TermsOfService} />
      <Route path="/tosm" component={TermsOfService_M} />
      <Route path="/top" component={TermsOfPrivacy} />
      <Route path="/tom" component={TermsOfMarketing} />
      <Route path="/refund" component={Refund} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

const AppRouter = ({ isLoggedIn }) =>
  isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AppRouter;
