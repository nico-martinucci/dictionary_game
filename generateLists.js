function addArraysTogetherUniquely(arr1, arr2) {
    let array3 = [];
    
    for(let i=0;i<arr1.length;i++){
        if(array3.indexOf(arr1[i]) == -1)
           array3.push(arr1[i])
        } 
    for(let i=0;i<arr2.length;i++){
        if(array3.indexOf(arr2[i]) == -1)
            array3.push(arr2[i])
        }
    
    return array3;
}

function generateAddLetterMatches(wordsList) {
    let addLetterMatches = [];

    for (let word of wordsList) {
        let splitWord = word.split("");
        for (let i = 0; i < splitWord.length; i++) {
            let reducedWord = copyRef(splitWord);
            reducedWord.splice(i, 1);
            if (wordsList.includes(reducedWord.join(""))) {
                addLetterMatches.push([word, reducedWord.join("")]);
            }
        }
    }

    console.log(addLetterMatches)
}

function generateChangeLetterList(wordsList) {
    let changeLetterMatches = [];
    
    for (let word of wordsList) {
        let splitWord = word.split("");
        for (let i = 0; i < splitWord.length; i++) {
            let reducedWord = copyRef(splitWord);
            reducedWord.splice(i, 1);
            for (let compareWord of wordsList) {
                let splitCompareWord = compareWord.split("");
                splitCompareWord.splice(i, 1);
                if (reducedWord.join("") === splitCompareWord.join("") && word !== compareWord) {
                    changeLetterMatches.push([word, compareWord]);
                }
            }
        }
    }
    
    console.log(changeLetterMatches)
}



/**
 * builds a frequency counter from the provided string or array
 * @param {array or string} list - string or array to build a freq counter from
 * @returns standard frequency counter object
 */
 function buildFreqCounter(list) {
    if (!(typeof list === "string" || Array.isArray(list))) {
        throw new Error("Invalid data type - pass a string or array")
    }
    const counter = {};

    for (let item of list) {
        counter[item] = (counter[item] || 0) + 1;
    }

    return counter;
}

/**
 * short-hand for creating a deep copy of a reference type
 * @param {reference} ref - reference to be copied
 * @returns deep copy of provided reference
 */
 function copyRef(ref) {
    return JSON.parse(JSON.stringify(ref));
}