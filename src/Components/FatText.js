import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Text = styled.span`
  font-weight: 600;
  margin: ${(props) => props.margin};
`;

const FatText = ({ text, className, margin }) => (
  <Text className={className} margin={margin}>
    {text}
  </Text>
);

FatText.propTypes = {
  text: PropTypes.string.isRequired,
};

export default FatText;
