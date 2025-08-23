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
function searchCountries(query, exact = false) {
  query = query.toLowerCase();

  return countries.filter((c) => {
    const name = c.country.toLowerCase();

    if (exact) {
      // ✅ Exact match
      return name === query;
    } else {
      // ✅ Partial match
      return name.includes(query);
    }
  });
}

function renderCountryDetails(country) {
  const dvDetails = document.createElement("div");
  dvDetails.className = "dvDetails";

  const finalResult = searchCountries(country, true)[0];
  if (!finalResult) return dvDetails;

  const iso = document.createElement("p");
  const cities = document.createElement("p");

  iso.textContent = "ISO Code: " + finalResult.iso2;
  cities.textContent = "Cities: " + finalResult.cities.join(", ");

  return dvDetails.append(iso, cities);
}

function renderResults(matches) {
  const dvResults = document.querySelector(".dvResults");
  dvResults.innerHTML = "";
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
        suggestionList.style.display = "none";
        const details = renderCountryDetails(li.textContent);
        dvResults.innerHTML = ""; // clear previous details
        dvResults.appendChild(details); // append DOM node
      });
    });
  } else {
    suggestionList.style.display = "none"; // 👈 hide when empty
  }
}
let matches = [];
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
    matches = searchCountries(query);
    console.log(matches);
    renderResults(matches);
  });
});
