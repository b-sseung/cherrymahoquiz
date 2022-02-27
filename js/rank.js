import { readRankList } from "./firebase.js";

window.onload = function() {
    readRankList();
}

function createList(map) {
    console.log(map);
    console.log(map.keys());

    console.log(Object.keys(map));


    // const m = new Map([...map.entries()].sort());
    // console.log(m);
    // for (var key of m) {
    //     console.log(key);
    // };
}

export { createList };