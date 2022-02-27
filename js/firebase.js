import { createList } from "./rank.js";

const firebaseConfig = {
    apiKey: "AIzaSyDA5DTsAR4q9KNfjvMLVrqoPwvT2ADdwiA",
    authDomain: "cherimahoquiz.firebaseapp.com",
    projectId: "cherimahoquiz",
    storageBucket: "cherimahoquiz.appspot.com",
    messagingSenderId: "273686199991",
    appId: "1:273686199991:web:44eff06d523e422b389732",
    measurementId: "G-BZSSDFKSYS"
};

var map = new Map();

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

function addRanking(id) {
    var date = createDate();
    db.collection("rank").doc(date).set({
        id : id
    })
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
}

function readRankList() {
    db.collection("ranklist").doc("list").get().then((doc) => {
        if (doc.exists) {
            var data = doc.data();

            var keys = Object.keys(data);

            for (var i = 0; i < keys.length; i++) {
                map.set(keys[i], data[keys[i]]);
            }
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });

    readRank();
}

function readRank() {
    db.collection("rank").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var id = doc.id;
            var data = doc.data();

            if (map.get(id) != null) {
                var a = map.get(id);
                var b = data["id"];

                if (a < b) {
                    map.set(id, b);
                }

                return;
            }

            map.set(id, data["id"]);
        });
    });
    createList(map);
}

export{ addRanking, readRankList };
