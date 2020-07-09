const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;
let data = true

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get("/", (req, res) => {
    res.sendStatus("Working");
})

app.get("/make", function (req, res) {
    res.sendFile(path.join(__dirname, "/make.html"));
})

app.get("/view", function (req, res) {
    res.sendFile(path.join(__dirname, "/view.html"))
})

var reservation = [];

var waitList = [];

app.post("/api/make", function (req, res) {
    var newReservation = req.body;

    newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();
    console.log(newReservation);

    if (reservation.length < 5) {
        reservation.push(newReservation);
    }
    else { 
        waitList.push(newReservation)
    }

    res.json(newReservation);
});

app.listen(PORT, function () {
    console.log("listening on Port: " + PORT)
})




//ALL IN TERMINAL
//normal git push flow
//heroku login
//heroku create nameofproject
//git remote -v
//git push heroku master
//heroku open
//heroku logs if something goes wrong