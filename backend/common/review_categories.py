
from enum import Enum

class ReviewCategory(str, Enum):
    RAMP = "RAMP"
    WAITING_AREA = "WAITING_AREA"
    SEATING = "SEATING"
    MENU = "MENU"
    SERVICE_ANIMALS = "SERVICE_ANIMALS"
    FOOD = "FOOD"
    STAFF_DECORUM = "STAFF_DECORUM"
    
    def __str__(self) -> str:
        return self.name

def resolve_category(category : str) -> ReviewCategory | None:
    for value in ReviewCategory:
        if category.lower() == value.name.lower():
            return value
    return None