'use strict';

let fs = require('fs');
let rp = require('request-promise');

const LANGUAGE = process.env.BOOK_LANGUAGE || 'de';

/**
 * Parse a TSV string into an array.
 *
 * @param {String} tsv
 * @return {Array}
 */
function parseTsv(tsv) {
    let lines = tsv.toString().split('\n').filter((line) => line.length);
    let pairs = lines.map((line) => line.split('\t'));

    return pairs.map((pair) => {
        return {
            word: pair[0],
            context: pair[1],
            translation: ''
        }
    });
}

/**
 * Load the translation of a word.
 *
 * @param {String} word
 * @return {Promise}
 */
function getTranslation(word) {
    let url = `https://d.duolingo.com/words/hints/${ LANGUAGE }/en?format=new&sentence=${ encodeURIComponent(word) }`;

    return rp.get(url).then((json) => {
        let data = JSON.parse(json);
        let translation = '';

        try {
            translation = data.tokens[0].hint_table.rows[0].cells[0].hint;
        } catch (e) {}

        return translation
            .replace('(I) ', '')
            .replace('(you) ', '')
            .replace('(he/she/it) ', '')
            .replace('(we/they) ', '')
            .split('/')[0]
    });
}


// Load translations
let cards = parseTsv(fs.readFileSync(process.argv[2]));

Promise.all(cards.map((card, index) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            getTranslation(card.word).then((translation) => {
                card.translation = translation;
                resolve();
            });
        }, index * 100);
    });
})).then(() => {
    // Print as TSV
    let lines = cards.map((card) => [ card.word, card.translation, card.context ].join('\t'));
    console.log(lines.join('\n'));
})
