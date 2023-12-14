import axios from "axios";
import { Todo } from "../types/todoType";
const getTodos = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_JSON_SERVER}/todos`
  );
  return response.data;
};

const addTodo = async (newTodo: Todo) => {
  await axios.post(`${process.env.REACT_APP_JSON_SERVER}/todos`, newTodo);
};

const deleteTodo = async (id: string) => {
  await axios.delete(`${process.env.REACT_APP_JSON_SERVER}/todos/${id}`);
};

const switchTodo = async ({ id, isDone }: { id: string; isDone: boolean }) => {
  await axios.patch(`${process.env.REACT_APP_JSON_SERVER}/todos/${id}`, {
    isDone: !isDone,
  });
};

export { getTodos, addTodo, deleteTodo, switchTodo };
