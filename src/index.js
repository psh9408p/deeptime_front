import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import Client from './Apollo/Client';
import { ApolloProvider } from '@apollo/react-hooks';
import '@babel/polyfill';

ReactDOM.render(
  <ApolloProvider client={Client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
