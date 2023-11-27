include .env
SCHEMA = pharmacy

db-docker:
	make db-down
	docker compose -f Dockerfile-mysql.yaml up -d
	sleep 10
	make liquibase-update

db-down:
	docker compose -f Dockerfile-mysql.yaml down

db-clear:
	node-liquibase dropAll --url="jdbc:mysql://localhost:3306/pharmacy" \
	--username=${MYSQL_USERNAME} --password=${MYSQL_PASSWORD} \
	--classPath="liquibase/mysql-connector-j-8.2.0.jar" --driver=${MYSQL_DRIVER}

liquibase-update:
	node-liquibase update --changeLogFile="liquibase/master-change-log.yaml" \
	--url=${MYSQL_URL} --username=${MYSQL_USERNAME} --password=${MYSQL_PASSWORD} \
	--classPath="liquibase/mysql-connector-j-8.2.0.jar" --driver=${MYSQL_DRIVER}

test-liquibase:
	make db-clear
	make liquibase-update

run-dev:
	npm run dev

db-snapshot:
	mysqldump -t -u root -proot ${SCHEMA} --ignore-table=${SCHEMA}.DATABASECHANGELOG \
	--ignore-table=${SCHEMA}.DATABASECHANGELOGLOCK --result-file=db-snapshot.sql

db-inserts:
	 make db-snapshot
	 cat db-snapshot.sql | grep INSERT > db-inserts.sql