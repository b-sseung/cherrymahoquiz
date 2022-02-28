import { createRankBox } from "./rank.js";

const firebaseConfig = {
    apiKey: "AIzaSyDA5DTsAR4q9KNfjvMLVrqoPwvT2ADdwiA",
    authDomain: "cherimahoquiz.firebaseapp.com",
    projectId: "cherimahoquiz",
    storageBucket: "cherimahoquiz.appspot.com",
    messagingSenderId: "273686199991",
    appId: "1:273686199991:web:44eff06d523e422b389732",
    measurementId: "G-BZSSDFKSYS"
};

var map = [];
var number = new Map();

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

function createDate() {
    var date = new Date();

    var year = date.getFullYear();
    var month = ("0" + date.getMonth()).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    var hour = ("0" + date.getHours()).slice(-2);
    var minute = ("0" + date.getMinutes()).slice(-2);
    var second = ("0" + date.getSeconds()).slice(-2);

    return (year + "." + month + "." + day + " " + hour + ":" + minute + ":" + second);
}

function addRanking(id, score) {
    var date = createDate();
    db.collection("rank").doc(id).set({
        time: date,
        score: score
    })
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
}

function readRankList() {
    db.collection("ranklist").doc("time").get().then((doc) => {
        if (doc.exists) {
            var data = doc.data();

            var keys = Object.keys(data);

            for (var i = 0; i < keys.length; i++) {
                var p = map.length;

                number.set(keys[i], p);
                map[p] = {};
                map[p].id = keys[i];
                map[p].time = data[keys[i]];
            }
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });

    db.collection("ranklist").doc("score").get().then((doc) => {
        if (doc.exists) {
            var data = doc.data();

            var keys = Object.keys(data);

            for (var i = 0; i < keys.length; i++) {
                map[number.get(keys[i])].score = Number(data[keys[i]]);
            }
        }
        readRank();

    }).catch((error) => {
        console.log("Error getting document:", error);
    });

}

function readRank() {
    db.collection("rank").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var id = doc.id;
            var data = doc.data();

            if (map[number.get(id)] != null) {

                var aScore = map[number.get(id)].score;

                var bTime = data["time"];
                var bScore = Number(data["score"]);

                if (aScore < bScore) {
                    map[number.get(id)].score = bScore;
                    map[number.get(id)].time = bTime;
                }

                return;
            }
            
            var p = map.length;
            number.set(id, p);
            map[p] = {};
            map[p].id = id;
            map[p].time = data["time"];
            map[p].score = Number(data["score"]);
        });
        
        sortData();
    });

}


function sortData() {
    console.log(map.length);

    map.sort(function(a, b) {
        if (a.score < b.score) {
            return 1;
        } else if (a.score == b.score) {
            if (a.time >= b.time) {
                return 1;
            } else {
                return -1;
            }
        } else {
            return -1;
        }
    });

    createRankBox(map);
}

export{ addRanking, readRankList };
