//Not fully tested yet. Giving me 415 Error so have to double check
fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8' 
    },
    body: JSON.stringify({
        name: 'Jane Doe',
        password: 'Hello World!'
    })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));
