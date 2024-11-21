import json
from enum import Enum

class JSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, set):
            return None # Skip sets
        elif isinstance(obj, Enum):
            return obj.name
        elif isinstance(obj, dict):
            if len(obj) > 0 and isinstance(obj.__iter__().__next__(), Enum):
                return {key : obj[key] for key in obj}
        elif hasattr(obj, "__dict__"):
            return obj.__dict__
        return super().default(obj)