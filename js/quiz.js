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

var passArr = JSON.parse(sessionStorage.getItem("pass"));
if (passArr == null || quizPosition == null) {
  alert(decodeURI("%EC%9E%98%EB%AA%BB%EB%90%9C%20%EC%A0%91%EA%B7%BC%EC%9E%85%EB%8B%88%EB%8B%A4.")); //잘못된 접근입니다.
  window.location.href = "./entrance.html";
}

var hintCheck = true;

const category = [1, 2, 1, 4, 3, 1, 1, 4, 2, 5, 4, 1, 2, 2, 5, 3, 2, 5, 4, 1];
const categoryText = ["①", "②", "③", "④", "⑤"];

const hintList = [
  //ㅇㅅ ㄴㄹ ㅇㄴ ㅅㄹㅇ
  decodeURI("%E3%85%87%E3%85%85%20%E3%84%B4%E3%84%B9%20%E3%85%87%E3%84%B4%20%E3%85%85%E3%84%B9%E3%85%87"),
  //ㅇㄷㅊㄴ ㅇㄸ ㅇㅇㄷ ㅅㅇ ㅇㄱ ㅎㄴㄲㅇ
  decodeURI("%E3%85%87%E3%84%B7%E3%85%8A%E3%84%B4%20%E3%85%87%E3%84%B8%20%E3%85%87%E3%85%87%E3%84%B7%20%E3%85%85%E3%85%87%20%E3%85%87%E3%84%B1%20%E3%85%8E%E3%84%B4%E3%84%B2%E3%85%87"),
  //ㅍㅂㅇ ㅇㄱㅎㄴ ㄱㄷ ㅇㅅㅎㅈㄷ
  decodeURI("%E3%85%8D%E3%85%82%E3%85%87%20%E3%85%87%E3%84%B1%E3%85%8E%E3%84%B4%20%E3%84%B1%E3%84%B7%20%E3%85%87%E3%85%85%E3%85%8E%E3%85%88%E3%84%B7"),
  //ㄴㄴ
  decodeURI("%E3%84%B4%E3%84%B4"),
  //'회식 가요'를 말한 사람
  decodeURI("'%ED%9A%8C%EC%8B%9D%20%EA%B0%80%EC%9A%94'%EB%A5%BC%20%EB%A7%90%ED%95%9C%20%EC%82%AC%EB%9E%8C"),
  //ㅈㅉ ㄱㅊㅇ
  decodeURI("%E3%85%88%E3%85%89%20%E3%84%B1%E3%85%8A%E3%85%87"),
  //ㅇㅍㅁㅅ ㅁㅅ ㅅㄹㅇ
  decodeURI("%E3%85%87%E3%85%8D%E3%85%81%E3%85%85%20%E3%85%81%E3%85%85%20%E3%85%85%E3%84%B9%E3%85%87"),
  //ㅊㅈㅈㅂ
  decodeURI("%E3%85%8A%E3%85%88%E3%85%88%E3%85%82"),
  //ㅈㄱㅁ
  decodeURI("%E3%85%88%E3%84%B1%E3%85%81"),
  //해당 회차 : 4화
  decodeURI("%ED%95%B4%EB%8B%B9%20%ED%9A%8C%EC%B0%A8%20:%204%ED%99%94"),
  //이 ㄴㄹ 덕분이지
  decodeURI("%EC%9D%B4%20%E3%84%B4%E3%84%B9%20%EB%8D%95%EB%B6%84%EC%9D%B4%EC%A7%80"),
  //ㅇㄷㅊㄴ ㄴㄱ ㅌㅂㅎㄴㄲ
  decodeURI("%E3%85%87%E3%84%B7%E3%85%8A%E3%84%B4%20%E3%84%B4%E3%84%B1%20%E3%85%8C%E3%85%82%E3%85%8E%E3%84%B4%E3%84%B2"),
  //ㅇㅇㅅㅋㅍ ㄴㅇㅅㄴㄷ
  decodeURI("%E3%85%87%E3%85%87%E3%85%85%E3%85%8B%E3%85%8D%20%E3%84%B4%E3%85%87%E3%85%85%E3%84%B4%E3%84%B7"),
  //ㅇ ㄷㄱㄷ
  decodeURI("%E3%85%87%20%E3%84%B7%E3%84%B1%E3%84%B7"),
  //해당 회차 : 11화
  decodeURI("%ED%95%B4%EB%8B%B9%20%ED%9A%8C%EC%B0%A8%20:%2011%ED%99%94"),
  //'너한테 미움받기 싫은데'를 말한 사람
  decodeURI("'%EB%84%88%ED%95%9C%ED%85%8C%20%EB%AF%B8%EC%9B%80%EB%B0%9B%EA%B8%B0%20%EC%8B%AB%EC%9D%80%EB%8D%B0'%EB%A5%BC%20%EB%A7%90%ED%95%9C%20%EC%82%AC%EB%9E%8C"),
  //ㅂㅇ
  decodeURI("%E3%85%82%E3%85%87"),
  //해당 회차 : 9화
  decodeURI("%ED%95%B4%EB%8B%B9%20%ED%9A%8C%EC%B0%A8%20:%209%ED%99%94"),
  //ㅁㅂ
  decodeURI("%E3%85%81%E3%85%82"),
  //ㅈㅉ?
  decodeURI("%E3%85%88%E3%85%89?")
];

