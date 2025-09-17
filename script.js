class Animal {
  constructor(type) {
    this.type = type;
  }

  walk() {
    console.log(this.type, "is walking");
  }
}

class Dog extends Animal {
  constructor(nm, name) {
    super(nm);
    this.name = name;
  }
}

const c1 = new Dog("divya", "saurav");
c1.walk();
