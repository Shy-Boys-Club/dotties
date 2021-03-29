from collections import namedtuple
import os
import json


# Configs for Dotties database


def get_config():

    db_settings = {
        'dbhost': 'localhost',
        'dbname': 'dottiesdev',
        'dbuser': os.environ.get('LOCAL_DEV_DB_USER'),
        'password': os.environ.get('LOCAL_DEV_DB_PASSWD'),
        'port': 5522
    }

    schema = 'dotties'

    sql_config = {
        'SCHEMA': schema,
        'READERS': 'readers',
        'USERS_TABLE': f'{schema}.users'
    }

    conf = namedtuple('conf', ['db_settings', 'sql_config'])

    return conf(db_settings=db_settings, sql_config=sql_config)