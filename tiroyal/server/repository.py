import sqlite3

from tiroyal.server.users import User

CONNECTION_STRING = "tiroyal/datastore"


def create_user(user, connection_string):
    query = f"""INSERT INTO users(name, email, password, second_password)
            VALUES ('{user.name}', '{user.email}', '{user.password}', '{user.second_password}');"""

    conn = sqlite3.connect(connection_string)
    cursor = conn.cursor()
    try:
        cursor.execute(query)
        conn.commit()
        conn.close()
    except Exception as e:
        cursor.close()
        conn.close()
        raise e


def get_user_by_email(user, connection_string):
    conn = sqlite3.connect(connection_string)

    # create select query
    query = f"select id, name, email, password, second_password from users where email = '{user.email}';"

    # initialise a cursor
    cursor = conn.cursor()

    # execute query using the cursor
    results = cursor.execute(query).fetchone()

    cursor.close()
    conn.close()

    current_user = User.from_list(results)
    return current_user


def get_all_users(connection_string):
    conn = sqlite3.connect(connection_string)
    query = "select id, name, email, password, second_password from users"
    cursor = conn.cursor()
    results = cursor.execute(query).fetchall()
    cursor.close()
    conn.close()
    users = []
    for user in results:
        current_user = User.from_list(user)
        users.append(current_user)
    return users


def edit_user_by_email(user, connection_string):
    user_dict = user.to_dict()
    query = "UPDATE users SET "
    for key, value in user_dict.items():
        if isinstance(value, str) and value is not None:
            query += f" {key} = '{value}',"
        elif value is not None:
            query += f" {key} = {value},"
    query = query[:-1] # get all characters up to last
    query += f" WHERE email = '{user.email}';"
    print(query)
    conn = sqlite3.connect(connection_string)
    cursor = conn.cursor()
    try:
        cursor.execute(query)
        conn.commit()
        cursor.close()
        conn.close()
    except Exception as e:
        cursor.close()
        conn.close()
        raise e

from enum import StrEnum
class LeaderboardTimeFrame(StrEnum):
    ALL = '0',
    WEEK = "date('now', 'start of day', '-1 week')",
    DAY = "date('now', 'start of day')"

def get_global_leaderboard(connection_string, timeframe=LeaderboardTimeFrame.ALL ,page=0):
    # Highest score of each user by alltime/week/day
    query = f"""
    SELECT name, max(score) from games
    JOIN users on users.id=user_id
    WHERE date(games.created_at)>={timeframe}')
    GROUP by user_id
    ORDER BY score DESC LIMIT {page*20},{page*20+20}
    """

    conn = sqlite3.connect(connection_string)
    cursor = conn.cursor()
    try:
        results = cursor.execute(query).fetchall()
        cursor.close()
        conn.close()
        return results
    except Exception as e:
        cursor.close()
        conn.close()
        raise e