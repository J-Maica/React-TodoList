
export const getTasksFromLocalStorage = () => {
  const storedTasks = localStorage.getItem("taskList");
  return storedTasks ? JSON.parse(storedTasks) : [];
};

// Saving tasks to local storage
export const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem("taskList", JSON.stringify(tasks));
};
