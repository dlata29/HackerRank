if (s.length !== t.length) return false;

let count = new Array(26).fill(0); // Array to store character frequencies

for (let i = 0; i < s.length; i++) {
  count[s.charCodeAt(i) - 97]++; // Increment for s
  count[t.charCodeAt(i) - 97]--; // Decrement for t
}

return count.every((val) => val === 0);

//map method
// if (s.length !== t.length) return false;

// let map = new Map();

// for (let char of s) {
//     map.set(char, (map.get(char) || 0) + 1);
// }

// for (let char of t) {
//     if (!map.has(char) || map.get(char) === 0) return false;
//     map.set(char, map.get(char) - 1);
// }

// return true;
