const header = document.querySelector(".headerText");

const content = document.querySelector(".quizContent");
const subContent = document.querySelector(".subContent");
const qImage = document.querySelector(".quizImage");
const qCategory = document.querySelector(".quizCategory");
const choiceContent = document.querySelector(".choiceContent");

const hintButton = document.querySelector(".headerHint");
const hintContent = document.querySelector(".hintContent");
const hintText = document.querySelector(".hintText");

const answerArea = document.querySelector(".answerArea");
const answerButton = document.querySelector(".answerButton");

// const quizPosition = sessionStorage.getItem("level");
var quizPosition = sessionStorage.getItem("level");
if (quizPosition == null) {
  quizPosition = 1;
}

var hintCheck = true;

const category = [1, 2, 1, 4, 3, 1, 1, 4, 2, 5, 4, 2, 1, 4, 1, 3, 1, 5, 2, 5];
const categoryText = ["①", "②", "③", "④", "⑤"];

const hintList = new Array();
const answerList = new Array();

header.innerHTML = "문제 " + quizPosition;
  
qImage.src = "./images/Q" + quizPosition + "_img.jpg";
qCategory.innerHTML = "유형 " + categoryText[category[quizPosition-1]-1];

window.onload = function() {

  var contentHeight = content.offsetHeight;
  var qImageHeight = qImage.offsetHeight;

  if (contentHeight < qImageHeight) {
    content.style.height = qImageHeight + "px";
    subContent.style.height = qImageHeight + "px";

    contentHeight = content.offsetHeight;
  }

  if (category[quizPosition-1] == 5) {
    var choiceHeight = choiceContent.offsetHeight;
    var subPchoice = qImageHeight + choiceHeight;
    if (contentHeight < subPchoice) {
      content.style.height = subPchoice + "px"
    }
  } else { choiceContent.style.display = "none"; }

  hintButton.addEventListener("click", function() {
    hintCheck = false;
    hintText.innerHTML = hintList[quizPosition-1];
    let timeline = gsap.timeline({ linear: Linear.easeNone });

    if (category[quizPosition-1] == 5 || contentHeight < qImageHeight * 1.5) {
      hintContent.style.color = "white";
      hintContent.style.backgroundColor = "#00000088"
      hintContent.style.height = qImageHeight + "px";
      hintContent.style.width = qImage.offsetWidth + "px";

      timeline.set( hintContent, {
        zIndex: 1,
        opacity: 0,
        position: "absolute"
      });
      timeline.to( hintContent, {
        keyframes: [
          {
            duration: 3,
            opacity: 1
          }
        ]
      });
      timeline.to( hintContent, {
        onComplete: end,
        keyframes: [
          {
            duration: 3,
            opacity: 0,
            delay: 2
          }
        ]
      });
      timeline.set( hintContent, {
        zIndex: 0,
        position: "static"
      });
      
      function end() {
        hintContent.style.height = 0 + "px";
      }
    } else {
      var height = contentHeight - qImageHeight;
      hintContent.style.height = height + "px";
      hintContent.style.width = qImage.offsetWidth + "px";

      var topMove = qImageHeight + content.getBoundingClientRect().top;
      console.log(topMove);

      timeline.set( hintContent, {
        zIndex: -1,
        position: "absolute"
      });
      timeline.to( hintContent, {
        keyframes: [
          {
            duration: 1.5,
            top: topMove + "px"
          }
        ]
      });
      timeline.to( hintContent, {
        onComplete: end,
        keyframes: [
          {
            duration: 1.5,
            top: 0 + "px",
            delay: 3
          }
        ]
      });
      timeline.set( hintContent, {
        zIndex: 0,
        position: "static"
      });
      
      function end() {
        hintContent.style.height = 0 + "px";
      }
    }
  });

  answerArea.addEventListener("keyup", function(e) {
    if (e.keyCode == 13) {
      returnMain();
    }
  });

  answerButton.addEventListener("click", function() {
    returnMain();
  });
}

function returnMain() {
  var score = sessionStorage.getItem("score");
  var minus = 0;

  var passArr = JSON.parse(sessionStorage.getItem("pass"));
  passArr[quizPosition-1] = true;

  if (!hintCheck) {
    if (category[quizPosition-1] == 3 || category[quizPosition-1] == 4) {
      minus = 4;
    } else {
      minus = 3
    }
  }

  if (answerArea.value != answerList[quizPosition-1]) {
    minus = 5;
  }

  sessionStorage.setItem("score", score + 5 - minus);
  sessionStorage.setItem("pass", JSON.stringify(passArr));

  window.location.href = "./main.html";
}