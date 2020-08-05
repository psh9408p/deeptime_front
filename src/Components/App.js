import React from 'react';
import { gql } from 'apollo-boost';
import styled, { ThemeProvider } from 'styled-components';
import { HashRouter as Router } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyles from '../Styles/GlobalStyles';
import GlobalStyles_potal from '../Styles/GlobalStyles_potal';
import Theme from '../Styles/Theme';
import Routes from './Routes';
import Footer from './Footer';
import Header from './Header';
import Header_welcome from './Header_welcome';

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
`;

export default () => {
  const {
    data: { isLoggedIn },
  } = useQuery(QUERY);
  return (
    <ThemeProvider theme={Theme}>
      <>
        {window.location.hash !== '#/experience' ? (
          <GlobalStyles />
        ) : (
          <GlobalStyles_potal />
        )}
        <Router>
          <>
            {isLoggedIn === true && window.location.hash !== '#/study' && (
              <Header />
            )}
            {isLoggedIn === false &&
              window.location.hash !== '#/experience' && <Header_welcome />}
            <Wrapper>
              <Routes isLoggedIn={isLoggedIn} />
              {window.location.hash !== '#/experience' && <Footer />}
            </Wrapper>
          </>
        </Router>
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
      </>
    </ThemeProvider>
  );
};
