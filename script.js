function greet(name, age, city) {
  console.log(`${this.name} is ${age} years old and lives in ${city}.`);
}

const obj1 = {
  name: "divya",
};

greet.apply(obj1, ["saurav", "30"]);
