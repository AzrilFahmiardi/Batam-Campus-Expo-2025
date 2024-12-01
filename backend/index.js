const express = require("express");
const cors = require("cors");
const db = require("./database");
require("dotenv").config();
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const path = require('path');
require("dotenv").config();

const fs = require('fs');

const API_URL = process.env.API_URL;
const APP_URL = process.env.APP_URL;


const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: APP_URL,
    credentials: true
}));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.json());


// BAGIAN GOOGLE AUTHENTICATION
app.use(session({
    secret: 'batamcampusexpo2025',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true, 
        httpOnly: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000 
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    console.log('Request Headers:', req.headers);
    console.log('Cookies:', req.cookies);
    next();
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.API_URL}/auth/google/callback`
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const username = profile.displayName;
        const email = profile.emails[0].value;

        const [rows] = await db.query('SELECT * FROM user WHERE email = ?', [email]);

        if (rows.length > 0) {
            return done(null, rows[0]);
        } else {
            const has_voted = 0;
            const [result] = await db.query('INSERT INTO user (username, email,has_voted) VALUES (?, ?,?)', [username, email,has_voted]);

            const newUser = {
                username: username,
                email: email
            };

            return done(null, newUser);
        }
    } catch (error) {
        console.error('Error accessing database:', error);
        return done(error, null);
    }
}));


passport.serializeUser((user, done) => {
    done(null, user.email);
});


passport.deserializeUser(async (email, done) => {
    try {
        const [rows] = await db.query('SELECT * FROM user WHERE email = ?', [email]);
        if (rows.length > 0) {
            done(null, rows[0]);
        } else {
            done(null, false); // Explicitly handle case where user is not found
        }
    } catch (error) {
        console.error('Deserialization error:', error);
        done(error, null);
    }
});

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));


app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: APP_URL,
    successRedirect: APP_URL 
}));

app.get('/check-auth', (req, res) => {
    try {
        console.log('Full Session:', req.session);
        console.log('User Object:', req.user);
        console.log('Is Authenticated:', req.isAuthenticated());

        res.json({
            sessionID: req.sessionID,
            isAuthenticated: req.isAuthenticated(),
            user: req.user ? {
                email: req.user.email,
                username: req.user.username
            } : null
        });
    } catch (error) {
        console.error('Check-Auth Error:', error);
        res.status(500).json({ 
            message: 'Error checking authentication', 
            error: error.message 
        });
    }
});


app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect(APP_URL); 
    });
});


app.get("/", (req, res) => {
    res.status(200).send("OK");
});

//ALL UNIVERSITAS
app.get('/universitas', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM universitas ORDER BY jumlah_voting DESC");

        const universities = rows.map(uni => {
            uni.logo = `/LogoCampus/${uni.kode_univ}.webp`;
            uni.cardImage = `/CardImage/${uni.kode_univ}_1.webp`;
            
            return uni;
        });
        
        res.json(universities);
    } catch (error) {
        console.error('Error fetching universities:', error);
        res.status(500).send('Error fetching universities');
    }
});


//FAKULTAS BY UNIVERSITAS ID


// VOTING KAMPUS
app.post('/vote', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();
        
        const [user] = await db.query('SELECT has_voted FROM user WHERE email = ?', [req.user.email]);
        
        if (user[0].has_voted === 1) {
            return res.status(400).json({ message: 'You have already voted' });
        }

        const { universities } = req.body;
        
        for (const university of universities) {
            await db.query(
                "UPDATE universitas SET jumlah_voting = jumlah_voting + 1 WHERE kode_univ = ?", 
                [university]
            );
        }

        await connection.query(
            "UPDATE user SET has_voted = 1 WHERE email = ?",
            [req.user.email]
        );

        await connection.commit();
        connection.release();
        
        res.status(200).json({ message: 'Voting successful' });
    } catch (error) {

        await connection.rollback();
        connection.release();
        console.error('Error updating votes:', error);
        res.status(500).json({ message: 'Error updating votes' });
    }
});


// CEK VOTE STATUS
app.get('/check-vote-status', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const [user] = await db.query('SELECT has_voted FROM user WHERE email = ?', [req.user.email]);
        res.json({ hasVoted: user[0].has_voted === 1 });
    } catch (error) {
        console.error('Error checking vote status:', error);
        res.status(500).json({ message: 'Error checking vote status' });
    }
});

// UNIVERSITAS BY ID
app.get('/:kode_univ', async (req, res) => {
    const { kode_univ } = req.params;
    try {
        const [hasil_univ] = await db.query("SELECT * FROM universitas WHERE kode_univ = ?", [kode_univ]);
        if (hasil_univ.length > 0) {
            res.json({ hasilUniv: hasil_univ[0] });
        } else {
            res.status(404).json({ message: 'Universitas tidak ditemukan' });
        }
    } catch (error) {
        console.error('Error fetching university data:', error);
        res.status(500).json({ message: 'Error fetching university data' });
    }
});

// JURUSAN BY ID
app.get('/:kode_univ/jurusan', async (req, res) => {
    const { kode_univ } = req.params;
    try {
        const [jurusan] = await db.query("SELECT * FROM jurusan WHERE kode_univ = ?", [kode_univ]);
        if (jurusan.length > 0) {
            res.json({ hasilJurusan: jurusan })
        } else {
            res.status(404).json({ message: 'Jurusan tidak ditemukan untuk universitas ini' });
        }
    } catch (error) {
        console.error('Error fetching majors:', error);
        res.status(500).json({ message: 'Error fetching majors' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});