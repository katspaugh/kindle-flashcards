# Kindle Flashcards

 1. Plug Kindle into computer.
 2. Execute `./bin/export`. It will create a vocab file per book in `./output`.
 3. Run `LANGUAGE=de node translate.js output/<YOUR BOOK>.txt > flashcards.txt` for books you want to create translated cards for. The `LANGUAGE` parameter is the book language.
 4. ...
 5. The flashcards are ready!
