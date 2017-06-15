const env = 'development';
const config = require('./knexfile.js')[env];
const knex = require('knex')(config);

knex('books').select('title','authors.first_name','authors.last_name')
.join('authors_books','books.id','authors_books.books_id')
.join('authors','authors_books.authors_id','authors.id')
.then((result) =>{
  console.log(result);
  knex.destroy();
});
