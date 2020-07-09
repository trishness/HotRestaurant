function runTableQuery(){
    var currentURL = window.location.origin;

    $.ajax({url: currentURL + "/api/view", method: "GET"})
        .done(function(tableData){
            console.log("URL: " +currentURL + "/api/view");
            console.log(tableData);

            for (var i=0; i<tableData.length; i++){
                var tableSection = $("<div>");
                tableSection.addClass("well");
                tableSection.attr("id", "tableWell-" + i+1)
                $("#tableSection").append(tableSection);

                var tableNumber = i+1;

                $("#tableWell-" + i+1).append('<h2><span class="label label-primary">' + tableNumber + "</span> | " + tableData[i].customerID + "</h2>")
                
                // if (i<=4){
                // data=false;
                // $("#tableSection").append(tableSection);
                // }
                // else {
                //     runWaitListQuery();
                // }
            }
        });
}

function runWaitListQuery(){
    var currentURL = window.location.origin;
    $.ajax({url: currentURL + "/api/wait", method: "GET"}) //will need a Wait html
        .done(function(waitListData){
            console.log("URL: " + currentURL + "/api/wait");
            console.log(waitListData);

            for (var i=0; i<waitListData.length; i++){
                var waitListSection = $("<div>");
                waitListSection.addClass("well");
                waitListSection.attr("id", "waitListWell-" + i+1)
                $("#waitListSection").append(waitListSection);

                var tableNumber = i+1;

                $("#waitListWell-"+ i+1).append('<h2><span class="label label-primary">'+ tableNumber + "</span> | " + waitListData[i].customerID + "</h2>");
            }
        });
}

function clearTable(){
    var currentURL = window.location.origin;
    $.ajax({url: currentURL + "/api/clear", method: "POST"}) //will need a Clear html
}

$("#clear").on("click", function(){
    alert("Clearing out!");
    clearTable();
    location.reload();
})

runTableQuery();
runWaitListQuery();