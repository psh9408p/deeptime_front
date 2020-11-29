import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Loader = styled.div`
  position: ${(props) => props.position};
  border: 3px solid #00ff0000; /* Light grey */
  border-top: 3px solid #555;
  border-bottom: 3px solid #555;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${spin} 2s linear infinite;
`;

const Loader_s = styled.div`
  position: ${(props) => props.position};
  border: 2px solid #00ff0000; /* Light grey */
  border-top: 2px solid #555;
  border-bottom: 2px solid #555;
  border-radius: 50%;
  width: 12px;
  height: 12px;
  animation: ${spin} 2s linear infinite;
`;

export default ({ position, size = 'm' }) => {
  if (size === 'm') {
    return <Loader position={position} />;
  } else {
    return <Loader_s position={position} />;
  }
};
