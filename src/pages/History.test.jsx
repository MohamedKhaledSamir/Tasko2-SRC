import { render, screen } from "@testing-library/react";
import React from "react";
import History from "./History";

test("There should be all tasks displayed with date", () => {
  const mockTasks = JSON.stringify([
    {
      task: "Task 1",
      done: false,
      date: {
        day: 5,
        month: 3,
        year: 2025,
      },
    },
    {
      task: "Task 2",
      done: true,
      date: {
        day: 7,
        month: 3,
        year: 2025,
      },
    },
  ]);
  localStorage.tasks = mockTasks;
  render(<History />);

  const tasks = JSON.parse(localStorage.tasks);

  tasks.forEach((task) => {
    expect(screen.queryByText(`${task.task}`)).toBeInTheDocument();
    expect(
      screen.queryByText(
        `${task.date.day} - ${task.date.month} - ${task.date.year}`
      )
    ).toBeInTheDocument();
  });
});
