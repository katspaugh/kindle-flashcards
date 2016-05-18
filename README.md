# Kindle Flashcards

 1. Plug Kindle into the computer.
 2. Open the terminal.
 3. Download this repository and navigate to its folder: `cd ./kindle-flashcards`.
 4. Execute `./bin/export`. This will create files with words and quotes for each book in `./output`.
 5. To add translations, run `FROM_LANG=de TO_LANG=en ./bin/translate output/Schachnovelle.txt > flashcards.txt`.
 6. To add audio, run `./bin/add-audio flashcards.txt > flashcards_with_audio.txt`. The audio will be saved into `./output/audio`.
 7. ...
 8. The flashcards are ready!

## Importing into Anki
 * Create a new deck or use an existing deck.
 * Create or select a note type with four fields: Front, Back, Context and Audio.

<img src="https://cloud.githubusercontent.com/assets/381895/15276152/0e9b118a-1ae0-11e6-903a-4d14e5305491.png" width="440" />

 * Import the flashcards file (File -> Import).
 * Copy the audio files into the Anki media collection directory (typically `~/Documents/Anki/User 1/collection.media`).

## Dependencies
Audio files are downloaded from Wiktionary and encoded from ogg to mp3. This requires `ffmpeg` (`brew install ffmpeg`).
