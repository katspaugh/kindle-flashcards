'use strict';

var cards = require('./flashcards.json');

var lines = cards.map((card) => [ card.word, card.translation, card.context, card.pos ].join('\t'));

console.log(lines.join('\n'));
