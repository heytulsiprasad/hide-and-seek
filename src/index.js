$(".default_option").click(function () {
    $(this).parent().toggleClass("active");
});

$(".select_ul li").click(function () {
    let currentEle = $(this).html();
    $(".default_option li").html(currentEle);
    $(this).parents(".nav__select_wrap").removeClass("active");

    let level = $(this).children().text().trim();

    if (level === "Easy") {

    } else if (level === "Medium") {

    } else if (level === "Hard") {
        
    }
});

let code = ["🎉", "💪", "😍", "🏠", "🐶", "☕", "🤷‍♂️", "😛"];

// number of items in the content div or number of boxex
let len = $(".item").length;

// number of puzzles to be done (each pair means 2 items)
let pairs = len / 2;

// returns array of length `len` and having values
// from 0 to `len` in RANDOM order
function genRandArrayOfLen(len) {
    let arr = [];

    while (arr.length < len) {
        let r = Math.floor(Math.random() * len);
        if (arr.indexOf(r) === -1) {
            arr.push(r);
        }
    }

    return arr;
}

// randLenArr is an array of random numbers of length `len`
// pairs is the number of puzzles we need to make (len / 2)
// emojiLen is the length of the array of emojis`
// it loops through the number of items, `pair` number of times
// each time replaces two random items textContent with random emojis
function encodeItems(randLenArray, pairs, emojiLen) {
    let itemsObj = $(".item p");

    // we used pop because once a item from the randArr is gone
    // we can't use it again, so results in no repetition
    // while selecting items inside `content` div

    for (let i = 0; i < pairs; i++) {
        let randItemOne = itemsObj[randLenArray.pop()];
        let randItemTwo = itemsObj[randLenArray.pop()];
        let randNumForEmoji = Math.floor(Math.random() * emojiLen);

        randItemOne.textContent = code[randNumForEmoji];
        randItemTwo.textContent = code[randNumForEmoji];
    }

    return undefined;
}

// stores array of random numbers ranging from 0 to `len`
let randLenArray = genRandArrayOfLen(len);

// length of emoji array
let lenEmoji = code.length;

encodeItems(randLenArray, pairs, lenEmoji);

// this gets the clicked emoji and compares it to the previously clicked one
// if matched returns true, else false
// its length is never more than 2
let match = [];

function isMatch(val) {
    if (match.length < 1) {
        match.push(val);
        return "First";
    } else if (match.length === 1) {
        if (match.indexOf(val) === -1) {
            match = [];
            return false;
        } else {
            match = [];
            return true;
        }
    }
}

// this stores the current element whose `hidden` class is removed
let curBoxEle = [];

// this stores the data-key value of the clicked element
let curKeyVal = [];

$(".item").click(function () {
    const x = $(this).children().removeClass("hidden");
    curBoxEle.push(x);

    const ele = $(this)[0];
    const key = ele.dataset.key;
    const emoji = ele.textContent;
    let match;

    // this makes sure if same block is clicked continously
    // it'll show and hide the emoji respectively
    if (curKeyVal.length < 1) {
        curKeyVal.push(key);
        match = isMatch(emoji);
    } else if (curKeyVal.length === 1) {
        if (curKeyVal.indexOf(key) === -1) {
            curKeyVal = [];
            curKeyVal.push(key);
            match = isMatch(emoji);
        } else {
            $(this).children().addClass("hidden");
            curKeyVal = [];
            match = "First";
        }
    }

    if (match === "First") {
        console.log("Waiting...");
    } else if (match === false) {
        setTimeout(function () {
            curBoxEle.forEach((item) => {
                item.addClass("hidden");
            });
            curBoxEle = [];
            console.log("Try again, harder!");
        }, 200);
    } else if (match === true) {
        curBoxEle.forEach((item) => {
            item.parent(".item").off("click");
        });
        curBoxEle = [];
        console.log("Its a match!");
        reloadIfDone();
    }
});

function reloadIfDone() {
    let hiddenArr = $(".hidden");

    if (hiddenArr.length === 0) {
        setTimeout(function () {
            location.reload();
        }, 1000);
    } else {
        console.log("Keep hustling!");
    }
}
