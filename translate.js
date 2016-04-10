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
  return text.replace(new RegExp('\\b' + word + '\\b', 'i'), '&lt;b&gt;' + word + '&lt;/ b&gt;');
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

  var translation = LanguageApp.translate(html, '', lang, { contentType: 'html' });

  translation.split('\n\n').forEach(function (line, index) {
    var card = cards[index];
    var translatedWord = line.replace(/.*?&lt;b&gt;(.+?)&lt;\/ b&gt;.*/ig, '$1');
    if (translatedWord == line) {
      translatedWord = LanguageApp.translate(card.stem, '', lang);
    }
    card.translation = translatedWord.replace(/[,.!?:"()]/g, '').trim();
  });

  var response = stringifyTsv(cards);

  return ContentService.createTextOutput(response);
}

function test() {
  doGet({ parameters: {
    lang: 'en',
    text: 'beneiden	beneiden	Es fiel ihm schwer, Ron nicht zu beneiden, wenn er an die Dursleys dachte und daran, wie sie ihn wohl willkommen heißen würden, wenn er das nächste Mal im Ligusterweg auftauchte. '
  } });
}
