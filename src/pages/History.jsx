import React, { useEffect, useState } from "react";

function History() {
  const [tasks, setTasks] = useState([]);
  const [accomplishedTasks, setAccomplishedTasks] = useState(0);

  useEffect(() => {
    if (!localStorage.tasks) return;
    setTasks(JSON.parse(localStorage.tasks).reverse());
  }, []);

  useEffect(() => {
    let doneTasks = 0;

    tasks.forEach((task) => {
      if (task.done) doneTasks++;
    });

    setAccomplishedTasks(doneTasks);
  }, [tasks]);

  return (
    <div className="flex flex-col gap-12 px-2 pb-10 pt-4">
      {(tasks.length > 0 && (
        <div className="flex flex-col gap-12 ">
          <div
            className={`text-center  py-2 text-lg mb-5 capitalize ${
              accomplishedTasks ? "text-success" : "text-error"
            } `}
          >
            You Accomplished{" "}
            <span className="text-4xl">{accomplishedTasks}</span> task
            {accomplishedTasks === 1 ? "" : "s"}
          </div>

          {tasks.map((task, index) => {
            return (
              <div
                key={index}
                className={`flex flex-col gap-2 shadow-md py-5 px-5 text-white ${
                  task.done ? "bg-green-400" : "bg-red-400"
                }`}
              >
                <h4 className="capitalize text-xl font-semibold">
                  {task.task}
                </h4>

                {task.done ? (
                  <p>
                    Done <i className="fa-solid fa-hands-clapping"></i>
                  </p>
                ) : (
                  <p>
                    Failed <i className="fa-solid fa-thumbs-down"></i>
                  </p>
                )}

                <p>
                  {task.date.day} - {task.date.month} - {task.date.year}
                </p>
              </div>
            );
          })}
        </div>
      )) || (
        <h4 className="text-center bg-error text-white px-5 py-2 text-xl capitalize">
          no history yet
        </h4>
      )}
    </div>
  );
}

export default History;
