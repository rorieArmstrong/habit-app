
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          user_name: 'rorieArmstrong',
          password: 'test123',
          first_name: 'Rorie',
          surname: 'Armstrong'
        },
        {
          user_name: 'liamMontero',
          password: 'test123',
          first_name: 'Liam',
          surname: 'Montero'
        },
        {
          user_name: 'keirPearson',
          password: 'test123',
          first_name: 'Keir',
          surname: 'Pearson'
        },{
          user_name: 'susanMissaglia',
          password: 'test123',
          first_name: 'Susan',
          surname: 'Missaglia'
        },
      ]);
    });
};
