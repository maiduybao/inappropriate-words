const localList = require('./lang.json').words;
const baseList = require('badwords-list').array;

class Filter {
    constructor() {
        this.dictionary = new Map();
        baseList.forEach((w) => {
            this.dictionary.set(w.toLowerCase(), 1);
        });
        localList.forEach((w) => {
            this.dictionary.set(w.toLowerCase(), 1);
        });
    }

    isProfane(string) {
        const words = string.split(" ");
        for (let j = 0; j < words.length; j++) {
            if (this._isInDictionary(words[j]) === true) {
                return true;
            }
        }
        return false;
    }

    static _mask(word) {
        return word.split("").map(() => {
            return "*";
        }).join("");
    }

    _isInDictionary(word) {
        const lookup = word.toLowerCase().replace(/[*+-.]/g, "");
        return this.dictionary.has(lookup);
    }

    clean(string) {
        return string.split(" ").map((word) => {
            return this._isInDictionary(word) ? Filter._mask(word) : word;
        }).join(" ");
    }
}

module.exports = Filter;