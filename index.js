const express = require ("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());



app.get ("/", (req,res)=>{
    res.sendStatus("Working");
})

app.get("/Make", function(req,res){
    res.sendFile(path.join(__dirname, "/Make.html"));
})

app.get("/View", function(req,rest){
    res.sendFile(path.join(__dirname, "/View.html"))
})

var reservation = [];

var waitList = [];

app.post("/api/Make", function(req,res){
    var newReservation = req.body;

    newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();
    console.log(newReservation);
    reservation.push(newReservation);
    res.json(newReservation);
});

app.listen(PORT, function(){
    console.log("listening on Port: " +PORT)
})


//ALL IN TERMINAL
//normal git push flow
//heroku login
//heroku create nameofproject
//git remote -v
//git push heroku master
//heroku open
//heroku logs if something goes wrong