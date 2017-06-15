const BOOK_DATA = require('../sample_data/sample_books');

exports.seed = knex => knex('books').del()
    .then(() => knex('books').insert(BOOK_DATA))
    .then(() => knex.raw("SELECT setval('books_id_seq', (SELECT MAX(id) FROM books))"));
