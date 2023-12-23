const { Pool } = require('pg');
require('dotenv').config();

const dbUsername = process.env.DB_USERNAME;
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
const dbPort = process.env.DB_PORT
const dbPassword = process.env.DB_PASSWORD

const pool = new Pool({
    user: dbUsername,
    host: dbHost,
    database: dbName,
    password: dbPassword,
    port: dbPort,
});

module.exports = pool;