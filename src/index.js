$(".default_option").click(function () {
    $(this).parent().toggleClass("active");
});

$(".select_ul li").click(function () {
    let currentEle = $(this).html();
    $(".default_option li").html(currentEle);
    $(this).parents(".nav__select_wrap").removeClass("active");
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

$(".item").click(function () {
    $(this).children().toggleClass("hidden");
    // const ele = $(this).children()[0].textContent;
    // console.log(ele);
});
