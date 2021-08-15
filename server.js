const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ exended: true }));

app.use(express.json());

app.use(express.static(__dirname));

app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
