 1. Plug Kindle in
 2. Execute bin/export
 3. Open sqlite3 and call this commands:
    .separator "\t"
    .import flashcards lookups.txt
    TODO: automate this step
 4. Execute bin/print
 5. Flashcards are ready! Open flashcards.txt
