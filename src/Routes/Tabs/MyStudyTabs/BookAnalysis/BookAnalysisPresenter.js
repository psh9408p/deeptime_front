import React from 'react';
import styled from 'styled-components';
import Input from '../../../../Components/Input';
import Button_custom from '../../../../Components/Buttons/Button_custom';

const SearchForm = styled.form`
  margin: 20px 0 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 500px;
`;

const SearchBtn = styled.button`
  width: 3rem;
  height: 1.9rem;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
const BookWrap = styled.div`
  display: flex;
  /* border: 1px solid black; */
  align-items: center;
  width: 500px;
  margin: 0 auto;
  box-shadow: 1px 2px 2px 4px #dee1e7;
  background-color: #fff;
  p {
    :not(:first-child) {
      margin-top: 10px;
    }
  }
`;

const Image = styled.div`
  background-image: url(${(props) => props.image});
  background-size: cover;
  width: 100px;
  position: relative;
  height: 120px;
  margin: 1em 1em;
  box-shadow: 0 30px 60px -12px rgba(50, 50, 93, 0.25),
    0 18px 36px -18px rgba(0, 0, 0, 0.3), 0 -12px 36px -8px rgba(0, 0, 0, 0.025);
`;

const MoreDiv = styled.div`
  width: 100%;
  max-width: 500px;
`;

export default ({
  searchContent,
  onSearch,
  bookList,
  bookLoad,
  display,
  setDisplay,
  onSearchFuc,
  feedCount,
}) => {
  return (
    <>
      <SearchForm onSubmit={onSearch}>
        <Input
          {...searchContent}
          placeholder={'교재의 제목 또는 ISBN(-제외)을 입력하세요.'}
          margin={'0 10px 0 0'}
        />
        <SearchBtn type="submit">검색</SearchBtn>
      </SearchForm>
      {bookList.map((book, index) => {
        return (
          <Container key={index}>
            <BookWrap>
              <div>
                <a target="_blank" href={book.link}>
                  <Image image={book.image}></Image>
                </a>
              </div>
              <div>
                <div>
                  <a
                    style={{
                      outline: 'none',
                      textDecoration: 'none',
                      color: 'black',
                    }}
                    target="_blank"
                    href={book.link}
                  >
                    <h3>제목 : {book.title}</h3>
                  </a>
                  <p>
                    <span>저자 : {book.author}</span>
                  </p>
                  <p>
                    <span>출판사 : {book.publisher}</span>
                  </p>
                  <p>
                    <span>ISBN : {book.isbn}</span>
                  </p>
                </div>
              </div>
            </BookWrap>
          </Container>
        );
      })}
      <MoreDiv>
        {bookList.length === 0 ? (
          <Button_custom
            margin={'25px 0 30px 0'}
            width={'100%'}
            text={'교재를 검색하세요'}
            loading={bookLoad}
            onClick={() => {}}
          />
        ) : (
          <Button_custom
            margin={'25px 0 30px 0'}
            width={'100%'}
            text={'교재 더보기'}
            loading={bookLoad}
            onClick={async () => {
              const newDisplay = display + feedCount;
              console.log(display, feedCount, newDisplay);
              setDisplay(newDisplay);
              onSearchFuc(newDisplay);
            }}
          />
        )}
      </MoreDiv>
    </>
  );
};
