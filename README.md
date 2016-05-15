# Kindle Flashcards

 1. Plug Kindle into the computer.
 2. Open the terminal.
 3. Navigate to the repo folder `cd ./kindle-flashcards`.
 4. Execute `./bin/export`. It will create a file with words and quotes per book in `./output`.
 5. To add translations, run `TARGET_LANG=en ./bin/translate output/Schachnovelle.txt > flashcards.txt`.
 6. To add audio, run `./bin/add-audio flashcards.txt > flashcards_with_audio.txt`. The audio will be saved into `./output/audio`.
 7. ...
 8. The flashcards are ready!

## Importing into Anki
 * Create a new deck or use an existing deck.
 * Create or select a note type with four fields: Front, Back, Context and Audio.

![Screenshot](https://cloud.githubusercontent.com/assets/381895/15276152/0e9b118a-1ae0-11e6-903a-4d14e5305491.png)

 * Import the flashcards file (File -> Import).
 * Copy the audio files into the Anki media collection directory (typically `~/Documents/Anki/User 1/collection.media`).
