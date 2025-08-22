let tasks = [];
let currentFilter = "all";

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterBtns = document.querySelectorAll(".filters button");

function render() {
  taskList.innerHTML = "";

  let filteredTasks = tasks.filter((task) => {
    if (currentFilter === "active") return !task.completed;
    if (currentFilter === "completed") return task.completed;
    return true; // all
  });

  filteredTasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task";
    li.innerHTML = `
    <div class="${task.completed ? "completed" : " "} eachTask">${task.ip}</div>
    <div>
      <button class="toggle" onClick="toggleTask(${task.id})">  ${
      task.completed ? "Undo" : "Done"
    }</button>
      <button  class="Delete" onClick="deleteTask(${task.id})">Delete</button>

    </div>
    `;
    taskList.appendChild(li);
  });
}

function toggleTask(id) {
  tasks = tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task));
  render();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  render();
}
function addTask(ip) {
  tasks.push({ id: Date.now(), ip, completed: false });
  taskInput.value = "";
  render();
}

addBtn.addEventListener("click", () => {
  const ip = taskInput.value.trim();

  if (!ip) return;

  addTask(ip);
});

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.getAttribute("data-filter");
    render();
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});
