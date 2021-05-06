import { useMutation } from '@apollo/react-hooks';
import React, { useState } from 'react';
import useInput from '../../../../Hooks/useInput';
import BookAnalysisPresenter from './BookAnalysisPresenter';
import { SEARCH_BOOK } from './BookAnalysisQueries';

const feedCount = 2;

export default () => {
  const [bookLoad, setBookLoad] = useState(false);
  const [bookList, setBookList] = useState([]);
  const [display, setDisplay] = useState(feedCount);

  const searchContent = useInput('');

  const [searchBookMutation] = useMutation(SEARCH_BOOK);

  const onSearchFuc = async (display) => {
    if (display === '') {
      alert('검색어를 입력하세요.');
    }

    try {
      setBookLoad(true);
      const {
        data: { searchBook },
      } = await searchBookMutation({
        variables: {
          word: searchContent.value,
          display,
        },
      });
      if (!searchBook) {
        alert('교재를 검색할 수 없습니다.');
      } else {
        setBookList([...searchBook]);
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    } finally {
      setBookLoad(false);
    }
  };

  const onSearch = (e) => {
    e.preventDefault();

    onSearchFuc(feedCount);
    setDisplay(feedCount);
  };

  return (
    <BookAnalysisPresenter
      searchContent={searchContent}
      onSearch={onSearch}
      bookList={bookList}
      bookLoad={bookLoad}
      display={display}
      setDisplay={setDisplay}
      onSearchFuc={onSearchFuc}
      feedCount={feedCount}
    />
  );
};
