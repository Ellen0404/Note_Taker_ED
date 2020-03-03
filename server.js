// Dependencies
const express = require("express");
const fs = require("fs");
var path = require("path");


//Set up Express
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var storeNotes = [];

// Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// app.get("*", function (req, res) {
//     res.sendFile(path.join(__dirname, "./public/index.html"));
// });


// API ROUTES
app.get("/api/notes", (req, res) => {
    return res.json(storeNotes);
    // var jsonNoteWritten = fs.writeFile("./db/db.json", JSON.stringify(xxx), function (err) {
    //     if (err) throw err;
    //     console.log("the note has been written to db.json")
    // });
});

// POST REQUEST TO STORE USER'S NOTES
app.post("/api/notes", function (req, res) {
    // var jsonRead = fs.readFile(JSON.parse(req.body), "utf8", function (err) {

    //     if (err) throw err;
    //     console.log("grabed info from db.json")
    // });

    storeNotes.push(req.body);
    console.log(`req.body`);
    console.log(req.body);
    res.json(req.body);
});


// Starts the server to begin listening
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});