import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.input`
  width: 25px;
  height: 25px;
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  align-items: center;
  width: 35px;
  height: 35px;
  padding: 0;
  margin-right: 10px;
`;

const CheckBox = ({ checked, onChange, type = 'checkbox' }) => (
  <Div>
    <Container checked={checked} onChange={onChange} type={type} />
  </Div>
);

CheckBox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
};

export default CheckBox;
