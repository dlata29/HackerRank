const suggestionList = document.getElementById("suggestions");

let countries = [];
async function loadCountries() {
  const API_URL = "https://countriesnow.space/api/v0.1/countries";
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    // console.log(data.data);

    countries = data.data
      .map((c) => (c = c.country))
      .filter(Boolean)
      .sort();

    return countries;
  } catch (err) {
    console.error("Failed to load countries:", err.message);
  }
}

function printFirst(n = 10) {
  console.log("First", n, "countries:", countries.slice(0, n));
}
function searchCountries(query) {
  return countries.filter((c) => {
    return c.toLowerCase().includes(query.toLowerCase());
  });
}

function renderResults(matches) {
  
}

document.addEventListener("DOMContentLoaded", async () => {
  console.log("hi");
  await loadCountries();
  console.log("hmm");
  printFirst();

  const searchInput = document.getElementById("searchBox");
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.trim();
    const len = query.length;
    if (query.length === 0) {
      renderResults([]);
      return;
    }
    const matches = searchCountries(query);
    console.log(matches);
    renderResults(matches);
  });
});
