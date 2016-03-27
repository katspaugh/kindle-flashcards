SELECT
        words.stem, lookups.usage
        FROM lookups
        LEFT OUTER JOIN book_info
        ON lookups.book_key=book_info.id
        LEFT OUTER JOIN words
        ON lookups.word_key=words.id
	WHERE title = '#TITLE#';
