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


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});