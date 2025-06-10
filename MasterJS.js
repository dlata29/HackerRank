const ip = document.querySelector(".ip");
const op = document.querySelectorAll(".op");

function newRecord(event) {
  op.textContent = ip.ariaValueMax;
}
const dedounceIp = debounce(newRecord, 1000);

document.getElementsByClassName(ip).addEventListener("input", dedounceIp);
