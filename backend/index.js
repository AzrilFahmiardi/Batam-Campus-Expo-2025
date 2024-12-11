const express = require("express");
const cors = require("cors");
const db = require("./database");
require("dotenv").config();
const session = require('express-session');
const { validationResult } = require('express-validator');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const path = require('path');
const bcrypt = require('bcryptjs');
const randomstring = require('randomstring');
const nodemailer = require('nodemailer');
const { SMTP_MAIL, SMTP_PASSWORD } = process.env;
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const bodyParser = require('body-parser');
const { check } = require('express-validator');


const fs = require('fs');
const { log } = require("console");

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
app.use(bodyParser.urlencoded({ extended: true }));


// BAGIAN GOOGLE AUTHENTICATION
app.use(
    session({
        secret: 'batamcampusexpo2025', 
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true, 
            maxAge: 24 * 60 * 60 * 1000 ,
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',  // Di local gunakan 'Lax'

        }
    })
);

app.use(passport.initialize());
app.use(passport.session());

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
        done(null, rows[0]);
    } catch (error) {
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
    res.json({
        isAuthenticated: req.isAuthenticated(),
        user: req.user ? {
            email: req.user.email,
            username: req.user.username
        } : null
    });
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



// VOTING KAMPUS
app.post('/vote', async (req, res) => {
    // if (!req.isAuthenticated()) {
    //     return res.status(401).json({ message: 'Unauthorized' });
    // }
    const {user } = req.body;
    const email = req.user?.email || user.email;
    
    if (!user || !user.email) {
        return res.status(400).json({ message: 'Invalid user data' });
      }

    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();
        
        const [user] = await db.query('SELECT has_voted FROM user WHERE email = ?', [email]);
        
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
            [email]
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


// fungsi sendMail
const sendMail = async (email, mailSubject, content) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: SMTP_MAIL,
                pass: SMTP_PASSWORD,
            },
        });

        const mailOptions = {
            from: SMTP_MAIL,
            to: email,
            subject: mailSubject,
            html: content,
        };

        // Wrap sendMail in a Promise
        const info = await transporter.sendMail(mailOptions);
        console.log('Mail sent successfully: ' + info.response);
        return info;
    } catch (error) {
        console.error('Error sending mail:', error);
        throw error;
    }
};

// register
const register = async (req, res) => {
    try {
        console.log("Request body:", req.body);

        // Validasi request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        console.log("Email for validation:", req.body.email);

        // Cek apakah email sudah digunakan
        const [existingUsers] = await db.query(
            "SELECT * FROM user WHERE LOWER(email) = LOWER(?)",
            [req.body.email]
        );

        if (existingUsers.length > 0) {
            return res.status(409).json({ message: "Email already in use" });
        }

        console.log("aku dah disini!");

        // Hash password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log("Hashing successful!");

        // Generate token
        const randomToken = randomstring.generate();

        // Masukkan user baru ke database
        const [result] = await db.query(
            "INSERT INTO user (username, email, password, token) VALUES (?, ?, ?, ?)",
            [req.body.username, req.body.email, hashedPassword, randomToken]
        );
        console.log("User inserted successfully!", result);

        console.log(req.body.username);

        // Kirim email verifikasi
        const mailSubject = "Mail Verification";
        const content = `
            <p>Hi ${req.body.username},</p>
            <p>Click the link below to verify your email:</p>
            <a href="${API_URL}/mail-verification?token=${randomToken}">Verify Here</a>
        `;

        await sendMail(req.body.email, mailSubject, content);
        console.log("Verification email sent!");

        return res.status(201).json({ message: "Registration successful. Please verify your email." });

    } catch (err) {
        console.error("Error in registration process:", err);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

// verify mail
const verifyMail = async (req, res) => {
    try {
        const token = req.query.token;

        // Validasi token
        if (!token) {
            return res.status(400).render('404', { message: 'Invalid token' });
        }

        // Query untuk mendapatkan user berdasarkan token
        const [user] = await db.query('SELECT * FROM user WHERE token = ?', [token]);

        if (user.length === 0) {
            return res.status(404).render('404', { message: 'Token not found or already used' });
        }

        // Update user untuk menghapus token dan menandai verifikasi
        await db.query('UPDATE user SET token = NULL, is_verified = 1 WHERE username = ?', [user[0].username]);

        return res.render('mail-verification', { message: 'Email verified successfully' });
    } catch (err) {
        console.error('Error verifying email:', err);
        return res.status(500).render('500', { message: 'Internal server error' });
    }
};


// login
const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Cek apakah email ada di database
        const [users] = await db.query("SELECT * FROM user WHERE email = ?", [req.body.email]);
        if (users.length === 0) {
            return res.status(401).send({ message: "Email or password is incorrect" });
        }

        const user = users[0];

        // Bandingkan password yang diberikan dengan hash di database
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            return res.status(401).send({ message: "Email or password is incorrect" });
        }

        // Generate token JWT
        const token = jwt.sign({ username: user.username, is_admin: user.is_admin }, JWT_SECRET, { expiresIn: "7d" });

        // Update waktu login terakhir
        await db.query("UPDATE user SET last_login = now() WHERE username = ?", [user.username]);

        console.log('berhasil login!');

        // Kirim respons berhasil login
        return res.status(200).send({
            message: "Successfully logged in",
            token,
            user: {
                username: user.username,
                email: user.email,
                has_voted : user.has_voted,
                last_login : user.last_login,
            },
        });
        
    } catch (err) {
        console.error("Error during login:", err);
        return res.status(500).send({ message: "Internal server error", error: err.message });
    }
};


// validate signup
signupValidation = [
    check('username', 'username is required').not().isEmpty(),
    check('email', 'Email is required').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('password', 'Password is required').isLength({ min: 6 }),
];

// validate login
loginValidation = [
    check('email', 'email is required').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('password', 'password is required').isLength({ min: 6 }),
];

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
  
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
  
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
  };

// userRoute dulu
const userRouter = express.Router();

userRouter.post('/register', signupValidation, register);
userRouter.post('/login', loginValidation, login);
app.get('/profile', authMiddleware, (req, res) => {
    // Hanya user yang terautentikasi bisa mengakses
    res.json({ user: req.user });
});

app.use('/api', userRouter);

// webRoute
const webRouter = express.Router();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware untuk file statis
webRouter.use(express.static(path.join(__dirname, 'public')));

// Rute untuk mail verification
webRouter.get('/mail-verification', verifyMail);

app.use('/', webRouter);

const isAuthorize = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: Token is missing or invalid' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Simpan data pengguna di `req.user`
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        res.status(403).json({ message: 'Forbidden: Token is invalid' });
    }
};


const getUser = (req, res) => {
    try {
        const authToken = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(authToken, JWT_SECRET);

        // Gunakan array untuk parameter query
        db.query('SELECT * FROM user WHERE username = ?', [decoded.username], (err, result, fields) => {
            if (err) {
                console.error('Database query error:', err);
                return res.status(500).send({ success: false, message: 'Database error' });
            }

            if (result.length === 0) {
                return res.status(404).send({ success: false, message: 'User not found' });
            }

            return res.status(200).send({ success: true, data: result[0], message: 'Fetch Successfully' });
        });
    } catch (error) {
        console.error('Error in getUser function:', error);
        return res.status(401).send({ success: false, message: 'Unauthorized' });
    }
};


userRouter.get('/get-user', isAuthorize, getUser);

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


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});