function stringify(bus) {
    var rep = bus.number + " to " + bus.destination + " in " + bus.minutesToArrival.toFixed(0) + " minutes";
    return rep;
}

function createResultsHTML(busStopArray) {
    var resultsText = '<h2>Results</h2>';
    
    for (var busStop of busStopArray) {
        resultsText += '<h3>' + busStop.name + '</h3><ul>';
        console.log(busStop);
        for (var bus of busStop.nextBuses) {
            var busDetails = stringify(bus);
            resultsText += '<li>' + busDetails +'</li>';
        }
        resultsText += '</ul>';
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
        var jsonArray = JSON.parse(xhttp.response);
        var resultsText = createResultsHTML(jsonArray);
        document.getElementById("results").innerHTML = resultsText;
    }
    
    xhttp.send();
}