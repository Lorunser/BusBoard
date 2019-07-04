const BusStop = require('./BusStop').BusStop;

async function run(){
    const busStops = await BusStop.closestToPostcode("w2 3lp");
    console.log(busStops);
    for(busStop of busStops){
        busStop.printArrivals();
    }
}

run();
