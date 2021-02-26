/* eslint-disable jsx-a11y/alt-text */
import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
// import * as posenet from "@tensorflow-models/posenet"

let videoDeviceIds = [];

let normArray = [
  5000,
  5000,
  5000,
  5000,
  5000,
  5000,
  5000,
  5000,
  5000,
  5000,
  5000,
  5000,
  5000,
  5000,
  5000,
  5000,
  5000,
  5000,
  5000,
  5000,
  5000,
  5000,
  5000,
  5000,
]; // val : pixel's diff
let personDecisionArray = [
  30000,
  30000,
  30000,
  30000,
  30000,
  30000,
  30000,
  30000,
  30000,
  30000,
  30000,
  30000,
  30000,
  30000,
  30000,
  30000,
  30000,
  30000,
  30000,
  30000,
  30000,
  30000,
  30000,
  30000,
]; // 1.personBbox area
let cellphoneDecisionArray = [0, 0, 0, 0, 0, 0]; // 1.true 2.false

let finalDecisionArray = []; // 1.study 2.none 3.cell phone 4.sleep

let detect_interval = 1000 * 1;
let mutation_interval = 6;

let decision_size = 6;
let normDecision_size = decision_size * 4;
let personDecision_size = decision_size * 2;
let cellphoneDecision_size = decision_size;
let window_size = decision_size * 5;

const personSizeThreshold = 29999;
const normArrayThreshold_low = 2000;
const normArrayThreshold_midle = 3000;
const normArrayThreshold_high = 10000;

let displayDetectResult = true;
let camera_width = 640;
let camera_height = 480;
let detect_count = 0;
let doDrawResult = true;

