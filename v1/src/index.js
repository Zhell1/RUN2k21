
const rootApp = document.getElementById("root");

window.clicked = function () {
  console.log("clicked");
  var button = document.getElementById("mybutton");
  button.innerHTML = "clicked";
  presto()
};
//test

rootApp.innerHTML = `
  <button id="mybutton" onclick="clicked()">
  ON
  </button>`;
