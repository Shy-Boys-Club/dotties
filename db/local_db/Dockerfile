FROM postgres:latest

COPY migration/scripts/create_db.sql /docker-entrypoint-initdb.d/create_db.sql


EXPOSE 5432