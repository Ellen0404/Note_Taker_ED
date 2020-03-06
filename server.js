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
app.use(express.static("public"));



// Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});



// API ROUTES

// POST REQUEST TO SAVE USER'S NOTES
app.post("/api/notes", function (req, res) {

    console.log(`req.body`);
    console.log(req.body);

    fs.readFile("./db/db.json", "utf8", function (err, file) {

        if (err) throw err;
        console.log("grabed info from db.json")
        console.log(file)
        const newFile = JSON.parse(file);
        const lastId = newFile[newFile.length - 1].id
        req.body.id = lastId + 1 || 1
        newFile.push(req.body);
        fs.writeFile("./db/db.json", JSON.stringify(newFile), function (err) {
            if (err) throw err;
            console.log("the note has been written to db.json")

            res.json(req.body);
        });

    });


});
// GET REQUEST TO GET ALL NOTES FROM DB
app.get("/api/notes", (req, res) => {
    // let jsonRead = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    fs.readFile("./db/db.json", "utf8", function (err, file) {

        if (err) throw err;
        console.log("grabed info from db.json")
        console.log(file)
        res.json(JSON.parse(file));

    });


});


app.delete("/api/notes/:id", function (req, res) {

    const { params } = req;
    let { id } = params;
    id = JSON.parse(id)
    console.log(params, id);
    fs.readFile("./db/db.json", "utf8", function (err, file) {
        console.log('File ------------')
        console.log(file)
        var newStoreNotes = JSON.parse(file).filter((item) => item.id !== id);

        console.log(newStoreNotes)
        fs.writeFile("./db/db.json", JSON.stringify(newStoreNotes), function (err) {
            if (err) throw err;
            console.log("the note has been written to db.json")
            res.json(newStoreNotes);
        });

    });



});

// Starts the server to begin listening
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});