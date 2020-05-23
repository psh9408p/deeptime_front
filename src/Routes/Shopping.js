import React from 'react';
import useMouseLeave from '../Hooks/useMouseLeave';

export default () => {
  const donleaveme = () => console.log('떠나지마');
  useMouseLeave(donleaveme);
  return '구매하기 준비중...';
};
