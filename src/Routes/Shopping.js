import React from 'react';
import styled from 'styled-components';
import TimelapseTool from 'react-timelapse-tool';

const TmpDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  padding: 30px 0 30px 0;
`;

export default () => {
  const config = {
    fpsSlider: {
      min: 0,
      max: 100,
    },
    carousel: {
      settings: {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 1,
      },
      tiles: [
        {
          id: '1',
          src: '/public/test/구루미.jpg',
          name: 'image01.0',
        },
        {
          id: '2',
          src: '/스헬.jpg',
          name: 'image01.1',
        },
      ],
    },
  };

  return (
    <TimelapseTool
      config={config}
      onCreate={() => console.log('Create Video')}
      onSave={() => console.log('Save Video')}
    />
    // <TmpDiv>구매하기 준비 중입니다.</TmpDiv>);
  );
};
