import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Input from '../Components/Input';
import useInput from '../Hooks/useInput';
import FatText from '../Components/FatText';
import getBlobDuration from 'get-blob-duration';
import moment from 'moment';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
`;

const SubTitle = styled.span`
  font-size: 16px;
  font-weight: bold;
  padding: 10px;
  border: ${(props) => props.theme.boxBorder};
  border-color: ${(props) => props.theme.darkGreyColor};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: white;
`;

const OptionDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;

const InputName = styled(FatText)`
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

const InputWrap = styled.div`
  width: 80px;
`;

const CreateButton = styled.button`
  width: 150px;
  height: 30px;
  border: 0;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.classicBlue};
  color: white;
  font-weight: 600;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
`;

const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const Whammy = require('whammy/whammy');
const surveySite = process.env.REACT_APP_SURVEY;
var filesarr = [];
var context = undefined;
var canvas = undefined;
//image to video via Whammy
var video = new Whammy.Video(15);

export default () => {
  const videoWidth = useInput(1000);
  const videoHeight = useInput(500);
  const videoFPS = useInput(10);
  const [maxValue, setMaxValue] = useState(0);
  const [progView, setProgView] = useState(false);
  const [ctx, setCtx] = useState(0);

  const testFuc = () => {
    var drag = document.getElementById('drag');
    // var fbutton = document.getElementById('fbutton');
    var createvideo = document.getElementById('createvideo');
    var files = document.getElementById('filesinput');

    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    //image to video via Whammy
    // var video = new Whammy.Video(15);

    createvideo.addEventListener(
      'click',
      async function () {
        setProgView(true);

        document.getElementById('status').style.color = 'black';
        document.getElementById('status').innerHTML = '???????????? ????????? ???...';

        // document.getElementById('awesome').src = '';
        // ctx = 0;

        canvas.width = document.getElementById('width').value;
        canvas.height = document.getElementById('height').value;
        video = new Whammy.Video(document.getElementById('framerate').value);

        //if we have images loaded
        if (filesarr.length > 0) {
          setCtx(1);
          // for (let i = 0; i < filesarr.length; i++) {
          //   var file = filesarr[i];
          //   if (file.type.match(/image.*/)) {
          //     process(file);
          //   } else {
          //     document.getElementById('status').style.color = 'rad';
          //     document.getElementById('status').innerHTML =
          //       '???????????? ????????? ????????? ????????? ????????????';
          //   }
          // }
        } else {
          document.getElementById('status').style.color = 'rad';
          document.getElementById('status').innerHTML =
            '????????? ????????? ??????????????????';
        }
      },
      false,
    );

    // fbutton.addEventListener(
    //   'click',
    //   function () {
    //     document.getElementById('filesinput').click();
    //   },
    //   false,
    // );

    drag.ondragover = function (e) {
      e.preventDefault();
    };
    drag.ondrop = function (e) {
      e.preventDefault();
      filesarr = e.dataTransfer.items;
      document.getElementById('status').style.color = '#0F4C82';
      document.getElementById('status').innerHTML =
        '????????? ???????????? [???????????? ?????????]??? ???????????????';
    };

    //process files VIA INPUT
    files.addEventListener(
      'change',
      function (e) {
        // ?????? ????????? progress ????????? ??? max??? ??????
        if (document.getElementById('progress')) {
          document.getElementById('progress').value = 0;
        }
        setMaxValue(e.target.files.length);
        // ????????? ????????? ?????? ???????????? ??????
        filesarr = [].slice.call(e.target.files).sort(function (a, b) {
          return a.lastModified < b.lastModified
            ? -1
            : a.lastModified > b.lastModified
            ? 1
            : 0;
        });
        document.getElementById('status').style.color = '#0F4C82';
        document.getElementById('status').innerHTML =
          '????????? ???????????? [???????????? ?????????]??? ???????????????';
      },
      false,
    );
  };

  const finalizeVideo = async () => {
    //check if its ready
    if (ctx == filesarr.length) {
      setProgView(false);
      const now_Date = new Date();
      const file_tail = moment(now_Date).format('YYMMDD');

      var output = video.compile();
      // output = new Blob([output], { type: 'video/mp4' });
      const duration = await getBlobDuration(output);
      var url = window.URL.createObjectURL(output);

      document.getElementById('awesome').src = url; //toString converts it to a URL via Object URLs, falling back to DataURL
      document.getElementById('download').style.display = '';
      // document.getElementById('submission').style.display = '';
      document.getElementById('download').href = url;
      document.getElementById('download').download =
        'deeptime_timelapse_' + file_tail + '.mp4';
      document.getElementById('status').style.color = 'black';
      document.getElementById('status').innerHTML =
        `?????? ??????: ${duration}???, ?????? ??????: ` +
        Math.ceil(output.size / 1024 / 1024) +
        'MB';
    }
  };

  const process = (file) => {
    var reader = new FileReader();
    reader.onload = function (event) {
      var dataUri = event.target.result;
      var img = new Image();

      //load image and drop into canvas
      img.onload = function () {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        video.add(context);

        document.getElementById('progress').value = ctx;
        finalizeVideo();
        setCtx(ctx + 1);
      };
      img.src = dataUri;
    };

    reader.onerror = function (event) {
      console.error('????????? ?????? ??? ????????????. Code ' + event.target.error.code);
    };
    reader.readAsDataURL(file);
  };

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      testFuc();
      isFirstRun.current = false;
      return;
    }
    if (ctx <= filesarr.length) {
      if (filesarr[ctx - 1].type.match(/image.*/)) {
        process(filesarr[ctx - 1]);
      } else {
        document.getElementById('status').style.color = 'rad';
        document.getElementById('status').innerHTML =
          '???????????? ????????? ????????? ????????? ????????????';
      }
    }
  }, [ctx]);

  return (
    <Wrapper>
      <Title>????????? ???????????? ???????????? ???????????? ??????????????????~!</Title>
      <br />
      {progView && (
        <progress
          id="progress"
          value="0"
          max={maxValue}
          min="0"
          style={{ width: '500px' }}
        />
      )}
      <br />
      <SubTitle id="status" style={{ color: 'red' }}>
        ????????? ????????? ??????????????????
      </SubTitle>
      <br />
      <br />
      <div id="drag">
        <OptionDiv>
          <InputName text={'????????? ??????:'} />
          <input type="file" id="filesinput" multiple />
        </OptionDiv>
        <div id="small">
          <OptionDiv style={{ display: 'none' }}>
            <InputName text={'?????? ??????(Width):'} />
            <InputWrap>
              <Input
                id={'width'}
                type={'number'}
                bgColor={'white'}
                {...videoWidth}
              />
            </InputWrap>
          </OptionDiv>
          <OptionDiv style={{ display: 'none' }}>
            <InputName text={'?????? ??????(Height):'} />
            <InputWrap>
              <Input
                id={'height'}
                type={'number'}
                bgColor={'white'}
                {...videoHeight}
              />
            </InputWrap>
          </OptionDiv>
          <OptionDiv>
            <InputName text={'?????? FPS(?????? ????????? ??????):'} />
            <InputWrap>
              <Input
                id={'framerate'}
                type={'number'}
                bgColor={'white'}
                {...videoFPS}
              />
            </InputWrap>
          </OptionDiv>
        </div>
        <video
          id="awesome"
          style={{ width: '500px', height: '250px' }}
          controls
          autoPlay
          loop
        ></video>
        <canvas id="canvas" style={{ display: 'none' }}></canvas>
        <ButtonWrap>
          <CreateButton id="createvideo">???????????? ?????????</CreateButton>
        </ButtonWrap>
      </div>
      <ButtonWrap>
        <a
          style={{ display: 'none', fontSize: '14px', fontWeight: 'bold' }}
          id="download"
          // download="video.mp4"
        >
          ???????????? ????????????
        </a>
      </ButtonWrap>
      {/* <ButtonWrap>
        <a
          style={{
            display: 'none',
            fontSize: '14px',
            fontWeight: 'bold',
            color: 'red',
            cursor: 'pointer',
          }}
          id="submission"
          onClick={() => {
            window.open(surveySite, '_blank');
          }}
        >
          ???????????? ??????
        </a>
      </ButtonWrap> */}
    </Wrapper>
  );
};
