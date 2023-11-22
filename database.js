import mysql from 'mysql2';
import dotenv from 'dotenv';
import {Liquibase} from 'liquibase';
dotenv.config();

export const conn = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
})

const myConfig = {
    driver: process.env.MYSQL_DRIVER,
    classpath: 'liquibase/mysql-connector-j-8.2.0.jar',
    changeLogFile: 'liquibase/master-change-log.yaml',
    url: process.env.MYSQL_URL,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
}

export const liquibase = new Liquibase(myConfig);

export async function initLiquibase() {
    try {
        console.log("Dropping database to re-initialize")
        await liquibase.dropAll();
        console.log("Running Liquibase changes")
        await liquibase.update();
        console.log("Database ready to use")
    }
    catch (err) {
        console.log("Liquibase startup failed, See error message: " + err.message);
    }
}