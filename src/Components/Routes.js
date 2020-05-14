import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import Auth from '../Routes/Auth';
import Attendance from '../Routes/Attendance';
import Attendance_student from '../Routes/Attendance_student';
import Supervision from '../Routes/Supervision';
import Marking from '../Routes/Marking';
import Academy from '../Routes/Academy';
import Class from '../Routes/Class';
import Student from '../Routes/Student';
import Profile from '../Routes/Profile';
import Study from '../Routes/Study';
import { ME } from '../SharedQueries';
import { useQuery } from 'react-apollo-hooks';
import Loader from './Loader';
import Review from '../Routes/Review';
import Experience from '../Routes/Experience';
import Introduce from '../Routes/Introduce';
import Shopping from '../Routes/Shopping';
import Support from '../Routes/Support';
import TermsOfService from '../Routes/TermsOfService';
import TermsOfPrivacy from '../Routes/TermsOfPrivacy';

const LoaderWrapper = styled.div`
  margin: 100px 0px;
`;

const LoggedInRoutes = () => {
  const { data: Mydata, loading, refetch: MyRefetch } = useQuery(ME);
  if (loading === true) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  } else if (!loading && Mydata && Mydata.me) {
    if (Mydata.me.loginPosition === 'student') {
      return (
        <Switch>
          <Route path="/study" component={() => <Study Mydata={Mydata} />} />
          <Route
            exact
            path="/"
            component={() => (
              <Attendance_student Mydata={Mydata} MyRefetch={MyRefetch} />
            )}
          />
          <Route path="/:username" component={Profile} />
          <Redirect from="*" to="/" />
        </Switch>
      );
    } else {
      return (
        <Switch>
          <Route path="/attendance" component={Attendance} />
          <Route path="/supervision" component={Supervision} />
          <Route path="/marking" component={Marking} />
          <Route exact path="/" component={Academy} />
          <Route path="/class" component={Class} />
          <Route
            path="/student"
            component={() => <Student Mydata={Mydata} MyRefetch={MyRefetch} />}
          />
          <Route path="/:username" component={Profile} />
          <Redirect from="*" to="/" />
        </Switch>
      );
    }
  }
};

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Introduce} />
    <Route path="/review" component={Review} />
    <Route path="/shopping" component={Shopping} />
    <Route path="/support" component={Support} />
    <Route path="/auth" component={Auth} />
    <Route path="/experience" component={Experience} />
    <Route path="/tos" component={TermsOfService} />
    <Route path="/top" component={TermsOfPrivacy} />

    <Redirect from="*" to="/" />
  </Switch>
);

const AppRouter = ({ isLoggedIn }) =>
  isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AppRouter;
