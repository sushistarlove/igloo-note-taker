const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');


module.exports = (app) => {
  fs.readFile("db/db.json", "utf-8", (err, data) => {
    if (err) throw err;
    var notes = JSON.parse(data);

    //update

    function updateDB() {
      fs.writeFile("db/db.json", JSON.stringify(notes, "\t"), (err) => {
        if (err) throw err;
        return true;
      });
    }

    //api routes

    app.get("/api/notes", function (req, res) {
      res.json(notes);
    });

    app.post("/api/notes", function (req, res) {
      const {title, text} = req.body;
      const createNote = {title, text, id: uuidv4()}
      notes.push(createNote);
      updateDB();
      return console.log("New note created: " + createNote.title);
    });

    app.get("/api/notes/:id", function (req, res) {
      res, json(notes[req.params.id]);
    });

    app.delete("/api/notes/:id", function (req, res) {
      const newNotes = notes.filter((note) => note.id !== req.params.id);
      updateDB(newNotes)
      res.json({
        ok: true 
      })
    });

    //html routes

    app.get("/notes", function (req, res) {
      res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    app.get("*", function (req, res) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });
  });
};
