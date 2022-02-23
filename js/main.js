const box = document.querySelector(".mainBox");
const boxWidth = box.offsetWidth;
const boxHeight = box.offsetHeight;

function createCircle() {
  var circle = document.createElement("div");
  circle.classList.add("circle");
  circle.setAttribute("style", "top:" + 100 + "px");
  box.appendChild(circle);

  console.log(document.querySelector(".circle").getBoundingClientRect().top);
}

function rand(max) {
  return Math.floor(Math.random() * max) + 1;
}

window.onload = function() {
  createCircle();
}