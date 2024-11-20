import json
import random
from ..common.constants import DEFAULT_USERS, TOKEN_LOWER_BOUND, TOKEN_HIGHER_BOUND

from typing import Set, Dict

class User:
    """User is a user in this system, with a name and password
    """
    def __init__(self, name : str, password : str):
        """Initializes a user with a name and password

        Args:
            name (str): The name for the user
            password (str): The user's password
        """
        self.name = name
        self.password = password
    
    def __eq__(self, obj : any) -> bool:
        """Evaluates if obj has the same content as this

        Args:
            obj (any): Some obj

        Returns:
            bool: True iff this user has the same name and password
        """
        if not isinstance(obj, User):
            return False
        return self.name == obj.name and self.password == obj.password
    
    def __hash__(self) ->int:
        """Gets the hash of this

        Returns:
            int: The hash code of this
        """
        return self.name.__hash__() + self.password.__hash__()

class Users:
    """Users represents a collection of User objects, with
    interfacing for login and registration of new users
    """
    def __init__(self, users_file : str = DEFAULT_USERS):
        """Initializes a Users from a database of existing ones

        Args:
            users_file (str, optional): The database to poll the users from.
                                        Defaults to DEFAULT_USERS. The format
                                        must be:
                {Username : password}
        """
        with open(users_file, "+r") as file:
            data = json.load(file)
            self.users : Set[User] = set()
            self.names : Set[str] = set()
            for name in data:
                self.users.add(User(name, data[name]))
                self.names.add(name)
            self.active_users : Dict[User, int] = dict()
            self.active_tokens : Dict[int, User] = dict()

    def save(self, users_file : str = DEFAULT_USERS):
        """Saves the users into a database

        Args:
            users_file (str, optional): The database to save the users into.
                                        Defaults to DEFAULT_USERS.
        """
        with open(users_file, "w+") as file:
            data = dict()
            for user in self.users:
                data[user.name] = user.password
            json.dump(data, file)
        
    def contains_user(self, user : User) -> bool:
        """Evaluates if a user is in this

        Args:
            user (User): The user to evaluate

        Returns:
            bool: True iff user is in this
        """
        return user in self.users
    
    def contains_name(self, name : User) -> bool:
        """Evaluates if a particular username is contained
        in this

        Args:
            name (User): The username to evaluate

        Returns:
            true: True iff the username is in this
        """
        return name in self.names
    
    def add_user(self, user : User) -> bool:
        """Adds a user to this

        Args:
            user (User): The user to add

        Returns:
            bool: True iff the user has been added.
            False when another user with the same
            name exists
        """
        if user in self.users:
            return False
        self.users.add(user)
        self.names.add(user.name)
        return True

    def login(self, user : User) -> int | None:
        """Logs a user into this

        Args:
            user (User): The user to log into

        Returns:
            int | None: The token given to access
            this profile, None if the user is invalid.
        
        The user is now active if a token was returned
        """
        if user in self.users:
            # Generate non-duplicate token
            generated_token = random.randint(TOKEN_LOWER_BOUND, TOKEN_HIGHER_BOUND)
            while generated_token in self.active_tokens:
                generated_token = random.randint(TOKEN_LOWER_BOUND, TOKEN_HIGHER_BOUND)
            
            # Register token into this
            if not user in self.active_users:
                self.active_users[user] = {generated_token}
            else:
                self.active_users[user].add(generated_token)
            self.active_tokens[generated_token] = user
            return generated_token
        return None
    
    def logout(self, token : int) -> bool:
        """Logs a user out

        Args:
            token (int): The token corresponding to the user to logout

        Returns:
            bool: True iff the logout succeeded
        """
        if token in self.active_tokens:
            user = self.active_tokens[token]
            self.active_tokens.pop(token)
            self.active_users.get(user).remove(token)
            if not self.active_users[user]:
                del self.active_users[user]
            return True
        return False
    
    def validate_user(self, token : int) -> User | None:
        """Validates a token and returns user information

        Args:
            token (int): The token to evaluate

        Returns:
            User | None: The user corresponding with the access
            token, or None if token doesn't correspond to any
            active user.
        """
        return self.active_tokens.get(token, None)