import { useMutation } from '@apollo/react-hooks';
import React from 'react';
import useInput from '../../../../Hooks/useInput';
import BookAnalysisPresenter from './BookAnalysisPresenter';
import { SEARCH_BOOK } from './BookAnalysisQueries';

export default () => {
  const searchContent = useInput('');

  const [searchBookMutation] = useMutation(SEARCH_BOOK);

  const onSearch = async (e) => {
    e.preventDefault();

    try {
      const {
        data: { searchBook },
      } = await searchBookMutation({
        variables: {
          word: searchContent.value,
          display: 10,
        },
      });
      if (!searchBook) {
        alert('교재를 검색할 수 없습니다.');
      } else {
        console.log(searchBook);
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  return (
    <BookAnalysisPresenter searchContent={searchContent} onSearch={onSearch} />
  );
};
