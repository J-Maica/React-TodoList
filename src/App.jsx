import React, { useState, useEffect } from "react";
import { TaskContainer } from "./components/TaskContainer";
import { getTasksFromLocalStorage, saveTasksToLocalStorage } from "./storage/LocalStorage";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState(getTasksFromLocalStorage());

  useEffect(() => {
    saveTasksToLocalStorage(taskList);
  }, [taskList]);

  //add task function btn
  const addTask = () => {
    if (task.trim() === "") {
      alert("task cannot be empty");
      return;
    }
    const tasks = {
      id: taskList.length === 0 ? 1 : taskList[taskList.length - 1].id + 1, //set tasks id
      taskName: task,
      completed: false,
    };
    setTaskList([...taskList, tasks]);
    setTask("");
  };

  const enterKey = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  //delete task function btn
  const deleteTask = (id) => {
    const newTaskList = taskList.filter((task) => {
      return task.id !== id;
    });
    setTaskList(newTaskList);
  };

  //check task function btn
  const completeTask = (id) => {
    setTaskList(
      taskList.map((task) => {
        return task.id === id ? { ...task, completed: !task.completed } : task;
      })
    );
  };

  // Edit
  const [isEditing, setIsEditing] = useState(false); //for editing ui
  const [editedTaskName, setEditedTaskName] = useState(""); //new taskName value
  const [editedTaskId, setEditedTaskId] = useState(null);

  //edit function btn
  const editTask = (id, taskName) => {
    setIsEditing(true);
    setEditedTaskId(id);
    setEditedTaskName(taskName);
  };

  const editTaskVal = (e) => {
    //new taskName Value
    setEditedTaskName(e.target.value);
  };

  const handleEdit = (id, newTaskName) => {
    //editing process
    setTaskList(
      taskList.map((task) => {
        if (task.id === id) {
          return { ...task, taskName: newTaskName };
        } else {
          return task;
        }
      })
    );
  };

  const saveEdit = () => {
    //saving process
    if (editedTaskId !== null) {
      handleEdit(editedTaskId, editedTaskName);
      setIsEditing(false);
      setEditedTaskId(null);
    }
  };

  return (
    <div>
      <div className="row d-flex justify-content-center gap-4 mb-5 taskInput px-5 px-md-0">
        <input
          className="col-md-5 rounded"
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={enterKey}
          max={60}
          value={task}
          placeholder="Create task here..."
        />
        <button className="btn col-md-1" onClick={addTask}>
          Add Task
        </button>
      </div>

      <div className="container">
        <div className="taskContainer mx-3 mx-lg-0">
          {taskList &&
            taskList.map((task, key) => (
              <TaskContainer
                taskName={task.taskName}
                id={task.id}
                key={key}
                completed={task.completed}
                deleteTask={deleteTask}
                completeTask={completeTask}
                editTask={editTask}
                isEditing={isEditing && editedTaskId === task.id}
                editedTaskName={editedTaskName}
                saveEdit={saveEdit}
                editTaskVal={editTaskVal}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
