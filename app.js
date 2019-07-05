const express = require('express')
const app = express()
const port = 3000
const BusStop = require('./backend/BusStop').BusStop;

app.get('/test', (req, res) => res.send('Hello World!'));

app.get('/departureBoards/:postcode', async (request, response) => {
    const postcode = request.params.postcode;

    try{
        const closestBusStops = await BusStop.stopsClosestToPostcode(postcode);
        response.json(closestBusStops);
    }
    catch{
        response.sendStatus(404);
    }
});

app.use(express.static('frontend'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))