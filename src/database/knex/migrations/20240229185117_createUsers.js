exports.up = knex => knex.schema.createTable("users", table => {
  table.increments('id').primary();
  table.string('name', 150).notNullable();
  table.string('email', 255).notNullable().unique();
  table.string('password', 255).notNullable();
  table.string('avatar', 255);
  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("users", table => {

});
