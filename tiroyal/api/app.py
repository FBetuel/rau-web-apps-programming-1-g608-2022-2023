import datetime
import json

from flask import Flask, request

from tiroyal.server.register import signup, signin
from tiroyal.server.repository import CONNECTION_STRING, get_all_users, edit_user_by_email, get_global_leaderboard,LeaderboardTimeFrame
from tiroyal.server.users import User

app = Flask("tiroyal-api")


@app.route("/", methods=["GET"])
def welcome():
    return "<h1>Welcome to TI Royal's API</h1>", 200


@app.route("/api/v1/version", methods=["GET"])
def version():
    now = datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S")

    response = {
        "name": "tiroyal-api",
        "version": "v0.0.1",
        "last_updated": "2022-12-12T16:59:00",
        "request_time": now
    }
    response = json.dumps(response)
    return response, 200


@app.route("/api/v1/register", methods=["POST"])
def register():
    try:
        request_body = request.json
        signup(request_body, CONNECTION_STRING)
        return "", 204
    except Exception as e:
        error_message = {
            "error": f"Failed to create user. Cause: {e}."
        }
        error_json = json.dumps(error_message)
        return error_json, 500


@app.route("/api/v1/authenticate", methods=["POST"])
def authenticate():
    try:
        request_body = request.json
        user = signin(request_body, CONNECTION_STRING)
        return user.to_json(), 200
    except Exception as e:
        error_message = {
            "error": f"Failed to authenticate user. Cause: {e}."
        }
        error_json = json.dumps(error_message)
        return error_json, 500


@app.route("/api/v1/users", methods=["GET", "PUT", "DELETE"])
def users():
    if request.method == "GET":
        try:
            users = get_all_users(CONNECTION_STRING)
            response = [user.to_dict() for user in users]
            response = json.dumps(response)
            return response, 200
        except Exception as e:
            error_message = {
                "error": f"Failed to get all users. Cause: {e}."
            }
            error_json = json.dumps(error_message)
            return error_json, 500

    if request.method == "PUT":
        request_body = request.json
        if request_body.get("email") is None:
            error_message = {
                "error": f"Failed to update user. Missing user email."
            }
            error_json = json.dumps(error_message)
            return error_json, 500

        user = User.from_dict(request_body)
        edit_user_by_email(user, CONNECTION_STRING)
        return "", 204

    if request.method == "DELETE":
        pass

@app.route("/api/v1/global/all?pagenum", methods=["GET"])
def global_leaderboard():
    get_global_leaderboard(CONNECTION_STRING, LeaderboardTimeFrame.ALL, pagenum)
    pass

@app.route("/api/v1/global/week?pagenum", methods=["GET"])
def global_leaderboard():
    get_global_leaderboard(CONNECTION_STRING, LeaderboardTimeFrame.WEEK, pagenum)
    pass

@app.route("/api/v1/global/day?pagenum", methods=["GET"])
def global_leaderboard():
    get_global_leaderboard(CONNECTION_STRING, LeaderboardTimeFrame.DAY, pagenum)
    pass

app.run(port=5608, debug=True)