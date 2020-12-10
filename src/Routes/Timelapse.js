import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Input from '../Components/Input';
import useInput from '../Hooks/useInput';
import FatText from '../Components/FatText';
import getBlobDuration from 'get-blob-duration';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  margin-top: 30px;
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

export default () => {
  const Whammy = require('whammy/whammy');

  const videoWidth = useInput(500);
  const videoHeight = useInput(300);
  const videoFPS = useInput(100);
  const [maxValue, setMaxValue] = useState(0);
  const [progView, setProgView] = useState(false);

  const testFuc = () => {
    var drag = document.getElementById('drag');
    // var fbutton = document.getElementById('fbutton');
    var createvideo = document.getElementById('createvideo');
    var files = document.getElementById('filesinput');

    var ctx = 0;

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    //image to video via Whammy
    var video = new Whammy.Video(15);

    var filesarr = [];

    createvideo.addEventListener(
      'click',
      function () {
        setProgView(true);

        document.getElementById('status').style.color = 'black';
        document.getElementById('status').innerHTML = '타임랩스 만드는 중...';

        // document.getElementById('awesome').src = '';
        ctx = 0;

        canvas.width = document.getElementById('width').value;
        canvas.height = document.getElementById('height').value;
        video = new Whammy.Video(document.getElementById('framerate').value);

        //if we have images loaded
        if (filesarr.length > 0) {
          //loop through them and process
          filesarr.forEach(async (file) => {
            if (file.type.match(/image.*/)) {
              await process(file);
            } else {
              document.getElementById('status').style.color = 'rad';
              document.getElementById('status').innerHTML =
                '선택하신 파일은 이미지 파일이 아닙니다';
            }
          });
          // for (let i = 0; i < filesarr.length; i++) {
          //   var file = filesarr[i];
          //   if (file.type.match(/image.*/)) {
          //     process(file);
          //   } else {
          //     document.getElementById('status').style.color = 'rad';
          //     document.getElementById('status').innerHTML =
          //       '선택하신 파일은 이미지 파일이 아닙니다';
          //   }
          // }
        } else {
          document.getElementById('status').style.color = 'rad';
          document.getElementById('status').innerHTML =
            '이미지 파일을 선택해주세요';
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
        '옵션을 설정하고 [타임랩스 만들기]를 눌러주세요';
    };

    //process files VIA INPUT
    files.addEventListener(
      'change',
      function (e) {
        // 파일 입력시 progress 초기화 및 max값 변경
        if (document.getElementById('progress')) {
          document.getElementById('progress').value = 0;
        }
        setMaxValue(e.target.files.length);
        // 입력된 이미지 파일 순서대로 정렬
        filesarr = [].slice.call(e.target.files).sort(function (a, b) {
          return a.lastModified < b.lastModified
            ? -1
            : a.lastModified > b.lastModified
            ? 1
            : 0;
        });
        document.getElementById('status').style.color = '#0F4C82';
        document.getElementById('status').innerHTML =
          '옵션을 설정하고 [타임랩스 만들기]를 눌러주세요';
      },
      false,
    );

    /* main process function */
    function process(file) {
      var reader = new FileReader();
      reader.onload = function (event) {
        var dataUri = event.target.result;
        var img = new Image();

        //load image and drop into canvas
        img.onload = function () {
          //a custom fade in and out slideshow
          context.globalAlpha = 0.2;
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
          video.add(context);
          context.clearRect(0, 0, context.canvas.width, context.canvas.height);
          context.globalAlpha = 0.4;
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
          video.add(context);
          context.clearRect(0, 0, context.canvas.width, context.canvas.height);
          context.globalAlpha = 0.6;
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
          video.add(context);
          context.clearRect(0, 0, context.canvas.width, context.canvas.height);
          context.globalAlpha = 0.8;
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
          video.add(context);
          context.clearRect(0, 0, context.canvas.width, context.canvas.height);
          context.globalAlpha = 1;
          context.drawImage(img, 0, 0, canvas.width, canvas.height);

          //this should be a loop based on some user input
          video.add(context);
          video.add(context);
          video.add(context);
          video.add(context);
          video.add(context);
          video.add(context);
          video.add(context);

          context.clearRect(0, 0, context.canvas.width, context.canvas.height);
          context.globalAlpha = 0.8;
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
          video.add(context);
          context.clearRect(0, 0, context.canvas.width, context.canvas.height);
          context.globalAlpha = 0.6;
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
          video.add(context);
          context.clearRect(0, 0, context.canvas.width, context.canvas.height);
          context.globalAlpha = 0.4;
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
          video.add(context);

          ctx++;
          document.getElementById('progress').value = ctx;
          finalizeVideo();
        };
        img.src = dataUri;
      };

      reader.onerror = function (event) {
        console.error(
          '파일을 읽을 수 없습니다. Code ' + event.target.error.code,
        );
      };

      reader.readAsDataURL(file);
    }

    async function finalizeVideo() {
      //check if its ready
      if (ctx == filesarr.length) {
        setProgView(false);

        var output = video.compile();
        // output = new Blob([output], { type: 'video/mp4' });
        const duration = await getBlobDuration(output);
        var url = window.URL.createObjectURL(output);

        // document.getElementById('awesome').src = url; //toString converts it to a URL via Object URLs, falling back to DataURL
        document.getElementById('download').style.display = '';
        document.getElementById('download').href = url;
        document.getElementById('status').style.color = 'black';
        document.getElementById('status').innerHTML =
          `영상 길이: ${duration}초, 영상 크기: ` +
          Math.ceil(output.size / 1024 / 1024) +
          'MB';
      }
    }
  };

  useEffect(() => {
    testFuc();
  }, []);

  return (
    <Wrapper>
      <Title>캡쳐한 이미지를 타이랩스 영상으로 만들어보세요~!</Title>
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
        이미지 파일을 선택해주세요
      </SubTitle>
      <br />
      <br />
      <div id="drag">
        <OptionDiv>
          <InputName text={'이미지 파일:'} />
          <input type="file" id="filesinput" multiple />
        </OptionDiv>
        <div id="small">
          {/* <OptionDiv>
            <InputName text={'영상 너비(Width):'} />
            <InputWrap>
              <Input
                id={'width'}
                type={'number'}
                bgColor={'white'}
                {...videoWidth}
              />
            </InputWrap>
          </OptionDiv>
          <OptionDiv>
            <InputName text={'영상 높이(Height):'} />
            <InputWrap>
              <Input
                id={'height'}
                type={'number'}
                bgColor={'white'}
                {...videoHeight}
              />
            </InputWrap>
          </OptionDiv> */}
          <OptionDiv>
            <InputName text={'영상 FPS(클수록 빠르고 짧아짐):'} />
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
        <ButtonWrap>
          <CreateButton id="createvideo">타임랩스 만들기</CreateButton>
        </ButtonWrap>
      </div>
      <ButtonWrap>
        <a
          style={{ display: 'none', fontSize: '14px', fontWeight: 'bold' }}
          id="download"
          download="video.mp4"
        >
          타임랩스 다운로드
        </a>
      </ButtonWrap>
      {/* <video
        id="awesome"
        style={{ display: 'none' }}
        controls
        autoPlay
        loop
      ></video> */}
      <canvas id="canvas" style={{ display: 'none' }}></canvas>
    </Wrapper>
  );
};
