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
  },
});

export const { addTodo } = todoSlice.actions;
export default todoSlice.reducer;
