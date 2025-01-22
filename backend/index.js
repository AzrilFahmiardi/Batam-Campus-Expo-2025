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
const { JWT_SECRET, JWT_REFRESH_SECRET, NODE_ENV, SAMESITE } = process.env;
const bodyParser = require('body-parser');
const { check } = require('express-validator');
const cookieParser = require('cookie-parser');
const multer = require('multer');

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
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],

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

        // Pastikan sesi pengguna dihapus
        req.session.destroy((destroyErr) => {
            if (destroyErr) {
                console.error('Error destroying session:', destroyErr);
                return res.status(500).json({ message: "Failed to logout" });
            }

            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");

            // Kirim respons ke frontend untuk memastikan user jadi null
            res.clearCookie('connect.sid'); // Hapus cookie sesi jika menggunakan express-session
            res.redirect(APP_URL); 
        });
    });
});



// LOGIN MANUAL SECTION

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

const sendMailWithAttachment = async (email, mailSubject, content, filePath) => {
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
            attachments: [
                {
                    filename: 'Voucher Privat Al Faiz.pdf',
                    path: filePath,
                },
            ],
        };

        // Wrap sendMail in a Promise
        const info = await transporter.sendMail(mailOptions);
        console.log('Mail with attachment sent successfully: ' + info.response);
        return info;
    } catch (error) {
        console.error('Error sending mail with attachment:', error);
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
            <a href="${process.env.API_URL}/mail-verification?token=${randomToken}">Verify Here</a>
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
            sameSite: process.env.SAMESITE || 'none',
            maxAge: 15 * 60 * 1000
        });

        res.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            secure: NODE_ENV === "production",
            sameSite: process.env.SAMESITE || 'none',
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
            sameSite: process.env.SAMESITE || 'none',
            maxAge: 15 * 60 * 1000, // 15 menit
        });

        res.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.SAMESITE || 'none',
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

