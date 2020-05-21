
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('habits').del()
    .then(function () {
      // Inserts seed entries
      return knex('habits').insert([
        {
          userID: 1,
          activity: 'coding',
          date_of_entry: '2020--05--18',
          date_of_streak: '2020--05--18',
          frequency: 'daily',
          streak: 0
        },
        {
          userID: 1,
          activity: 'swimming',
          date_of_entry: '2020--05--17',
          date_of_streak: '2020--05--17',
          frequency: 'weekly',
          streak: 0
        },
        {
          userID: 1,
          activity: 'reading',
          date_of_entry: '2020--05--16',
          date_of_streak: '2020--05--17',
          frequency: 'daily',
          streak: 0
        },
      ]);
    });
};
