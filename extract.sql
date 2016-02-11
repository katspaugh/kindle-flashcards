select
        words.stem, lookups.usage
        from lookups
        left outer join book_info
        on lookups.book_key=book_info.id
        left outer join words
        on lookups.word_key=words.id;
