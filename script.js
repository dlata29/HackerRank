let tasks = [];
let currentFilter = "all";

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterBtns = document.querySelectorAll(".filters button");

function render() {
  taskList.innerHTMLhtml = "";

  let filteredTasks = tasks.filter((task) => {
    if (currentFilter === "active") return !task.completed;
    if (currentFilter === "completed") return task.completed;
    return true; // all
  });

  filteredTasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task";
    li.innerHTML = `
    <span class="${task.completed ? "completed" : " "}">
    
    `;
    taskList.textContent += task.ip;
  });
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
