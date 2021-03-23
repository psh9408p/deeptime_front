import React from 'react';
import styled from 'styled-components';

const NoticeWrap = styled.div`
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  width: 860px;
  min-height: 880px;
  margin-top: 30px;
  background-color: #fff;
  box-shadow: 2px 2px 4px #dee1e7;
  padding-inline-start: 2.25rem;
  padding-inline-end: 2.25rem;
`;

const NoticeH3 = styled.h3`
  font-size: 32px;
  align-items: center;
  justify-content: center;
  display: flex;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
`;

const NoticeSearch = styled.div`
  text-align: center;
  display: flex;
  padding-top: 3.15rem;
`;

const NSBtn = styled.input`
  height: 44px;
  width: 295px;
  border: 1px solid #e1e2e6;
  border-radius: 2px;
  font-size: 14px;
  background-color: #f9fafc;
  padding: 0 40px 0 20px;
  box-sizing: border-box;
  color: #2b2b2b;
`;

const SearchBtn = styled.a`
  padding: 0 20px;
  display: inline-block;
  height: 44px;
  line-height: 44px;
  color: #fff;
  font-size: 15px;
  background-color: #0062df;
  border-radius: 2px;
  box-sizing: border-box;
  vertical-align: top;
  margin-left: 8px;
  cursor: pointer;
`;

const Border = styled.div`
  border-bottom: solid 1px black;
  padding: 12px 0;
`;

const NoticeHeader = styled.div`
  flex-wrap: wrap;
  display: flex;
  text-align: center;
  height: 46px;
  align-items: center;
  div:nth-of-type(1) {
    width: 60%;
  }
  div:nth-of-type(2) {
    width: 20%;
  }
  div:nth-of-type(3) {
    width: 20%;
  }
`;

const NoticeBody = styled.div`
  flex-wrap: wrap;
  display: flex;
  text-align: start;
  height: 52px;
  align-items: center;
  border-bottom: 1px solid black;
  div:nth-of-type(1) {
    width: 60%;
  }
  div:nth-of-type(2) {
    width: 20%;
    text-align: center;
  }
  div:nth-of-type(3) {
    width: 20%;
    text-align: center;
  }
`;

const Notice = () => {
  return (
    <div>
      <NoticeWrap>
        <NoticeSearch>
          <NoticeH3>공지사항</NoticeH3>
          {/* <NoticeBtnWrap style={{ marginLeft: 'auto', display: 'flex' }}>
            <NSBtn type="text" placeholder="검색어를 입력해주세요."></NSBtn>
            <SearchBtn>검색</SearchBtn>
          </NoticeBtnWrap> */}
        </NoticeSearch>
        <Border></Border>
        <NoticeHeader>
          <div>제목</div>
          <div>등록일</div>
          <div>조회수</div>
        </NoticeHeader>
        <div>
          <NoticeBody>
            <div>[거래] 고머니2(GOM2) 유의 종목 지정 안내</div>
            <div>
              <span>등록일</span>
            </div>
            <div>등록일</div>
          </NoticeBody>
          <NoticeBody>
            <div>[거래] 고머니2(GOM2) 유의 종목 지정 안내</div>
            <div>2021.03.17 </div>
            <div>11060</div>
          </NoticeBody>
          <NoticeBody>
            <div>[거래] 고머니2(GOM2) 유의 종목 지정 안내</div>
            <div>2021.03.17 </div>
            <div>11060</div>
          </NoticeBody>
          <NoticeBody>
            <div>[거래] 고머니2(GOM2) 유의 종목 지정 안내</div>
            <div>2021.03.17 </div>
            <div>11060</div>
          </NoticeBody>
          <NoticeBody>
            <div>[거래] 고머니2(GOM2) 유의 종목 지정 안내</div>
            <div>2021.03.17 </div>
            <div>11060</div>
          </NoticeBody>
        </div>
      </NoticeWrap>
    </div>
  );
};

export default Notice;
