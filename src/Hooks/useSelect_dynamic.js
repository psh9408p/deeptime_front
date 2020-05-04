import { useState } from 'react';

export default (
  options_dynamic,
  values_dynamic,
  ref_optionList,
  ref_option,
) => {
  const selectedIndex = ref_optionList.indexOf(`${ref_option}`);
  const options = options_dynamic[selectedIndex];
  const values = values_dynamic[selectedIndex];

  const [option, setOption] = useState(values[0]);
  const [optionIndex, setOptionIndex] = useState(0);
  const optionList = options;
  const valueList = values;

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setOption(values[value]);
    setOptionIndex(value);
  };

  const optionIndexSet = (num) => {
    setOptionIndex(num);
  };

  return {
    option,
    onChange,
    setOption,
    optionList,
    valueList,
    optionIndex,
    optionIndexSet,
  };
};
