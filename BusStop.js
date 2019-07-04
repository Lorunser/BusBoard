const ApiRequests = require('./ApiRequests').ApiRequests;
const Bus = require('./Bus').Bus;

exports.BusStop = class BusStop{
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
    }

    assignNextBuses(jsonArrivals){
        this.nextBuses = [];

        for(let i = 0; i < 5 && i < jsonArrivals.length; i++){
            const arrival = jsonArrivals[i];
            let nextBus = new Bus(arrival);
            this.nextBuses.push(nextBus);
        }
    }

    printArrivals(){
        console.log("Arrivals for " + this.name);
        console.log("=========================");
        for(const bus of this.nextBuses){
            console.log(bus.stringify());
        }
    }

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
}