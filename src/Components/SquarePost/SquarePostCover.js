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
import useSelect from '../../Hooks/useSelect';
import { studyOption_group } from '../LongArray';
import Select from '../Select';

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

const InputWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 376px;
  height: 35px;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: #f1f0ef;
  padding-left: 15px;
  font-size: 12px;
  margin-bottom: 10px;
  span {
    margin-right: 5px;
  }
`;

export default ({ postId, likeCount, commentCount, file }) => {
  const height = window.screen.height * 0.75;
  const [viewTab, setViewTab] = useState(0);
  const location = useInput('');
  const caption = useInput('');

  const feedCategory = useSelect(studyOption_group, studyOption_group);

  const allClear = () => {
    location.setValue('');
    caption.setValue('');
    feedCategory.setOption(feedCategory.valueList[0]);
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
          category: feedCategory.option,
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
              feedCategory={feedCategory}
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
                <InputWrap>
                  <span>카테고리 :</span>
                  <Select
                    {...feedCategory}
                    id={'groupCategory_id'}
                    width={'100px'}
                    height={'25px'}
                  />
                </InputWrap>
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
