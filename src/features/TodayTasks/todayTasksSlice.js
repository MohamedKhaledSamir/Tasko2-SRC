import { createSlice } from "@reduxjs/toolkit";

let initialState = [];

if (localStorage.tasks) {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  initialState = JSON.parse(localStorage.tasks).filter(
    (task) =>
      task.date.day === day &&
      task.date.month === month &&
      task.date.year === year
  );
}

const todayTasksSlice = createSlice({
  name: "todayTasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    removeTask: (state, action) => {
      state.splice(action.payload, 1);
    },
    updateDoneState: (state, action) => {
      state[action.payload].done = !state[action.payload].done;
    },
  },
});

const todayTasksReducer = todayTasksSlice.reducer;
const { addTask, removeTask, updateDoneState } = todayTasksSlice.actions;

export { todayTasksReducer, addTask, removeTask, updateDoneState };
