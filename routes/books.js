'use strict';

const express = require('express');
const router = express.Router();
const db = require('../knex')


router.get('/books', (_req, res) => {
  getBooksAndAuthors().then((results) => {
    res.render('pages/books', {
      books: results
    });
  });
});

router.get('/books/:index', (_req, res, next) => {
  const index = Number.parseInt(_req.params.index);
  if (Number.isNaN(index) || index < 0) {
    next();
  }

  getBooksAndAuthors(index).then((results) => {
    res.render('pages/book', {
      book: results
    });
  });
});

function getBooksAndAuthors(index) {
  index = index || -1;
  return Promise.all([
    getBooks(),
    getAuthors()
  ]).then((results) => {
    results[0].forEach((book) => {
      let authorArray = results[1].filter((author) => author.id === book.id);
      book.authors = authorArray;
    })
    return index < 0 ? results[0] : results[0][index-1];
  })
}

function getBooks() {
  return db('books').select('*');
}

function getAuthors() {
  return db('authors').select('books.id', 'first_name')
    .innerJoin('authors_books', 'authors_books.authors_id', 'authors.id')
    .innerJoin('books', 'authors_books.books_id', 'books.id');
};

module.exports = router;
