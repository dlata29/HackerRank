const user = { profile: { name: "Divya" } };
console.log(user.profile?.name); // Divya
console.log(user.account?.balance); // undefined (no error!)
