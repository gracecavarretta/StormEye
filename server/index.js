const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/User');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const MONGO_URI = process.env.MONGO_URI;

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email, password })
        .then(user => {
            if (user) {
                if (user.password === password) {
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
    if (!token) {
        console.log("No token provided");
        return res.sendStatus(401);
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

app.get('/check-auth', authenticateToken, (req, res) => {
    res.json({ message: "Authenticated", user: req.user });
});

app.get('/user-info', authenticateToken, (req, res) => {
    console.log("Received request for user info:", req.user);

    if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "Unauthorized request" });
    }

    UserModel.findById(req.user.id)
        .then(user => {
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.json({ username: user.username, email: user.email });
        })
        .catch(err => res.status(500).json(err));
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

// PUT endpoint to update notification preferences
// The endpoint path has currently been set to /userDashboard
// but this can change depending on frontend design
app.put('/userDashboard', authenticateToken, (req, res) => {
    //Retrieved from token payload by authenticateToken
    const userId = req.user.id;
    //Expecting { preferences: { notifications: { ... } } }
    //Note: Need to coordinate with frontend to determine what format
    //information should be sent in
    const { preferences } = req.body;

    //Update the preferences for the authenticated user
    //findByIdAndUpdate is a built in mongo function
    UserModel.findByIdAndUpdate(
        userId,
        //assuming info willl be sent in a preferences format
        //see User.js for preferences structure
        { preferences },
        { new: true }
    )
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'Preferences updated successfully', user });
        })
        .catch(err => {
            console.error('Error updating preferences:', err);
            res.status(500).json({ message: 'Error updating preferences' });
        });
});

app.listen(3001, () => {
    console.log(`Server is running on localhost:3001`);
});