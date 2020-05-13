import { useState, useEffect, useRef } from 'react';

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
  let optionList = options;
  let valueList = values;

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

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    setOption(values[0]);
  }, [selectedIndex]);

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
