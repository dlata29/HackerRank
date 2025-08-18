let comments = JSON.parse(localStorage.getItem("comments")) || [];

function saveComments() {
  localStorage.setItem("comments", JSON.stringify(comments));
}

const container = document.getElementById("commentsSection");

function renderAllComments(commentsArr, container) {
  container.innerHTML = ""; // clear before re-rendering
  commentsArr.forEach((comment) => renderComment(comment, container));
}

function renderComment(comment, container) {
  const div = document.createElement("div");
  div.className = "comment";

  // text content
  const span = document.createElement("span");
  span.textContent = comment.text;
  div.appendChild(span);

  const replyBtn = document.createElement("button");
  replyBtn.textContent = "Reply";
  replyBtn.style.marginLeft = "10px";
  div.appendChild(replyBtn);

  const replyForm = document.createElement("div");
  replyForm.className = "reply-form";

  const replyInput = document.createElement("input");
  replyInput.type = "text";
  replyInput.placeholder = "Write a reply...";

  const replySubmit = document.createElement("button");
  replySubmit.textContent = "Add Reply";

  replyForm.appendChild(replyInput);
  replyForm.appendChild(replySubmit);
  div.appendChild(replyForm);

  replyBtn.addEventListener("click", () => {
    replyForm.style.display =
      replyForm.style.display === "none" || replyForm.style.display === "" ? "block" : "none";
  });

  replySubmit.addEventListener("click", () => {
    const text = replyInput.value.trim();
    if (!text) return;
    if (!Array.isArray(comment.replies)) comment.replies = [];
    comment.replies.push({ text, replies: [] });
    saveComments();
    renderAllComments(comments, document.getElementById("commentsSection"));
    replyInput.value = "";
    replyForm.style.display = "none";
  });

  container.appendChild(div);
}

document.getElementById("addCommentBtn").addEventListener("click", () => {
  const input = document.getElementById("newComment");
  const text = input.value.trim();
  if (!text) return;

  comments.push({ text, replies: [] });
  saveComments();
  renderAllComments(comments, document.getElementById("commentsSection"));
  input.value = "";
});
renderAllComments(comments, document.getElementById("commentsSection"));
