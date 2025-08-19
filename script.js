const input = document.getElementById("newTask");
const addBtn = document.getElementById("addTaskBtn");
const todoList = document.querySelector("#todo .task-list");
let draggedTask = null;

function createTask(text) {
  const task = document.createElement("div");
  task.className = "task";
  task.textContent = text;
  task.setAttribute("draggable", "true");

  task.addEventListener("dragstart", (e) => {
    draggedTask = task;
  });

  task.addEventListener("dragend", () => {
    draggedTask = null; // cleanup
  });

  return task;
}

document.querySelectorAll(".task-list").forEach((list) => {
  list.addEventListener("dragover", (e) => e.preventDefault());

  list.addEventListener("drop", (e) => {
    e.preventDefault();
    if (draggedTask) {
      list.appendChild(draggedTask); // move existing task
    }
  });
});

function addTask() {
  const text = input.value.trim();
  if (text !== "") {
    const task = createTask(text);
    todoList.appendChild(task);
    input.value = ""; // clear input
  }
}
// Add task on button click
addBtn.addEventListener("click", addTask);

input.addEventListener("keydown", (e) => {
  console.log(e.key);
  if (e.key === "Enter") {
    addTask();
  }
});
