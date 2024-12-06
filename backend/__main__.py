from flask import Flask, Response, request
from flask_cors import CORS
import argparse
import json

from .common.json import JSONEncoder
from .common.constants import DEFAULT_HOST, DEFAULT_PORT
from .common.codes import HTTP_CODE
from .common.review_categories import resolve_category
from .database.restaurant import RestaurantDatabase
from .database.reviews import Review
from .database.manager import DatabaseManager
from .database.users import Users, User

from typing import Tuple, List

app = Flask(__name__)
CORS(app)
manager = DatabaseManager()
users = Users()

@app.route('/heartbeat', methods=["GET"])
def heartbeat():
    """Returns a Stream to indicate that the server is alive
    
    Creates a Server-Side Stream Event that can be continuously
    used to evaluate that the server is alive
    
    Endpoint: /heartbeat
    
    Returns:
        A sequence of alternating 0s and 1s, separated by 1 second
        each
    """
    def heartbeat_generator():
        """Generates a heartbeat (0/1)

        Yields:
            int: A sequence of 0s and 1s,
            separated by 1 second
        """
        import time
        i = 0
        while True:
            yield i
            i = i ^ 1
            time.sleep(1)
    return Response(heartbeat_generator(), content_type="application/octet-stream")

@app.route('/register_user', methods=["POST"])
def register_user() -> int:
    """Registers a user into the system, and logs them in
    
    Endpoint: /register_user
    
    Arguments:
        HTTP Request Body (str): JSON that contains:
            name : The name of the user
            password : The password for the user

    Returns:
        int: The login token, or common.FAILURE_TOKEN if it doesn't succeed
    """
    
    # Argument Parse
    user_information = request.get_json()
    name = user_information['name']
    password = user_information['password']
    
    # Attempt to Register User
    user = User(name, password)
    if not users.add_user(user):
        return f"User not registered, name {name} already exists", HTTP_CODE.BAD_REQUEST.value
    
    # Attempt to login
    token = users.login(user)
    if not token:
        return "[System Bug] Something has gone wrong on our end!", HTTP_CODE.SERVER_BAD.value
    
    # Return login token
    return json.dumps(token, cls=JSONEncoder)

@app.route('/login', methods=["POST"])
def login() -> int:
    """Attempts to log a user into the system
    
    Endpoint: /login

    Arguments:
        HTTP Request Body (str): JSON that contains:
            name : The name of the user
            password : The password for the user

    Returns:
        int: The login token, or common.FAILURE_TOKEN if it doesn't succeed
    """
    # Argument Parse
    user_information = request.get_json()
    name = user_information['name']
    password = user_information['password']
    
    # Attempt to login
    user = User(name, password)
    token = users.login(user)
    if not token:
        if users.contains_name(user.name):
            return f"Incorrect password for user {user.name}", HTTP_CODE.UNAUTHORIZED.value
        return "This user does not exist", HTTP_CODE.BAD_REQUEST.value
    
    # Return login token
    return json.dumps(token, cls=JSONEncoder)

@app.route('/logout', methods=["POST"])
def logout() -> str:
    """Logs a user out
    
    Endpoint: /logout

    Returns:
        str: Either nothing (Success), or an error
    """
    
    # Argument Parse
    user_information = request.get_json()
    token = user_information['token']
    
    # Attempt to login
    success = users.logout(token)
    if not success:
        return "This user was not logged in, or doesn't exist", HTTP_CODE.BAD_REQUEST.value
    
    # Return success
    return Response(status=200)

@app.route('/search', methods=["GET"])
def search_restaurants() -> List[str]:
    """Provides a list of matching restaurants given a search query
    
    Endpoint: /search?query=[string]
    
    Arguments:
        query (str): The word entered into the search bar. An empty string
        if not specified
    
    Return:
        The list of restaurants matching the query. If query is not specified
        or if the query is empty, it returns all restaurants (so, we use this
        endpoint to also get the names of all restaurants)
    """
    # Argument Parse
    query = request.args.get("query", "")
    
    # Return List of restaurants matching query
    return manager.get_restaurant_list(query)

