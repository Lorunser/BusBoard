var xhttp = new XMLHttpRequest();
 
xhttp.open('GET', '/departureBoards?postcode=nw51tl', true);
xhttp.setRequestHeader('Content-Type', 'application/json');
 
xhttp.onload = function() {
    // Handle response here using e.g. xhttp.status, xhttp.response, xhttp.responseText
    console.log(xhttp.response);
}
 
xhttp.send();