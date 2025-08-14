// function Bank(initial) {
//   this.initial = initial;
// }

// Bank.prototype.add = function (amount) {
//   return this.initial + amount;
// };

class Bank {
  constructor() {
    this.initial = 0;
  }

  add(amount) {
    return (this.initial = this.initial + amount);
  }
  get bal() {
    return this.initial;
  }
}

const p1 = new Bank();
console.log(p1.add(200));
const p2 = new Bank();
console.log(p2.add(100));
console.log(p2.bal);
console.log(p1.bal);
