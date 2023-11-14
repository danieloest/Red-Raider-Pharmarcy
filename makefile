database-up
	docker compose -f mysql-dockerfile.yaml up -d

liquibase-update:
	node-liquibase --changeLogFile="liquibase/master-change-log.yaml" --url="jdbc:mysql://localhost:3307/pharmacy?createDatabaseIfNotExist=true" --username="root" --password="root" --classPath="liquibase/mysql-connector-j-8.2.0.jar" --driver=com.mysql.cj.jdbc.Driver update