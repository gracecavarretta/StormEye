const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/User');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://wangclaire07:stormeye@cluster0.ks4w5.mongodb.net/users?retryWrites=true&w=majority")
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email, password })
        .then(user => {
            if (user) {
                if(user.password === password) {
                    res.json("Success");
                } else {
                    res.status(400).json({ message: 'Incorrect password' });
                }
            } else {
                res.status(400).json({ message: 'User not found' });
            }
        })
        .catch(err => res.status(400).json(err));
});

app.post('/register', (req, res) => {
    console.log("Received data:", req.body);
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => {
            console.error('Error creating user:', err); 
            res.status(400).json(err); 
        });
});

app.listen(3001, () => {
    console.log(`Server is running on localhost:3001`);
});