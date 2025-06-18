const container = document.getElementById("userContainer");
const url = "https://jsonplaceholder.typicode.com/users";

async function loadUsers() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("threw error");
    }

    const data = await response.json();

    console.log(data);

    data.forEach((item) => {
      const card = document.createElement("div");
      card.className = "card";
      card.textContent = item.name;
      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = "<p class='text-danger'>Error loading users.</p>";
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", loadUsers);
