const express = require("express");
const cors = require("cors");
const db = require("./database");
require("dotenv").config();
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.status(200).send("OK");
});

//ENPOINT UNIVERSITAS
app.get('/universitas', async (req,res) => {

    try {
        const [rows] = await db.query("SELECT * FROM universitas");
        res.json(rows);
    } catch (error) {
        console.error('Error fetching universities:', error);
        res.status(500).send('Error fetching universities');
    }
})

//ENDPOINT FAKULTAS

//ENDPOINT PRODI

// Route gacorr
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