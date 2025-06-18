const ip = document.getElementsByClassName("ip")[0];
const op = document.getElementsByClassName("op")[0];
const close = document.getElementsByClassName("closeBtn")[0];

function deleteItem(val) {
  const existing = JSON.parse(localStorage.getItem("todo")) || [];
  const toBeDeleted = existing.filter((v) => v !== val);
  localStorage.setItem("todo", JSON.stringify(toBeDeleted));
}

function getLocal() {
  let result = JSON.parse(localStorage.getItem("todo")) || [];
  result.forEach((val) => {
    const div = document.createElement("div");
    div.className = "dvLine";
    div.textContent = val;
    op.appendChild(div);
  });
  console.log(localStorage.getItem("todo"));
}
document.addEventListener("DOMContentLoaded", function () {
  getLocal();
});
function debounce(func, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

function newRecord(event) {
  const value = ip.value.trim();
  if (value === "") return;
  const div = document.createElement("div");
  div.className = "dvLine";
  div.textContent = value;

  const span = document.createElement("span");
  span.textContent = " ✖"; // add space before for padding
  span.className = "closeBtn"; // optional, for styling
  span.style.cursor = "pointer";
  span.addEventListener("click", function () {
    div.remove(); // Remove from DOM
    deleteItem(value);
  });

  div.appendChild(span);

  op.appendChild(div);

  const existing = JSON.parse(localStorage.getItem("todo")) || [];
  existing.push(value);
  localStorage.setItem("todo", JSON.stringify(existing));
  ip.value = "";
}
const dedounceIp = debounce(newRecord, 1000);

ip.addEventListener("input", dedounceIp);
