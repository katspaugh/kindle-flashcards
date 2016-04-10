'use strict';

let fs = require('fs');
let rp = require('request-promise');

let lang = process.env.LANG || 'en';

/**
 * Parse a TSV string into an array.
 *
 * @param {String} tsv
 * @return {Array}
 */
function parseTsv(tsv) {
    let lines = tsv.toString().split('\n').filter((line) => line.length > 0);
    let colLines = lines.map((line) => line.split('\t'));

    return colLines.map((cols) => {
        return {
            stem: cols[0],
            word: cols[1],
            context: cols[2],
            translation: ''
        }
    });
}

/**
 * Load the translation of a word.
 *
 * @param {String} word
 * @param {String} context
 * @return {Promise}
 */
function getTranslation(word, context) {
    let url = 'https://script.google.com/macros/s/AKfycbwKqmcpvRAzQwu_h2tInmioplP6dbivnGeXgrIdXepJr4Udsk8/exec';

    return rp.get({
        uri: url,
        qs: {
            word: word,
            text: context,
            lang: lang
        },
        json: true
    }).then((json) => json.word);
}


// Load translations
let cards = parseTsv(fs.readFileSync(process.argv[2]));

Promise.all(cards.map((card, index) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            getTranslation(card.word, card.context).then((translation) => {
                card.translation = translation;
                resolve();
            });
        }, index * 10);
    });
})).then(() => {
    // Print as TSV
    let lines = cards.map((card) => [ card.stem, card.translation, card.context ].join('\t'));
    console.log(lines.join('\n'));
})
