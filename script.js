const suggestionList = document.getElementById("suggestions");

let countries = [];
async function loadCountries() {
  const API_URL = "https://countriesnow.space/api/v0.1/countries";
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    console.log(data.data);

    countries = data.data;
    // .map((c) => (c = c.country))
    // .filter(Boolean)
    // .sort();

    console.log(countries[0]);
    console.log(countries[1]);
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
    return JSON.stringify(c.country).toLowerCase().includes(query.toLowerCase());
  });
}

const dvResults = document.querySelector(".dvResults");
function renderCountryDetails(country) {}

function renderResults(matches) {
  const suggestionList = document.getElementById("suggestions");
  suggestionList.innerHTML = "";

  if (matches.length > 0) {
    suggestionList.style.display = "block"; // 👈 show when results exist
    matches.forEach((match) => {
      const li = document.createElement("li");
      li.className = "dvSuggestion";
      li.textContent = match.country;
      suggestionList.appendChild(li);

      li.addEventListener("click", () => {
        renderCountryDetails(li.textContent);
      });
    });
  } else {
    suggestionList.style.display = "none"; // 👈 hide when empty
  }
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
