import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const PopupClose = styled.a`
  cursor: pointer;
  position: absolute;
  color: ${(props) => props.theme.classicBlue};
  display: block;
  padding: 0 5px 5px 5px;
  line-height: 20px;
  right: ${(props) => (props.custom ? '-10px' : '-15px')}; //
  top: -10px;
  font-size: 24px;
  font-weight: bold;
  background: #ffffff;
  border-radius: 14px;
  border: 1px solid #cfcece;
`;

const CloseButton = ({ onClick, custom = false }) => (
  <PopupClose onClick={onClick} custom={custom}>
    &times;
  </PopupClose>
);

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CloseButton;
