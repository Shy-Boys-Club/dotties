import logging
from contextlib import contextmanager
from typing import Dict
# 3rd party
import psycopg2


@contextmanager
def db_cursor(connection_string: str):
    # Wrapper for db connection
    conn = psycopg2.connect(connection_string)
    cur = conn.cursor()
    try:
        yield cur
        conn.commit()
    except psycopg2.DatabaseError:
        logging.error('Database operation failed:', exc_info=True, stack_info=True)
        raise
    finally:
        cur.close()
        conn.close()



def format_query(filename: str, kwargs: Dict[str, str]) -> str:
    """ Read an sql file and format it with values from kwargs.
    """

    with open(filename, 'r') as file:
        query = file.read()

    return query.format(**kwargs)
