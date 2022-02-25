const header = document.querySelector(".headerText");

const content = document.querySelector(".quizContent");
const subContent = document.querySelector(".subContent");
const qImage = document.querySelector(".quizImage");
const qCategory = document.querySelector(".quizCategory");
const choiceContent = document.querySelector(".choiceContent");

// const quizPosition = sessionStorage.getItem("level");
var quizPosition = sessionStorage.getItem("level");
if (quizPosition == null) {
  quizPosition =10;
}

const category = [1, 2, 1, 4, 3, 1, 1, 4, 2, 5, 4, 2, 1, 4, 1, 3, 1, 5, 2, 5];
const categoryText = ["①", "②", "③", "④", "⑤"];

const hintList = new Array();

header.innerHTML = "문제 " + quizPosition;
  
qImage.src = "./images/Q" + quizPosition + "_img.jpg";
qCategory.innerHTML = "유형 " + categoryText[category[quizPosition-1]-1];

window.onload = function() {

  var contentHeight = content.offsetHeight;
  var qImageHeight = qImage.offsetHeight;

  if (contentHeight < qImageHeight) {
    content.style.height = qImageHeight + "px";
    subContent.style.height = qImageHeight + "px";
  }

  if (category[quizPosition-1] == 5) {
    var choiceHeight = choiceContent.offsetHeight;
    var subPchoice = qImageHeight + choiceHeight;
    if (contentHeight < subPchoice) {
      content.style.height = subPchoice + "px"
    }
  } else { choiceContent.style.display = "none"; }
}