const AUTHOR_DATA = require('../sample_data/sample_authors');

exports.seed = knex => knex('authors').del()
    .then(() => knex('authors').insert(AUTHOR_DATA))
    .then( function(){
      return knex.raw("SELECT setval('authors_id_seq', (SELECT MAX(id) FROM authors))");
    });
