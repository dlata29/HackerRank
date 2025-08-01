async function loadTasks() {
  const res = await fetch("data.json");
  const data = await res.json();

  for (const [status, tasks] of Object.entries(data)) {
    const fetchedColumn = document.querySelector(`[data-status="${status}"]`);
    if (!fetchedColumn) continue;

    tasks.forEach((task) => {
      const card = document.createElement("div");
      card.className = "card";
      card.setAttribute("draggable", "true");
      card.dataset.id = task.id;
      card.innerHTML = `
        <strong>${task.name}</strong>
        <p>${task.description}</p>
      `;
      fetchedColumn.appendChild(card);
    });
  }
}

loadTasks();
