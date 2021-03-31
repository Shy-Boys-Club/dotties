#!/bin/bash

#docker-compose -f docker-compose-db.yml up -d
docker-compose up -d

sleep 10

docker cp db/local_db/  postgres-dotties:/

docker exec -it -u postgres postgres-dotties psql -c "CREATE USER $LOCAL_DEV_DB_USER WITH SUPERUSER LOGIN PASSWORD $LOCAL_DEV_DB_PASSWD;"
docker exec -it -u postgres postgres-dotties psql -f /local_db/scripts/create_db.sql

cd db/local_db/scripts
python3 db.py
