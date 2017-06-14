'use strict';

const express = require('express');
const router = express.Router();
const db = require('../knex')


router.get('/books', (_req, res) => {
  getBooksAndAuthors().then((results) => {
    results[0].forEach((book)=>{
      let authorArray = results[1].filter((author)=> author.id === book.id);
      book.authors = authorArray;
    })
    res.render('pages/books', {
      books: results[0]
    });
  });
});

router.get('/books/:index', (_req,res) => {

})

function getBooksAndAuthors(){
  return Promise.all([
    getBooks(),
    getAuthors()
  ]).then((results)=>{
    return results;
  })
}

function getBooks(){
  return db('books').select('*');
}

function getAuthors() {
  return db('authors').select('books.id','first_name')
  .innerJoin('authors_books','authors_books.authors_id','authors.id')
  .innerJoin('books','authors_books.books_id','books.id');
};

module.exports = router;
