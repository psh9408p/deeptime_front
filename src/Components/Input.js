import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.input`
  border: 0;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.bgColor};
  width: 100%;
  height: ${(props) => props.height};
  font-size: 12px;
  padding: 0px 15px;
`;

const Input = ({
  id,
  placeholder,
  required = true, // 꼭 입력해야한다는 뜻인거 같음
  value,
  onChange,
  type = 'text',
  height = '35px',
  className,
  bgColor = '#FAFAFA',
  autoComplete = 'off',
}) => (
  <Container
    id={id}
    autoComplete={autoComplete}
    className={className}
    placeholder={placeholder}
    required={required}
    value={value}
    onChange={onChange}
    type={type}
    height={height}
    bgColor={bgColor}
  />
);

Input.propTypes = {
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
};

export default Input;
