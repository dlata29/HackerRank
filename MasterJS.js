const container = document.getElementById("userContainer");
const pagination = document.getElementById("pagination");
const url = "https://jsonplaceholder.typicode.com/users";

const usersPerPage = 4;
let users = [];

async function loadUsers() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("threw error");
    }

    users = await response.json();
    showPage(1);
    createPaginationButtons();
  } catch (err) {
    container.innerHTML = "<p class='text-danger'>Error loading users.</p>";
    console.error(err);
  }
}

function showPage(num) {
  container.innerHTML = "";
  const start = (num - 1) * usersPerPage;
  const end = usersPerPage + start;
  const paginatedUsers = users.slice(start, end);

  paginatedUsers.forEach((user) => {
    const card = document.createElement("div");
    card.className = "card";
    card.textContent = user.name;
    container.appendChild(card);
  });

  const allButtons = document.querySelectorAll("#pagination button");
  allButtons.forEach((btn) => btn.classList.remove("active"));
  if (allButtons[num - 1]) {
    allButtons[num - 1].classList.add("active");
  }
}

function createPaginationButtons() {
  const totalPages = Math.ceil(users.length / usersPerPage);
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.addEventListener("click", () => showPage(i));
    pagination.appendChild(btn);
  }
}

document.addEventListener("DOMContentLoaded", loadUsers);
