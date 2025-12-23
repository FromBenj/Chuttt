import {getLru} from "./front.js";

const lru = await getLru();

// get all the "unique" parameters  of lru
function getLruInfo() {
    let lruParameters = {};
    const lruLength = lru.length;
    const vowelsArray = lru.match(/[aeiou]/gi);
    const specialCharBool = lru.match(/[!@#$%^&*]/g) % 2 === 0;

    lruParameters.length = lruLength;
    lruParameters.vowels = vowelsArray;
    lruParameters.specialChar = specialCharBool;

    return lruParameters;
}

export function cleanLru() {
    let errorMessage = "Petite erreur , je crois bien";
    if (typeof lru !== "string" || lru.length === 0) {

        return errorMessage;
    }
    try {
        const siteName = new URL(lru).hostname;
        const siteNameSplit = siteName.split(".");
        const finalLru = siteNameSplit.length === 1 ? siteNameSplit[0] : siteNameSplit[siteNameSplit.length - 2];

        return finalLru;
    } catch (err) {
        throw new Error("Invalid URL: " + lru);
    }
}

export function getM() {
    const lruInfos = getLruInfo();
}

export function testChuttt(m) {
    let result = false;
    if (
        typeof m === "string" &&
        m.length >= 12 &&
        /[0-9]/.test(m) &&
        /[A-Z]/.test(m) &&
        /[^A-Z]/.test(m.charAt(0)) &&
        /[0-9]/.test(m)
    ) {
        const specialChar = `!\"#$%&'()*+,-./:;<=>?@[\]^_\`\{\|\}~`;

        const specialCharSplit = specialChar.split("");
        let specialCharTest = [];
        specialCharSplit.forEach(
            (char) => {
                if (m.includes(char)) {
                    specialCharTest.push(char);
                }
            }
        )
        if (specialCharTest.length === 0) {
            return result;
        }
        result = true;
    }

    return result;
}
