import ApolloClient from 'apollo-boost';
import { defaults, resolvers } from './LocalState';

const apolloSet = {
  uri: process.env.REACT_APP_BACKEND_URI,
  clientState: {
    defaults,
    resolvers,
  },
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
};

export default new ApolloClient(apolloSet);
