const BusStop = require('./BusStop').BusStop;

async function run(){
    const busStops = await BusStop.stopsClosestToPostcode("w2 3lp");

    for(busStop of busStops){
        busStop.printArrivals();
    }
}

run();
