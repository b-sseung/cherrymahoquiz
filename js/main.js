import { RestartConfetti, DeactivateConfetti } from "./confetti_v2.js";
import { addRanking } from "./firebase.js";

const box = document.querySelector(".mainBox");
var boxWidth = box.offsetWidth;
var boxHeight = box.offsetHeight;
var boxX = box.getBoundingClientRect().left;
var boxY = box.getBoundingClientRect().top;

var sign = [-1, 1];

var dx = new Array();
var dy = new Array();

var circles = new Array();


const colors = new Array("#d8d4cb", "#fbc5c3", "#f2c292", "#f6da76",
  "#b1d690", "#b2dac2", "#97d7d7", "#a6ccdf", "#a7bede", "#cab6d2",
  "#f1c2cc", "#f8dfd8", "#f2d9ba", "#fdeca7", "#d3ecc5", "#d7ebdf",
  "#c7e7e6", "#ccdfe6", "#c7d0ed", "#d8ccda");

let numberOfShapes = 10;

let figureList = [
	"./images/figure1.png",
	"./images/figure2.png",
	"./images/figure3.png",
  "./images/figure4.png",
  "./images/figure5.png",
  "./images/figure6.png"
];

var passArr = JSON.parse(sessionStorage.getItem("pass"));
if (passArr == null) {
  alert("잘못된 접근입니다.");
  window.location.href = "./entrance.html";
}

// var passArr = new Array();
// /*삭제하기*/
// for(var i = 0; i < 20; i++) {
//   passArr[i] = true;
// }

var clickValue = true;
const eventBox = document.querySelector(".eventBox");
const eventLabel = document.querySelector(".eventLabel");

const idBox = document.querySelector(".idBox");
const eventId = document.querySelector(".eventId");
const idCover = document.querySelector(".idCover");

const buttonBox = document.querySelector(".buttonBox");
const eventButton = document.querySelector(".eventButton");

window.onload = function() {
  eventBox.style.display = "none";
  buttonBox.style.display = "none";

  boxWidth = box.offsetWidth;
  boxHeight = box.offsetHeight;
  boxX = box.getBoundingClientRect().left;
  boxY = box.getBoundingClientRect().top;
  
  for (var i = 0; i < 20; i++) {
    createCircle(i);
  }

  var clearCheck = true;
  for (var i = 0; i < 20; i++) {
    if (passArr[i]) {
      box.removeChild(circles[i]);
    } else {
      clearCheck = false;
    }
  }

  if (clearCheck) {
    circleHidden();
    RestartConfetti();
    setTimeout(DeactivateConfetti, 5500);

    eventBox.style.display = "flex";

    var text = eventLabel.innerHTML.split("<br>");
    eventLabel.innerHTML = "";

    var tTime = 0;

    for (var i = 0; i < text.length; i++) {
      tTime = typingText(tTime, text[i], i);
    }

    setTimeout(function() {
      gsap.to(idCover,{
        duration: 2,
        left: idBox.offsetWidth
      });
    }, tTime);
  }

  eventId.addEventListener("click", function() {
    var id = prompt("아이디를 입력해주세요.");
    if (id != "" && id != null){
      if (id.indexOf("@") == -1) {
        id = "@" + id;
      }
      
      var score = sessionStorage.getItem("score");

      sessionStorage.setItem("id", id);

      addRanking(id, score);

      var timeline = gsap.timeline({ linear: Linear.easeNone });
      
      timeline.to(eventBox, {
        duration: 1,
        opacity: 0
      });

      timeline.set(eventBox, {
        display: "none"
      });

      timeline.set(buttonBox, {
        display: "flex",
        opacity: 0
      });

      timeline.to(buttonBox, {
        duration: 1,
        opacity: 1
      })
    }
  });

  eventButton.addEventListener("click", function() {
    window.location.href = "./rank.html";
  })
}

function typingText(tTime, text, num) {
  var tSplit = text.split("");
  var timeTemp = tTime;

  if (num != 3) {
    tSplit.push("<br>");
  }

  for (var i = 0; i < tSplit.length; i++) {
    setTimeout(function(temp) {
      eventLabel.innerHTML += temp;
      console.log(timeTemp);
    }, timeTemp, tSplit[i]);

    timeTemp += 100;
  }

  return timeTemp;
}

