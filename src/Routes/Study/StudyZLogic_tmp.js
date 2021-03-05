//영상처리
let time = new Date().getTime();
let interval = 0;
let decision = [false, false, false, false, false, false];
let detection_area = Array.from({ length: 18 }, (_, i) => i + 1);
let finalDecision = 1; //1.공부 2. 부재중 3. 잠
let timeCount = 0;
let decisionCount = 0;

function updateTime() {
  const newTime = new Date().getTime();
  interval = interval + (newTime - time);
  // console.log(interval / 1000);

  time = newTime;
}

const LoadModel = async () => {
  console.log('Load model');

  // const loadedModelPose = await posenet.load();
  const loadedModelDetect = await cocoSsd.load({ base: 'mobilenet_v2' });
  // setModelPose(loadedModelPose);
  setModelDetect(loadedModelDetect);
};

// for # Camera
// 1. SetVideoElement
// 1. LoadCamera
// 1. ConnectElAndCamera
const LoadCamera2 = async () => {
  console.log('Load camera');
  const getUserMedia =
    navigator.mediaDevices.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;

  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    console.log('enumerateDevices() not supported.');
    return;
  }

  const deviceIds = await navigator.mediaDevices.enumerateDevices();
  const videoDeviceIds = [];

  deviceIds.forEach(function (deviceId) {
    if (deviceId.kind === 'videoinput') {
      videoDeviceIds.push(deviceId);
    }
  });

  for (let i = 0; i < 1; i++) {
    if (getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: { deviceId: videoDeviceIds[i].deviceId } })
        .then(function (stream) {
          video1.current.srcObject = stream;
        })
        .catch(function (error) {
          console.log(error);
          console.log('Something went wrong!');
        });
    }
  }
};

const detectFromVideoFrame = async (video) => {
  try {
    const posePredictions = 0;
    // const posePredictions = await modelPose.estimateMultiplePoses(video, {
    //   flipHorizontal: false,
    //   maxDetections: 1,
    //   minPoseConfidence: 0.15,
    //   minPartConfidence: 0.1,
    //   scoreThreshold: 0.5,
    //   nmsRadius: 30,
    // });

    const objectPredictions = await modelDetect.detect(video);
    const personDetections = objectPredictions.filter(
      (p) => p.class === 'person',
    );

    // showDetections(posePredictions, personDetections);
    const Finaldecision = await ConcludeFinaldecision(
      posePredictions,
      personDetections,
    );
    return Finaldecision;
  } catch (error) {
    console.log("Couldn't start the webcam");
    console.error(error);
  }
};

// const showDetections = (posePredictions, objectPredictions) => {
//   console.log('Show detect');

//   // const ctx = canvas.current.getContext('2d');
//   const font = '20px Arial';
//   ctx.font = font;
//   if (poseButton) {
//     posePredictions.forEach((poses) => {
//       const area_data = 3;
//       ctx.strokeStyle = '0F4C81';
//       ctx.lineWidth = 4;

//       const area = new Array(area_data);
//       for (var i = 0; i < area.length; i++) {
//         area[i] = false;
//       }
//       //   const img_width = video.webcamVideoElement.width
//       const img_width = canvas1.current.width;
//       ctx.strokeStyle = '#0F4C81';
//       ctx.lineWidth = 4;
//       for (var j = 0; j < poses.keypoints.length; j++) {
//         ctx.strokeRect(
//           poses.keypoints[j].position.x,
//           poses.keypoints[j].position.y,
//           1,
//           1,
//         );
//         area[
//           Math.floor(
//             (poses.keypoints[0].position.x / img_width) * area.length,
//           )
//         ] = true;
//       }
//     });
//   }
//   if (detectButton) {
//     objectPredictions.forEach((prediction) => {
//       ctx.strokeStyle = '#0F4C81';
//       ctx.lineWidth = 4;
//       ctx.strokeRect(...prediction.bbox);

//       const x = prediction.bbox[0];
//       const y = prediction.bbox[1];
//       const height = prediction.bbox[3];
//       const label = prediction.class;
//       // console.log(prediction.class)
//       ctx.fillStyle = '#0F4C81';
//       const textWidth = ctx.measureText(label).width;
//       const textHeight = parseInt(font, 10);
//       ctx.fillRect(x, y, textWidth + 10, textHeight + 5);
//       // ctx.fillRect(x, y + height - textHeight - 5, textWidth + 15, textHeight + 20)

//       ctx.fillStyle = '#FFFFFF';
//       ctx.fillText(label, x, y + textHeight);
//       // ctx.fillText(prediction.score.toFixed(2), x + 5, y + height - textHeight)
//     });
//   }
// };

const createPredictionArray = (prediction) => {
  const bbox = prediction.bbox;
  const len_x = bbox[2];
  const len_y = bbox[3];
  return len_x; //x값을 이용하여 가장 크게 잡힌 객체 감지
};

const ConcludeFinaldecision = (posePredictions, objectPredictions) => {
  // 1. 모든 사람 인식 결과를 array 데이터로 변환
  // 2. 가장큰 사람 인식 결과 판단
  // 3. objectPrediction에 판단 결과 저장 1. 공부중 2. 부재중 3. 잠
  let result = [];
  let maxBboxArea = 100000;
  if (objectPredictions.length > 0) {
    const temp = objectPredictions.map(createPredictionArray);
    const maxObject = objectPredictions[temp.indexOf(Math.max(...temp))];
    maxBboxArea = maxObject.bbox[2] * maxObject.bbox[3];
    // console.log(maxBboxArea);
    detection_area = detection_area.slice(1);
    detection_area = [...detection_area, maxBboxArea];
  }
  if (
    objectPredictions.length > 0 &&
    // posePredictions.length > 0 &&
    maxBboxArea > 30000
  ) {
    result = true;
  } else {
    result = false;
  }

  decision = decision.slice(1);
  decision = [...decision, result];

  const temp = decision.reduce((obj, value, index, array) => {
    if (obj.hasOwnProperty(value)) {
      obj[value] += 1;
    } else {
      obj[value] = 1;
    }
    return obj;
  }, {});

  console.log(temp, 'aa');
  // 아바타 보더 깜빡임 멈추게 하기위한 카운트
  decisionCount = decisionCount + 1;
  if (decisionCount > 1) {
    if (temp.true === 1) {
      setAniBool(true);
    } else if (temp.true >= 2) {
      finalDecision = 1; //공부
      setStudyBool(true);
      setAniBool(false);
    } else {
      finalDecision = 2; //부재중
      setStudyBool(false);
      setAniBool(false);
    }
  }
};
