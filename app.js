"use strict";

const DICTIONARY_API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/"
const GAME_TYPES = ["add", "remove", "change"];
let gameType = null;

let $startButton = $("#start-button");


async function startGame(event) {
    event.preventDefault();

    chooseRandomGameType();
    let words = chooseWords();
    let definitions = await getWordDefinitions(words);
    updateDom(definitions);
}

$startButton.on("click", startGame);

function chooseRandomGameType() {
    gameType = GAME_TYPES[randomInt(0, GAME_TYPES.length - 1)];
    console.log(gameType);
}

function chooseWords() {
    if (gameType === "add" || gameType === "remove") {
        return addOneLetter[randomInt(0, addOneLetter.length - 1)];
    } else if (gameType === "change") {
        return changeOneLetter[randomInt(0, changeOneLetter.length - 1)];
    }
}

async function getWordDefinitions(words) {
    let definitions = [];
    for (let word of words) {
        let response = await axios({
            method: "GET",
            url: DICTIONARY_API_URL + word
        })

        definitions.push([word, findUsableDefinition(response.data[0].meanings[0].definitions)])
    }
    if (gameType === "add") {
        definitions.reverse();
    }
    console.log(definitions);
    return definitions;
}

function findUsableDefinition(definitions) {
    // eventually, should find first definition in the list that doesn't include
    // either word, or ideally anything close to either word...
    // for now just returns the first definition in the array

    return definitions[0].definition;
}

function updateDom(definitions) {
    $("#first-word-def").text(definitions[0][1]);
    $("#second-word-def").text(definitions[1][1]);

    let $gameModeText = $("#game-mode");
    if (gameType === "add") {
        $gameModeText.text("...add a letter to get:")
    } else if (gameType === "remove") {
        $gameModeText.text("...remove a letter to get:")
    } else if (gameType === "change") {
        $gameModeText.text("...change a letter to get:")
    }
}

function countWordLengths(list) {
    let lengthCounter = {};
    for (let elem of list) {
        elem[1].length <= 2 ? console.log(elem) : null;
        lengthCounter[elem[1].length] = lengthCounter[elem[1].length] ? lengthCounter[elem[1].length] + 1 : 1
    }

    return lengthCounter;
}


/**
 * generates a random integer, inclusive of the bounds provided
 * @param {integer} low - low bound
 * @param {integer} high - high bound
 * @returns random integer
 */
 function randomInt(low, high) {
    if (typeof low !== "number" || typeof high !== "number") {
        throw new Error("Invalid data type - both arguments must be numbers")
    }
    if (parseInt(low) !== low || parseInt(high) !== high) {
        throw new Error("One or more non-integers provided - unpredictable results!")
    }
    return Math.floor(Math.random() * (high - low + 1)) + low;
}