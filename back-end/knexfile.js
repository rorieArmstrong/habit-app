// Update with your config settings.
require('dotenv').config();
const path = require('path')
const dbPath = path.resolve(__dirname, 'data/habits.sqlite3')

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: dbPath
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: './back-end/data/habits.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './back-end/data/migrations',
    },
    seeds: {
      directory: './back-end/data/seeds'
    }
  },


  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
