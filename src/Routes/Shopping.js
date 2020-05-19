import React, { useState } from 'react';
import { SwatchesPicker } from 'react-color';

export default () => {
  const [bgColor, setBgColor] = useState('#ffffff');

  const handleChangeComplete = (color, event) => {
    console.log(color, event);
    setBgColor(color.hex);
    console.log(bgColor);
  };
  return (
    <SwatchesPicker color={bgColor} onChangeComplete={handleChangeComplete} />
  );
};