const answerList = [
  //역시 능력 있는 사람은
  decodeURI("%EC%97%AD%EC%8B%9C%20%EB%8A%A5%EB%A0%A5%20%EC%9E%88%EB%8A%94%20%EC%82%AC%EB%9E%8C%EC%9D%80"),
  //아다치는 어떤 일이든 성의 있게 하니까요
  decodeURI("%EC%95%84%EB%8B%A4%EC%B9%98%EB%8A%94%20%EC%96%B4%EB%96%A4%20%EC%9D%BC%EC%9D%B4%EB%93%A0%20%EC%84%B1%EC%9D%98%20%EC%9E%88%EA%B2%8C%20%ED%95%98%EB%8B%88%EA%B9%8C%EC%9A%94"),
  //평범을 연기하는 것도 익숙해졌다
  decodeURI("%ED%8F%89%EB%B2%94%EC%9D%84%20%EC%97%B0%EA%B8%B0%ED%95%98%EB%8A%94%20%EA%B2%83%EB%8F%84%20%EC%9D%B5%EC%88%99%ED%95%B4%EC%A1%8C%EB%8B%A4"),
  //나는
  decodeURI("%EB%82%98%EB%8A%94"),
  //롯카쿠 유타
  decodeURI("%EB%A1%AF%EC%B9%B4%EC%BF%A0%20%EC%9C%A0%ED%83%80"),
  //진짜 괜찮아
  decodeURI("%EC%A7%84%EC%A7%9C%20%EA%B4%9C%EC%B0%AE%EC%95%84"),
  //아프면서 무슨 소리야
  decodeURI("%EC%95%84%ED%94%84%EB%A9%B4%EC%84%9C%20%EB%AC%B4%EC%8A%A8%20%EC%86%8C%EB%A6%AC%EC%95%BC"),
  //천재지변
  decodeURI("%EC%B2%9C%EC%9E%AC%EC%A7%80%EB%B3%80"),
  //조금만
  decodeURI("%EC%A1%B0%EA%B8%88%EB%A7%8C"),
  //3
  decodeURI("3"),
  //능력
  decodeURI("%EB%8A%A5%EB%A0%A5"),
  //아다치는 내게 특별하니까
  decodeURI("%EC%95%84%EB%8B%A4%EC%B9%98%EB%8A%94%20%EB%82%B4%EA%B2%8C%20%ED%8A%B9%EB%B3%84%ED%95%98%EB%8B%88%EA%B9%8C"),
  //아이스커피 나왔습니다
  decodeURI("%EC%95%84%EC%9D%B4%EC%8A%A4%EC%BB%A4%ED%94%BC%20%EB%82%98%EC%99%94%EC%8A%B5%EB%8B%88%EB%8B%A4"),
  //안 되겠다
  decodeURI("%EC%95%88%20%EB%90%98%EA%B2%A0%EB%8B%A4"),
  //1
  decodeURI("1"),
  //쿠로사와 유이치
  decodeURI("%EC%BF%A0%EB%A1%9C%EC%82%AC%EC%99%80%20%EC%9C%A0%EC%9D%B4%EC%B9%98"),
  //받아
  decodeURI("%EB%B0%9B%EC%95%84"),
  //2
  decodeURI("2"),
  //마법
  decodeURI("%EB%A7%88%EB%B2%95"),
  //진짜?
  decodeURI("%EC%A7%84%EC%A7%9C?")
];

