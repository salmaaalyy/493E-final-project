
from typing import Dict, List

from reviews import Reviews, Review
from common.review_categories import ReviewCategory
    
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
    
    @classmethod
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
    def __init__(self, restaurant_info : RestaurantInfo, review_sums : List[int], review_counts : List[int], reviews : Reviews):
        """Constructs a RestaurantDatabase from its review information and other information

        Args:
            restaurant_info (RestaurantInfo): The RestaurantInformation object for this
            review_sums (List[int]): The sum of each category of review for this
            review_counts (List[int]): The number of category reviews left for each category
            reviews (Reviews): The reviews of each
        """
        self.restaurant_info = restaurant_info
        self.review_sums = review_sums
        self.review_counts = review_counts
        self.reviews = reviews
    
    @classmethod
    def from_dict(data : Dict[str, RestaurantInfo | List[int] | Reviews]):
        return RestaurantDatabase(RestaurantInfo.from_dict(data['restaurant_info']), data['review_sums'], data['review_counts'], Reviews.from_dict(data['reviews']))
    
    def to_webpage_format(self, *filter : ReviewCategory) -> Dict[str, str | List[int] | List[str] | Reviews]:
        result = dict()
        
        # Make the summary section
        result['summary'] = self.restaurant_info.summary
        
        # Make the accessibility summary section
        result['accessibility_summary'] = {category : total / count for category, (total, count) in zip(ReviewCategory, zip(self.review_sums, self.review_counts))}
        
        # Make the restaurant info section
        result['restaurant_info'] = self.restaurant_info
        result['restaurant_info'].pop('summary')
    
        # Make the review summary section
        result['review_summary'] = self.reviews.get_summary()
        
        # Make the reviews section
        result['reviews'] = self.reviews.filter(*filter)
        
        return result

    def add_review(self, review : Review):
        self.reviews.add_review(review)