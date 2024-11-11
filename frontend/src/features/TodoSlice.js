import { createSlice } from "@reduxjs/toolkit";

const loadTodos = () => {
  const storedTodos = localStorage.getItem("todos");
  return storedTodos ? JSON.parse(storedTodos) : [];
};

const saveTodos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
  localStorage.setItem("todostime", Date.now());
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + 1);
  nextDate.setHours(0, 0, 0, 0);
  localStorage.setItem("nextday", nextDate.getTime());
};

const clearTodoNextDay = () => {
  const lastSaved = localStorage.getItem("todostime");
  const nextDay = localStorage.getItem("nextday");
  if (lastSaved && nextDay && lastSaved > nextDay) {
    //New day has arrived
    // yaya light weighttttt
    localStorage.removeItem("todos");
    localStorage.removeItem("todostime");
      localStorage.removeItem("nextday");
      console.log(lastSaved, nextDay);
  }
};

clearTodoNextDay();

const initialState = loadTodos();

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
   
        const newTodo = {
          id: Date.now(),
          todo: action.payload,
          completed: false,
        };
        state.push(newTodo);
        saveTodos(state);
      
    },
    updateTodo: (state, action) => {
      const { id, ...updates } = action.payload;
      const existingTodo = state.find((item) => item.id === id);
      if (existingTodo) {
        Object.assign(existingTodo, updates);
        saveTodos(state);
      }
    },

    clearTodo: (state) => {
      state.length = 0;
      saveTodos(state);
    },
  },
});

export const { addTodo, updateTodo, clearTodo } = todoSlice.actions;
export default todoSlice.reducer;
