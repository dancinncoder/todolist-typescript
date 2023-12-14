import React, { ChangeEvent, FormEvent, useState } from "react";
import uuid from "react-uuid";
import { styled } from "styled-components";
import { Todo } from "./types/todoType";
import { addTodo, deleteTodo, getTodos, switchTodo } from "./api/todosApi";
import { useMutation, useQuery, useQueryClient } from "react-query";

function App() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [id, setId] = useState<string>(uuid());
  const [isDone, setIsDone] = useState<boolean>(false);

  const errorReportEmail = "26jopk5@gmail.com";

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
    addMutation.mutate(newTodo);
    setTitle("");
    setContent("");
  };

  const deleteTodoHandler = (id: string) => {
    deleteMutation.mutate(id);
  };

  const switchTodoHandler = (id: string, isDone: boolean) => {
    switchMutation.mutate({ id, isDone });
  };

  const queryClient = useQueryClient();

  const addMutation = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      console.log("추가 성공");
    },
    onError: () => {
      console.error("추가 중 오류발생");
      alert("알 수 없는 오류가 생겼습니다. 고객센터(02-123-454)로 연락주세요.");
    },
  });

  const deleteMutation = useMutation(deleteTodo, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("todos");
      console.log("삭제 성공");
    },
    onError: () => {
      console.error("삭제 중 오류발생");
      alert("알 수 없는 오류가 생겼습니다. 고객센터(02-123-454)로 연락주세요.");
    },
  });

  const switchMutation = useMutation(switchTodo, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("todos");
      console.log("스위치 성공");
    },
    onError: () => {
      console.error("스위치 중 오류 발생");
      alert("알 수 없는 오류가 생겼습니다. 고객센터(02-123-454)로 연락주세요.");
    },
  });

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
          <h1>💨 WORKING 💨</h1>
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
                  <button
                    onClick={() => switchTodoHandler(todo.id, todo.isDone)}
                  >
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
                  <button
                    onClick={() => switchTodoHandler(todo.id, todo.isDone)}
                  >
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
  align-items: center;
  gap: 2rem;
  margin: 1rem;
  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    width: 11rem;
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
