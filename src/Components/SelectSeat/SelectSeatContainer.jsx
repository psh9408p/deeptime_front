import React, { useState, useEffect, useRef, createRef } from 'react';
import RegionSelect from '../RegionSelect/RegionSelect';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { UPDATE_EXISTTOGGLE, EDIT_SEAT, LOAD_SEAT } from './SelectSeatQueries';

require('./style.css');

const SelectSeatContainer = () => {
  const [regions, setRegions] = useState([]);
  const [tempRegions, SetTempRegions] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);
  const [deleteRegion, setDeleteRegion] = useState([]);
  const [videoIds, setVideoIds] = useState([]);
  const video1 = useRef();
  const video2 = useRef();
  const videos = [video1, video2];
  const canvas1 = createRef();
  const canvas2 = createRef();
  const canvases = [canvas1, canvas2];
  const [existToggleMutation] = useMutation(UPDATE_EXISTTOGGLE);
  const loadSeatQuery = useQuery(LOAD_SEAT);

  // for (var i = 0; i < area.length; i++) {
  //   if ((count / mutation_fps) % 1000 == 0) {
  // existToggleMutation({ variables: { userID: id_array[i], existToggle: area[i] } })
  //   }
  // }

  const LoadCamera = async () => {
    console.log('Load camera');
    const getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      console.log('enumerateDevices() not supported.');
      return null;
    }

    const deviceIds = await navigator.mediaDevices.enumerateDevices();
    const videoDeviceIds = [];

    deviceIds.forEach(function (deviceId) {
      if (deviceId.kind === 'videoinput') {
        videoDeviceIds.push(deviceId);
      }
    });

    for (let i = 0; i < videoDeviceIds.length; i++) {
      if (getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: { deviceId: videoDeviceIds[i].deviceId } })
          .then(function (stream) {
            videos[i].current.srcObject = stream;
          })
          .catch(function (error) {
            console.log('Something went wrong!');
          });
      }
    }
    setVideoIds(videoDeviceIds);

    return null;
  };

  const onChange = (regions) => {
    setRegions(regions);
  };

  const changeRegionDataCol = (index, event) => {
    const region = regions[index];
    let color;
    switch (event.target.value) {
      default:
        color = 'rgba(46, 60, 91, 0.7)';
    }
    console.log(regions);
    console.log(region);

    region.data.regionStyle = {
      background: color,
    };
    //onChange 너무 중요한 코딩 기술
    onChange([
      ...regions.slice(0, index),
      Object.assign(region, {
        data: Object.assign(region.data, { seatNumCol: event.target.value }),
      }),
      ...regions.slice(index + 1),
    ]);
  };

  const changeRegionDataRow = (index, event) => {
    const region = regions[index];
    let color;
    switch (event.target.value) {
      default:
        color = 'rgba(46, 60, 91, 0.7)';
    }
    console.log(regions);
    console.log(region);

    region.data.regionStyle = {
      background: color,
    };
    //onChange 너무 중요한 코딩 기술
    onChange([
      ...regions.slice(0, index),
      Object.assign(region, {
        data: Object.assign(region.data, { seatNumRow: event.target.value }),
      }),
      ...regions.slice(index + 1),
    ]);
  };

  const okeyButton = () => {
    //mutation
  };

  const back = () => {
    //input : 학원/반/자리 정보
    //query
    console.log(tempRegions);
    console.log(regions);
    regions.pop();
    // setRegions(regions)
    // setRegions(tempRegions)
  };

  const loadSeat = () => {
    //input : 학원/반/자리 정보
    //query

    //학원,반,카메라 정보 읽고 해당하는 자리 정도 query 이후 setRegions 한다.
    //1. camera 정보를 통해 학원, class에 해당하는 자리 정보를 모두 가져온다.

    const { data } = useQuery(LOAD_SEAT, {
      variables: {
        deviceID:
          '66ff641b25b371460102ee4e487a176421cd9ba18e35f14639282c42f1a9c736',
      },
    });
    console.log(data);

    //2. 자리 정보를 regions에 넣어 준다.

    console.log(tempRegions);
    console.log(regions);

    // setRegions(tempRegions)
  };
  const saveSeat = () => {
    //input : 학원/반/자리 정보
    //query
    console.log(tempRegions);
    console.log(regions);
    SetTempRegions(regions);
  };

  const regionRenderer = (regionProps) => {
    if (!regionProps.isChanging) {
      return (
        <div
          style={{ position: 'absolute', width: 0, bottom: 0, right: '-0.5em' }}
        >
          <div style={{ color: 'red' }}>#{regionProps.index}</div>

          <input
            type="number"
            placeholder={'행'}
            onChange={(event) => changeRegionDataCol(regionProps.index, event)}
            value={regionProps.data.col}
          ></input>
          <input
            type="number"
            placeholder={'열'}
            onChange={(event) => changeRegionDataRow(regionProps.index, event)}
            value={regionProps.data.row}
          ></input>
        </div>
      );
    }
  };

  const regionStyle = {
    background: 'rgba(256,0,0, 0.3)',
  };

  const SelectClass = (video) => {
    canvases[0].current
      .getContext('2d')
      .drawImage(
        video.current,
        0,
        0,
        video.current.videoWidth,
        video.current.videoHeight,
      );

    //학원,반,카메라 정보 읽고 해당하는 자리 정도 query 이후 setRegions 한다.
    console.log(videoIds);

    //1. camera 정보를 통해 학원, class에 해당하는 자리 정보를 모두 가져온다
    //2. 자리 정보를 regions에 넣어 준다.
    loadSeat();
    // const { data } = useQuery(LOAD_SEAT, {
    //   variables: { deviceID: "66ff641b25b371460102ee4e487a176421cd9ba18e35f14639282c42f1a9c736" }
    // })
    // console.log(data)
  };

  useEffect(() => {
    LoadCamera();
  }, []);

  // useEffect(() => {
  //   regions.splice(deleteRegion)
  // }, [deleteRegion])

  return (
    <div>
      {/* <button onClick={LoadCamera}>카메라 로드</button>
      <ForGOD3_2 videoIds={videoIds}></ForGOD3_2> */}
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <video
            playsInline
            width="320"
            height="240"
            autoPlay
            muted
            ref={videos[0]}
          />
        </div>
        <div style={{ flex: 1 }}>
          <video
            playsInline
            width="320"
            height="240"
            autoPlay
            muted
            ref={videos[1]}
          />
        </div>
      </div>

      <div style={{ display: 'flex' }}>
        <div style={{ flexGrow: 1, flexShrink: 1, width: '100%' }}>
          <button onClick={() => SelectClass(videos[0])}>Class 선택</button>
        </div>
        <div style={{ flexGrow: 1, flexShrink: 1, width: '100%' }}>
          <button onClick={() => SelectClass(videos[1])}>Class 선택</button>
        </div>
      </div>

      <div style={{ display: 'flex' }}>
        <div style={{ flexGrow: 1, flexShrink: 1, width: '100%' }}>
          <RegionSelect
            maxRegions={100}
            regions={regions}
            regionStyle={regionStyle}
            constraint
            onChange={onChange}
            regionRenderer={regionRenderer}
            style={{ border: '1px solid black' }}
            // onKeyPress={handleKeyPress}
          >
            <canvas ref={canvases[0]} width="640" height="480">
              Class
            </canvas>
          </RegionSelect>
          <div>
            <button onClick={saveSeat}>자리 정보 저장하기</button>
            <button onClick={back}>이전으로</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectSeatContainer;
