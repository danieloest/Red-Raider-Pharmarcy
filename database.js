'use strict';
const mysql = require("mysql2")
const dotenv = require("dotenv")
const {Liquibase} = require("liquibase");
dotenv.config();

const liquibaseConfig = {
    driver: process.env.MYSQL_DRIVER,
    classpath: 'liquibase/mysql-connector-j-8.2.0.jar',
    changeLogFile: 'liquibase/master-change-log.yaml',
    url: process.env.MYSQL_URL,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
}

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
})

const liquibase = new Liquibase(liquibaseConfig);

async function initLiquibase() {
    try {
        console.log("Release lock for Liquibase to avoid potential deadlock")
        await liquibase.releaseLocks();
        console.log("Dropping database")
        await liquibase.dropAll();
        console.log("Running liquibase changes")
        await liquibase.update();
        console.log("Liquibase complete")
    } catch (err) {
        console.log("Liquibase startup failed, See error message: " + err.message);
    }
}

// Setup and run liquibase
initLiquibase().then(r => pool.getConnection(function (err , connection) {
    if (err) throw err;
    console.log("Connected to MySql DB");
}));
