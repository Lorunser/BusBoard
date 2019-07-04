const ApiRequests = require('./ApiRequests').ApiRequests;
const Bus = require('./Bus').Bus;

exports.BusStop = class BusStop{
    constructor(jsonStop, id){
        this.id = id;
        const translator = {
            "name": "commonName"
        };

        for(let key in translator){
            const apiKey = translator[key];
            const value = jsonStop[apiKey];
            this[key] = value;
        }
    }

    static async newFromId(id){
        const jsonStop = await ApiRequests.busStopFromId(id);
        let busStop = new this(jsonStop, id);
        busStop.nextBuses = await busStop.getNextBuses();

        return busStop;
    }

    async getNextBuses(){
        const jsonArrivals = await ApiRequests.arrivalPredictions(this.id);
        let nextBuses = [];

        for(let i = 0; i < 5 && i < jsonArrivals.length; i++){
            const arrival = jsonArrivals[i];
            let nextBus = new Bus(arrival);
            nextBuses.push(nextBus);
        }

        return nextBuses;
    }

    printArrivals(){
        for(const bus of this.nextBuses){
            console.log(bus.stringify());
        }
    }
}