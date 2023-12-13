import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import { styled } from "styled-components";
import { RootStateType } from "./redux/config/store";
import { Todo } from "./types/todoType";
import { addTodo } from "./redux/modules/todoSlice";

function App() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [id, setId] = useState<string>(uuid());
  const [isDone, setIsDone] = useState<boolean>(false);

  const dispatch = useDispatch();
  const todos = useSelector((state: RootStateType) => state.todos);

  const typeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const typeContentHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const addTodoHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTodo: Todo = {
      id: uuid(),
      title,
      content,
      isDone: false,
    };
    dispatch(addTodo(newTodo));
    setTitle("");
    setContent("");
  };
  return (
    <StOuterFrame>
      <StTotalTitle>Todo List</StTotalTitle>
      <StFormContainer>
        <StForm onSubmit={addTodoHandler}>
          title : <StTitleInput value={title} onChange={typeTitleHandler} />
          content :{" "}
          <StContentInput value={content} onChange={typeContentHandler} />
          <StSubmitBtn type="submit">ADD</StSubmitBtn>
        </StForm>
      </StFormContainer>
      <StDisplay>
        <StTodoContainer>
          <h1>working</h1>
          {todos.map((todo: Todo) => {
            return (
              <div key={todo.id}>
                <h2>{todo.title}</h2>
                <p>{todo.content}</p>
                <p>{todo.isDone}</p>
                <button>삭제</button>
                <button>완료</button>
              </div>
            );
          })}
        </StTodoContainer>
        <StTodoContainer>
          <h1>done</h1>
          <div>
            <p>id</p>
            <h2>제목</h2>
            <p>내용</p>
            <p>완료여부</p>
            <button>삭제</button>
            <button>취소</button>
          </div>
        </StTodoContainer>
      </StDisplay>
    </StOuterFrame>
  );
}

export default App;

const StOuterFrame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
const StTotalTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
`;
const StFormContainer = styled.div``;
const StDisplay = styled.div``;
const StTodoContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  margin: 2rem;
  h1 {
    font-size: 1.5rem;
    font-weight: 700;
  }
`;
const StForm = styled.form``;
const StTitleInput = styled.input``;
const StContentInput = styled.input``;
const StSubmitBtn = styled.button`
  margin-left: 2rem;
`;
