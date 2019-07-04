const ApiRequests = require('./ApiRequests').ApiRequests;

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
        return new this(jsonStop, id);
    }

    async printArrivals(){
        const jsonArrivals = await ApiRequests.arrivalPredictions(this.id);
        console.log(jsonArrivals);
        return jsonArrivals;
    }
}