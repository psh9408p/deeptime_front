import { useEffect } from 'react';

export default (onBefore) => {
  if (typeof onBefore !== 'function') {
    return;
  }
  const handle = (event) => {
    const { clientY } = event;
    onBefore();
  };
  useEffect(() => {
    document.addEventListener('mouseenter', handle);
    return () => document.removeEventListener('mouseenter', handle);
  }, []);
};
