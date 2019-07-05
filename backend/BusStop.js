const ApiRequests = require('./ApiRequests').ApiRequests;
const Bus = require('./Bus').Bus;

exports.BusStop = class BusStop{
    //sync constructor methods
    constructor(id, jsonStop, jsonArrivals){
        this.id = id;
        this.assignProps(jsonStop);
        this.assignNextBuses(jsonArrivals);
    }

    assignProps(jsonStop){
        const translator = {
            "name": "commonName"
        };

        for(let key in translator){
            const apiKey = translator[key];
            const value = jsonStop[apiKey];
            this[key] = value;
        }

        //handle substops
        if(jsonStop.hasOwnProperty('indicator')){
            this.name = this.name + " " + jsonStop.indicator;
        }
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
    static async newFromId(id){
        //begin requests
        let jsonStop = ApiRequests.busStopFromId(id);
        let jsonArrivals = ApiRequests.arrivalPredictions(id);

        //wait for completion
        jsonStop = await jsonStop;
        jsonArrivals = await jsonArrivals;

        //create object
        let busStop = new this(id, jsonStop, jsonArrivals);
        return busStop;
    }

    static async stopsClosestToPostcode(postcode, numberOfStops = 6, maxRadius = 10000, radiusIncrement = 200){
        let ids = await ApiRequests.busStopsNearPostcode(postcode, numberOfStops, maxRadius, radiusIncrement)
        let promisedBusStops = [];

        for(let id of ids){
            let busStop = this.newFromId(id);
            promisedBusStops.push(busStop);
        }

        let resolvedBusStops = await Promise.all(promisedBusStops);
        return resolvedBusStops;
    }
}