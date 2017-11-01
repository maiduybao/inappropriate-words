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
        this.chunkSize = 10;
    }

    _partition(words) {
        return words.map((word, i) => {
            return i % this.chunkSize === 0 && words.slice(i, i + this.chunkSize);
        }).filter((e) => e);
    }

    isProfane(string) {
        const words = string.split(" ");
        const partitions = this._partition(words);
        let promises = [];
        partitions.forEach((partition) => {
            promises.push(new Promise((resolve) => {
                for (let i = 0; i < partition.length; i++) {
                    if (this._isInDictionary(words[i]) === true) {
                        resolve(true);
                        break;
                    }
                }
                resolve(false);
            }));
        });

        return Promise.all(promises)
            .then((results) => {
                let answer = false;
                results.forEach((result) => {
                    answer = answer || result;
                });
                return answer;
            });
    }

    static _mask(word) {
        return word.replace(/[^*+-.]/g, "*");
    }

    _isInDictionary(word) {
        const lookup = word.toLowerCase().replace(/[*+-.]/g, "");
        return this.dictionary.has(lookup);
    }

    clean(string) {
        const words = string.split(" ");
        const partitions = this._partition(words);

        let promises = [];
        partitions.forEach((partition) => {
            promises.push(new Promise((resolve) => {
                resolve(partition.map((word) => {
                    return this._isInDictionary(word) ? Filter._mask(word) : word;
                }));
            }));
        });

        return Promise.all(promises)
            .then((results) => {
                const merged = [].concat.apply([], results);
                return merged.join(" ");
            });
    }
}

module.exports = Filter;