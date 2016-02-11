'use strict';

let fs = require('fs');
let rp = require('request-promise');

let tsv = fs.readFileSync(process.argv[2]);
let lines = tsv.toString().split('\n').filter((line) => line.length);
let pairs = lines.map((line) => line.split('\t'));
let cards = pairs.map((pair) => {
    return {
        word: pair[0],
        context: pair[1],
        translation: '',
        pos: ''
    }
});

function getTranslation(word) {
    let sentence = encodeURIComponent(word);
    let url = `https://d.duolingo.com/words/hints/de/en?format=new&cache=true&sentence=${ sentence }`;
    return rp.get(url).then((json) => {
        let data = JSON.parse(json);
        let translation;
        let pos;

        try {
            translation = data.tokens[0].hint_table.rows[0].cells[0].hint;
            pos = data.tokens[0].PoS;
        } catch (e) {}

        return { translation: translation || '', pos: pos || '' };
    });
}

Promise.all(cards.map((card, index) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            getTranslation(card.word).then((data) => {
                card.translation = data.translation;
                card.pos = data.pos;
                resolve();
            });
        }, index * 100);
    });
})).then(() => console.log(JSON.stringify(cards, 2, 2)));
