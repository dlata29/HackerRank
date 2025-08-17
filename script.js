const input = document.getElementById("taskInput");

const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
// renderTodos();

addBtn.addEventListener("click", () => {
  let userIp = input.value;

  if (userIp === "") return;

  todos.push({ userIp, completed: false });
  saveTodos();
  renderTodos();
  input.value = "";
});

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

console.log(todos);
function renderTodos() {
  taskList.innerHTML = "";

  todos.forEach((todo, index) => {
    const div = document.createElement("div");
    div.className = "todo-item";

    const span = document.createElement("span");
    span.textContent = todo.userIp;

    if (todo.completed) {
      span.classList.add("completed");
    }

    span.addEventListener("click", () => {
      todos[index].completed = !todos[index].completed;
      saveTodos();
      renderTodos();
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.addEventListener("click", () => {
      todos.splice(index, 1); // remove from array
      saveTodos();
      renderTodos();
    });

    div.appendChild(span);
    div.appendChild(delBtn);
    taskList.appendChild(div);
  });
}
