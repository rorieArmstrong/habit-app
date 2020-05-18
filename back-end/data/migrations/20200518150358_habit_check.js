
exports.up = function(knex, Promise) {
  return knex.schema.createTable('habits', tbl => {
      tbl.increments('habitID');
      tbl.integer('userID');
      tbl.string('activity').notNullable();
      tbl.date('date_of_entry');
      tbl.string('frequency').notNullable();
      tbl.integer('streak');
  })
};

exports.down = async function(knex) {
  return knex.schema.dropTableIfExists('habits')
};
