import React from 'react';
import styled from 'styled-components';
import TextareaAutosize from 'react-autosize-textarea';

const TextareaWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 30px;
`;

const Textarea = styled(TextareaAutosize)`
  position: relative;
  width: 50%;
  height: 500px;
  resize: none;
  font-size: 14px;
  line-height: 17px;
  height: 160px;
  max-height: 160px;
  padding: 5px;
  border-radius: 5px;
  background-color: #f2f3f5;
  &:focus {
    outline: none;
  }
`;

const TextSubmitWrap = styled.span`
  display: flex;
  justify-content: flex-end;
  margin-top: 100px;
  margin-bottom: 30px;
`;

const TextSubmit = styled.button`
  outline: 0;
  color: white;
  cursor: pointer;
  border: 0;
  position: absolute;
  width: 50px;
  height: 30px;
  background-color: #1485fe;
  border-radius: 10px;
  padding: 8px;
  margin-right: 15px;
`;

const ChatWrap = styled.div`
  width: 100%;
`;
const ChatBox = styled.div`
  margin: 0 auto;
  width: 50%;
  padding-inline-start: 8px;
  padding-inline-end: 8px;
`;

const ChatTitle = styled.div`
  width: 100%;
  text-align: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 15px;
  display: block;
  width: 320px;
  font-size: 22px;
  padding-inline-start: 8px;
  padding-inline-end: 8px;
  margin-bottom: 25px;
`;

const ChatDate = styled.span`
  text-align: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 15px;
  display: block;
  width: 320px;
  font-size: 22px;
  padding: 8px;
  margin-bottom: 25px;
  border-radius: 5px;
  background-color: black;
  color: white;
`;

const Refresh = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  margin-top: 15px;
  display: block;
  font-size: 22px;
  padding: 8px;
  margin-bottom: 25px;
  border-radius: 5px;
  background-color: black;
  align-items: center;
  justify-content: center;
`;

const MessageBox = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 25px;
`;
const MessageBox_Own = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 25px;
  justify-content: flex-end;

  .Own-Bubble {
    border-top-right-radius: 0px;
    border-top-left-radius: 10px;
    max-width: 320px;
  }
`;

const MsBoxImg = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #f2f3f5;
  margin-right: 10px;
  margin-left: 10px;
  align-items: center;
  justify-content: center;
`;
const MsBoxChat = styled.div``;

const MsBoxName = styled.span`
  opacity: 0.8;
  margin-bottom: 5px;
  display: block;
`;

const MsBoxName_Own = styled.span`
  opacity: 0.8;
  margin-bottom: 5px;
  display: block;
  text-align: end;
`;

const MsBoxCtn = styled.div`
  display: flex;
  align-items: flex-end;
`;

const MsBoxCtn_Own = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: row-reverse;
`;

const MsBubble = styled.span`
  background-color: #f2f3f5;
  color: black;
  padding: 8px 13px;
  border-radius: 10px;
  border-top-left-radius: 0px;
  margin-right: 5px;
  font-size: 16px;
  max-width: 320px;
`;

const MsBubble_Own = styled.span`
  background-color: #1485fe;
  color: white;
  padding: 8px 13px;
  border-radius: 10px;
  border-top-left-radius: 0px;
  margin-left: 5px;
  font-size: 16px;
  max-width: 320px;
`;

const MsTime = styled.span`
  opacity: 0.8;
  font-size: 13px;
`;
const Chat = ({ newComment, onKeyPress }) => {
  return (
    <ChatWrap>
      <ChatBox>
        <div style={{ display: 'flex' }}>
          <ChatTitle>마로채팅방</ChatTitle>
          <Refresh></Refresh>
        </div>
        <div>
          <MessageBox>
            <MsBoxImg />
            <MsBoxChat>
              <MsBoxName>마로 와 폴리매스</MsBoxName>
              <MsBoxCtn>
                <MsBubble>안녕하세요 대학생 채팅입니다.</MsBubble>
                <MsTime>21:28</MsTime>
              </MsBoxCtn>
            </MsBoxChat>
          </MessageBox>
        </div>

        <div>
          <MessageBox_Own>
            <MsBoxChat>
              {/* <MsBoxName_Own>마로 와 폴리매스</MsBoxName_Own> */}
              <MsBoxCtn_Own>
                <MsBubble_Own className="Own-Bubble">
                  어서오세요 어서오세요 어서오세요 어서오세요 어서오세요
                  어서오세요 어서오세요
                </MsBubble_Own>
                <MsTime>21:28</MsTime>
              </MsBoxCtn_Own>
            </MsBoxChat>
          </MessageBox_Own>
        </div>

        <div>
          <MessageBox>
            <MsBoxImg></MsBoxImg>
            <MsBoxChat>
              <MsBoxName>마로 와 폴리매스</MsBoxName>
              <MsBoxCtn>
                <MsBubble>To The Moon</MsBubble>
                <MsTime>21:28</MsTime>
              </MsBoxCtn>
            </MsBoxChat>
          </MessageBox>
        </div>

        <div>
          <MessageBox_Own>
            <MsBoxChat>
              {/* <MsBoxName_Own>마로 와 폴리매스</MsBoxName_Own> */}
              <MsBoxCtn_Own>
                <MsBubble_Own className="Own-Bubble">
                  Welcome MoonWelcome
                </MsBubble_Own>
                <MsTime>21:28</MsTime>
              </MsBoxCtn_Own>
            </MsBoxChat>
          </MessageBox_Own>
        </div>
      </ChatBox>
      <TextareaWrap>
        <Textarea
          onKeyPress={onKeyPress}
          placeholder={'메세지를 입력해주세요...'}
        ></Textarea>
        <TextSubmitWrap>
          <TextSubmit>전송</TextSubmit>
        </TextSubmitWrap>
      </TextareaWrap>
    </ChatWrap>
  );
};

export default Chat;
