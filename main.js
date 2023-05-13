let start = document.getElementById("btn");
let moves = document.querySelector(".moves");
let time = document.querySelector(".time");
let mainBlock = document.querySelector(".board-container");
let arrayOfelement = Array.from(document.querySelectorAll(".block"));
let arrayOfbacks = Array.from(document.querySelectorAll(".back"));
let span1 = document.getElementById("span1");
let span2 = document.getElementById("span2");
console.log(span2)
let seconds = 0;
let check = false;
let movesNumber = 0;
let matches = [];


// start button and seconds 
function disabledButton() {
    start.classList.add("disabled");
    mainBlock.style.pointerEvents = "all";
    check = true;
    if (check == true) {
        const begin = setInterval(() => {
            seconds++
            time.innerText = `Time: ${seconds} sec`
        }, 1000)
        start.style.pointerEvents = "none";
        if (matches.length === 16) {
            stopColor(begin);
        }
    }
}
start.onclick = disabledButton;

function stopColor(thisTime) {
    clearInterval(thisTime);
}

const emojis = ['🍒', '🥑', '🌽', '🥕', '🍇', '🍉', '🍌', '🥭', '🍒', '🥑', '🌽', '🥕', '🍇', '🍉', '🍌', '🥭'];



// Shuffle Function
function shuffle(array) {
    // Settings Vars
    let current = array.length,
        temp,
        random;
    while (current > 0) {

        // Get Random Number
        random = Math.floor(Math.random() * current);

        // Decrease Length By One
        current--;

        // [1] Save Current Element in Stash
        temp = array[current];

        // [2] Current Element = Random Element
        array[current] = array[random];

        // [3] Random Element = Get Element From Stash
        array[random] = temp;

    }
    return array;
}


let icons = shuffle(emojis);
arrayOfbacks.forEach(function (ele, index) {
    ele.innerHTML = icons[index];
}
)



function checkMatchedBlocks(firstBlock, secondBlock) {
    if (firstBlock.innerHTML === secondBlock.innerHTML) {
        firstBlock.classList.remove('flipped');
        secondBlock.classList.remove('flipped');
        firstBlock.classList.add('matched');
        secondBlock.classList.add('matched');
        matches.push(firstBlock);
        matches.push(secondBlock);
        if (matches.length === 16) {
            mainBlock.classList.add('flipped');
            span1.innerHTML = `${movesNumber}`;
            span2.innerHTML = `${seconds}`;
        }

    } else {
        setTimeout(() => {
            firstBlock.classList.remove('flipped');
            secondBlock.classList.remove('flipped');
        }, 1000);
    }

}

function flipBlock(selectedBlock) {

    // Add Class is-flipped
    selectedBlock.classList.add('flipped');

    // Collect All Flipped Cards
    let allFlippedBlocks = arrayOfelement.filter(flippedBlock => flippedBlock.classList.contains('flipped'));
    console.log(allFlippedBlocks)
    // If Theres Two Selected Blocks
    if (allFlippedBlocks.length === 2) {
        // Stop Clicking Function
        mainBlock.style.pointerEvents = "none"
        setTimeout(() => {
            // Remove Class No Clicking After The Duration
            mainBlock.style.pointerEvents = "all"
        }, 1000);
        // Check Matched Block Function
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);

    }

}

arrayOfelement.forEach(function (ele) {
    ele.onclick = () => {
        // ele.classList.add("flipped");
        flipBlock(ele);
        movesNumber++;
        moves.innerText = `Moves : ${movesNumber} `
    };
})
