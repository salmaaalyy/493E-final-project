
from users import User
from common.review_categories import ReviewCategory, resolve_category

from typing import Dict, List

class Review:
    def __init__(self, user : str, ratings : Dict[str, int], review : str):
        self.user = user
        self.ratings = {resolve_category(category) : ratings[category] for category in ratings if not ratings[category] == -1}
        self.review = review
        
    @classmethod
    def from_dict(data : Dict[str, str | int]):
        return Review(data['user'], data['ratings'], data['review'])
    
    def contains_tag(self, *category : ReviewCategory):
        if not category:
            return True
        return all(c in self.ratings for c in category)

class Reviews:
    def __init__(self, reviews : List[Dict[str, str | int]]):
        self.reviews = {name : Review.from_dict(reviews[name]) for name in reviews}
        
    @classmethod
    def from_dict(data : Dict[str, Dict[str, str | int]]):
        return Reviews(data)
    
    def get_summary(self):
        return ""
    
    def filter(self, *filter : ReviewCategory):
        return [self.reviews[name] for name in self.reviews if self.reviews[name].contains_tag(*filter)]
    
    def add_review(self, review : Review):
        self.reviews[review.user] = review