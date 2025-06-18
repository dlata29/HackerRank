async function loadVals() {
  try {
    const url = "https://jsonplaceholder.typicode.com/users";

    const response = await fetch(url);

    if (!response.ok) {
      console.log("error in fetch");
      throw new Error(`HTTPS status : ${response.status}`);
    }

    const data = await response.json();
    console.log(data.length);
    let len = data.length;

    const container = document.getElementById("container");

    for (i = 0; i < data.length; i++) {
      if (i % 3 == 0) {
        var row = document.createElement("div");
        row.className("newRow");
        container.appendChild(row);
      }

      const card = document.createElement("div");
      card.className = "ele";
      card.textContent = data.title;
      row.appendChild(card);
    }
  } catch (error) {
    console.log("error in main", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadVals();
});
