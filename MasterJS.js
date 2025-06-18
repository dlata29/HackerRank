async function loadVals() {
  try {
    const url = "https://jsonplaceholder.typicode.com/users";

    const response = await fetch(url);

    if (!response.ok) {
      console.log("error in fetch");
      throw new Error(`HTTPS status : ${response.status}`);
    }

    const data = await response.json();

    const container = document.getElementById("ans");

    for (i = 0; i < data.length; i++) {
      if (i % 3 === 0) {
        var row = document.createElement("div");
        row.className = "row";
        container.appendChild(row);
      }

      const card = document.createElement("div");
      card.className = "card";
      card.textContent = data[i].name;
      row.appendChild(card);
    }
  } catch (error) {
    console.log("error in main", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadVals();
});
