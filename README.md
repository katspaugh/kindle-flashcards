# Kindle Flashcards

 1. Plug Kindle into the computer.
 2. Open the terminal.
 3. Download this repository and navigate to its folder: `cd ./kindle-flashcards`.
 4. Execute `./bin/export`. This will create files with words and quotes for each book and save them to `./output`.
 5. To add translations, run `FROM_LANG=de TO_LANG=en ./bin/translate output/Schachnovelle.txt > flashcards.txt`.
 7. ...
 8. The flashcards are ready!

<img width="683" alt="screen shot 2016-06-28 at 21 43 20" src="https://cloud.githubusercontent.com/assets/381895/16428207/890419ba-3d79-11e6-9d8b-a64f33a1aa84.png">
<img width="683" alt="screen shot 2016-06-28 at 21 43 23" src="https://cloud.githubusercontent.com/assets/381895/16428984/25afa150-3d7d-11e6-82d2-dced6cf6a322.png">

## Importing into Anki
 * Create a new deck or use an existing deck.
 * Import the flashcards file (File -> Import).

The flashcards file looks like this:
```
 staubig	staubig	Sein langer grüner Umhang war staubig und verschlissen.	Sein langer grüner Umhang war {{c1::staubig}} und verschlissen.	dusty
```

The file has five fields:

 1. The base form of the word (i.e. infinitive for verbs, nominative singular for nouns etc).
 2. The original word form.
 3. The sentence where the word was encountered.
 4. The same sentence with the word clozed out. See [Cloze Deletion](http://ankisrs.net/docs/manual.html#cloze-deletion) in the Anki manual.
 5. The translation of the word.

The final result may look like this:

## Adding audio
You can also add recordings of words' pronunciations to your cards. Run the following command:
```
./bin/add-audio flashcards.txt > flashcards_with_audio.txt
```
The audio will be saved into `./output/audio`. Copy the audio files into the Anki media collection directory (typically `~/Documents/Anki/User 1/collection.media`).

Audio files are downloaded from Wiktionary and encoded from ogg to mp3. Please note that this requires `ffmpeg` to be installed on your system (e.g. `brew install ffmpeg`).

However, you can simply add this JavaScript to your card layout to enable the built-in text-to-speech:

```
<script>
var speech = new SpeechSynthesisUtterance();
speech.text = '{{Front}}';
speech.lang = 'de-DE';
speechSynthesis.speak(speech);
</script>
```
