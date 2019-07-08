function HTMLify(bus) {
    var detailsHTML = '<span class="badge badge-secondary badge-pill">' + bus.number + '</span>';
    detailsHTML += " to " + bus.destination + ", arriving in " ;
    detailsHTML += '<span class="badge badge-primary badge-pill">' + bus.minutesToArrival.toFixed(0) + ' minutes </span>';
    return detailsHTML;
}

function createResultsHTML(busStopArray) {
    var resultsText = '';
    
    for (var busStop of busStopArray) {
        resultsText += '<div class="col-md-6"><ul class="list-group">';
        resultsText += '<li class="list-group-item active h3">' + busStop.name + '</li>';

        for (var bus of busStop.nextBuses) {
            var busDetails = HTMLify(bus);
            resultsText += '<li class="list-group-item list-group-item-action">' + busDetails +'</li>';
        }
        
        if (busStop.nextBuses.length === 0) {
            resultsText += '<li class="list-group-item list-group-item-action"><b>No buses found</b></li>'
        }

        resultsText += '</ul></div><br>';
    }

    return resultsText;
}

function change_loc(postcode) {
    var pre_text  ='<iframe width="600" height="500"  src="https://maps.google.com/maps?q='
    var post_text = '&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>'

    document.getElementById("gmap_canvas_frame").innerHTML = pre_text + postcode + post_text;
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
        change_loc(postcode);
        document.getElementById("results").innerHTML = resultsText;
    }
    
    xhttp.send();

    setTimeout(function(){
        var postcode = document.forms.postcodeForm[0].value;
        if (typeof postcode.length !== 'undefined') {
            submitPostcode()
        };
     }, 20000);
}

