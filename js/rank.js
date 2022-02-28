import { readRankList } from "./firebase.js";

const header = document.querySelector(".headerBox");
const title = document.querySelector(".rankTitle");
const myRank = document.querySelector(".myRank");
const rankBox = document.querySelector(".rankBox");

const home = document.querySelector(".home");

var myPosition = -1;
var list = [];
var ranks = [];

window.onload = function() {
    readRankList();

    home.addEventListener("click", function() {
        window.location.href = "./entrance.html";
    });

    myRank.addEventListener("click", function() {
        if (myPosition == -1) {
            var id = prompt("아이디를 입력해주세요");
            
            if (id.indexOf("@") == -1) id = "@" + id;

            if (id != "" && id != null){
                for (var i = 0; i < list.length; i++) {
                    if (list[i].id == id) {
                        myPosition = i;
                        break;
                    }
                }

                if (myPosition != -1) {
                    while (myRank.hasChildNodes()) {
                        myRank.removeChild(myRank.firstChild);
                    }

                    const rankNum = document.createElement("p");
                    rankNum.classList.add("rankNum");
                    myRank.appendChild(rankNum);

                    const rankId = document.createElement("p");
                    rankId.classList.add("rankId");
                    myRank.appendChild(rankId);

                    const rankScore = document.createElement("p");
                    rankScore.classList.add("rankScore");
                    myRank.appendChild(rankScore);

                    rankNum.innerText = myPosition + 1;
                    rankId.innerText = list[myPosition].id;
                    rankScore.innerText = list[myPosition].score + "점";

                    ranks[myPosition].style.borderBottom = "1px solid red";
                    var location = ranks[myPosition].offsetTop;
            
                    window.scrollTo({top: location, behavior: "smooth"});

                } else {
                    alert("아이디로 등록된 순위가 없습니다.");
                }
            }
        } else {
            ranks[myPosition].style.border = "1px solid red";
            var location = ranks[myPosition].offsetTop;
            
            window.scrollTo({top: location, behavior: "smooth"});
        }
    })
}

function createRankBox(map) {
    var color = "#f3cadc20";
    var myId = sessionStorage.getItem("id");

    list = map;

    for (var i = 0; i < map.length; i++) {
        const rank = document.createElement("div");
        rank.classList.add("rank");
        rankBox.appendChild(rank);

        const rankNum = document.createElement("p");
        rankNum.classList.add("rankNum");
        rank.appendChild(rankNum);

        const rankId = document.createElement("p");
        rankId.classList.add("rankId");
        rank.appendChild(rankId);

        const rankScore = document.createElement("p");
        rankScore.classList.add("rankScore");
        rank.appendChild(rankScore);

        rankNum.innerText = i + 1;
        rankId.innerText = map[i].id;
        rankScore.innerText = map[i].score + "점";

        ranks.push(rank);
        if (i % 2 == 1) rank.style.backgroundColor = color;

        if (myId != null && map[i].id == myId) myPosition = i;
    }

    if (myPosition == -1) {
        const rankId = document.createElement("p");
        rankId.classList.add("rankId");
        myRank.appendChild(rankId);

        rankId.innerText = "내 순위 찾기";
    } else {
        const rankNum = document.createElement("p");
        rankNum.classList.add("rankNum");
        myRank.appendChild(rankNum);

        const rankId = document.createElement("p");
        rankId.classList.add("rankId");
        myRank.appendChild(rankId);

        const rankScore = document.createElement("p");
        rankScore.classList.add("rankScore");
        myRank.appendChild(rankScore);

        rankNum.innerText = myPosition + 1;
        rankId.innerText = map[myPosition].id;
        rankScore.innerText = map[myPosition].score + "점";
    }

    title.style.marginTop = header.offsetHeight + "px";
    myRank.style.marginTop = title.getBoundingClientRect().bottom + "px";
    rankBox.style.marginTop = myRank.getBoundingClientRect().bottom + "px";

    var homeTop = (header.offsetHeight - home.offsetHeight) / 2;
    home.style.top = homeTop + "px";
}

export { createRankBox };