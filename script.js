function Person(name) {
  this.name = name;
}
Person.prototype.greet = function () {
  console.log("hello", this.name);
};

const a = new Person("divya");
a.greet();
