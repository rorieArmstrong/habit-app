
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments('userID');
        tbl.string('user_name').notNullable();
        tbl.string('password').notNullable();
        tbl.string('first_name').notNullable();
        tbl.string('surname').notNullable();
    })
  
};

exports.down = async function(knex) {
  return knex.schema.dropTableIfExists('users');
};
