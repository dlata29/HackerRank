const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("p1 resole");
  }, 1000);
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("p2 resole");
  }, 1000);
});
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("p3 resole");
  }, 1000);
});

Promise.any([p1, p2, p3])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.error(err.errors));
