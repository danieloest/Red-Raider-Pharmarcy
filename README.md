## Pre-requisites
- npm
- mysql
- liquibase
- docker
- make

Create file named `.env` in root of project with the following variables:
```
MYSQL_HOST=localhost
MYSQL_USERNAME=user
MYSQL_PASSWORD=password
MYSQL_DATABASE=pharmacy
MYSQL_URL=jdbc:mysql://localhost:3306/pharmacy?createDatabaseIfNotExist=true
MYSQL_DRIVER='com.mysql.cj.jdbc.Driver'
```

## Running the application
1. Run `make run-dev` or `npm run dev`
2. Open browser and go to `http://localhost:8080/`

## Liquibase

[Liquibase](https://docs.liquibase.com/home.html) is a database migration tool that 
is leveraged in this project to manage database schema and seed data insertion.

### Generating schema changes

Schema changes are manage by [changesets](https://docs.liquibase.com/concepts/changelogs/changeset.html)
in [yaml](https://docs.liquibase.com/concepts/changelogs/yaml-format.html) format
as part of [changelogs](https://docs.liquibase.com/concepts/changelogs/home.html)


### Generating data insertions

Data entry is performed manually in the database using IntelliJ IDEA (or IDE of choice)
with the [database tab](https://www.jetbrains.com/help/idea/database-tool-window.html)
and then captured using [mysqldump](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html).

See process below:

- Connect to database using IDE or DBMS of choice.
- Insert data into tables that you want to store as seed data.
- Run `make db-inserts` to capture data insert statements in `db-inserts.sql` file.
- Copy and re-name `db-inserts.sql` file into `liquibase/sql-scripts` with table name.
- Create liquibase migration to run sql insert statements as part of migration. ex. `changelog-0003.yaml`


