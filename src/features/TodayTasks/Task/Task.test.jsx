import { render, screen } from "@testing-library/react";
import React from "react";
import Task from "./Task";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import userEvent from "@testing-library/user-event";
import InputTask from "../../InputTask/InputTask";

function setup(task, done, index) {
  render(
    <Provider store={store}>
      <Task task={task} done={done} index={index} />
    </Provider>
  );
}

beforeEach(async () => {
  render(
    <Provider store={store}>
      <InputTask />
    </Provider>
  );

  const inputTask = screen.getByRole("textbox");
  const btnAdd = screen.getByRole("button");

  // Adding some tasks
  await userEvent.type(inputTask, "read an article");
  await userEvent.click(btnAdd);
  await userEvent.type(inputTask, "read a book");
  await userEvent.click(btnAdd);
  await userEvent.type(inputTask, "read read read");
  await userEvent.click(btnAdd);

  // Displaying them
  store.getState().todayTasks.forEach((task, index) => {
    setup(task.task, task.done, index);
  });
});

test("There should be <h3> and <checkbox> of many as the todayTasks", async () => {
  //checking if they exists
  const todayTasksLength = store.getState().todayTasks.length;
  expect(screen.queryAllByRole("heading").length).toEqual(todayTasksLength);
  expect(screen.queryAllByRole("checkbox").length).toEqual(todayTasksLength);
});

test("When the delete button clicked it deletes the task from the store", async () => {
  const indexToBeDeleted = 1;

  const btnRemove = screen.queryAllByTestId("btnRemove")[indexToBeDeleted];
  const storeBeforeClick = store.getState().todayTasks;
  await userEvent.click(btnRemove);
  const storeAfterDeletion = store.getState().todayTasks;

  expect(storeAfterDeletion).not.toContainEqual(
    storeBeforeClick[indexToBeDeleted]
  );
});

test("When delete button clicked it deletes the task from the local storage", async () => {
  const indexToBeDeleted = 1;

  const btnRemove = screen.queryAllByTestId("btnRemove")[indexToBeDeleted];
  const tasksBeforeDeletion = JSON.parse(localStorage.tasks);
  await userEvent.click(btnRemove);
  const tasksAfterDeletion = JSON.parse(localStorage.tasks);

  expect(tasksAfterDeletion).not.toContainEqual(
    tasksBeforeDeletion[indexToBeDeleted]
  );
});

test("When done checkbox is clicked it changes the done state in the store of the task", async () => {
  const indexToUpdate = 1;

  const taskBeforeUpdate = store.getState().todayTasks[indexToUpdate];

  const checkBoxOfTaskIndex = screen.queryAllByRole("checkbox")[indexToUpdate];

  await userEvent.click(checkBoxOfTaskIndex);
  const taskAfterUpdate = store.getState().todayTasks[indexToUpdate];

  expect(taskBeforeUpdate.done).not.toEqual(taskAfterUpdate.done);
});