// GET USER HAS TICKET
app.get('/ticket-count', async (req, res) => {
    try {
        const [result] = await db.query(
            'SELECT COUNT(*) as total FROM user WHERE has_ticket = 1'
        );
        
        res.json({ totalTickets: result[0].total });
    } catch (error) {
        console.error('Error counting tickets:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// TOTAL TIKET
app.get('/total-ticket', async (req, res) => {
    try {
        const [result] = await db.query('SELECT COUNT(*) as total FROM ticket');
        
        res.json({ totalTickets: result[0].total });
    } catch (error) {
        console.error('Error counting tickets:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// GET ALL TICKET
app.get('/tickets', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT email,username_ig,status_ticket FROM ticket");

        res.json(rows);
    } catch (error) {
        console.error('Error fetching universities:', error);
        res.status(500).send('Error fetching universities');
    }
});

// ISI DATA TIKET
const upload = multer({
    storage: multer.memoryStorage(), // Simpan file di memory
  }).single('bukti_pembayaran'); // 'bukti_pembayaran' sesuai dengan name pada form

  app.post('/ticket', upload, async (req, res) => {
    const { email, username_ig } = req.body;
    const bukti_pembayaran = req.file ? req.file.buffer : null;
  
    if (!email || !username_ig || !bukti_pembayaran) {
      return res.status(400).json({ message: 'Email, username IG, dan bukti pembayaran wajib diisi!' });
    }

    const checkQuery = 'SELECT COUNT(*) AS count FROM ticket WHERE email = ?';
    let result = await db.query(checkQuery, [email]);
    result = result[0][0];

    if (result.count > 0) {
      return res.status(400).json({
        message: 'Email sudah terdaftar, tidak dapat menyimpan data baru.',
      });
    }
  
    const query = 'INSERT INTO ticket (email, username_ig, bukti_pembayaran) VALUES (?, ?, ?)';
  
    try {
      const [results] = await db.query(query, [email, username_ig, bukti_pembayaran]);
      res.status(201).json({ message: 'Tiket berhasil dibuat!', ticketId: results.insertId });
    } catch (error) {
      console.error('Error inserting ticket:', error);
      res.status(500).json({ message: 'Terjadi kesalahan saat menyimpan data tiket' });
    }
  });

// KIRIM TIKET EMAIL
app.post('/send-confirmation', async (req, res) => {
    const { email } = req.body;

    try {
        // Update status tiket menjadi true/1 berdasarkan email
        const updateQuery = "UPDATE ticket SET status_ticket = ? WHERE email = ?";
        await db.query(updateQuery, [1, email]);

        // Kirim email konfirmasi
        const mailSubject = "Your Ticket for Batam Campus Expo 2025 is Ready! 🎉";
        const content = `
            <p>Hello ${email},</p>
            <p>Thank you for purchasing your ticket for Batam Campus Expo 2025! We’re excited to welcome you to the first Campus Expo in Batam, happening on:</p>
            <p>📅 : 25th January 2025<br>
            📍 : Pollux Mall Batam Center<br>
            🕙 : 10.00 - 19.00</p>

            <p>Beberapa hal yang bisa kamu nikmati di Batam Campus Expo 2025:</p>
            <ul>
                <li>Beragam Universitas dari seluruh Indonesia yang siap memberikan informasi seputar jurusan dan program unggulan mereka.🎓</li>
                <li>Voucher tryout yang bisa kamu gunakan untuk mengukur kemampuan dan persiapan UTBK.📚</li>
                <li>Sesi Talkshow menarik untuk membantu kamu merencanakan masa depan.🚀</li>
            </ul>

            <p>Don’t forget to keep and show us this email for entry.😉</p>

            <p>We can’t wait to see you at Batam Campus Expo 2025! Let’s find your dream campus together! 💼✨</p>



            <p>Best regards,<br>
            Batam Campus Expo 2025 Team.</p>
        `;

        // Path ke file PDF
        const filePath = "./voucher.pdf";

        // Kirim email dengan attachment file PDF
        await sendMailWithAttachment(email, mailSubject, content, filePath);
        // await sendMail(email, mailSubject, content);

        res.json({ message: 'Konfirmasi berhasil dikirim dan status diupdate' });
    } catch (error) {
        console.error('Error in confirmation process:', error);
        res.status(500).json({ error: 'Gagal memproses konfirmasi' });
    }
});

// GET Image by email
app.get('/ticket-image/:email', async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT bukti_pembayaran FROM ticket WHERE email = ?",
            [req.params.email]
        );
        
        if (rows.length > 0 && rows[0].bukti_pembayaran) {
            // Detect image type from the first few bytes of the BLOB
            const buffer = rows[0].bukti_pembayaran;
            let contentType = 'image/jpeg'; // default

            // Check magic numbers for common image formats
            if (buffer[0] === 0xFF && buffer[1] === 0xD8) {
                contentType = 'image/jpeg';
            } else if (buffer[0] === 0x89 && buffer[1] === 0x50) {
                contentType = 'image/png';
            } else if (buffer[0] === 0x47 && buffer[1] === 0x49) {
                contentType = 'image/gif';
            } else if (buffer[0] === 0x42 && buffer[1] === 0x4D) {
                contentType = 'image/bmp';
            } else if (buffer[8] === 0x57 && buffer[9] === 0x45) {
                contentType = 'image/webp';
            }

            // Set the detected content type
            res.setHeader('Content-Type', contentType);
            // Send the BLOB data
            res.send(buffer);
        } else {
            res.status(404).send('Image not found');
        }
    } catch (error) {
        console.error('Error fetching image:', error);
        res.status(500).send('Error fetching image');
    }
});


// UNIVERSITAS BY ID
app.get('/universitas/:kode_univ', async (req, res) => {
    const { kode_univ } = req.params;

    try {
        const [hasil_univ] = await db.query("SELECT * FROM universitas WHERE kode_univ = ?", [kode_univ]);
        
        if (hasil_univ.length > 0) {
            const uni = hasil_univ[0];
            uni.logo = `/LogoCampus/${uni.kode_univ}.webp`;
            uni.cardImage = `/CardImage/${uni.kode_univ}_1.webp`;

            res.json(uni);
        } else {
            res.status(404).json({ message: 'Universitas tidak ditemukan' });
        }
    } catch (error) {
        console.error('Error fetching university data by id:', error);
        res.status(500).json({ message: 'Error fetching university data' });
    }
});

// UPDATE HAS TIKCET USER
app.patch('/api/users/ticket', authMiddleware, async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const { email, has_ticket } = req.body;

        // Verify that the authenticated user is updating their own ticket status
        if (email !== req.user.email) {
            return res.status(403).json({ message: 'Forbidden: Cannot update ticket status for other users' });
        }

        const [result] = await db.query(
            'UPDATE user SET has_ticket = ? WHERE email = ?',
            [has_ticket, email]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch updated user data
        const [updatedUser] = await db.query(
            'SELECT username, email, has_ticket FROM user WHERE email = ?',
            [email]
        );

        res.json({ 
            message: 'Ticket status updated successfully', 
            user: updatedUser[0]
        });
    } catch (error) {
        console.error('Error updating ticket status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET FAKULTAS BY ID KAMPUS
app.get('/universitas/:kode_univ/fakultas', async (req, res) => {
    const { kode_univ } = req.params;

    try {
        const [hasil_univ] = await db.query("SELECT * FROM fakultas WHERE kode_universitas = ?", [kode_univ]);
        
        if (hasil_univ.length > 0) {
            res.json(hasil_univ);
        } else {
            res.status(404).json({ message: 'Universitas tidak ditemukan' });
        }
    } catch (error) {
        console.error('Error fetching university data by id:', error);
        res.status(500).json({ message: 'Error fetching university data' });
    }
});

// JURUSAN BY ID FOR TABLE
app.get('/universitas/:kode_univ/allprodi', async (req, res) => {
    const { kode_univ } = req.params;
    try {
        const [jurusan] = await db.query("SELECT * FROM jurusan WHERE kode_univ = ?", [kode_univ]);
        if (jurusan.length > 0) {
            res.json(jurusan)
        } else {
            res.status(404).json({ message: 'Jurusan tidak ditemukan untuk Universitas ini' });
        }
    } catch (error) {
        console.error('Error fetching majors:', error);
        res.status(500).json({ message: 'Error fetching majors' });
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