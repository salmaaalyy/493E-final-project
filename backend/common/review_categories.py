
from enum import Enum, auto

class ReviewCategory(Enum):
    RAMP = auto()
    WAITING_AREA = auto()
    SEATING = auto()
    MENU = auto()
    SERVICE_ANIMALS = auto()
    FOOD = auto()
    STAFF_DECORUM = auto()

def resolve_category(category : str) -> ReviewCategory | None:
    for value in ReviewCategory:
        if category.lower() == value.name.lower():
            return value
    return None