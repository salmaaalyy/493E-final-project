import json
import random
from common.constants import DEFAULT_USERS, TOKEN_LOWER_BOUND, TOKEN_HIGHER_BOUND

from typing import Set, Dict

class User:
    def __init__(self, name : str, password : str):
        self.name = name
        self.password = password
    def __eq__(self, obj : any) -> False:
        if not isinstance(obj, User):
            return False
        return self.name == obj.name and self.password == obj.password
    def __hash__(self) ->int:
        return self.name.__hash__() + self.password.__hash__()

class Users:
    def __init__(self, users_file : str = DEFAULT_USERS):
        with open(users_file, "+r") as file:
            data = json.load(file)
            self.users : Set[User] = set()
            self.names : Set[str] = set()
            for name in data:
                self.users = self.users.add(User(name, data[name]))
                self.names.add(name)
            self.active_users : Dict[User, int] = dict()
            self.active_tokens : Dict[int, User] = dict()

    def save(self, users_file : str = DEFAULT_USERS):
        with open(users_file, "w+") as file:
            data = dict()
            for user in self.users:
                data[user.name] = user.password
            json.dump(data, file)
        
    def contains_user(self, user : User) -> bool:
        return user in self.users
    
    def contains_name(self, name : User):
        return name in self.names
    
    def add_user(self, user : User) -> bool:
        if user in self.users:
            return False
        self.users.add(user)
        self.names.add(user.name)
        return True

    def login(self, user : User) -> int | None:
        if user in self.users:
            if not user in self.active_users:
                generated_token = random.randint(TOKEN_LOWER_BOUND, TOKEN_HIGHER_BOUND)
                self.active_users[user] = generated_token
                self.active_tokens[generated_token] = user
            return self.active_users[user]
        return None
    
    def validate_user(self, token : int) -> User | None:
        return self.active_tokens.get(token, None)