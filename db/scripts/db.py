import psycopg2
import json
import config
import sys
import os

sys.path.insert(0, '../utils')
from utils import db_cursor, format_query  # noqa: E402




def _set_config():
    conf = config.get_config()

    dbname = conf.db_settings['dbname']
    dbuser = conf.db_settings['dbuser']
    dbhost = conf.db_settings['dbhost']
    dbpassword = conf.db_settings['password']
    dbport = conf.db_settings['port']

    global CONNECTION_STRING
    CONNECTION_STRING = f'dbname={dbname} user={dbuser} host={dbhost} password={dbpassword} port={dbport}'

    global SQL_CONFIG
    SQL_CONFIG = conf.sql_config


def init_db():
    # Creates the database. DOES NOT DROP TABLES
    with db_cursor(CONNECTION_STRING) as cur:

        cur.execute(format_query('sql/users_t.sql', SQL_CONFIG))


if __name__ == '__main__':
    _set_config()
    init_db()
