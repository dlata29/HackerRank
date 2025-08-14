class BankAccount {
  #balance = 0;

  checkAmountType(amount) {
    if (typeof amount !== "number" && amount < 0) {
      return false;
    }
  }

  deposit(amount) {
    let amountType = this.checkAmountType(amount);
    if (amountType) {
      this.#balance += amount;
    } else {
      throw new Error("Entered amount is invalid");
    }
  }

  getBalance() {
    return this.#balance;
  }
}

const acc = new BankAccount();
acc.deposit(100);
console.log(acc.getBalance());
