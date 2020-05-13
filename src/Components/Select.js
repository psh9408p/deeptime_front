import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import selectChange from './SelectChange';
import PropTypes from 'prop-types';

const Container = styled.select`
  width: 100%;
  height: 100%;
`;

const Select = ({ optionList, valueList, option, onChange, id }) => {
  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    selectChange(id, valueList.indexOf(option));
  }, [option]);

  return (
    <Container id={id} onChange={onChange}>
      {optionList.map((address, key) => (
        <option key={key} value={key}>
          {address}
        </option>
      ))}
    </Container>
  );
};

Select.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Select;
