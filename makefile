db-docker:
	make db-down
	docker compose -f Dockerfile-mysql.yaml up -d
	sleep 10
	make liquibase-update

db-down:
	docker compose -f Dockerfile-mysql.yaml down

liquibase-update:
	node-liquibase update --changeLogFile="liquibase/master-change-log.yaml" --url="jdbc:mysql://localhost:3307/pharmacy?createDatabaseIfNotExist=true" --username="root" --password="root" --classPath="liquibase/mysql-connector-j-8.2.0.jar" --driver="com.mysql.cj.jdbc.Driver"

run-dev:
	npm run dev

data-snapshot:
	mysqldump -t -u root -proot pharmacy Users --result-file=db-snapshot.sql

db-inserts:
	 cat db-snapshot.sql | grep INSERT > db-inserts.sql