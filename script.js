const input = document.getElementById("newTask");
const addBtn = document.getElementById("addTaskBtn");
const todoList = document.querySelector("#todo .task-list");
let draggedTask = null;

function createTask(text) {
  const task = document.createElement("div");
  task.className = "task";
  task.setAttribute("draggable", "true");

  const content = document.createElement("div");
  content.className = "task-content";
  content.textContent = text;

  const taskBtn = document.createElement("button");
  taskBtn.className = "taskBtn";
  taskBtn.textContent = "Reply";

  const replies = document.createElement("div");
  replies.className = "replies"; // nested replies container

  // drag events
  task.addEventListener("dragstart", (e) => {
    draggedTask = task;
    task.classList.add("dragging");
  });

  task.addEventListener("dragend", () => {
    draggedTask = null;
    task.classList.remove("dragging");
  });

  // reply button event
  taskBtn.addEventListener("click", () => {
    const replyText = prompt("Enter your reply:");
    if (replyText) {
      const replyTask = createTask(replyText);
      replies.appendChild(replyTask);
    }
  });

  task.appendChild(content);
  task.appendChild(taskBtn);
  task.appendChild(replies);

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