const choice10 = [
  //개한테 상담하는 수밖에 없어
  decodeURI("%EA%B0%9C%ED%95%9C%ED%85%8C%20%EC%83%81%EB%8B%B4%ED%95%98%EB%8A%94%20%EC%88%98%EB%B0%96%EC%97%90%20%EC%97%86%EC%96%B4"),
  //아다치, 왜 그래?
  decodeURI("%EC%95%84%EB%8B%A4%EC%B9%98,%20%EC%99%9C%20%EA%B7%B8%EB%9E%98?"),
  //이 사람 엄청 좋은 사람이잖아
  decodeURI("%EC%9D%B4%20%EC%82%AC%EB%9E%8C%20%EC%97%84%EC%B2%AD%20%EC%A2%8B%EC%9D%80%20%EC%82%AC%EB%9E%8C%EC%9D%B4%EC%9E%96%EC%95%84"),
  //걱정시키지 마, 바보야
  decodeURI("%EA%B1%B1%EC%A0%95%EC%8B%9C%ED%82%A4%EC%A7%80%20%EB%A7%88,%20%EB%B0%94%EB%B3%B4%EC%95%BC")
];

const choice15 = [
  //마법에 너무 의존하지 말라는 거다!
  decodeURI("%EB%A7%88%EB%B2%95%EC%97%90%20%EB%84%88%EB%AC%B4%20%EC%9D%98%EC%A1%B4%ED%95%98%EC%A7%80%20%EB%A7%90%EB%9D%BC%EB%8A%94%20%EA%B1%B0%EB%8B%A4!"),
  //공보전 힘내
  decodeURI("%EA%B3%B5%EB%B3%B4%EC%A0%84%20%ED%9E%98%EB%82%B4"),
  //기운 나게 해주려고 왔는데
  decodeURI("%EA%B8%B0%EC%9A%B4%20%EB%82%98%EA%B2%8C%20%ED%95%B4%EC%A3%BC%EB%A0%A4%EA%B3%A0%20%EC%99%94%EB%8A%94%EB%8D%B0"),
  //그 애를 좋아하지?
  decodeURI("%EA%B7%B8%20%EC%95%A0%EB%A5%BC%20%EC%A2%8B%EC%95%84%ED%95%98%EC%A7%80?")
];

const choice18 = [
  //10월 28일
  decodeURI("10%EC%9B%94%2028%EC%9D%BC"),
  //아다치의 희귀 사진, 득템!
  decodeURI("%EC%95%84%EB%8B%A4%EC%B9%98%EC%9D%98%20%ED%9D%AC%EA%B7%80%20%EC%82%AC%EC%A7%84,%20%EB%93%9D%ED%85%9C!"),
  //아다치는 연애해본 적 없다고?
  decodeURI("%EC%95%84%EB%8B%A4%EC%B9%98%EB%8A%94%20%EC%97%B0%EC%95%A0%ED%95%B4%EB%B3%B8%20%EC%A0%81%20%EC%97%86%EB%8B%A4%EA%B3%A0?"),
  //'응'이라니
  decodeURI("'%EC%9D%91'%EC%9D%B4%EB%9D%BC%EB%8B%88")
];

const scripts = [
  //그런 점을 ㅁㅁ...
  decodeURI("%EA%B7%B8%EB%9F%B0%20%EC%A0%90%EC%9D%84%20%E3%85%81%E3%85%81..."),
  //ㅁㅁㅁㅁ이 발생했어
  decodeURI("%E3%85%81%E3%85%81%E3%85%81%E3%85%81%EC%9D%B4%20%EB%B0%9C%EC%83%9D%ED%96%88%EC%96%B4"),
  //이 ㅁㅁ 덕분이지
  decodeURI("%EC%9D%B4%20%E3%85%81%E3%85%81%20%EB%8D%95%EB%B6%84%EC%9D%B4%EC%A7%80"),
  //이제 ㅁㅁ도 못 쓰면서 대단하네
  decodeURI("%EC%9D%B4%EC%A0%9C%20%E3%85%81%E3%85%81%EB%8F%84%20%EB%AA%BB%20%EC%93%B0%EB%A9%B4%EC%84%9C%20%EB%8C%80%EB%8B%A8%ED%95%98%EB%84%A4")
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
    alert(decodeURI("%EB%8B%B5%EC%9D%84%20%EC%9E%91%EC%84%B1%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94.")); //답을 작성해주세요.
    
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