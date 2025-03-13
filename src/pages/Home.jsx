import React from "react";
import InputTask from "../features/InputTask/InputTask";
import TodayTasks from "../features/TodayTasks/TodayTasks";

function Home() {
  return (
    <div className="relative  ">
      <TodayTasks />
      <InputTask />
    </div>
  );
}

export default Home;
