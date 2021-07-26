var express = require("express");
var app = express();
var multer = require("multer");
var cors = require("cors");

const fs = require("fs");

app.use(cors());

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage }).single("file");

var testFolder = './public/upload/';

app.post("/upload", function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });

  fs.readdir(testFolder, (err, files) => {
    files.forEach(file => {
      console.log(file);
    });
  });

});

app.get("/upload", (req, res) => {
  res.end("hello world");
});

app.listen(8000, function () {
  console.log("App running on port 8000");
});
