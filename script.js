// Object spread
const defaults = {
  theme: "dark",
  language: "en",
  sayhi: function () {
    let x = 5;
    return x;
  },
};

const obj1 = structuredClone(defaults);
console.log(obj1);
