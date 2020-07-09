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
    reservation.push(newReservation);
    res.json(newReservation);
});

app.listen(PORT, function () {
    console.log("listening on Port: " + PORT)
})

$(".submit").on("click", function () {

    var newReservation = {
        customerName: $(`#reserve_name`).val().trim(),
        phoneNumber: $(`#reserve_phone`).val().trim(),
        customerEmail: $(`#reserve_email`).val().trim(),
        customerID: $(`#reserve_uniqueID`).val().trim()
    };
    console.log(newReservation);

    var currentURL = window.location.origin;
    $.post(currentURL + "/api/view", newReservation,
        function (data) {
            if (data === true) {
                alert("You're booked!")
            }
            if (data === false) {
                alert("We're currently full, but you've been added to the waitlist!")
            }

            $(`#reserve_name`).val("");
            $(`#reserve_phone`).val("");
            $(`#reserve_email`).val("");
            $(`#reserve_uniqueID`).val("");
        });
    return false;
});

function runTableQuery() {
    var currentURL = window.location.origin;

    $.ajax({ url: currentURL + "/api/view", method: "GET" })
        .done(function (tableData) {
            console.log("URL: " + currentURL + "/api/view");
            console.log(tableData);

            for (var i = 0; i < tableData.length; i++) {
                var tableSection = $("<div>");
                tableSection.addClass("well");
                tableSection.attr("id", "tableWell-" + i + 1)
                // $("#tableSection").append(tableSection);

                var tableNumber = i + 1;

                $("#tableWell-" + i + 1).append('<h2><span class="label label-primary">' + tableNumber + "</span> | " + tableData[i].customerID + "</h2>")

                if (i <= 4) {
                    data = false;
                    $("#tableSection").append(tableSection);
                }
                else {
                    runWaitListQuery();
                }
            }
        });
}

function runWaitListQuery() {
    var currentURL = window.location.origin;
    $.ajax({ url: currentURL + "/api/wait", method: "GET" }) //will need a Wait html
        .done(function (waitListData) {
            console.log("URL: " + currentURL + "/api/wait");
            console.log(waitListData);

            for (var i = 0; i < waitListData.length; i++) {
                var waitListSection = $("<div>");
                waitListSection.addClass("well");
                waitListSection.attr("id", "waitListWell-" + i + 1)
                $("#waitListSection").append(waitListSection);

                var tableNumber = i + 1;

                $("#waitListWell-" + i + 1).append('<h2><span class="label label-primary">' + tableNumber + "</span> | " + waitListData[i].customerID + "</h2>");
            }
        });
}

function clearTable() {
    var currentURL = window.location.origin;
    $.ajax({ url: currentURL + "/api/clear", method: "POST" }) //will need a Clear html
}

$("#clear").on("click", function () {
    alert("Clearing out!");
    clearTable();
    location.reload();
})

runTableQuery();
runWaitListQuery();


//ALL IN TERMINAL
//normal git push flow
//heroku login
//heroku create nameofproject
//git remote -v
//git push heroku master
//heroku open
//heroku logs if something goes wrong