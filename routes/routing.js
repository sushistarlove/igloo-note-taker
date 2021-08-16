const fs = require("fs");
const path = require("path");

module.exports = (app) => {
  fs.readFile("db/db.json", "utf-8", (err, data) => {
    if (err) throw err;
    var notes = JSON.parse(data);

    //html routes

    app.get("/notes", function (req, res) {
      res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    app.get("*", function (req, res) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    //update

    function updateDB() {
      fs.writeFile("db/db.json", JSON.stringify(notes, "\t"), (err) => {
        if (err) throw err;
        return true;
      });
    }

    //api routes

    app.get("/api/notes", function (req, res) {
      res.JSON(notes);
    });

    app.post("/api/notes", function (req, res) {
      let createNote = req.body;
      notes.push(createNote);
      updateDB();
      return console.log("New note created: " + createNote.title);
    });

    app.get("/api/notes/:id", function (req, res) {
      res, json(notes[req.params.id]);
    });
  });
};
