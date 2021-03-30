#!/bin/sh
set -e
echo Starting migration
sleep 10


cd /db/scripts
python3 db.py

echo Done with migration