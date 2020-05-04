import { useState } from 'react';

export default (defaultValue, validator, checker) => {
  const [value, setValue] = useState(defaultValue);
  const [errorChk, setErrorChk] = useState(false);

  const onChange = (e) => {
    const {
      target: { value },
    } = e;

    let willUpdate = true;
    if (typeof validator === 'function') {
      willUpdate = validator(value);
    }
    if (willUpdate) {
      setValue(value);
    }

    let willCheck = true;
    if (typeof checker === 'function') {
      willCheck = checker(value);
    }
    if (willCheck) {
      setErrorChk(true);
    } else setErrorChk(false);
  };

  return { value, onChange, setValue, errorChk };
};
