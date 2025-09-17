const user = {
  name: "Divya",
  age: 25,
  greet() {
    console.log("Hello " + this.name); // ✅ `this` refers to `user`
  },
  updateAge(newAge) {
    this.age = newAge; // ✅ modifies `user.age`
  },
};
user.greet();

