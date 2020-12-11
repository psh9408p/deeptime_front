import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import { HeartFull, CommentFull } from '../Icons';
import useInput from '../../Hooks/useInput';
import Popup from 'reactjs-popup';
import SquarePostMain from './SquarePostMain';
import { EDIT_POST } from '../../Routes/Feed/FeedQueries';
import PopupButton from '../Buttons/PopupButton';
import FatText from '../FatText';
import Input_100 from '../Input_100';
import Textarea from '../../Components/Textarea';
import { toast } from 'react-toastify';
import { FEED_ONE_QUERY } from './SquarePostQueries';

const Overlay = styled.div`
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  border-radius: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s linear;
  svg {
    fill: white;
  }
`;

const Container = styled.div`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  border-radius: 5%;
  &:hover {
    ${Overlay} {
      opacity: 1;
    }
  }
`;

const Number = styled.div`
  color: white;
  display: flex;
  align-items: center;
  &:first-child {
    margin-right: 30px;
  }
`;

const NumberText = styled.span`
  margin-left: 10px;
  font-size: 16px;
`;

const PopupCustom = styled(Popup)`
  &-content {
    overflow-y: auto !important;
    width: 598px !important;
    max-height: ${(props) => props.height + 'px'} !important;
    border-radius: ${(props) => props.theme.borderRadius};
  }
`;

const ContentBody = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 20px;
`;

const ContentTitle = styled(FatText)`
  font-size: 18px;
  text-align: center;
  margin-bottom: 30px;
`;

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const CaptionText = styled(Textarea)`
  width: 376px;
  height: 100px;
  display: inline-block;
`;

export default ({ postId, likeCount, commentCount, file }) => {
  const height = window.screen.height * 0.75;
  const [viewTab, setViewTab] = useState(0);
  const location = useInput('');
  const caption = useInput('');

  const allClear = () => {
    location.setValue('');
    caption.setValue('');
  };

  const [editPostMutation] = useMutation(EDIT_POST, {
    refetchQueries: [{ query: FEED_ONE_QUERY, variables: { postId } }],
  });

  const onEdit = async (e) => {
    e.preventDefault();
    try {
      toast.info('게시물 수정 중...');
      const {
        data: { editPost },
      } = await editPostMutation({
        variables: {
          postId: postId,
          location: location.value,
          caption: caption.value,
        },
      });
      if (!editPost) {
        alert('게시물을 수정할 수 없습니다.');
      } else {
        allClear();
        setViewTab(0);
        toast.success('게시물이 수정 되었습니다.');
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  return (
    <Container bg={file.url}>
      <PopupCustom
        height={height}
        trigger={
          <Overlay>
            <Number>
              <HeartFull />
              <NumberText>{likeCount}</NumberText>
            </Number>
            <Number>
              <CommentFull />
              <NumberText>{commentCount}</NumberText>
            </Number>
          </Overlay>
        }
        lockScroll={true}
        modal
      >
        {(close) =>
          viewTab === 0 ? (
            <SquarePostMain
              postId={postId}
              setViewTab={setViewTab}
              location={location}
              caption={caption}
              close={close}
            />
          ) : (
            <ContentBody onSubmit={onEdit}>
              <ContentTitle text={'게시물 수정'} />
              <ContentDiv>
                <Input_100
                  placeholder={'(선택 항목) 위치'}
                  width={'376px'}
                  height={'35px'}
                  margin={'20px 0 10px 0'}
                  bgColor={'#f1f0ef'}
                  {...location}
                  required={false}
                />
                <CaptionText
                  placeholder={'(필수 항목) 내용'}
                  bgColor={'#f1f0ef'}
                  {...caption}
                />
              </ContentDiv>
              <ButtonDiv>
                <PopupButton text={'수정'} width={'138px'} />
                <PopupButton
                  type="button"
                  onClick={() => {
                    setViewTab(0);
                    allClear();
                  }}
                  text={'돌아가기'}
                  width={'138px'}
                />
              </ButtonDiv>
            </ContentBody>
          )
        }
      </PopupCustom>
    </Container>
  );
};
