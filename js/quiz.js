const header = document.querySelector(".headerText");

const content = document.querySelector(".quizContent");
const subContent = document.querySelector(".subContent");
const qImage = document.querySelector(".quizImage");
const qCategory = document.querySelector(".quizCategory");
const qScript = document.querySelector(".quizScript");

const choiceContent = document.querySelector(".choiceContent");

const hintButton = document.querySelector(".headerHint");
const hintContent = document.querySelector(".hintContent");
const hintText = document.querySelector(".hintText");

const answerArea = document.querySelector(".answerArea");
const answerButton = document.querySelector(".answerButton");

const quizPosition = sessionStorage.getItem("level");
// var quizPosition = sessionStorage.getItem("level");
// if (quizPosition == null) {
//   quizPosition = 4;
// }

var hintCheck = true;

const category = [1, 2, 1, 4, 3, 1, 1, 4, 2, 5, 4, 1, 2, 2, 5, 3, 2, 5, 4, 1];
const categoryText = ["①", "②", "③", "④", "⑤"];

const hintList = [
  "ㅇㅅ ㄴㄹ ㅇㄴ ㅅㄹㅇ",
  "ㅇㄷㅊㄴ ㅇㄸ ㅇㅇㄷ ㅅㅇ ㅇㄱ ㅎㄴㄲㅇ",
  "ㅍㅂㅇ ㅇㄱㅎㄴ ㄱㄷ ㅇㅅㅎㅈㄷ",
  "ㄴㄴ",
  "'회식 가요'를 말한 사람",
  "ㅈㅉ ㄱㅊㅇ",
  "ㅇㅍㅁㅅ ㅁㅅ ㅅㄹㅇ",
  "ㅊㅈㅈㅂ",
  "ㅈㄱㅁ",
  "해당 회차 : 4화",
  "이 ㄴㄹ 덕분이지",
  "ㅇㄷㅊㄴ ㄴㄱ ㅌㅂㅎㄴㄲ",
  "ㅇㅇㅅㅋㅍ ㄴㅇㅅㄴㄷ",
  "ㅇ ㄷㄱㄷ",
  "해당 회차 : 11화",
  "'너한테 미움받기 싫은데'를 말한 사람",
  "ㅂㅇ",
  "해당 회차 : 9화",
  "이제 ㅁㅂ도 못 쓰면서 대단하네",
  "ㅈㅉ?"
];

const answerList = [
  "역시 능력 있는 사람은",
  "아다치는 어떤 일이든 성의 있게 하니까요",
  "평범을 연기하는 것도 익숙해졌다",
  "나는",
  "롯카쿠 유타",
  "진짜 괜찮아",
  "아프면서 무슨 소리야",
  "천재지변",
  "조금만",
  "3",
  "능력",
  "아다치는 내게 특별하니까",
  "아이스커피 나왔습니다",
  "안 되겠다",
  "1",
  "쿠로사와 유이치",
  "받아",
  "2",
  "마법",
  "진짜?"
];

const choice10 = [
  "개한테 상담하는 수밖에 없어",
  "아다치, 왜 그래?",
  "이 사람 엄청 좋은 사람이잖아",
  "걱정시키지 마, 바보야"
];

const choice15 = [
  "마법에 너무 의존하지 말라는 거다!",
  "공보전 힘내",
  "기운 나게 해주려고 왔는데",
  "그 애를 좋아하지?"
];

const choice18 = [
  "10월 28일",
  "아다치의 희귀 사진, 득템!",
  "아다치는 연애해본 적 없다고?",
  "'응'이라니"
];

const scripts = [
  "그런 점을 ㅁㅁ...",
  "ㅁㅁㅁㅁ이 발생했어",
  "이 ㅁㅁ 덕분이지",
  "이제 ㅁㅁ도 못 쓰면서 대단하네"
]

// 4번 (1-2) : 그런 점을 [나는]... -> 나는
// 8번 (4-2) : [천재지변]이 발생했어 -> 천재지변
// 11번 (5-2) : 이 [능력] 덕분이지 -> 능력
// 19번 (12-2) : 이제 [마법]도 못 쓰면서 대단하네
header.innerHTML = "문제 " + quizPosition;
  
qImage.src = "./images/Q" + quizPosition + "_img.jpg";
qCategory.innerHTML = "유형 " + categoryText[category[quizPosition-1]-1];

window.onload = function() {

  var contentHeight = content.offsetHeight;
  var qImageHeight = qImage.offsetHeight;

  qScript.style.display = "none";

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

    var choiceList = [];
    if (quizPosition == 10) {
      choiceList = choice10;
    } else if (quizPosition == 15) {
      choiceList = choice15;
    } else {
      choiceList = choice18;
    }

    document.querySelector(".c1").innerText = "1. " + choiceList[0];
    document.querySelector(".c2").innerText = "2. " + choiceList[1];
    document.querySelector(".c3").innerText = "3. " + choiceList[2];
    document.querySelector(".c4").innerText = "4. " + choiceList[3];

  } else { choiceContent.style.display = "none"; }

  if (quizPosition == 4 || quizPosition == 8 || quizPosition == 11 || quizPosition == 19) {
    qScript.style.display = "block";

    if (quizPosition == 4) {
      qScript.innerText = scripts[0];
    } else if (quizPosition == 8) {
      qScript.innerText = scripts[1];
    } else if (quizPosition == 11) {
      qScript.innerText = scripts[2];
    } else {
      qScript.innerText = scripts[3];
    }

    var bottom = qImage.offsetHeight - qScript.offsetHeight - 10;
    var left = (qImage.offsetWidth / 2) - (qScript.offsetWidth / 2);
    qScript.style.top = bottom + "px";
    qScript.style.left = left + "px";
  }

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
  if (answerArea.value == "") {
    alert("답을 작성해주세요.");
    
    return;
  }

  var score = Number(sessionStorage.getItem("score"));
  var minus = 0;

  var passArr = JSON.parse(sessionStorage.getItem("pass"));
  passArr[quizPosition-1] = true;

  if (!hintCheck) {
    if (category[quizPosition-1] == 3 || category[quizPosition-1] == 4) {
      minus = 4;
    } else {
      minus = 2
    }
  }

  if (answerArea.value != answerList[quizPosition-1]) {
    minus = 5;
  }

  sessionStorage.setItem("score", score + 5 - minus);
  sessionStorage.setItem("pass", JSON.stringify(passArr));

  window.location.href = "./main.html";
}