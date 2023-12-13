import uuid from "react-uuid";
import { Todo } from "../../types/todoType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
const initialState: Todo[] = [
  {
    id: uuid(),
    title: "title1",
    content: "contents1",
    isDone: false,
  },
  {
    id: uuid(),
    title: "title2",
    content: "contents2",
    isDone: true,
  },
];

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      const newTodo = action.payload;
      return [...state, newTodo];
    },
    // action: id를 가지고 옴, state: initialState, map 안의 인자 state는 객체하나
    deleteTodo: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const remainedTodo = state.filter((state) => {
        return state.id !== id;
      });
      return [...remainedTodo];
    },
    switchTodo: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const updatedTodo = state.map((state) => {
        if (state.id === id) {
          return { ...state, isDone: !state.isDone };
        } else {
          return state;
        }
      });
      return [...updatedTodo];
    },
  },
});

export const { addTodo, deleteTodo, switchTodo } = todoSlice.actions;
export default todoSlice.reducer;
