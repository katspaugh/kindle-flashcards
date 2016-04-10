var YANDEX_KEY = '<YOUR KEY>';
var YANDEX_API_URL = 'https://translate.yandex.net/api/v1.5/tr.json/translate?format=html&key=' + YANDEX_KEY;

/**
 * Parse a TSV string into an array.
 *
 * @param {String} tsv
 * @return {Array}
 */
function parseTsv(tsv) {
  var lines = tsv.split('\n').filter(function (line) { return line.length; });
  var colLines = lines.map(function (line) { return line.split('\t') });

  return colLines.map(function (cols) {
    return {
      stem: cols[0],
      word: cols[1],
      context: cols[2],
      translation: ''
    }
  });
}

/**
 * Stringify an array into a TSV string.
 *
 * @param {Array} cards
 * @return {String}
 */
function stringifyTsv(cards) {
  var lines = cards.map(function (card) {
    return [ card.stem, card.translation, card.context ].join('\t')
  });
  return lines.join('\n');
}

/**
 * Mark word in text.
 * @return {String}
 */
function replaceWord(text, word) {
  return text.replace(new RegExp('\\b' + word + '\\b', 'i'), '<b>' + word + '</b>');
}

/**
 * Run on GET-request.
 */
function doGet(req) {
  var params = req.parameters;
  var lang = params.lang || 'en';
  var text = String(params.text) || '';
  var cards = parseTsv(text);

  var html = cards.map(function (card) {
    return replaceWord(card.context, card.word);
  }).join('\n\n');

  var result = UrlFetchApp.fetch(YANDEX_API_URL + '&lang=' + lang + '&text=' + encodeURIComponent(html));
  var json = JSON.parse(result.getContentText());
  var translation = json.text[0];

  translation.split('\n\n').forEach(function (line, index) {
      var translatedWord = line.replace(/.*?<b>(.+?)<\/b>.*/, '$1');
      cards[index].translation = translatedWord;
  });

  return ContentService.createTextOutput(stringifyTsv(cards));
}
