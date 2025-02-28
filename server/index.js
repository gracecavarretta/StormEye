const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/User');
const jwt = require('jsonwebtoken');
//if we want to keep this secure, then we should put
//the key ("WatchingWeather") in a .env file along
//with the MongoDB password
const SECRET_KEY = "WatchingWeather";


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
                    //password is correct, so create a token with username and
                    //email as the payload 
                    jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
                        if (err) {
                            return res.status(500).json({ message: 'Token generation failed' });
                        }
                        res.json({ token });
                    });
                } else {
                    res.status(400).json({ message: 'Incorrect password' });
                }
            } else {
                res.status(400).json({ message: 'User not found' });
            }
        })
        .catch(err => res.status(400).json(err));
});

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401); // No token provided

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403); // Invalid token
        req.user = user; // Attach the payload (e.g., user ID) to the request object
        next();
    });
};


app.post('/register', (req, res) => {
    console.log("Received data:", req.body);
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => {
            console.error('Error creating user:', err); 
            res.status(400).json(err); 
        });
});

app.put('/notifications', authenticateToken, (req, res) => {
    const userId = req.user.id;
    
});

app.listen(3001, () => {
    console.log(`Server is running on localhost:3001`);
});