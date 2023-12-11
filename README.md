## Pre-requisites
- npm
- mysql
- liquibase
- docker
- make

Create file named `.env` in root of project with the following variables:
```
MYSQL_HOST=localhost
MYSQL_USERNAME=root
MYSQL_PASSWORD=password
MYSQL_DATABASE=pharmacy
MYSQL_URL=jdbc:mysql://localhost:3306/pharmacy?createDatabaseIfNotExist=true
MYSQL_DRIVER='com.mysql.cj.jdbc.Driver'
AUTH0_CLIENT_ID=zL0WoC4iPE7gfjEqgHuK4dDtkbieBlpG
AUTH0_DOMAIN=dev-ymrwl54nf7tekode.us.auth0.com
AUTH0_CLIENT_SECRET=iSfzwvj2erU4H7Un98dD-dAvkFKzKX18lL6IwSkgUY65YG0vmZMp3mM2M6PH6Fv9
SESSION_SECRET=a8d1902d3dc0f3697d96997fbb77a8feac7c218a9baaab7743cba3002accad21
AUTH0_CALLBACK_URL=http://localhost:8080/callback
AUTH_API_HOST=dev-ymrwl54nf7tekode.us.webtask.run
AUTH0_API_KEY=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik9WeVhMN3JnNVlaQXkxdmUzZDlEVCJ9.eyJpc3MiOiJodHRwczovL2Rldi15bXJ3bDU0bmY3dGVrb2RlLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJ6TDBXb0M0aVBFN2dmakVxZ0h1SzRkRHRrYmllQmxwR0BjbGllbnRzIiwiYXVkIjoidXJuOmF1dGgwLWF1dGh6LWFwaSIsImlhdCI6MTcwMjI2NDYxOSwiZXhwIjoxNzAyMzUxMDE5LCJhenAiOiJ6TDBXb0M0aVBFN2dmakVxZ0h1SzRkRHRrYmllQmxwRyIsInNjb3BlIjoicmVhZDp1c2VycyByZWFkOmFwcGxpY2F0aW9ucyByZWFkOmNvbm5lY3Rpb25zIHJlYWQ6Y29uZmlndXJhdGlvbiB1cGRhdGU6Y29uZmlndXJhdGlvbiByZWFkOmdyb3VwcyBjcmVhdGU6Z3JvdXBzIHVwZGF0ZTpncm91cHMgZGVsZXRlOmdyb3VwcyByZWFkOnJvbGVzIGNyZWF0ZTpyb2xlcyB1cGRhdGU6cm9sZXMgZGVsZXRlOnJvbGVzIHJlYWQ6cGVybWlzc2lvbnMgY3JlYXRlOnBlcm1pc3Npb25zIHVwZGF0ZTpwZXJtaXNzaW9ucyBkZWxldGU6cGVybWlzc2lvbnMgcmVhZDpyZXNvdXJjZS1zZXJ2ZXIgY3JlYXRlOnJlc291cmNlLXNlcnZlciB1cGRhdGU6cmVzb3VyY2Utc2VydmVyIGRlbGV0ZTpyZXNvdXJjZS1zZXJ2ZXIiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.ll64uwwGLFqMKbHMiZN9Mi5i7JOzLmSnDhv_BV0DPqjJu-qhnti4DtdMJHbo6WqUXYD-msAuP1aU-mPNPqG2KWARNq0DqdhS1xcundDA_MfJT_rhsK2gYujySXx-7aCp_809qKEGH6tNMQTW4qQSl3jbecvi5ji3Rf40B9qTqkAL649LfYTWQbAlzOTDSaJ797kKIfUKat3gCDFwL5jcN-Y0RA123pPZ716PCcV6dZBd_4Nr-Hru4xZHb4_LYCYpoAGufizvxv-13gX2-NLGhvmgsbna7anXmqtdi_01p9l7rqfEjc-SwnnBJmdXa9ElcKTd5L3l6JIA4itwhWhR-Q
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


## Sequelize

[Sequelize](https://sequelize.org/) is leveraged as the ORM (Object Relational Mapping) to sync the 
schema of models with the database. Sequelize provides functionality to access, update, and delete records
that could be tied together with a repository pattern or abstracting direct SQL queries.