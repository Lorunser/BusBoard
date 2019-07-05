function HTMLify(bus) {
    var detailsHTML = '<span class="badge badge-secondary badge-pill">' + bus.number + '</span>';
    detailsHTML += "To " + bus.destination + ", arriving in " ;
    detailsHTML += '<span class="badge badge-primary badge-pill">' + bus.minutesToArrival.toFixed(0) + ' minutes </span>';
    return detailsHTML;
}

function createResultsHTML(busStopArray) {
    var resultsText = '';
    
    for (var busStop of busStopArray) {
        resultsText += '<div class="col-md-6"></div><ul class="list-group">';
        resultsText += '<li class="list-group-item active h3">' + busStop.name + '</li>';
        console.log(busStop);
        for (var bus of busStop.nextBuses) {
            var busDetails = HTMLify(bus);
            resultsText += '<li class="list-group-item list-group-item-action">' + busDetails +'</li>';
        }
        resultsText += '</ul></div><br>';
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