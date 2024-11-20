from ..common.review_categories import ReviewCategory, resolve_category

from typing import Dict, List

class Review:
    """Review represents a single review on a given restaurant
    """
    def __init__(self, user : str, ratings : Dict[str, int], review : str):
        """Creates a Review from information about the review

        Args:
            user (str): The name of the user who made the review
            ratings (Dict[str, int]): The ratings given for this review
            review (str): The written review
        """
        self.user = user
        self.ratings = {resolve_category(category) : ratings[category] for category in ratings if resolve_category(category) and not ratings[category] == -1}
        self.review = review
        
    @staticmethod
    def from_dict(data : Dict[str, str | int]):
        """Constructs a Review from a dictionary for it

        Args:
            data (Dict[str, str  |  int]): The dictionary to construct this review from, which must contain:
                user (str): The name of the user,
                ratings (Dict[str, int]): The ratings given,
                review (str): The written review

        Returns:
            Review: The review associated with the data from this dictionary
        """
        return Review(data['user'], data['ratings'], data['review'])
    
    def contains_tag(self, *category : ReviewCategory) -> bool:
        """Evaluates if this contains the tags given
        
        Arguments:
            category (varags, ReviewCategory): The category(s) to
            apply to this review

        Returns:
            bool: True iff this is tagged by every single category given
            (i.e. If the review gives ratings for each of the categories)
            given. Returns true if category is not provided
        """
        if not category:
            return True
        return all(c in self.ratings for c in category)

class Reviews:
    """Reviews represents a collection of Review objects for a given restaurant
    """
    def __init__(self, reviews : Dict[str, Dict[str, str | int]]):
        """Initializes a Reviews object with the given information

        Args:
            reviews (Dict[str, List[Dict[str, str  |  int]]]): A dictionary that contains
            all reviews to initialize into this, where the key is the name of the reviewer,
            and the value is the dictionary representation of a Review object
        """
        self.reviews = {name : Review.from_dict(reviews[name]) for name in reviews}
        self.ratings_sum = dict()
        self.ratings_count = dict()
        for category in ReviewCategory:
            self.ratings_sum[category] = 0
            self.ratings_count[category] = 0
        for name in self.reviews:
            for category in self.reviews[name].ratings:
                self.ratings_sum[category] += self.reviews[name].ratings[category]
                self.ratings_count[category] += 1

    @staticmethod
    def from_dict(data : Dict[str, Dict[str, str | int]]):
        """Constructs a Reviews object from a dictionary

        Args:
            data (Dict[str, Dict[str, str  |  int]]): The data to construct a Reviews with.
            It must be of the following form:
                {The name of the person given a review : Their review dictionary}
        Returns:
            Reviews: A Reviews object based off of data
        """
        return Reviews(data['reviews'])

    def get_ratings_summary(self) -> Dict[ReviewCategory, float]:
        """Provides a ratings summary of the reviews in this

        Returns:
            Dict[ReviewCategory, float]: A dictionary that maps from
            each category to the mean rating given for that category
        """
        return {category : self.ratings_sum[category] / self.ratings_count[category] for category in ReviewCategory if self.ratings_count[category]}

    def get_summary(self):
        """Provides a summary of the review

        Returns:
            str: An empty string, because we're not supporting this at the moment
        """
        return ""

    def filter(self, *filter : ReviewCategory) -> List[Review]:
        """Filters the Reviews based on the filter
        
        Arguments:
            filter (ReviewCategory, varargs): The filter(s) to apply to this

        Returns:
            List[Review]: All Review objects in this that obey the filter
        """
        return [self.reviews[name] for name in self.reviews if self.reviews[name].contains_tag(*filter)]

    def add_review(self, review : Review):
        """Adds a review to this

        Args:
            review (Review): The review to add to this
        """
        review = review
        old_review = self.reviews.get(review.user)
        self.reviews[review.user] = review
        
        # Update our ratings_sum and ratings_count
        for category in ReviewCategory:
            self.ratings_sum[category] += review.ratings.get(category, 0) - old_review.ratings.get(category, 0) if old_review else 0
            self.ratings_count[category] += (1 if category in review.ratings else 0) - (1 if category in old_review.ratings else 0) if old_review else 0