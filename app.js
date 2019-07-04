const express = require('express')
const app = express()
const port = 3000
const BusStop = require('./BusStop').BusStop;

app.get('/test', (req, res) => res.send('Hello World!'));

app.get('/departureBoards/:postcode', async (request, response) => {
    const postcode = request.params.postcode;

    try{
        const closestBusStops = await BusStop.stopsClosestToPostcode(postcode);
        response.send(closestBusStops);
    }
    catch{
        response.send("Error 404: cannot find stations for postcode " + postcode);
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))