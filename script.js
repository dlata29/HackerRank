"use strict";
let age = prompt("What is your age?", 18);

// conditionally declare a function
if (age < 18) {
  function aa() {
    console.log("Hello!");
  }
} else {
  function aa() {
    console.log("Greetings!");
  }
}

// ...use it later
console.log(aa()); // Error: welcome is not defined
