import json

from common.constants import DEFAULT_DATABASE
from common.json import JSONEncoder

from typing import Dict, List
from restaurant import RestaurantDatabase
from common.constants import DEFAULT_DATABASE

class DatabaseManager:
    """A DatabaseManager manages all databases for restaurants registered with the "manager". Thus, a restaurant "exists" iff it is registered in the DatabaseManager.
    """
    
    def __init__(self, database_file : str = DEFAULT_DATABASE):
        """Initializes a DatabaseManager from a json file

        Args:
            database_file (str, optional): The database file to grab the manager from.
                                           Defaults to DEFAULT_DATABASE.
        """
        with open(database_file, '+r') as file:
            raw_data = json.load(file)
            data = raw_data['restaurants']
            self.restaurant_map : Dict[str, RestaurantDatabase] = dict()
            for restaurant in data:
                self.restaurant_map[restaurant] = RestaurantDatabase.from_dict(data[restaurant])

    def save(self, database_file : str = DEFAULT_DATABASE):
        """Saves a Database Manager into a json file

        Args:
            database_file (str, optional): The database file to save the manager into.
                                           Defaults to DEFAULT_DATABASE.
        """
        with open(database_file, 'w+') as file:
            json.dump({restaurant : self.restaurant_map[restaurant] for restaurant in self.restaurant_map}, file, cls=JSONEncoder)

    def contains_restaurant(self, restaurant : str) -> bool:
        """Evaluates if a restaurant exists

        Args:
            restaurant (str): The restaurant to query

        Returns:
            bool: True iff the restaurant exists
        """
        return restaurant in self.restaurant_map

    def get_restaurant(self, restaurant : str) -> RestaurantDatabase | None:
        """Gets the database for a restaurant, if it exists

        Args:
            restaurant (str): The restaurant to obtain the database for

        Returns:
            RestaurantDatabase | None: The database for the restaurant, or None if the restaurant does not exist
        """
        return self.restaurant_map.get(restaurant)

    def get_restaurant_list(self, query : str = "") -> List[str]:
        """Obtains the list of restaurants in the database based on a query

        Args:
            query (str, optional): The query used to filter out some restaurants. Defaults to "".

        Returns:
            List[str]: Returns all restaurants that contains the substring query
        """
        if not query:
            return list(self.restaurant_map.keys())

        return [restaurant for restaurant in self.restaurant_map if query in restaurant]