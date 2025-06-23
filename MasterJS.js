<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sortable & Filterable Data Table</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }

    input[type="text"] {
      margin-bottom: 15px;
      padding: 8px;
      width: 100%;
      max-width: 300px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }

    th, td {
      border: 1px solid #ccc;
      padding: 12px;
      text-align: left;
    }

    th {
      background: #f4f4f4;
      cursor: pointer;
      position: sticky;
      top: 0;
      z-index: 1;
    }

    tr:hover {
      background-color: #f9f9f9;
    }
  </style>
</head>
<body>

  <h2>Employee Directory</h2>
  <input type="text" id="searchInput" placeholder="Search by name or department..." />

  <table id="dataTable">
    <thead>
      <tr>
        <th data-column="name">Name</th>
        <th data-column="department">Department</th>
        <th data-column="age">Age</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Alice Johnson</td><td>Marketing</td><td>29</td></tr>
      <tr><td>Bob Smith</td><td>Sales</td><td>35</td></tr>
      <tr><td>Claire Adams</td><td>HR</td><td>32</td></tr>
      <tr><td>David Miller</td><td>Engineering</td><td>41</td></tr>
      <tr><td>Emily Davis</td><td>Finance</td><td>27</td></tr>
    </tbody>
  </table>

  <script>
    const searchInput = document.getElementById("searchInput");
    const table = document.getElementById("dataTable");
    const tbody = table.querySelector("tbody");
    let rows = Array.from(tbody.querySelectorAll("tr"));

    // Filter logic
    searchInput.addEventListener("input", () => {
      const search = searchInput.value.toLowerCase();
      rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        const match = Array.from(cells).some(td => td.textContent.toLowerCase().includes(search));
        row.style.display = match ? "" : "none";
      });
    });

    // Sort logic
    let sortDirection = true; // true = ascending
    table.querySelectorAll("th").forEach((th, index) => {
      th.addEventListener("click", () => {
        rows.sort((a, b) => {
          const cellA = a.children[index].textContent.trim().toLowerCase();
          const cellB = b.children[index].textContent.trim().toLowerCase();
          return sortDirection
            ? cellA.localeCompare(cellB, undefined, { numeric: true })
            : cellB.localeCompare(cellA, undefined, { numeric: true });
        });
        sortDirection = !sortDirection;
        tbody.innerHTML = "";
        rows.forEach(row => tbody.appendChild(row));
      });
    });
  </script>

</body>
</html>
