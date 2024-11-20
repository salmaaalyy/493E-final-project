
import os

DEFAULT_HOST = "localhost"
DEFAULT_PORT = "3000"

DEFAULT_DATABASE = os.path.join(
    os.path.dirname(os.path.abspath(__file__),
    "database.json")
)
DEFAULT_USERS = os.path.join(
    os.path.dirname(os.path.abspath(__file__),
    "users.json")
)

TOKEN_LOWER_BOUND = 0
TOKEN_HIGHER_BOUND = 10000000
FAILURE_TOKEN = -1