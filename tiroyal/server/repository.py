import sqlite3

from tiroyal.server.users import User


def create_user(user, connection_string):
    query = f"""INSERT INTO users(name, email, password, second_password)
            VALUES ('{user.name}', '{user.email}', '{user.password}', '{user.second_password}');"""

    conn = sqlite3.connect(connection_string)
    cursor = conn.cursor()
    cursor.execute(query)
    conn.commit()
    conn.close()


def get_user_email_and_password(user, connection_string):
    conn = sqlite3.connect(connection_string)

    # create select query
    query = f"select name, email, password, second_password from users where email = '{user.email}';"

    # initialise a cursor
    cursor = conn.cursor()

    # execute query using the cursor
    results = list(cursor.execute(query))
    users = []
    for user in results:
        current_user = User.from_list(user)
        users.append(current_user)
    return users


def get_all_users(connection_string):
    conn = sqlite3.connect(connection_string)
    query = "select name, email, password, second_password from users"
    cursor = conn.cursor()
    results = list(cursor.execute(query))
    users = []
    for user in results:
        current_user = User.from_list(user)
        users.append(current_user)
    return users

