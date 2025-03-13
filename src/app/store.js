import { configureStore } from "@reduxjs/toolkit";
import { todayTasksReducer } from "../features/TodayTasks/todayTasksSlice";

export const store = configureStore({
  reducer: { todayTasks: todayTasksReducer },
});
