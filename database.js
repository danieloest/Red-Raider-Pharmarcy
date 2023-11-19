import mysql from 'mysql2';
import dotenv, {config} from 'dotenv';
import {Liquibase} from 'liquibase';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()
/*
// Having issues with connection here
const conn = mysql.createConnection({
    url: 'jdbc:mysql://localhost:3306/pharmacy?createDatabaseIfNotExist=true',
    host: 'localhost',
    username: 'root',
    password: 'root',
    database: 'pharmacy'
})

conn.connect(function (err) {
    if (err) throw err;
    console.log("Connected to MySql DB!");
})
*/
const myConfig = {
    driver: 'com.mysql.cj.jdbc.Driver',
    classpath: 'liquibase/mysql-connector-j-8.2.0.jar',
    changeLogFile: 'liquibase/master-change-log.yaml',
    url: 'jdbc:mysql://localhost:3306/pharmacy?createDatabaseIfNotExist=true',
    username: 'root',
    password: 'root'
}

const liquibase = new Liquibase(myConfig);

try {
    console.log("Running Liquibase changes")
    await liquibase.dropAll();
    await liquibase.update();
}
catch (err) {
    console.log("Liquibase startup failed, See error message: " + err.message);
}