import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../TodayTasks/todayTasksSlice";

const InputTask = () => {
  const [taskInput, setTaskInput] = useState("");
  const todayTasks = useSelector((state) => state.todayTasks);
  const dispatch = useDispatch();

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  function addNewTask() {
    if (!taskInput.trim()) return;

    let repeatedTask = false;

    todayTasks.forEach((task) => {
      if (task.task === taskInput.trim()) {
        repeatedTask = true;
      }
    });

    if (repeatedTask) return;

    const todayTask = {
      task: taskInput.trim(),
      done: false,
      date: {
        day,
        month,
        year,
      },
    };
    dispatch(addTask(todayTask));

    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    storedTasks.push(todayTask);

    localStorage.tasks = JSON.stringify(storedTasks);

    setTaskInput("");
  }

  return (
    <div className="fixed bottom-0 left-0 w-full  min-md:gap-10 flex items-center justify-center bg-white">
      <div className="content max-sm:w-full w-4/5 drop-shadow-sm   rounded-lg px-4 py-3 flex items-center  gap-5 justify-center">
        <input
          value={taskInput}
          type="text"
          placeholder="ToDo..."
          className="input input-neutral  !outline-none !bg-none !drop-shadow-none !shadow-none border-gray-200 border-t-1 w-full ml-auto px-5 py-6"
          onChange={(e) => setTaskInput(e.target.value)}
        />

        <button
          onClick={addNewTask}
          className="btn btn-circle btn-success text-white min-md:w-12 min-md:h-12 !mb-1 w-10 h-10"
        >
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

export default InputTask;
