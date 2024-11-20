from flask import Flask, Response, request
import argparse

from .common.constants import DEFAULT_HOST, DEFAULT_PORT
from .database.restaurant import RestaurantDatabase
from .database.reviews import Review

from typing import Tuple, List

app = Flask(__name__)


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

@app.route('/register_user', methods="GET")
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
    
    user_information = request.get_json()
    name = user_information['name']
    password = user_information['password']
    raise NotImplementedError()

@app.route('/login', methods="GET")
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
    user_information = request.get_json()
    name = user_information['name']
    password = user_information['password']
    raise NotImplementedError()

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
    query = request.args.get("query", "")
    raise NotImplementedError()

@app.route('/get_data', methods="GET")
def get_data() -> RestaurantDatabase:
    """Gets all data on a restaurant from a name
    
    Endpoint: /get_data?restaurant=<string>
    
    Arguments:
        restaurant (str): The name of the restaurant.

    Returns:
        RestaurantDatabase: The restaurant database, which includes
        all display information about it.
    """
    restaurant = request.args.get("restaurant")
    raise NotImplementedError()

@app.route('add_review', methods="POST")
def add_review() -> RestaurantDatabase:
    """Adds a review to a restaurant

    Endpoint: /add_review?user=<str>&restaurant=<str>
    Data: Review

    Arguments:
        user (str): The user making the review
        restaurant (str): The name of the restaurant
        HTTP Body: A dictionary with the following structure:
            token : The integer token,
            review : The written review,
            ratings : {category : rating from 0 to 5, or -1 if not specified}

    Return:
        The new restaurant database for the restaurant
        the review was posted to
    """
    query = request.args.get("user")
    restaurant = request.args.get("restaurant")
    data = request.get_json()
    token = data['token']
    user = 1 # Put code here
    data['user'] = user.name
    data = Review.from_dict(data)
    raise NotImplementedError()

@app.route('/filter_reviews', methods="GET")
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
    restaurant = request.args.get("restaurant")
    filters = request.args.getlist("filter")
    raise NotImplementedError()
        

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