exports.up = (knex, Promise) => {
  return knex.schema.createTable('authors_books', (table) => {
    table.increments('id').primary();
    table.integer('books_id').unsigned().references('id').inTable('books').onDelete('CASCADE');
    table.integer('authors_id').unsigned().references('id').inTable('authors').onDelete('CASCADE');
  })
};

exports.down = (knex, Promise) => knex.schema.dropTable('authors_books');
