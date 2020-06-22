import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/react-hooks';
import StudentTabsPresenter from './StudentTabsPresenter';
import {
  MY_STUDENT,
  CONFIRM_STUDENT,
  ADD_STUDENT,
  CON_SEAT,
} from './StudentTabsQueries';
import Loader from '../../../Components/Loader';
import useInput from '../../../Hooks/useInput';
import { toast } from 'react-toastify';
import useSelect from '../../../Hooks/useSelect';
import selectChange from '../../../Components/SelectChange';

const LoaderWrapper = styled.div`
  margin: 100px 0px;
`;

const StudentTabsContainer = ({ pageIndex, pageIndexChange, classList }) => {
  const studentEmail = useInput('');
  // const studentEmail_seat = useInput('');

  const myClassList = useSelect(
    classList.map((List) => `${List.name}(${List.academy.name})`),
    classList.map((List) => List.id),
  );
  // const seatId = useInput('');

  const {
    data: studentData,
    loading: studentLoading,
    refetch: studentRefetch,
  } = useQuery(MY_STUDENT);
  const [confirmStudentMutation] = useMutation(CONFIRM_STUDENT, {
    variables: { email: studentEmail.value },
  });

  const [addStudentMutation] = useMutation(ADD_STUDENT);
  // const [connectSeatMutation] = useMutation(CON_SEAT, {
  //   variables: { email: studentEmail_seat.value, seatId: seatId.value },
  // });

  const clearStudent = () => {
    studentEmail.setValue('');
    myClassList.setOption(myClassList.valueList[0]);
  };
  // const clearSeatForm = () => {
  //   studentEmail_seat.setValue('');
  //   seatId.setValue('');
  // };

  const confirmStudent = async (e) => {
    if (studentEmail.value !== '') {
      try {
        toast.info('등록 가능 여부 확인 중...');
        const { data } = await confirmStudentMutation();
        if (!data.confirmStudent) {
          alert('등록이 불가능한 사용자입니다.');
        } else {
          toast.success('등록이 가능한 사용자입니다.');
          localStorage.setItem('email_confirm', 'Confirm');
        }
      } catch (e) {
        const realText = e.message.split('GraphQL error: ');
        alert(realText[1]);
      }
    } else {
      alert('이메일을 입력하세요.');
    }
  };
  const onSubmitStudent = async () => {
    const email_confirm = localStorage.getItem('email_confirm');
    if (email_confirm === 'None') {
      alert('먼저 Email 유효성을 확인하세요.');
    } else if (email_confirm === 'Confirm') {
      try {
        toast.info('새로운 학생을 등록 중...');
        const {
          data: { addStudent },
        } = await addStudentMutation({
          variables: {
            email: studentEmail.value,
            academyId: classList[myClassList.optionIndex].academy.id,
            classId: myClassList.option,
          },
        });
        if (!addStudent) {
          alert('학생을 등록할 수 없습니다.');
        } else {
          await studentRefetch();
          toast.success('새로운 학생이 등록되었습니다.');
          localStorage.setItem('email_confirm', 'None');
          clearStudent();
          return true;
        }
      } catch (e) {
        const realText = e.message.split('GraphQL error: ');
        alert(realText[1]);
        return false;
      }
    }
  };
  // const onSubmitConSeat = async (e) => {
  // e.preventDefault();
  // try {
  //   toast.info('좌석을 배정 중...');
  //   const {
  //     data: { conSeat },
  //   } = await connectSeatMutation();
  //   if (!conSeat) {
  //     toast.error('좌석을 배정할 수 없습니다.');
  //   } else {
  //     await studentRefetch();
  //     studentEmail_seat.setValue('');
  //     seatId.setValue('');
  //     toast.success('좌석이 배정되었습니다.');
  //   }
  // } catch (e) {
  //   const realText = e.message.split('GraphQL error: ');
  //   toast.error(realText[1]);
  // }
  // };

  useEffect(() => {
    localStorage.setItem('email_confirm', 'None');
  }, []);

  if (studentLoading === true) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  } else if (!studentLoading && studentData && studentData.myStudent) {
    studentRefetch();
    return (
      <StudentTabsPresenter
        pageIndex={pageIndex}
        pageIndexChange={pageIndexChange}
        studentData={studentData}
        studentRefetch={studentRefetch}
        studentEmail={studentEmail}
        confirmStudent={confirmStudent}
        myClassList={myClassList}
        clearStudent={clearStudent}
        onSubmitStudent={onSubmitStudent}
        classList={classList}
      />
    );
  }
};

export default StudentTabsContainer;
