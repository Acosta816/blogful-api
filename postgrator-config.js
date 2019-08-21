/*Postgrator CLI connects to our database by reading a configuration file
containing the database's name, host, user name, password, and port number. */
/* "driver" refers to the same driver setting we used when creating a Knex instance. */
/* "migrationDirectory" refers to the folder in our application that contains our migration steps */

require('dotenv').config();

module.exports = {
  "migrationDirectory": "migrations",
  "driver": "pg",
  "host": process.env.MIGRATION_DB_HOST,
  "port": process.env.MIGRATION_DB_PORT,
  "database": process.env.MIGRATION_DB_NAME, //can change this in .env to temporarily point to test database if need be.
  "username": process.env.MIGRATION_DB_USER,
  "password": process.env.MIGRATION_DB_PASS
}


