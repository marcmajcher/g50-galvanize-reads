'use strict';

const express = require('express');
const router = express.Router();
const db = require('../knex')

router.get('/authors', (_req, res) => {
  getAuthorsAndBooks().then((results) => {
    res.render('pages/authors', {
      authors: results
    });
  });
});

router.get('/authors/:index', (_req, res, next) => {
  const index = Number.parseInt(_req.params.index);
  if (Number.isNaN(index) || index < 0) {
    next();
  }
  getAuthorsAndBooks(index).then((results) => {
    res.render('pages/author', {
      author: results
    });
  });
});


function getAuthorsAndBooks(index){
  index = index || -1;
  return Promise.all([
    getAuthors(),
    getBooks()
  ]).then((results) =>{
    results[0].forEach((author) =>{
      let bookArray = results[1].filter((book) => book.id === author.id);
      author.books = bookArray;
    });
    return index < 0 ? results[0] : results[0][index-1];
  });
};

function getAuthors(){
  return db('authors').select('*');
}

function getBooks(){
  return db('books').select('authors.id', 'title')
    .innerJoin('authors_books', 'authors_books.books_id', 'books.id')
    .innerJoin('authors', 'authors_books.authors_id', 'authors.id');
}

module.exports = router;
