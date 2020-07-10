import { useState, useEffect, useRef } from 'react';

export default (
  options_dynamic,
  values_dynamic,
  ref_optionList,
  ref_option,
  ref2_optionList,
  ref2_option,
) => {
  const selectedIndex = ref_optionList.indexOf(`${ref_option}`);
  let selectedIndex2 = ref2_optionList.indexOf(`${ref2_option}`);
  if (selectedIndex2 === -1) {
    selectedIndex2 = 0;
  }
  const options = options_dynamic[selectedIndex][selectedIndex2];
  const values = values_dynamic[selectedIndex][selectedIndex2];
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
    setOption(values[num]);
  };

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    setOption(values[0]);
    setOptionIndex(0);
  }, [selectedIndex, selectedIndex2]);

  const isFirstRun2 = useRef(true);
  useEffect(() => {
    if (isFirstRun2.current) {
      isFirstRun2.current = false;
      return;
    }
    setOptionIndex(valueList.indexOf(option));
  }, [option]);

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
