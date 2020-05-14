import React from 'react';
import { useMutation } from 'react-apollo-hooks';
import { toast } from 'react-toastify';
import { DELETE_CLASS, EDIT_CLASS } from './ClassTabQueries';
import ClassTabPresenter from './ClassTabPresenter';

export default ({
  classRoom,
  classRefetch,
  myAcademyList,
  className,
  classBio,
  clearClass,
}) => {
  const deleteClassMutation = useMutation(DELETE_CLASS, {
    variables: { id: classRoom.id },
  });

  const editClassMutation = useMutation(EDIT_CLASS, {
    variables: {
      classId: classRoom.id,
      name: className.value,
      bio: classBio.value,
      academyId: myAcademyList.option,
    },
  });

  const onSubmit = async () => {
    try {
      toast.info('정보 수정중...');
      const {
        data: { editClass },
      } = await editClassMutation();
      if (!editClass) {
        alert('정보를 수정할 수 없습니다.');
      } else {
        await classRefetch();
        await clearClass();
        toast.success('정보가 수정되었습니다.');
        return true;
      }
    } catch (e) {
      const realText = e.message.split('GraphQL error: ');
      alert(realText[1]);
      return false;
    }
  };

  const loadValue = () => {
    className.setValue(`${classRoom.name}`);
    classBio.setValue(`${classRoom.bio}`);
    myAcademyList.setOption(`${classRoom.academy.id}`);
  };

  return (
    <ClassTabPresenter
      classRoom={classRoom}
      classRefetch={classRefetch}
      myAcademyList={myAcademyList}
      className={className}
      classBio={classBio}
      clearClass={clearClass}
      deleteClassMutation={deleteClassMutation}
      onSubmit={onSubmit}
      loadValue={loadValue}
    />
  );
};
