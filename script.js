const input = document.getElementById("searchBox");
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
    console.log(countries);
    console.log("Loaded countries:", countries.length);
  } catch (err) {
    console.error("Failed to load countries:", err.message);
  }
}

function printFirst(n = 10) {
  console.log("First", n, "countries:", countries.slice(0, n));
}

document.addEventListener("DOMContentLoaded", () => {
  loadCountries();
});
