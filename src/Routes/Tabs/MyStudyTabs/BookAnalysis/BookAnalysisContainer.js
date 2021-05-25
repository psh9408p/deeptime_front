import { useMutation } from '@apollo/react-hooks';
import React, { useState } from 'react';
import useInput from '../../../../Hooks/useInput';
import useSelect from '../../../../Hooks/useSelect';
import BookAnalysisPresenter from './BookAnalysisPresenter';
import { CREATE_BOOKOFUSER, SEARCH_BOOK } from './BookAnalysisQueries';
import { toast } from 'react-toastify';
import { SEE_USERBOOK } from '../ProgressAnalysis/ProgressAnalysisQueries';

const nowDate = new Date();
const nextMonthDate = new Date();
nextMonthDate.setMonth(nowDate.getMonth() + 1);

export default ({ setViewForm, subjectList }) => {
  // subjectlist 오름차순 정렬
  subjectList.sort(function (a, b) {
    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
  });

  // subjectlist 기타가 아래로오게
  subjectList.sort(function (a, b) {
    const word = '기타';
    return a.name !== word && b.name === word
      ? -1
      : a.name === word && b.name !== word
      ? 1
      : 0;
  });

  const positive = (value) => value >= 0;
  const startPage = useInput(1, positive);
  const endPage = useInput(100, positive);
  const searchContent = useInput('');

  const [bookList, setBookList] = useState([]);
  const [startDate, setStartDate] = useState(nowDate);
  const [endDate, setEndDate] = useState(nextMonthDate);

  // 과목 전용 리스트
  const mySubjectList = useSelect(
    subjectList.map((List) => `${List.name}`),
    subjectList.map((List) => `${List.id}`),
  );

  const [searchBookMutation] = useMutation(SEARCH_BOOK);
  const [createBookOfUserMutation] = useMutation(CREATE_BOOKOFUSER, {
    refetchQueries: [{ query: SEE_USERBOOK }],
  });

  const clearValue = () => {
    mySubjectList.setOption(mySubjectList.valueList[0]);
    startPage.setValue(1);
    endPage.setValue(100);
    setStartDate(nowDate);
    setEndDate(nextMonthDate);
  };

  const onSearch = async (e) => {
    e.preventDefault([]);

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
        setBookList([...searchBook]);
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  const onCreateUserBook = async (book, close) => {
    // e.preventDefault(); // form에서 쓰이는거
    try {
      toast.info('교재 등록 중...');
      const {
        data: { createBookOfUser },
      } = await createBookOfUserMutation({
        variables: {
          title: book.title,
          link: book.link,
          image: book.image,
          author: book.author,
          publisher: book.publisher,
          isbn: book.isbn,
          subjectId: mySubjectList.option,
          startPage: Number(startPage.value),
          endPage: Number(endPage.value),
          startDate,
          endDate,
        },
      });
      if (!createBookOfUser) {
        alert('교재를 등록할 수 없습니다.');
      } else {
        close();
        clearValue();
        setViewForm('default');
        toast.success('교재 등록이 완료됐습니다.');
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
    }
  };

  return (
    <BookAnalysisPresenter
      searchContent={searchContent}
      onSearch={onSearch}
      bookList={bookList}
      setViewForm={setViewForm}
      mySubjectList={mySubjectList}
      onCreateUserBook={onCreateUserBook}
      startPage={startPage}
      endPage={endPage}
      startDate={startDate}
      setStartDate={setStartDate}
      endDate={endDate}
      setEndDate={setEndDate}
    />
  );
};
