import React from "react";
import { useSelector } from "react-redux";
import Task from "./Task/Task";

function TodayTasks() {
  const todayTasks = useSelector((state) => state.todayTasks);
  return (
    <div className="flex flex-col justify-center gap-8 pt-4 pb-40 px-1">
      {(todayTasks.length > 0 &&
        todayTasks.map((task, index) => {
          return (
            <Task key={index} task={task.task} done={task.done} index={index} />
          );
        })) || (
        <h4 className="text-center bg-error text-white px-5 py-2 text-xl capitalize">
          no tasks yet
        </h4>
      )}
    </div>
  );
}

export default TodayTasks;