function createCircle(num) {
  var circle = document.createElement("div");
  circle.classList.add("circle");
  box.appendChild(circle);
  
  var temp = randMinMax(10, 50);
  circle.style.width = temp + "vmin";
  circle.style.height = temp + "vmin";

  
  var topTemp = randMax(boxHeight - circle.offsetHeight) + boxY;
  var leftTemp = randMax(boxWidth - circle.offsetWidth) + boxX;
  
  circle.style.top = topTemp + "px";
  circle.style.left = leftTemp + "px";

  var position = randMinMax(0, colors.length-1);
  circle.style.backgroundColor = colors[position];

  colors.splice(position, 1);
  circle.value = num;
  circle.style.zIndex = num;
  circles[num] = circle;

  circle.addEventListener("click", function() {
    if (!clickValue) return;

    clickValue = false;
    clearInterval(interval);
    let animatedShapes = [];

    for (var i = 0; i < numberOfShapes; i++) {
      let newElement = document.createElement("img");
      newElement.classList.add("figure");
      box.appendChild(newElement);
      newElement.style.zIndex = circle.value - 1;
      newElement.src = figureList[randMax(figureList.length-1)];
      
      var left = circle.getBoundingClientRect().left;
      var top = circle.getBoundingClientRect().top;
      var half = circle.offsetWidth / 2;

      newElement.style.top = (top + half) + "px";
      newElement.style.left = (left + half) + "px";

      animatedShapes.push(newElement);
    }

    setTimeout(animateFromLeft, 1000, circle.style.backgroundColor, circle.value);

    function killShapes() {
      animatedShapes.forEach((shape) => {
        box.removeChild(shape);
      });
    }

    gsap.to(animatedShapes, {
      onComplete: killShapes,
      keyframes: [
        {
          rotate: "random(180, -180)",
          x: "random([-150, -100, -200, -250, 250, 200, 100, 150])",
          y: "random([-150, -100, -200, -250, 250, 200, 100, 150])",
          ease: "expo.out",
          duration: 3,
          stagger: {
            amount: 0.1
          }
        },
        { opacity: 0, delay: -2 }
      ]
    });
  });

  dx[num] = 2 * sign[randMinMax(0, 1)];
  dy[num] = 2 * sign[randMinMax(0, 1)];

  var interval = setInterval(draw, 10, circle);
}

function randMax(max) {
  return Math.floor(Math.random() * max) + 1;
}

function randMinMax(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



function draw(circle) {

  var rect = circle.getBoundingClientRect();
  var x = rect.left; 
  var y = rect.top;
  var size = circle.offsetWidth;
  var num = circle.value;
  var xTemp = dx[num];
  var yTemp = dy[num];

  if(x + xTemp < boxX || x + xTemp > boxX + boxWidth - size) {
    dx[num] = -dx[num];
    xTemp = -xTemp;
  }
  if(y + yTemp < boxY || y + yTemp > boxY + boxHeight - size) {
    dy[num] = -dy[num];
    yTemp = -yTemp;
  }
    
  circle.style.top = (y + yTemp) + "px";
  circle.style.left = (x + xTemp) + "px";
}

function circleHidden() {
  box.style.display = "none";
  document.querySelector(".titleBox").style.display = "none";
}

function openQuiz(num) {
  sessionStorage.setItem("level", num + 1);

  window.location.href = "./quiz.html";
}

function animateFromLeft(color, num) {
	let tl = gsap.timeline({ ease: "power4.inOut" });

  tl.set(".container .tile", { background: color });

  tl.to(".container .tile", {
    onComplete: circleHidden,
    keyframes: [
      {
        duration: 0.4,
        width: "100%",
        left: "0%",
        delay: 0.2,
        stagger: 0.05
      }
    ]
  });

  tl.to(".container .tile", {
    onComplete: openQuiz,
    onCompleteParams: [num],
    keyframes: [
      {
        duration: 0.4,
        width: "100%",
        left: "100%",
        delay: 0.2,
        stagger: -0.05
      }
    ]
  });

	tl.set(".container .tile", { left: "0", width: "0" });
}
