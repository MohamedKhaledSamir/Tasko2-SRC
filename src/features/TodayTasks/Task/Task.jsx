import React from "react";
import { useDispatch } from "react-redux";
import { removeTask, updateDoneState } from "../todayTasksSlice";

function Task({ task, done, index: i }) {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const dispatch = useDispatch();

  function updateDoneValue() {
    dispatch(updateDoneState(i));

    const tasks = JSON.parse(localStorage.tasks);
    const index = tasks.findIndex(
      (taskElement) =>
        taskElement.date.day === day &&
        taskElement.date.month === month &&
        taskElement.date.year === year &&
        taskElement.task === task
    );

    tasks[index].done = !tasks[index].done;
    localStorage.tasks = JSON.stringify(tasks);
  }

  function remove() {
    dispatch(removeTask(i));
    let tasks = JSON.parse(localStorage.tasks);

    tasks = tasks.filter(
      (taskElment) =>
        !(
          taskElment.task === task &&
          taskElment.date.day === day &&
          taskElment.date.month === month &&
          taskElment.date.year === year
        )
    );

    tasks = JSON.stringify(tasks);

    localStorage.tasks = tasks;
  }

  return (
    <div className="flex items-center justify-between gap-5 px-16 shadow-sm py-5 max-sm:flex-col max-sm:justify-center">
      <h3>{task}</h3>

      <div className="actions flex items-center justify-center gap-5">
        <button
          onClick={remove}
          data-testid="btnRemove"
          className="flex items-center justify-center btn"
        >
          <i className="fa-solid fa-delete-left text-xl text-red-600"></i>
        </button>

        <input
          type="checkbox"
          onChange={updateDoneValue}
          checked={done}
          className="checkbox w-10 h-10"
        />
      </div>
    </div>
  );
}

export default Task;
