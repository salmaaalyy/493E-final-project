from enum import Enum

class HTTP_CODE(Enum):
    SUCCESS = 200
    # 400 Level is Client-Side Problems
    BAD_REQUEST = 400 # Malformed Input
    UNAUTHORIZED = 401 # Not authentication was given
    NOT_FOUND = 404 # Resource Doesn't Exist
    # 500 Level is Server-Side Problems
    SERVER_BAD = 500