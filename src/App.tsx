import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import { styled } from "styled-components";
import { RootStateType } from "./redux/config/store";
import { Todo } from "./types/todoType";
import { addTodo, deleteTodo, switchTodo } from "./redux/modules/todoSlice";
import { useQuery } from "react-query";
import { getTodos } from "./api/todosApi";

function App() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [id, setId] = useState<string>(uuid());
  const [isDone, setIsDone] = useState<boolean>(false);

  const dispatch = useDispatch();
  // const todos = useSelector((state: RootStateType) => state.todos);

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

  const deleteTodoHandler = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const switchTodoHandler = (id: string) => {
    dispatch(switchTodo(id));
  };

  const { isLoading, isError, data } = useQuery("todos", getTodos);

  if (isLoading) {
    return <h1>로딩중...</h1>;
  }

  if (isError) {
    return <h1>오류발생!</h1>;
  }

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
          <h1>WORKING💨</h1>
          {data
            .filter((todo: Todo) => {
              return todo.isDone === false;
            })
            .map((todo: Todo) => {
              return (
                <StTodoCard key={todo.id}>
                  <h2>{todo.title}</h2>
                  <p>{todo.content}</p>
                  <p>{String(todo.isDone)}</p>
                  <button onClick={() => deleteTodoHandler(todo.id)}>
                    delete
                  </button>
                  <button onClick={() => switchTodoHandler(todo.id)}>
                    done
                  </button>
                </StTodoCard>
              );
            })}
        </StTodoContainer>
        <StTodoContainer>
          <h1>🌿 DONE 🌿</h1>
          {data
            .filter((todo: Todo) => {
              return todo.isDone === true;
            })
            .map((todo: Todo) => {
              return (
                <StTodoCard key={todo.id}>
                  <h2>{todo.title}</h2>
                  <p>{todo.content}</p>
                  <p>{String(todo.isDone)}</p>
                  <button onClick={() => deleteTodoHandler(todo.id)}>
                    delete
                  </button>
                  <button onClick={() => switchTodoHandler(todo.id)}>
                    cancel
                  </button>
                </StTodoCard>
              );
            })}
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
  margin: 2rem;
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
  margin: 1rem;
  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    width: 9rem;
  }
`;
const StForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;

const StTodoCard = styled.div`
  width: 15rem;
  height: 10rem;
  background-color: #e9fff6;
  border: 1px solid #b3ffdf;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  gap: 0.5rem;
  h2 {
    font-weight: 800;
  }
`;
const StTitleInput = styled.input``;
const StContentInput = styled.input``;
const StSubmitBtn = styled.button`
  margin-left: 2rem;
`;
