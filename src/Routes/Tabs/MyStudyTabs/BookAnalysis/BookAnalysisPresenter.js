import React from 'react';
import styled from 'styled-components';
import Input from '../../../../Components/Input';
import Button_custom from '../../../../Components/Buttons/Button_custom';
import PopButton_custom from '../../../../Components/Buttons/PopButton_custom';
import Popup from 'reactjs-popup';
import Popover from './Popover';

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
  padding-top: 10px;
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

const PopupCustom = styled(Popup)`
  &-content {
    width: 450px !important;
    /* height: 240px !important; */
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${(props) => props.theme.borderRadius};
  }
`;

const BackWrap = styled.div`
  width: 100%;
  max-width: 500px;
  margin-top: 20px;
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
  setViewForm,
  mySubjectList,
  onCreateUserBook,
  startPage,
  endPage,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  return (
    <>
      <BackWrap>
        <Button_custom
          width={'100%'}
          bgColor={'#0F4C82'}
          color={'white'}
          text={'?????? ????????? ????????????'}
          onClick={() => setViewForm('default')}
          margin={'0'}
        />
      </BackWrap>
      <SearchForm onSubmit={onSearch}>
        <Input
          {...searchContent}
          placeholder={'????????? ?????? ?????? ISBN(-??????)??? ???????????????.'}
          margin={'0 10px 0 0'}
        />
        <SearchBtn type="submit">??????</SearchBtn>
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
                    <h3>?????? : {book.title}</h3>
                  </a>
                  <p>
                    <span>?????? : {book.author}</span>
                  </p>
                  <p>
                    <span>????????? : {book.publisher}</span>
                  </p>
                  <p>
                    <span>ISBN : {book.isbn}</span>
                  </p>
                  <PopupCustom
                    trigger={
                      <PopButton_custom
                        width={'100px'}
                        height={'30px'}
                        margin={'10px 20px 20px auto'}
                        text={'?????? ??????'}
                        bgColor={'#0F4C82'}
                        color={'white'}
                      />
                    }
                    closeOnDocumentClick={false}
                    modal
                  >
                    {(close) => (
                      <Popover
                        close={close}
                        mySubjectList={mySubjectList}
                        onCreateUserBook={onCreateUserBook}
                        book={book}
                        startPage={startPage}
                        endPage={endPage}
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        BookTitle={book.title}
                        image={book.image}
                      />
                    )}
                  </PopupCustom>
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
            text={'????????? ???????????????'}
            loading={bookLoad}
            onClick={() => {}}
          />
        ) : (
          <Button_custom
            margin={'25px 0 30px 0'}
            width={'100%'}
            text={'?????? ?????????'}
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
