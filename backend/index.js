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
const { JWT_SECRET, JWT_REFRESH_SECRET, NODE_ENV } = process.env;
const bodyParser = require('body-parser');
const { check } = require('express-validator');
const cookieParser = require('cookie-parser');

const authMiddleware = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken) {
        // Jika tidak ada access token, lanjutkan tanpa autentikasi
        req.isAuthenticated = () => false;
        req.user = null;
        return next();
    }

    try {
        // Verifikasi accessToken
        const decoded = jwt.verify(accessToken, JWT_SECRET);
        req.isAuthenticated = () => true;
        req.user = decoded;
        return next();
    } catch (error) {
        console.warn("Access token invalid or expired, attempting refresh", error);

        if (!refreshToken) {
            req.isAuthenticated = () => false;
            req.user = null;
            return next();
        }

        try {
            // Refresh token
            const refreshResponse = await axios.post(
                `${process.env.API_URL}/api/refresh-token`,
                {},
                { withCredentials: true }
            );

            if (refreshResponse.status === 200) {
                console.log("Token refreshed successfully");

                // Set user berdasarkan token baru
                req.user = jwt.verify(refreshResponse.data.accessToken, JWT_SECRET);
                req.isAuthenticated = () => true;
                return next();
            } else {
                req.isAuthenticated = () => false;
                req.user = null;
                return next();
            }
        } catch (refreshError) {
            console.error("Error refreshing token:", refreshError);
            req.isAuthenticated = () => false;
            req.user = null;
            return next();
        }
    }
};
  

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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: "secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: NODE_ENV === "production",
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// BAGIAN GOOGLE AUTHENTICATION
app.use(session({
    secret: 'batamcampusexpo2025',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, 
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 
    }
}));

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

app.get('/check-auth', authMiddleware, (req, res) => {
    res.json({
        isAuthenticated: req.isAuthenticated(),
        user: req.isAuthenticated() ? {
            email: req.user.email,
            username: req.user.username,
        } : null
    });
});



app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect(APP_URL); 
    });
});

app.post("/api/logout", (req, res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return res.status(200).json({ message: "Logged out successfully" });
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
app.post('/vote', authMiddleware, async (req, res) => {
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
            <a href="http://127.0.0.1:5000/mail-verification?token=${randomToken}">Verify Here</a>
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

const generateTokens = (user) => {
    const accessToken = jwt.sign({
        username: user.username,
        email: user.email
    }, JWT_SECRET, { expiresIn: "15m" });

    const refreshToken = jwt.sign({
        username: user.username
    }, JWT_REFRESH_SECRET, { expiresIn: "7d" });

    return { accessToken, refreshToken };
};

// Tambahkan logika untuk menyimpan refresh token di database
const saveTokens = async (username, accessToken, refreshToken) => {
    await db.query(
        "UPDATE user SET refresh_token = ?, access_token = ? WHERE username = ?",
        [refreshToken, accessToken, username]
    );
};

app.post("/api/refresh-token", async (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        return res.status(400).json({ message: "Refresh token is required" });
    }

    try {
        const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
        const [users] = await db.query(
            "SELECT * FROM user WHERE username = ? AND refresh_token = ?",
            [decoded.username, refreshToken]
        );

        if (users.length === 0) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        const user = users[0];
        const tokens = generateTokens(user);
        await saveTokens(user.username, tokens.accessToken, tokens.refreshToken);

        res.cookie("accessToken", tokens.accessToken, {
            httpOnly: true,
            secure: NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000
        });

        res.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            secure: NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({ message: "Tokens refreshed successfully" });
    } catch (err) {
        console.error("Refresh token error:", err);
        res.status(403).json({ message: "Invalid or expired refresh token" });
    }
});

const authenticateAccessToken = (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ message: "Access token is required" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error("Error verifying access token:", err);
        return res.status(403).json({ message: "Invalid or expired access token" });
    }
};

app.post("/api/logout", authenticateAccessToken, async (req, res) => {
    try {
        await logoutUser(req.user.username);
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.status(200).json({ message: "Logout successful" });
    } catch (err) {
        console.error("Logout error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

const logoutUser = async (username) => {
    await db.query(
        "UPDATE user SET refresh_token = NULL, access_token = NULL WHERE username = ?",
        [username]
    );
};


const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const [users] = await db.query("SELECT * FROM user WHERE email = ?", [req.body.email]);
        if (users.length === 0) {
            return res.status(401).send({ message: "Email or password is incorrect" });
        }

        const user = users[0];
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            return res.status(401).send({ message: "Email or password is incorrect" });
        }

        if (!user.is_verified) {
            return res.status(401).send({ message: "Please verify your email before logging in" });
        }

        const tokens = generateTokens(user);

        await saveTokens(user.username, tokens.accessToken, tokens.refreshToken);

        // Kirim token dalam cookies
        res.cookie("accessToken", tokens.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000, // 15 menit
        });

        res.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari
        });
        await db.query("UPDATE user SET last_login = NOW() WHERE email = ?", [user.email]);

        return res.status(200).send({
            message: "Successfully logged in",
            user: {
                username: user.username,
                email: user.email,
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

// userRoute dulu
const userRouter = express.Router();

userRouter.post('/register', signupValidation, register);
userRouter.post('/login', loginValidation, login);

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