const express = require('express');
const app = express();
const cors = require('cors');

let users = [];

app.use(cors());

app.use(express.json());

// Get All Users
app.get('/users',(req,res)=> {
    res.json(users);
});

// Create User
app.post('/users', (req,res)=> {
    const user = {
        id: Math.floor(Math.random() * 1000),
        name: req.body.name,
        age: req.body.age
    };
    users.push(user);
    res.json(users);
});


// Get User by ID
app.get('/users/:id', (req,res)=> {

    console.log('Id : ',parseInt(req.params.id));
    const user = users.find(user => user.id === parseInt(req.params.id));
    if(!user) return res.status(404).send('User Not Found');
    res.json(user);
});

// Update User by id
app.put('/users/:id', (req,res)=> {

    const user = users.find(user => user.id === parseInt(req.params.id));
    if(!user) return res.status(404).send('User Not Found');

    user.name = req.body.name;
    user.age = req.body.age;

    res.json(users);
});


// Delete User by id
app.delete('/users/:id',(req,res)=>{

    const user = users.find(user => user.id === parseInt(req.params.id));
    if(!user) return res.status(404).send('User Not Found');

    const index = users.indexOf(user);
    users.splice(index,1);

    res.json(users);

});

app.listen(3001,()=>{
    console.log('Server started on port 3001');
});


