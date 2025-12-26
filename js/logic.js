import {getInialLru} from "./front.js";

export const lru = await getInialLru();

const alphabet = "abcdefghijklmnopqrstuvwxyz";
const alphabetLength = alphabet.length;
const specialChars = `!\"#$%&'()*+,-./:;<=>?@[\]^_\`\{\|\}~`;
const specialCharsNumber = 4;
const passwordLength = 12;

// get all the "unique" parameters  of lru

export function cleanLru(lru) {
    if (typeof lru !== "string" || lru.length === 0) {

        return "lru is not a string or is empty";
    }
    try {
        if (new URL((lru))) {
            const siteName = new URL(lru).hostname;
            const siteNameSplit = siteName.split(".");
            let cleanLru;
            if (siteNameSplit.length === 1) {
                cleanLru = siteNameSplit[0];
            } else {
                cleanLru = siteNameSplit[siteNameSplit.length - 2];
            }
            cleanLru = cleanLru.replace("-", "");

            return cleanLru;
        }
    } catch (err) {
        throw new Error("Invalid URL: " + lru);
    }
}

function getLruInfo() {
    let onlyLettersLru = cleanLru(lru);
    let lruParameters = {};
    let finalLettersLruArray = [];
    let newLettersIndex = [];
    while (onlyLettersLru.length < 8) {
        onlyLettersLru = onlyLettersLru + onlyLettersLru;
    }
    onlyLettersLru = onlyLettersLru.substring(0, 8);
    for (let i = 0; i < onlyLettersLru.length; i++) {
        let letter = onlyLettersLru[i];
        let direction = i % 2;
        let letterIndex = alphabet.indexOf(letter);
        let newLetterIndex = letterIndex;
        direction === 0 ? newLetterIndex = letterIndex - i : newLetterIndex = letterIndex + i;
        while (newLetterIndex < 0 || newLetterIndex > alphabetLength - 1) {
            newLetterIndex = Math.abs(Math.floor(newLetterIndex % alphabetLength));
        }
        newLettersIndex.push(newLetterIndex);
    }
    finalLettersLruArray = newLettersIndex.map((newLetterIndex) => {
        let newLetter = alphabet[newLetterIndex];
        return newLetterIndex > 13 ? newLetter.toUpperCase() : newLetter;
    });
    const finalLettersLru = finalLettersLruArray.join("")

    lruParameters.lettersLruLength = finalLettersLru.length;
    lruParameters.finalLettersLru = finalLettersLru;

    return lruParameters;
}

export function createM() {
    let m;
    const lruInfo = getLruInfo();
    let finalLettersLru = lruInfo.finalLettersLru;
    let finalLruArray = finalLettersLru.split("");
    let chosenChar = null;
    let position = null;

    for (let i = 0; i < specialCharsNumber; i++) {
        position = Math.pow(i, i) % specialChars.length;
        chosenChar = specialChars[position];
        finalLruArray.splice(position, 0, chosenChar);
    }
    m = finalLruArray.join("");

    return m;
}

export async function copyM() {
    const m = createM();
    navigator.clipboard.writeText(m)
        .then(() => {
        })
        .catch((err) => {
            console.error("Error:", err);
        });
}

export function testChuttt(m) {
    let result = false;
    if (
        typeof m === "string" &&
        m.length === passwordLength &&
        /[A-Z]/.test(m) &&
        /[^A-Z]/.test(m.charAt(0)) &&
        /[0-9]/.test(m)
    ) {
        const specialCharSplit = specialChars.split("");
        let specialCharTest = [];
        specialCharSplit.forEach(
            (char) => {
                if (m.includes(char)) {
                    specialCharTest.push(char);
                }
            }
        )
        if (specialCharTest.length !== 0) {
            result = true;
        }
    }

    return result;
}
