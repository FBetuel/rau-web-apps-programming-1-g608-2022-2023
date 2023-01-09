# Source: https://www.geeksforgeeks.org/how-to-append-a-new-row-to-an-existing-csv-file/
# Source: https://github.com/useme-com/revolut-python

import csv 

def create_user(user, filename):
    # open file
    with open(filename, "a", newline="") as csvfile:
        # write user details 
        fieldnames = ['id', 'name', 'email', 'password', 'second_password']
        user_details = {
            'id': user['id'], 
            'name': user['name'], 
            'email': user['email'],
            'password': user['password'], 
            'second_password': user['second_password']
        }

        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writerow(user_details)

filename = "D:\\LUCHICI\\Web Apps Programming 1\\Source\\rau-web-apps-programming-1-g608-2022-2023\\tiroyal\\api\\datastore\\tiroyal_users.csv"
user1 = {
    "id": 5,
    "name": "User 5",
    "email": "a@b.c",
    "password": "123e4r321",
    "second_password": "243e4r321"
}
create_user(user1, filename)