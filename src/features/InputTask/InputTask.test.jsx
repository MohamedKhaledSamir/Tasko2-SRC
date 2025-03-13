import { render, screen } from "@testing-library/react";
import InputTask from "./InputTask";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import userEvent from "@testing-library/user-event";

function setup() {
  render(
    <Provider store={store}>
      <InputTask />;
    </Provider>
  );
}

test("There should be an input for the task and add button", () => {
  setup();

  expect(screen.queryByRole("button")).toBeInTheDocument();
  expect(screen.queryByRole("textbox")).toBeInTheDocument();
});

test("When button add clicked it adds task to the store", async () => {
  setup();
  const inputTask = screen.queryByRole("textbox");
  const btnAdd = screen.queryByRole("button");

  await userEvent.type(inputTask, "read an article");

  await userEvent.click(btnAdd);
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  expect(store.getState().todayTasks).toContainEqual({
    task: "read an article",
    done: false,
    date: {
      day,
      month,
      year,
    },
  });
});

test("when button add clicked and the input field is empty it doesn't add task to the store", async () => {
  setup();
  const inputTask = screen.queryByRole("textbox");

  const btnAdd = screen.queryByRole("button");

  const todayTasksLengthBeforeAdd = store.getState().todayTasks?.length || 0;

  await userEvent.type(inputTask, "  ");
  await userEvent.click(btnAdd);

  const todayTasksLengthAfterAdd = store.getState().todayTasks?.length || 0;

  expect(todayTasksLengthBeforeAdd).toEqual(todayTasksLengthAfterAdd);
});

test("shouldn't add task when it has the same value text of old task", async () => {
  setup();
  const taskValue = "my great task";
  const inputTask = screen.queryByRole("textbox");

  const btnAdd = screen.queryByRole("button");

  await userEvent.type(inputTask, taskValue);
  await userEvent.click(btnAdd);

  await userEvent.type(inputTask, taskValue);
  await userEvent.click(btnAdd);

  const tasksThatHasTheSameString = store
    .getState()
    .todayTasks.filter((task) => task.task === taskValue);

  expect(tasksThatHasTheSameString.length).toEqual(1);
});
