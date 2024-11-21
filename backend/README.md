
# Prerequisites
- Python (v3, Ideally 3.9 and above)
- Python Flask (>= 3.0.0)

# Running the Server
From the root of this project, run `python -m backend`. Its optional argument are:
- --host (str, default: `'localhost'`): The host for the server
- --port (int, default: `3000`): The port for the server
- --debug (bool, default: `False`): Whether to turn on debug statements (just specify `--debug` to turn this flag on)

# Notes

## Endpoint Notes
To access the data provided by HTTP requests, please look through the code to figure out the form of the data (or simply print it out to the console by using `.then(console.log)`). In general, if a class is being serialized, then it will become a dictionary/map with all its field names as the keys and its values as the entries.

Thus, pay attention to the structure of all classes, whose fields are found in their `__init__` method (unlike in Java, a class's fields are declared and instantiated within its constructor). Also take note of the [`common/review_categories.py`](common/review_categories.py), as that is the name of the categories used within communication to the backend.

## Interaction Examples

Most user endpoints are simplistic. Parameters for those endpoints are fed via the URL. However, for privacy reasons and space reasons, some endpoints need to have their parameters supplied via the HTTP Request Body. They are all the POST methods, examples of which are shown below:

1. Registering User
```JavaScript
fetch('http://localhost:3000/register_user', {
    method: 'POST',
    body: JSON.stringify({
        name: 'Tri Nguyen',
        password: 'Hello World!'
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8'
    }
})
.then(...)
```

2. Logging In
```JavaScript
fetch('http://localhost:3000/login', {
    method: 'POST',
    body: JSON.stringify({
        name: 'Jane Doe',
        password: 'Hello World!'
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8'
    }
})
.then(...)
```

3. Logging Out
```JavaScript
fetch('http://localhost:3000/logout', {
    method: 'POST',
    body: JSON.stringify({
        token: 8727483
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8'
    }
})
.then(...)
```


4. Adding a Review

```JavaScript
fetch('http://localhost:3000/add_review?restaurant=Made%20Up%20Restaurant', {
    method: 'POST',
    body: JSON.stringify({
        token: 5111020,
        review: "I loved it!!!",
        ratings: {
            RAMP: 2,
            SEATING: 5,
            ...
        }
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8'
    }
})
.then(...)
```
