exports.Bus = class Bus{

    constructor(jsonBus){
        this.assignProps(jsonBus);
        this.minutesToArrival = parseFloat(this.minutesToArrival) / 60;
    }

    assignProps(jsonBus){
        const translator = {
            "id": "id",
            "minutesToArrival": "timeToStation",
            "number": "lineName",
            "destination": "destinationName"
        };

        for(let key in translator){
            const apiKey = translator[key];
            const value = jsonBus[apiKey];
            this[key] = value;
        }
    }

    stringify(){
        const rep = this.number + " to " + this.destination + " in " + this.minutesToArrival.toFixed(0) + " minutes";
        return rep;
    }
}