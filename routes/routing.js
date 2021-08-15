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
  });
};