export default () => {
  const canvasRef = useRef();
  // const subCanvasRef = useRef()
  const webcamRef = useRef();

  async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const LoadCamera = async () => {
    console.log('Load camera');
    const getUserMedia = await navigator.mediaDevices.getUserMedia;

    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      console.log('enumerateDevices() not supported.');
      return;
    }

    const deviceIds = await navigator.mediaDevices.enumerateDevices();
    deviceIds.forEach(function (deviceId) {
      if (deviceId.kind === 'videoinput') {
        videoDeviceIds.push(deviceId);
      }
    });

    if (getUserMedia) {
      await navigator.mediaDevices
        .getUserMedia({ video: { deviceId: videoDeviceIds[0].deviceId } })
        .then(function (stream) {
          webcamRef.current.srcObject = stream;
        })
        .catch(function (error) {
          console.log(error);
          console.log('Something went wrong!');
        });
    }
  };

  const Predict = async () => {
    // const posenet_model = await posenet.load({
    //   architecture: "ResNet50",
    //   outputStride: 32,
    //   inputResolution: { width: 257, height: 200 },
    //   quantBytes: 2,
    // })
    const ssd_model = await cocoSsd.load({ base: 'mobilenet_v2' });

    const videoWidth = webcamRef.current.width;
    const videoHeight = webcamRef.current.height;
    let beforeImg = tf.zeros([camera_height, camera_width, 3]);

    while (true) {
      await sleep(detect_interval);

      if (webcamRef.current.readyState >= 3) {
        const ssd_result = await ssd_model.detect(webcamRef.current);
        // const pose_result = await posenet_model.estimateMultiplePoses(webcamRef.current)
        // console.log(pose_result)
        const personDetections = ssd_result.filter((p) => p.class === 'person');
        // console.log(personDetections)

        const cellphoneDetections = ssd_result.filter(
          (p) => p.class === 'cell phone',
        );
        // console.log(cellphoneDetections)

        let img = tf.browser.fromPixels(webcamRef.current);

        let sub = tf.sub(img, beforeImg);
        let temp = sub.norm(2).sum();
        let norm = await temp.array(1);

        if (normArray.length >= window_size) {
          normArray.pop();
        }

        normArray = [norm, ...normArray];
        sub.dispose();
        temp.dispose();
        beforeImg.dispose();
        // console.log(normArray)
        beforeImg = img;

        if (doDrawResult === true) {
          drawResult(
            // pose_result,
            personDetections,
            cellphoneDetections,
            webcamRef.current,
            videoWidth,
            videoHeight,
            canvasRef,
          );
        }

        personDecision(personDetections);
        cellphoneDecision(cellphoneDetections);

        if (detect_count % mutation_interval === 0) {
          ConcludeFinalDecision();
          detect_count = 0;
        }

        // if (imgTensorArray.length === window_size + 1) {
        //   console.log("here")
        //   // console.log(imgTensorArray.length)
        //   await imgTensorArray[window_size].dispose()
        //   imgTensorArray[window_size].print()
        // }
        detect_count = detect_count + 1;
        console.log(detect_count);

        await tf.nextFrame();
      }
    }
  };

  const drawResult = (
    // pose_result,
    personDetections,
    cellphoneDetections,
    video,
    videoWidth,
    videoHeight,
    canvas,
  ) => {
    const ctx = canvas.current.getContext('2d');
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    if (personDetections !== null && displayDetectResult === true) {
      // console.log(personDetections)
      drawBbox(ctx, personDetections, 'blue');
    }
    if (cellphoneDetections !== null && displayDetectResult === true) {
      // console.log(cellphoneDetections)
      drawBbox(ctx, cellphoneDetections, 'red');
    }
    // if (pose_result !== null) {
    //   console.log(pose_result)
    //   drawPoses(ctx, pose_result, "aqua")
    // }
  };

  const drawBbox = (ctx, objectPredictions, color) => {
    objectPredictions.forEach((prediction) => {
      const font = '20px Arial';
      ctx.font = font;
      ctx.strokeStyle = color;
      ctx.lineWidth = 4;
      ctx.strokeRect(...prediction.bbox);

      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      const height = prediction.bbox[3];
      const label = prediction.class;
      // console.log(prediction.class)
      ctx.fillStyle = color;
      const textWidth = ctx.measureText(label).width;
      const textHeight = parseInt(font, 10);
      ctx.fillRect(x, y, textWidth + 10, textHeight + 5);
      // ctx.fillRect(x, y + height - textHeight - 5, textWidth + 15, textHeight + 20)

      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(label, x, y + textHeight);
      // ctx.fillText(prediction.score.toFixed(2), x + 5, y + height - textHeight)
    });
  };

  // const drawPoses = (ctx, posePredictions, color) => {
  //   posePredictions.forEach((poses) => {
  //     ctx.strokeStyle = color
  //     ctx.lineWidth = 4

  //     console.log(poses)
  //     for (var j = 0; j < poses.keypoints.length; j++) {
  //       ctx.strokeRect(poses.keypoints[j].position.x, poses.keypoints[j].position.y, 1, 1)
  //     }
  //   })
  // }

  // let normArray = [] // val : pixel's diff
  // let personDecisionArray=[] // 1.true 2.false
  // let cellphoneDecisionArray=[] // 1.true 2.false

  // let finalDecisionArray=[] // 1.study 2.none 3.cell phone 4.sleep
  const personDecision = (personDetections) => {
    if (personDecisionArray.length >= window_size) {
      personDecisionArray.pop();
    }
    let bbox_area = 0;
    let personBboxArray = [];
    if (personDetections.length > 0) {
      for (var i = 0; i < personDetections.length; i++) {
        bbox_area = personDetections[i].bbox[2] * personDetections[i].bbox[3];
        personBboxArray = [bbox_area, ...personBboxArray];
      }
      personDecisionArray = [
        Math.max(...personBboxArray),
        ...personDecisionArray,
      ];
    } else {
      personDecisionArray = [0, ...personDecisionArray];
    }
    // console.log(personDecisionArray)
  };

  const cellphoneDecision = (cellphoneDetections) => {
    if (cellphoneDecisionArray.length >= window_size) {
      cellphoneDecisionArray.pop();
    }

    let cellphoneDecision = 0;

    if (cellphoneDetections.length > 0) {
      cellphoneDecision = cellphoneDetections.length;
    }
    cellphoneDecisionArray = [cellphoneDecision, ...cellphoneDecisionArray];
    // console.log(cellphoneDecisionArray)
  };

  const ConcludeFinalDecision = () => {
    // normArray = [] // val : pixel's diff
    // personDecisionArray = [] // 1.true 2.false
    // cellphoneDecisionArray = [] // 1.true 2.false

    let finalDecision = 0; // 0.study 1.none 2.sleep
    let finalDecisionPerson = true;
    let finalDecisionNorm = true;
    let finalDecisionCellphone = true;

    //person data preprocessing
    let personDecisionArray_decision = personDecisionArray.slice(
      0,
      personDecision_size,
    ); //detect using the data for 2 min

    console.log(personDecisionArray_decision, 'aaa');
    personDecisionArray_decision = personDecisionArray_decision.filter(
      (Decision) => Decision > personSizeThreshold,
    );

    if (personDecisionArray_decision.length > 1) {
      finalDecisionPerson = true;
    } else {
      finalDecisionPerson = false;
    }

    //norm data preprocessing
    let normArray_decision = normArray.slice(0, normDecision_size); //detect using the data for 2 min

    let normArray_decision_sum = normArray_decision.reduce((a, b) => a + b);
    let normArray_decision_Average =
      normArray_decision_sum / normArray_decision.length;
    // console.log(normArray_decision_Average)
    let normArray_decision_high = normArray_decision.filter(
      (Decision) => Decision > normArrayThreshold_high,
    );

    if (
      normArray_decision_Average > normArrayThreshold_midle ||
      normArray_decision_high.length > 4
    ) {
      finalDecisionNorm = true;
    } else {
      finalDecisionNorm = false;
    }

    //cell phone data preprocessing
    let cellphoneDecisionArray_decision = cellphoneDecisionArray.slice(
      0,
      cellphoneDecision_size,
    ); //detect using the data for 1 min
    let cellphoneDecisionArray_decisionSum = cellphoneDecisionArray_decision.reduce(
      (a, b) => a + b,
    );

    if (cellphoneDecisionArray_decisionSum > 0) {
      finalDecisionCellphone = true;
    } else {
      finalDecisionCellphone = false;
    }

    //final decision
    if (finalDecisionPerson === true) {
      if (finalDecisionNorm === true) {
        if (finalDecisionCellphone === true) {
          console.log('cell phone');
        } else if (finalDecisionCellphone === false) {
          console.log('study');
        }
      } else if (finalDecisionNorm === false) {
        console.log('sleep or none');
      }
    } else if (finalDecisionPerson === false) {
      if (finalDecisionNorm === true) {
        if (normArray_decision_high.length >= decision_size) {
          if (finalDecisionCellphone === true) {
            console.log('cell phone');
          } else {
            console.log('study');
          }
        } else if (normArray_decision_high.length < decision_size) {
          console.log('none');
        }
      } else if (finalDecisionNorm === false) {
        console.log('none');
      }
    }
  };

  useEffect(() => {
    LoadCamera();
    Predict();
  });

  return (
    <>
      <div>
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            textAlign: 'center',
            zindex: 9,
            width: camera_width,
            height: camera_height,
          }}
        />
        <video
          ref={webcamRef}
          playsInline
          width={camera_width}
          height={camera_height}
          autoPlay
          muted
        />
      </div>

      {/* <div>
        <canvas ref={subCanvasRef}></canvas>
      </div> */}
    </>
  );
};
