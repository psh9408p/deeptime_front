import React from 'react';
import styled from 'styled-components';
import Input from '../../../../Components/Input';

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
export default ({ searchContent, onSearch, bookList }) => {
  return (
    <>
      <SearchForm onSubmit={onSearch}>
        <Input
          {...searchContent}
          placeholder={'제목 또는 ISBN을 입력하세요.'}
          margin={'0 10px 0 0'}
        />
        <SearchBtn type="submit">검색</SearchBtn>
      </SearchForm>
      {bookList.map((book) => {
        return (
          <Container>
            <BookWrap>
              <div>
                <a
                  target="_blank"
                  href="https://ridibooks.com/books/371002341?_s=category_best&_s_id=754027238"
                >
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
                    href="https://ridibooks.com/books/371002341?_s=category_best&_s_id=754027238"
                  >
                    <h3>{book.title}</h3>
                  </a>
                  <p>
                    <span>{book.author}</span>
                  </p>
                  <p>
                    <span>{book.publisher}</span>
                  </p>
                  <p>
                    <span>{book.isbn}</span>
                  </p>
                </div>
              </div>
            </BookWrap>
          </Container>
        );
      })}
    </>
  );
};
