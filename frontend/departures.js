function stringify(bus) {
    var rep = bus.number + " to " + bus.destination + " in " + bus.minutesToArrival.toFixed(0) + " minutes";
    return rep;
}

function createResultsHTML(busStopArray) {
    var resultsText = '<ul class="list-group">';
    
    for (var busStop of busStopArray) {
        resultsText += '<li class="list-group-item active h3">' + busStop.name + '</li>';
        console.log(busStop);
        for (var bus of busStop.nextBuses) {
            var busDetails = stringify(bus);
            resultsText += '<li class="list-group-item list-group-item-action">' + busDetails +'</li>';
        }
        resultsText += '</ul><br>';
    }
    return resultsText;
}



function submitPostcode() {
    var xhttp = new XMLHttpRequest();
    //var form     = this.form;
    var postcode = document.forms.postcodeForm[0].value;
    xhttp.open('GET', '/departureBoards/'+postcode, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    
    xhttp.onload = function() {
        // Handle response here using e.g. xhttp.status, xhttp.response, xhttp.responseText
        if(xhttp.status == "404"){
            alert("Invalid postcode. Try Again!");
        }

        var jsonArray = JSON.parse(xhttp.response);
        var resultsText = createResultsHTML(jsonArray);
        document.getElementById("results").innerHTML = resultsText;
    }
    
    xhttp.send();
}