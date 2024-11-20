
from typing import Dict, List

from .reviews import Reviews, Review
from ..common.review_categories import ReviewCategory
    
class RestaurantInfo:
    """Restaurant Info is a class that represents the
    basic information of a restaurant
    """
    def __init__(self, summary : str, hours : str, address : str, phone : str):
        """Creates a RestaurantInfo class based on its basic information

        Args:
            summary (str): The summary of the restaurant
            hours (str): The hours it is open
            address (str): The address of the restaurant
            phone (str): The phone number for the restaurant
        """
        self.summary = summary
        self.hours = hours
        self.address = address
        self.phone = phone
    
    @staticmethod
    def from_dict(data : Dict[str, str]):
        """Constructs a RestaurantInfo class from
        a dictionary

        Args:
            data (Dict[str, str]): The dictionary to construct a RestaurantInfo from.
            The form must be:
                summary : The summary,
                hours : The hours it is open,
                address : The address of the restaurant,
                phone : The restaurant's phone number

        Returns:
            RestaurantInfo: A RestaurantInfo object that corresponds to data
        """
        return RestaurantInfo(data['summary'], data['hours'], data['address'], data['phone'])

class RestaurantDatabase:
    """RestaurantDatabase is a database that represents all the accessibility information and other
    information that pertains to a single restaurant
    """
    def __init__(self, restaurant_info : RestaurantInfo, reviews : Reviews):
        """Constructs a RestaurantDatabase from its review information and other information

        Args:
            restaurant_info (RestaurantInfo): The RestaurantInformation object for this
            reviews (Reviews): The reviews of each
        """
        self.restaurant_info = restaurant_info
        self.reviews = reviews
    
    @staticmethod
    def from_dict(data : Dict[str, RestaurantInfo | Reviews]):
        """Constructs a RestaurantDatabase from a dictionary.

        Args:
            data (Dict[str, RestaurantInfo  |  List[int]  |  Reviews]): The dictionary to construct a RestaurantDatabase from.
            The form must be:
                restaurant_info : A restaurant_info dictionary
                reviews : A reviews dictionary

        Returns:
            RestaurantDatabase: A RestaurantDatabase with the data from data
        """
        return RestaurantDatabase(RestaurantInfo.from_dict(data['restaurant_info']), Reviews.from_dict(data['reviews']))
    
    def to_webpage_format(self, *filter : ReviewCategory) -> Dict[str, str | List[float] | List[str] | List[Review]]:
        """Prepares this to be displayed in website format by returning a
        dictionary version of this that is different than the serialization
        format

        Returns:
            Dict[str, str | List[float] | List[str] | Reviews]: The dictionary that gets returned, which contains:
                summary (str): The summary of this,
                accessibility_summary (List[float]): The float of this,
                restaurant_info (List[str]): Basic restaurant information (RestaurantInfo minus the summary),
                reviews_summary (List[str]): The summary of the reviews,
                reviews (List[Review]): The reviews for this restaurant. Look into the Review data structure to
                figure out the form of the JSON
        """
        result = dict()
        
        # Make the summary section
        result['summary'] = self.restaurant_info.summary
        
        # Make the accessibility summary section
        result['accessibility_summary'] = self.reviews.get_ratings_summary()
        
        # Make the restaurant info section
        result['restaurant_info'] = self.restaurant_info
        del result['restaurant_info'].summary
    
        # Make the review summary section
        result['review_summary'] = self.reviews.get_summary()
        
        # Make the reviews section
        result['reviews'] = self.reviews.filter(*filter)
        
        return result

    def add_review(self, review : Review):
        """Adds a review to this restaurant

        Args:
            review (Review): The review to add to this
        """
        self.reviews.add_review(review)