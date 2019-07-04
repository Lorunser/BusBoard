const BusStop = require('./BusStop').BusStop;

async function run(){
    const busStop = await BusStop.newFromId("490008660N");
    busStop.printArrivals();
}

run();