@app.route('/get_data', methods=["GET"])
def get_data() -> RestaurantDatabase:
    """Gets all data on a restaurant from a name
    
    Endpoint: /get_data?restaurant=<string>
    
    Arguments:
        restaurant (str): The name of the restaurant.

    Returns:
        RestaurantDatabase: The restaurant database, which includes
        all display information about it.
    """
    
    # Argument Parse
    restaurant = request.args.get("restaurant")
    
    # Get it and check it it exists
    restaurant_data = manager.get_restaurant(restaurant)
    
    if not restaurant:
        return "This restaurant doesn't exist", HTTP_CODE.NOT_FOUND.value
    
    # Return the restaurant data
    return json.dumps(restaurant_data.to_webpage_format(), cls=JSONEncoder)

@app.route('/add_review', methods=["POST"])
def add_review() -> RestaurantDatabase:
    """Adds a review to a restaurant

    Endpoint: /add_review?restaurant=<str>
    Data: Review

    Arguments:
        restaurant (str): The name of the restaurant
        HTTP Body: A dictionary with the following structure:
            token : The integer token,
            review : The written review,
            ratings : {category : rating from 0 to 5, or -1 if not specified}

    Return:
        The new restaurant database for the restaurant
        the review was posted to
    """
    
    # Argument Parse
    restaurant = request.args.get("restaurant")
    data = request.get_json()
    
    # Modify one of the arguments to get the user,
    # rejecting the token if it doesn't exist
    token = data['token']
    del data['token']
    user = users.validate_user(token)
    if not user:
        return "The token provided is invalid for any user", HTTP_CODE.UNAUTHORIZED.value
    data['user'] = user.name
    review = Review.from_dict(data)
    
    # Now, get the restaurant database
    restaurant_data = manager.get_restaurant(restaurant)
    if not restaurant_data:
        return "The restaurant provided is not a valid one", HTTP_CODE.NOT_FOUND.value
    
    # Add the review
    restaurant_data.add_review(review)
    
    # Finally, provide the updated database
    return json.dumps(restaurant_data.to_webpage_format(), cls=JSONEncoder)

@app.route('/filter_reviews', methods=["GET"])
def filter_reviews() -> List[Review]:
    """Filters a list of reviews for a restaurant
    
    Endpoint: /filter_reviews?restaurant=<str>&filter=[str]...
    
    Arguments:
        restaurant (str): The name of the restaurant
        filter (List[str]): The categorical filters to apply.
        Simply keep adding &filter=[str] to make a list of filters

    Returns:
        List[Review]: The list of reviews
    """
    
    # Argument Parse
    restaurant = request.args.get("restaurant")
    filters = request.args.getlist("filter")

    # Parse out filters even more, ignoring bad filters
    filters = [resolve_category(filter) for filter in filters if resolve_category(filter)]

    # Get the restaurant database
    restaurant_data = manager.get_restaurant(restaurant)
    if not restaurant_data:
        return "The restaurant provided is not a valid one", HTTP_CODE.NOT_FOUND.value

    return json.dumps(restaurant_data.reviews.filter(*filters), cls=JSONEncoder)    


def parse_args() -> Tuple[str, int, bool]:
    """Parses out arguments on the command line for this program
    
    Parameters (Command-Line):
        --host (str): The host to run the server on
        --port (int): The port to run the server on
        --debug (bool): Specifying this flag will print debug messages for the server

    Returns:
        Tuple[str, int, bool]: The host (str), port (int), and debug flag (bool) that
        is used to create the server (comes from command-line arguments)
    """
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", type=int, default=DEFAULT_PORT, help="Port for Server")
    parser.add_argument("--host", type=str, default=DEFAULT_HOST, help="Host for Server")
    parser.add_argument("--debug", action="store_true", default=False)
    
    args = parser.parse_args()
    return args.host, args.port, args.debug

if __name__ == "__main__":
    """Runs the flask server
    """
    host, port, debug = parse_args()
    print(host, port, debug)
    app.run(host=host, port=port, debug=debug)
    # Save all data
    print("Saving user and restaurant data, please wait")
    users.save()
    manager.save()