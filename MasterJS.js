/* ===== PaperTag Prototype Logic ===== */

/* -------- helpers -------- */
function randomTag() {
  return String(Math.floor(1000 + Math.random() * 9000)); // 1000‑9999
}
function tagExists(tag) {
  return localStorage.getItem(`papertag:${tag}`) !== null;
}

/* -------- create -------- */
const generateBtn = document.getElementById("generateBtn");
const contentInput = document.getElementById("contentInput");
const newTagEl = document.getElementById("newTag");

generateBtn.addEventListener("click", () => {
  const content = contentInput.value.trim();
  if (!content) {
    alert("Enter a link or note first!");
    return;
  }

  // find an unused 4‑digit tag
  let tag;
  do {
    tag = randomTag();
  } while (tagExists(tag));

  // save mapping
  localStorage.setItem(`papertag:${tag}`, content);

  // UI feedback
  newTagEl.textContent = `Your tag: ${tag}`;
  contentInput.value = "";
});

/* -------- retrieve -------- */
const retrieveBtn = document.getElementById("retrieveBtn");
const tagInput = document.getElementById("tagInput");
const resultArea = document.getElementById("resultArea");

retrieveBtn.addEventListener("click", () => {
  const tag = tagInput.value.trim();
  if (tag.length !== 4) {
    alert("Please enter a 4‑digit tag");
    return;
  }

  const data = localStorage.getItem(`papertag:${tag}`);
  resultArea.textContent = data ? `📄 Content for #${tag}\n\n${data}` : "Tag not found.";
});
