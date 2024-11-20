import json

class JSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, set):
            return None # Skip sets
        if hasattr(obj, "__dict__"):
            return obj.__dict__
        return super().default(obj)