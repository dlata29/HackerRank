let ip = document.getElementsByClassName("dvIp")[0];
let op = document.getElementsByClassName("dvText")[0];
let typingTimer; // Timer identifier
let doneTypingInterval = 500;

function searchP(input) {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      const curr = data.filter(
        (product) => product.title && product.title.toLowerCase().includes(input.toLowerCase())
      );

      const grid = document.getElementById("productGrid");
      grid.innerHTML = "";

      curr.forEach((product) => {
        grid.innerHTML += `
          <div class="product-card">
            <img src="${product.image}" alt="Product Image"  loading="lazy"/>
            <h4>${product.title}</h4>
            <p>${product.category}</p>
          </div>
        `;
      });
    })
    .catch((error) => console.error("Error:", error));
}

ip.addEventListener("input", function () {
  op.textContent += " ";
  clearTimeout(typingTimer);
  typingTimer = setTimeout(() => {
    let input = ip.value.trim();
    if (input) {
      op.textContent += input;
      searchP(input);
    } else {
      op.textContent = "you are searching for :";
    }
  }, doneTypingInterval);
});
