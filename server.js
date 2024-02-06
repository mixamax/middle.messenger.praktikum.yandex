const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.static("./dist"));

app.get("/sign-up", function (req, res) {
    res.send("hello world");
});
app.get("/settings", function (req, res) {
    res.send("hello world");
});

app.get("/messenger", function (req, res) {
    res.send("hello world");
});
app.get("/404", function (req, res) {
    res.send("hello world");
});
app.get("/500", function (req, res) {
    res.send("hello world");
});

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});
