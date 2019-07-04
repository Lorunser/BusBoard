
exports.Bus = class Bus{
    constructor(jsonBus){
        const translator = {
            "id": "id",
            "minutesToArrival": "timeToStation",
            "number": "lineName"
        };

        for(let key in translator){
            const apiKey = translator[key];
            const value = jsonBus[apiKey];
            this[key] = value;
        }

        //convert to mins
        this.minutesToArrival = parseFloat(this.minutesToArrival) / 60;
    }

    stringify(){
        const rep = this.number + " arriving in " + this.minutesToArrival.toFixed(0) + " minutes";
        return rep;
    }
}