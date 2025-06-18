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
    for (i = 0; i < data.length; i++) {
      const user = data[i];

      const cardWrapper = document.createElement("div");
      cardWrapper.className = "col-md-6 mb-4";

      const card = document.createElement("div");
      card.className = "card p-3 shadow-sm text-center";
      card.textContent = user.name;

      cardWrapper.appendChild(card);
      container.appendChild(cardWrapper);
    }
  } catch (err) {
    container.innerHTML = "<p class='text-danger'>Error loading users.</p>";
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", loadUsers);
