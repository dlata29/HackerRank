function askQ(question, yes, no) {
  if (confirm(question)) {
    yes();
  } else {
    no();
  }
}

function showYes() {
  console.log("yay");
}

function showNo() {
  console.log("nooo");
}

askQ("do you agree", showYes, showNo);
