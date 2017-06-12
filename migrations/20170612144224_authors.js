
exports.up = (knex, Promise) => {
  return knex.schema.createTable('authors', (table) => {
    table.increments('id').primary();
    table.string('first_name').notNullable().defaultTo('');
    table.string('last_name').notNullable().defaultTo('');
    table.text('biography').notNullable().defaultTo('');
    table.text('portrait_url').notNullable().defaultTo('');
  })
};

exports.down = (knex, Promise) => knex.schema.dropTable('authors');
