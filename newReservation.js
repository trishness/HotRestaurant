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