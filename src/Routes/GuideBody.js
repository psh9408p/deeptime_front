import React from 'react';
import { Route, Link } from 'react-router-dom';
import Jilmoon from './Jilmoon';
import Jungbo from './Jungbo';

const GuideBody = () => {
  return (
    <div style={{ marginTop: '50px' }}>
      <Route path="/jilmoon" component={Jilmoon} />
      <Route path="/jungbo" component={Jungbo} />
    </div>
  );
};

export default GuideBody;
