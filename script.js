let comments = JSON.parse(localStorage.getItem("comments")) || [];

function saveComments() {
  localStorage.setItem("comments", JSON.stringify(comments));
}

function renderAll() {
  const container = document.getElementById("commentsSection");
  container.innerHTML = "";

  comments.forEach((comment, index) => {
    const wrap = document.createElement("div");
    wrap.className = "comment";

    const text = document.createElement("p");
    text.textContent = comment.text;

    wrap.appendChild(text);
    container.appendChild(wrap);
  });
}

const addBtn = document.getElementById("addCommentBtn");
const input = document.getElementById("newComment");

addBtn.addEventListener("click", () => {
  const val = input.value.trim();
  if (!val) return;

  comments.push({ text: val, replies: [] });
  saveComments();
  renderAll();
  input.value = "";
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addBtn.click();
});
renderAll();
