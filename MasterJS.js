// const tabs = document.querySelectorAll(".subTab");
// const contents = document.querySelectorAll(".contentBox");

// tabs.forEach((tab) => {
//   tab.addEventListener("click", () => {
//     // Remove all active styles and hide all contents
//     tabs.forEach((t) => t.classList.remove("activeHeader"));
//     contents.forEach((c) => (c.style.display = "none"));

//     // Add active styles to clicked tab and show its content
//     tab.classList.add("activeHeader");
//     document.getElementById(tab.dataset.content).style.display = "block";
//   });
// });

document.getElementById("openModal").onclick = () => {
  document.getElementById("modalBackdrop").classList.add("show");
};

document.querySelector(".close-btn").onclick = () => {
  document.getElementById("modalBackdrop").classList.remove("show");
};
