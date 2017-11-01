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
        this.regex = /\*|\+|\-|\./g;
    }


    isProfane(string) {
        const words = string.split(" ").map((w) => {
            return w.toLowerCase().replace(this.regex, '');
        });
        for (let j = 0; j < words.length; j++) {
            if (this.dictionary.has(words[j])) {
                return true;
            }
        }
        return false;
    }

    replaceWord(string) {
        return string.replace(this.regex, '').split("").map(() => {
            return "*";
        }).join("");
    }

    clean(string) {
        return string.split(" ").map((word) => {
            return this.isProfane(word) ? this.replaceWord(word) : word;
        }).join(" ");
    }
}

module.exports = Filter;