document.addEventListener("DOMContentLoaded", function (event) {
  let ip = document.getElementById("ip");

  let op = document.getElementById("op");

  ip.addEventListener("input", () => {
    op.innerHTML = ip.value.length;
    console.log(typeof ip.value);
  });
});
