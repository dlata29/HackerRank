const headers = document.querySelectorAll(".label");

headers.forEach((header) => {
  header.addEventListener("click", () => {
    const content = header.nextElementSibling;

    document.querySelectorAll(".content").forEach((c) => {
      if (c !== content) {
        c.classList.remove("open");
      }
    });

    content.classList.toggle("open");
  });
});
