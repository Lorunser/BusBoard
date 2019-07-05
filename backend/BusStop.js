const ApiRequests = require('./ApiRequests').ApiRequests;
const Bus = require('./Bus').Bus;

exports.BusStop = class BusStop{
    //sync constructor methods
    constructor(id, name, jsonArrivals){
        this.id = id;
        this.name = name;
        this.assignNextBuses(jsonArrivals);
    }

    assignNextBuses(jsonArrivals){
        this.nextBuses = [];
        jsonArrivals = jsonArrivals.sort((a, b) => a.timeToStation - b.timeToStation);

        for(let i = 0; i < 5 && i < jsonArrivals.length; i++){
            const arrival = jsonArrivals[i];
            let nextBus = new Bus(arrival);
            this.nextBuses.push(nextBus);
        }
    }

    //display
    printArrivals(){
        console.log("Arrivals for " + this.name);
        console.log("=========================");
        
        for(const bus of this.nextBuses){
            console.log(bus.stringify());
        }
        console.log("\n")
    }

    //async static generator methods
    static async newFromIdName(stop){
        let jsonArrivals = await ApiRequests.arrivalPredictions(stop.id);
        let busStop = new this(stop.id, stop.name, jsonArrivals);
        return busStop;
    }


    static async stopsClosestToPostcode(postcode, numberOfStops = 2, maxRadius = 10000, radiusIncrement = 200){
        let ids = await ApiRequests.busStopsNearPostcode(postcode, numberOfStops, maxRadius, radiusIncrement)
        let promisedBusStops = [];

        for(let id of ids){
            let busStop = this.newFromIdName(id);
            promisedBusStops.push(busStop);
        }

        let resolvedBusStops = await Promise.all(promisedBusStops);
        return resolvedBusStops;
    }
}